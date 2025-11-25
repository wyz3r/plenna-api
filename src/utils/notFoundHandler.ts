import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from './errors/errors';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(new NotFoundError(`PATH NOT FOUND: ${req.originalUrl}`));
}
