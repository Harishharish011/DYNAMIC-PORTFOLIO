import 'express';
import type { JwtPayload } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      file?: Express.Multer.File | undefined;
    }
  }
}

export { };