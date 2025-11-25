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

  logger.error(`${req.method} ${req.originalUrl} - NOT CONTROL ERROR - ${err.message}`);

  // logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  // res.status(500).json({ error: 'Internal Server Error' });
  return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
}
