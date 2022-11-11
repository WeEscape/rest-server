import express from 'express';
import { postLogin } from '../services/auth.service.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send('helloworldzzzz!'));

authRouter.post('/', async (req, res, next) => {
  const loginUserData = req.body;
  const res_login = await postLogin(loginUserData);
  res.send(res_login);
});

export default authRouter;
