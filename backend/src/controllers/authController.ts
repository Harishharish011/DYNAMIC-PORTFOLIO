import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { signJwt } from '../utils/jwt';
import { verifyLogin } from '../services/authService';

export const login = [
  asyncHandler(async (req: Request, res: Response) => {
    console.log("Login Request:", req.body);

    const { email, password } = req.body as { email: string; password: string };

    const payload = await verifyLogin(email, password);
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Invalid credentials', errors: [] });
    }

    const token = signJwt(payload);
    return res.json({ success: true, message: 'Login successful', token });
  }),
];

