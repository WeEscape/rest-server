import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes/index.router';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import appConfig from './config/app.config';
import helmet from 'helmet';
import { logger } from './config/logger.config';
import groupRouter from './routes/group.router';
import taskRouter from './routes/task.router';

const app = express();
const { port } = appConfig;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/', router);
app.use('/users/profile', userRouter);
app.use('/auth', authRouter);
app.use('/groups', groupRouter);
app.use('/task', taskRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(400).send('err');
});

app.listen(port, () =>
  logger.info(`Open Server Port ${process.env.PORT || port}`),
);
