import bcrypt from 'bcrypt';
import { User } from '../models/User';

export async function seedAdmin() {
  // Keep seed synchronized with the already-existing admin document in MongoDB.
  // These can be overridden via env vars.
  const email = (process.env.ADMIN_EMAIL?.trim().toLowerCase() || 'vkharish011@gmail.com');
  const password = process.env.ADMIN_PASSWORD || 'Harishharish@2006';
  const name = process.env.ADMIN_NAME?.trim() || 'Portfolio Admin';

  if (!email || !password) {
    console.log('Admin seed skipped - set ADMIN_EMAIL and ADMIN_PASSWORD to create an admin user.');
    return;
  }

  const existing = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 12);

  if (!existing) {
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });
    return;
  }

  await User.updateOne(
    { email },
    {
      $set: {
        name,
        password: hashedPassword,
        role: 'admin',
      },
    },
    { upsert: true },
  );
}

