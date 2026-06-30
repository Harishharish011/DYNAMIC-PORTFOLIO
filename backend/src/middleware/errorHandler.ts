import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err?.statusCode || err?.status || 500;

  // express-validator errors sometimes arrive as an array; normalize to our format
  if (Array.isArray(err?.errors)) {
    return res.status(status).json({
      success: false,
      message: err.message || 'Request failed',
      errors: err.errors,
    });
  }

  // If this is a standard express-validator scenario
  const v = validationResult(_req);
  if (!v.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: v.array(),
    });
  }

  return res.status(status).json({
    success: false,
    message: err?.message || 'Internal Server Error',
    errors: [],
  });
}

