import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';
import { AppError } from './errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.name === 'MongoServerError') {
    return res.status(500).json({
      status: 'error',
      message: 'Database error',
    });
  }

  logger.error(`${req.method} ${req.originalUrl} - NOT CONTROL ERROR - ${err.message}`, err);

  return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
}
