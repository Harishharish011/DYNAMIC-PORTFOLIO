import { Router } from 'express';
import { githubPlaceholder } from '../controllers/githubController';

const router = Router();
router.get('/', githubPlaceholder);

export default router;

