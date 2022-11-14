import express from 'express';
import { editUserProfile, getUser } from '../services/user.service.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const request_header = req.headers['authorization'];
  if (!request_header)
    return res.status(400).send({ message: 'access_token is not defined' });
  const access_token = request_header.split('Bearer ')[1];
  const userInfo = await getUser(access_token);
  res.send(userInfo);
});

userRouter.put('/', async (req, res) => {
    const update_date = req.body();
    const userInfo = await editUserProfile(update_date);
    res.send(userInfo)
});

export default userRouter;
