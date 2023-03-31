import express, { Router, Request, Response } from 'express';
import { logger } from '../config/logger.config';

class IndexRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
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

export default IndexRouter;
