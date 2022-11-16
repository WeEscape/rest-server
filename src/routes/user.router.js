import express from 'express';
import { decodeAccessToken } from '../services/jwt.service.js';
import {
  deleteUser,
  editUserProfile,
  getUser,
} from '../services/user.service.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('undefined');
    const resultUserInfo = await getUser(user_id);
    return res.send({ data: resultUserInfo });
  } catch (err) {
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

userRouter.put('/', async (req, res, next) => {
  try {
    const update_date = req.body();
    const resultUserInfo = await editUserProfile(update_date);
    return res.send({ data: resultUserInfo });
  } catch (err) {
    next(err);
  }
});

userRouter.delete('/', async (req, res, next) => {
  try {
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('undefined');
    const resultDelete = await deleteUser(user_id);
    return res.send({ message: 'success delete' });
  } catch (err) {
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

export default userRouter;
