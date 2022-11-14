import express from 'express';
import { postLogin, postSignup } from '../services/auth.service.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send('helloworldzzzz!'));

authRouter.post('/login', async (req, res, next) => {
  const loginUserData = req.body;
  const res_login = await postLogin(loginUserData);
  res.send(res_login);
});

authRouter.post('/signup', async (req, res, next) => {
  const socialTokens = req.body;
  const res_sigunup = await postSignup(socialTokens);
  try {
    res.status(200).send({ message: 'success', status: 200 });
  } catch {
    res.status(400).send({ message: 'falid', status: 400 });
  }
});

export default authRouter;
