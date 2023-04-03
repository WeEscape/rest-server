import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.config';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
) => {
  logger.error(
    `[${new Date().toISOString()}] Error in ${req.method} ${req.path}: ${
      err.message
    }`,
  );

  return res.status(err.status).send(err.message);
};
