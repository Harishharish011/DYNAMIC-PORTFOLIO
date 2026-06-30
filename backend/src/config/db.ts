import mongoose from 'mongoose';

function validateMongoUri(uri: string) {
  const trimmed = uri.trim();

  if (trimmed !== uri) {
    throw new Error('MONGODB_URI has leading or trailing whitespace.');
  }

  if (!trimmed.startsWith('mongodb://') && !trimmed.startsWith('mongodb+srv://')) {
    throw new Error('MONGODB_URI must start with mongodb:// or mongodb+srv://');
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error('MONGODB_URI is malformed. Check username, password encoding, host, and query string.');
  }

  if (!parsed.pathname || parsed.pathname === '/') {
    throw new Error('MONGODB_URI is missing a database name. Use /portfolio_v2 before the query string.');
  }

  return trimmed;
}

function logMongoFailure(err: unknown) {
  console.error('MongoDB connection failed');

  if (!(err instanceof Error)) {
    console.error('   Cause: Unknown MongoDB connection error.');
    return;
  }

  const message = err.message;
  console.error(`   Error: ${message}`);

  if (message.includes('ENOTFOUND') || message.includes('querySrv')) {
    console.error('   Cause: DNS resolution failed. Check the Atlas hostname in MONGODB_URI.');
  } else if (message.includes('Authentication') || message.includes('auth failed')) {
    console.error('   Cause: Authentication failed. Check the database username and password.');
    console.error('   If the password contains @ # % & ? + / : it must be URL encoded.');
  } else if (message.includes('whitelist') || message.includes('IP')) {
    console.error('   Cause: Current IP is not allowed in MongoDB Atlas Network Access.');
    console.error('   Add your current IP in Atlas, or use 0.0.0.0/0 temporarily for development only.');
  } else if (
    message.includes('ReplicaSetNoPrimary') ||
    message.includes('Server selection timed out') ||
    message.includes('ENETUNREACH') ||
    message.includes('ETIMEDOUT')
  ) {
    console.error('   Cause: Atlas cluster is unreachable from this machine.');
    console.error('   Check IP access list, firewall/VPN, cluster status, and internet connectivity.');
  } else if (message.includes('bad scheme') || message.includes('Invalid scheme')) {
    console.error('   Cause: Invalid URI scheme.');
  }
}

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  console.log('[MongoDB] Env check:', {
    MONGODB_URI_exists: typeof mongoUri === 'string' && mongoUri.length > 0,
    MONGODB_URI_length: typeof mongoUri === 'string' ? mongoUri.length : 0,
  });

  if (!mongoUri?.trim()) {
    throw new Error('MONGODB_URI is not set');
  }

  const validatedMongoUri = validateMongoUri(mongoUri);

  // Parse once so we can log host/db name without leaking credentials.
  const parsed = new URL(validatedMongoUri.trim());

  const hostForLog = parsed.host; // hostname only (no username/password)
  const schemeForLog = parsed.protocol.replace(':', '');
  const dbName = (() => {
    // pathname is like: /portfolio_v2
    const pn = parsed.pathname ?? '';
    const normalized = pn.startsWith('/') ? pn.slice(1) : pn;
    return normalized || null;
  })();

  const mongoHostForLog = `${schemeForLog}://<redacted>@${hostForLog}`;

  // Heuristic warning for likely password URL-encoding issues (do not print credentials)
  const authorityPart = (() => {
    // Strip scheme
    const withoutScheme = validatedMongoUri.replace(/^mongodb\+(srv)?:\/\//i, '');
    // authority ends at @, and host+path follow
    const atIdx = withoutScheme.indexOf('@');
    if (atIdx === -1) return '';
    return withoutScheme.slice(0, atIdx);
  })();

  const maybeReservedInAuthority = /[:@/#?&%]/.test(authorityPart);
  const likelyPasswordEncodingIssue = maybeReservedInAuthority && /%[0-9A-Fa-f]{2}/.test(validatedMongoUri) === false;

  console.log('[MongoDB] Target:', {
    mongoHostForLog,
    dbName,
    likelyPasswordNeedsURLEncoding: likelyPasswordEncodingIssue,
    tlsHintFromUri: /\b(tls|ssl)=true\b/i.test(validatedMongoUri),
  });

  mongoose.set('strictQuery', true);

  console.log('[MongoDB] Connecting with Mongoose (letting the MongoDB driver handle SRV + TLS)...');

  try {
    // Important: Do NOT do manual dns.lookup/dns.promises.lookup for mongodb+srv.
    // Let the MongoDB driver perform SRV resolution internally.
    // Important: Do NOT force tls: false.
    await mongoose.connect(validatedMongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.log('[MongoDB] Connection failure stage: mongoose.connect() threw');
    logMongoFailure(err);
    throw err;
  }
}


