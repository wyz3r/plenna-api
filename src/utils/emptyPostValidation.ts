import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors/errors';

export function emptyPostValidation(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line prettier/prettier
  if (req.method === 'POST') {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ValidationError('Body cannot be empty in POST requests');
    }
  }
  next();
}
