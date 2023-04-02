import express, { Router, Request, Response } from 'express';
import { logger } from '../config/logger.config';

class IndexRouter {
  router: Router = Router();

  constructor() {
    this.getRouter();
  }

  public getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      logger.info('GET /');
      return res.send('hello world!');
    });
    return this.router;
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.router;
