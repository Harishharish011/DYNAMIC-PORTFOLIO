import express from 'express';
import cors from 'cors';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import blogRoutes from './routes/blogRoutes';
import githubRoutes from './routes/githubRoutes';
import contactRoutes from './routes/contactRoutes';
import adminRoutes from './routes/adminRoutes';

export const app = express();

export function registerRoutes() {
  const clientUrl = process.env.CLIENT_URL || '';

  app.use(
    cors({
      origin: clientUrl,
      credentials: true,
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Serve uploaded images (local uploads). Keeps Cloudinary integration possible later.
  app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

  app.get('/health', (_req, res) => res.json({ success: true, status: 'ok' }));

  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/github', githubRoutes);
  app.use('/api/contact', contactRoutes);

  // Admin CMS (separate from public portfolio)
  app.use('/api/admin', adminRoutes);

  app.use(errorHandler);
}


