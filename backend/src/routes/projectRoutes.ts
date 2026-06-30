import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import {
  listProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';

const router = Router();

router.get('/', listProjects);
router.get('/:slug', getProjectBySlug);

router.post(
  '/',
  requireAuth,
  [
    body('slug').isString().notEmpty(),
    validate,
  ],
  createProject
);

router.put(
  '/:id',
  requireAuth,
  [
    param('id').isString().notEmpty(),
    validate,
  ],
  updateProject
);

router.delete(
  '/:id',
  requireAuth,
  [
    param('id').isString().notEmpty(),
    validate,
  ],
  deleteProject
);

export default router;

