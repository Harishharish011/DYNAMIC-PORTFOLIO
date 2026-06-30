import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { Contact } from '../models/Contact';

// Keep EmailJS intact on frontend; backend stores in MongoDB only.
export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const created = await Contact.create(req.body);
  return res.status(201).json({ success: true, contact: created });
});

