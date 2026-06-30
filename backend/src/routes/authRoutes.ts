import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate';
import { login } from '../controllers/authController';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
    validate,
  ],
  ...login
);

export default router;

