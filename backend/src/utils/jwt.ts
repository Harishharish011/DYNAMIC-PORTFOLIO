import jwt from 'jsonwebtoken';

export type JwtPayload = {
  id: string;
  email: string;
  role: string;
};

export function signJwt(payload: JwtPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyJwt(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  return jwt.verify(token, secret) as JwtPayload;
}

