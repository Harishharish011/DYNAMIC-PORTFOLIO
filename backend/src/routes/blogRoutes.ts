import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import {
  listBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';

const router = Router();

router.get('/', listBlogs);
router.get('/:slug', getBlogBySlug);

router.post(
  '/',
  requireAuth,
  [
    body('slug').isString().notEmpty(),
    validate,
  ],
  createBlog
);

router.put(
  '/:id',
  requireAuth,
  [
    param('id').isString().notEmpty(),
    validate,
  ],
  updateBlog
);

router.delete(
  '/:id',
  requireAuth,
  [
    param('id').isString().notEmpty(),
    validate,
  ],
  deleteBlog
);

export default router;

