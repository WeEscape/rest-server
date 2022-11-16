import express from 'express';
import {
  login,
  logout,
  signup,
  reissueTokens,
} from '../services/auth.service.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send('helloworldzzzz!'));

authRouter.post('/login', async (req, res, next) => {
  try {
    const loginUserData = req.body;
    console.log(loginUserData);
    const resultLogin = await login(loginUserData);
    return res.status(200).send({ data: resultLogin });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/signup', async (req, res, next) => {
  const socialTokens = req.body;
  const resultsigunup = await signup(socialTokens);
  try {
    return res.status(200).send({ data: resultsigunup });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    const logoutUser_id = req.body;
    const resultLogout = await logout(logoutUser_id);
    return res.status(200).send({ data: resultLogout });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/tokens', async (req, res, next) => {
  try {
    const refreshToken = req.body;
    const resultTokens = await reissueTokens(refreshToken);
    return res.status(200).send({ data: resultTokens });
  } catch (err) {
    next(err);
  }
});

export default authRouter;
