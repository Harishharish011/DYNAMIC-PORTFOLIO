import type { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  console.log('[requireAuth] Authorization header present:', Boolean(header));
  console.log('[requireAuth] Authorization header value prefix:', header ? header.slice(0, 20) : null);

  if (!header || !header.startsWith('Bearer ')) {
    console.log('[requireAuth] Missing or invalid Bearer prefix');
    return res.status(401).json({ success: false, message: 'Unauthorized', errors: [] });
  }

  try {
    const token = header.slice('Bearer '.length);
    console.log('[requireAuth] Extracted token length:', token.length);

    const decoded = verifyJwt(token);
    console.log('[requireAuth] verifyJwt decoded:', {
      id: decoded?.id,
      email: decoded?.email,
      role: decoded?.role,
    });

    req.user = decoded;
    next();
  } catch (err) {
    console.log('[requireAuth] verifyJwt failed:', err instanceof Error ? err.message : String(err));
    return res.status(401).json({ success: false, message: 'Unauthorized', errors: [] });
  }
}


// Admin-only middleware (reuses JWT auth payload).
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  return requireAuth(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden', errors: [] });
    }
    return next();
  });
}

