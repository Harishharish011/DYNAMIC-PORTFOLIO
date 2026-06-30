import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { Project } from '../models/Project';

export const listProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  return res.json({ success: true, projects });
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const project = await Project.findOne({ slug });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found', errors: [] });
  return res.json({ success: true, project });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const created = await Project.create(req.body);
  return res.status(201).json({ success: true, project: created });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Project.findOneAndUpdate({ _id: id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ success: false, message: 'Project not found', errors: [] });
  return res.json({ success: true, project: updated });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Project.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Project not found', errors: [] });
  return res.json({ success: true, project: deleted });
});

