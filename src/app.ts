import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes/index.router';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import { appConfig } from './config/app.config';
import helmet from 'helmet';
import { logger } from './config/logger.config';
import groupRouter from './routes/group.router';
import taskRouter from './routes/task.router';
import { AppConfig } from './interfaces/config/app.interface';
import IndexRouter from './routes/index.router';

export class App {
  private app: express.Application;
  private port: AppConfig;
  private indexRouter: IndexRouter;

  constructor() {
    this.app = express();
    this.port = appConfig;
    this.indexRouter = new IndexRouter();
    this.middleware();
    this.routers();
  }

  middleware(): void {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
  }

  /** app router 설정 */
  routers(): void {
    this.app.use('/', this.indexRouter.getRouter());
    this.app.use('/users/profile', userRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/groups', groupRouter);
    this.app.use('/task', taskRouter);
  }

  async serverMain(): Promise<void> {
    this.app.listen(this.port, () =>
      logger.info(`Open Server Port ${process.env.PORT || this.port}`),
    );
  }
}

const serverStart = async (): Promise<void> => {
  const app = new App();
  await app.serverMain();
};

serverStart();
