import express from 'express';
import { postLogin, postLogout, postSignup } from '../services/auth.service.js';

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

authRouter.post('/logout', async (req,res,next) => {
  const logoutUser_id = req.body;
  const res_logout = await postLogout(logoutUser_id)
  res.send('fg')
  })

export default authRouter;
