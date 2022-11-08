import express from 'express';
import { postLogin } from '../services/auth.service.js';

const authRouter = express.Router();

authRouter
  .route('/')
  .get((req, res) => res.send('helloworldzzzz!'))
  .post((req, res, next) => {
    const body = req.body;
    console.log(body);
    const login = postLogin(body);
    res.send(login);
  });

export default authRouter;
