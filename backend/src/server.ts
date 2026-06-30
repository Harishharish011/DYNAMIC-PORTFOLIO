import 'dotenv/config';
import { connectDB } from './config/db';
import { app, registerRoutes } from './app';
import { seedAdmin } from "./seed/adminSeed";

async function main() {
  const port = Number(process.env.PORT) || 5000;

  await connectDB();
  await seedAdmin();
  registerRoutes();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`✅ Server running on port ${port}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

