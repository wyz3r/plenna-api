import { ZodType } from 'zod';
import { RequestHandler } from 'express';
import { logger } from './logger';

type ReqProperty = 'body' | 'params' | 'query';

export const validate =
  <T, P extends ReqProperty>(schema: ZodType<T>, property: P): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
      logger.error('invalid ', JSON.stringify(result.error.issues));
      return res.status(400).json({
        message: 'Invalid Data',
        errors: result.error.issues,
      });
    }

    Object.assign(req[property], result.data);

    next();
  };
