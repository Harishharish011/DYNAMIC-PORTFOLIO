import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { asyncHandler } from '../middleware/asyncHandler';
import { Blog } from '../models/Blog';
import { Contact } from '../models/Contact';
import { Github } from '../models/Github';
import { Project } from '../models/Project';
import { User } from '../models/User';
import { signJwt } from '../utils/jwt';

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  console.log("========== ADMIN LOGIN DEBUG ==========");
  console.log("[adminLogin] Login Request:", {
    email,
    hasPassword: Boolean(password),
  });

  // DEBUG (temporary): trace failing steps without logging raw password.
  const hasEmail = Boolean(email);
  const hasPassword = typeof password === 'string' && password.length > 0;

  const user = hasEmail
    ? await User.findOne({ email: email.toLowerCase(), role: 'admin' })
    : null;

  console.log("[adminLogin] Searching Email:", email);
  console.log("[adminLogin] User Found:", Boolean(user));

  if (user) {
    console.log("[adminLogin] Stored Email:", user.email);
    console.log("[adminLogin] Stored Role:", user.role);
    console.log("[adminLogin] Stored Password Hash Present:", Boolean(user.password));
  }

  const passwordOk = user ? await bcrypt.compare(password, user.password) : false;

  console.log("[adminLogin] Password Match:", passwordOk);

  if (!user || !passwordOk) {
    console.log("[adminLogin] Authentication Failed");
    console.log("======================================");

    return res.status(401).json({ success: false, message: 'Invalid credentials', errors: [] });
  }



  console.log("========== LOGIN SUCCESS ==============");
  console.log("JWT generation starting...");

  const token = signJwt({ id: String(user._id), email: user.email, role: user.role });

  console.log("JWT generated successfully");
  console.log(token);
  console.log("Returning HTTP 200");

  return res.json({
    success: true,
    token,
    admin: { id: String(user._id), name: user.name, email: user.email, role: user.role },
  });
});


export const adminProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) return res.status(401).json({ success: false, message: 'Unauthorized', errors: [] });

  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'Admin not found', errors: [] });

  return res.json({ success: true, admin: user });
});

export const adminStats = asyncHandler(async (_req: Request, res: Response) => {
  const [totalProjects, totalBlogs, totalMessages, github] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    Contact.countDocuments(),
    Github.findOne().sort({ updatedAt: -1 }),
  ]);

  return res.json({
    success: true,
    stats: {
      totalProjects,
      totalBlogs,
      totalMessages,
      githubRepositories: github?.repos?.length ?? 0,
      lastUpdated: github?.updatedAt ?? new Date().toISOString(),
    },
  });
});

export const listAdminProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  return res.json({ success: true, projects });
});

export const createAdminProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.create(req.body);
  return res.status(201).json({ success: true, project });
});

export const updateAdminProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found', errors: [] });
  return res.json({ success: true, project });
});

export const deleteAdminProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found', errors: [] });
  return res.json({ success: true, project });
});

export const listAdminBlogs = asyncHandler(async (_req: Request, res: Response) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return res.json({ success: true, blogs });
});

export const createAdminBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.create(req.body);
  return res.status(201).json({ success: true, blog });
});

export const updateAdminBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found', errors: [] });
  return res.json({ success: true, blog });
});

export const deleteAdminBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found', errors: [] });
  return res.json({ success: true, blog });
});

export const getAdminGithub = asyncHandler(async (_req: Request, res: Response) => {
  const github = await Github.findOne().sort({ updatedAt: -1 });
  return res.json({ success: true, github });
});

export const updateAdminGithub = asyncHandler(async (req: Request, res: Response) => {
  const github = await Github.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  return res.json({ success: true, github });
});

export const listAdminMessages = asyncHandler(async (_req: Request, res: Response) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  return res.json({ success: true, messages });
});

export const markAdminMessageRead = asyncHandler(async (req: Request, res: Response) => {
  const message = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!message) return res.status(404).json({ success: false, message: 'Message not found', errors: [] });
  return res.json({ success: true, message });
});

export const deleteAdminMessage = asyncHandler(async (req: Request, res: Response) => {
  const message = await Contact.findByIdAndDelete(req.params.id);
  if (!message) return res.status(404).json({ success: false, message: 'Message not found', errors: [] });
  return res.json({ success: true, message });
});

export const uploadAdminImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Image file is required', errors: [] });

  return res.status(201).json({
    success: true,
    image: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    },
  });
});

