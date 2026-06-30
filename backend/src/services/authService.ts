import bcrypt from 'bcrypt';
import { User } from '../models/User';

export async function verifyLogin(email: string, password: string) {
  const normalizedEmail = email?.trim().toLowerCase();

  // Mongo query is the only data source for auth.
  const user = normalizedEmail
    ? await User.findOne({ email: normalizedEmail, role: 'admin' })
    : null;

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  return { id: String(user._id), email: user.email, role: user.role };
}



