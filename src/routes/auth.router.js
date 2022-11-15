import express from 'express';
import { postLogin, postLogout, postSignup } from '../services/auth.service.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send('helloworldzzzz!'));

authRouter.post('/login', async (req, res, next) => {
  try {
    const loginUserData = req.body;
    const res_login = await postLogin(loginUserData);
    res.status(200).send(res_login);
  } catch(err) {
    next(err);
  }
});

authRouter.post('/signup', async (req, res, next) => {
  const socialTokens = req.body;
  const res_sigunup = await postSignup(socialTokens);
  try {
    res.status(200).send({ message: 'success login', status: 200 });
  } catch(err) {
    next(err);
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    const logoutUser_id = req.body;
    const res_logout = await postLogout(logoutUser_id);
    res.status(200).send({message: 'success logout', status: 200 });
  } catch(err) {
    next(err);
  }
});

authRouter.post('/tokens', async (req, res, next) => {
  const refreshToken = req.body;
});

export default authRouter;
