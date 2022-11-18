import express from 'express';
import cors from 'cors';
import router from './routes/index.router.js';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import appConfig from './config/app.config.js';
import helmet from 'helmet';
import { logger } from './config/logger.config.js';
import groupRouter from './routes/group.router.js';

const app = express();
const { port } = appConfig;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/', router);
app.use('/users/profile', userRouter);
app.use('/auth', authRouter);
app.use('/groups', groupRouter);

app.use((err, req, res, next) => {
  console.log(err);

  res.status(400).send('err');
});

app.listen(port, () =>
  logger.info(`Open Server Port ${process.env.PORT || port}`),
);
