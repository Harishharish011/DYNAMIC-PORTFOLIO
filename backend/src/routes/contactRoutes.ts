import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate';
import { createContact } from '../controllers/contactController';

const router = Router();

router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').isString().notEmpty().withMessage('Subject is required'),
    body('message').isString().notEmpty().withMessage('Message is required'),
    validate,
  ],
  createContact
);

export default router;

