import { Router } from 'express';
import { body, param } from 'express-validator';

import {
  adminLogin,
  adminProfile,
  adminStats,
  createAdminBlog,
  createAdminProject,
  deleteAdminBlog,
  deleteAdminMessage,
  deleteAdminProject,
  getAdminGithub,
  listAdminBlogs,
  listAdminMessages,
  listAdminProjects,
  markAdminMessageRead,
  updateAdminBlog,
  updateAdminGithub,
  updateAdminProject,
  uploadAdminImage,
} from '../controllers/adminController';
import { requireAdmin } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { validate } from '../middleware/validate';

const router = Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').isString().isLength({ min: 6 }), validate],
  adminLogin
);

router.get('/profile', requireAdmin, adminProfile);
router.get('/stats', requireAdmin, adminStats);

router.get('/projects', requireAdmin, listAdminProjects);
router.post('/projects', requireAdmin, [body('slug').isString().notEmpty(), body('title').isString().notEmpty(), validate], createAdminProject);
router.patch('/projects/:id', requireAdmin, [param('id').isMongoId(), validate], updateAdminProject);
router.delete('/projects/:id', requireAdmin, [param('id').isMongoId(), validate], deleteAdminProject);

router.get('/blogs', requireAdmin, listAdminBlogs);
router.post('/blogs', requireAdmin, [body('slug').isString().notEmpty(), body('title').isString().notEmpty(), validate], createAdminBlog);
router.patch('/blogs/:id', requireAdmin, [param('id').isMongoId(), validate], updateAdminBlog);
router.delete('/blogs/:id', requireAdmin, [param('id').isMongoId(), validate], deleteAdminBlog);

router.get('/github', requireAdmin, getAdminGithub);
router.patch('/github', requireAdmin, updateAdminGithub);

router.get('/messages', requireAdmin, listAdminMessages);
router.patch('/messages/:id/read', requireAdmin, [param('id').isMongoId(), validate], markAdminMessageRead);
router.delete('/messages/:id', requireAdmin, [param('id').isMongoId(), validate], deleteAdminMessage);

router.post('/uploads', requireAdmin, uploadImage.single('image'), uploadAdminImage);

export default router;

