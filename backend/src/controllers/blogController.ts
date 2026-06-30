import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { Blog } from '../models/Blog';

export const listBlogs = asyncHandler(async (_req: Request, res: Response) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return res.json({ success: true, blogs });
});

export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug });
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found', errors: [] });
  return res.json({ success: true, blog });
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const created = await Blog.create(req.body);
  return res.status(201).json({ success: true, blog: created });
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Blog.findOneAndUpdate({ _id: id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ success: false, message: 'Blog not found', errors: [] });
  return res.json({ success: true, blog: updated });
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Blog.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Blog not found', errors: [] });
  return res.json({ success: true, blog: deleted });
});

