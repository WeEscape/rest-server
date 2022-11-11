import express from 'express';
import { postLogin } from '../services/auth.service.js';

const authRouter = express.Router();

authRouter
  .route('/')
  .get((req, res) => res.send('helloworldzzzz!'))
  .post(async (req, res, next) => {
    const body = req.body;
    const login = await postLogin(body);
    res.send(login);
  });

export default authRouter;
