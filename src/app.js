import express, { Router } from 'express';
import cors from 'cors';
import router from './routes/index.router.js';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import appConfig from './config/app.config.js';
const app = express();
const { port } = appConfig;

app.use(cors());

app.use('/', router);
app.use('/login', userRouter);
app.use('/user', authRouter);

app.listen(port, () => console.log(`Open Server Port : ${port}`));
