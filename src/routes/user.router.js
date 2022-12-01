import express from 'express';
import { userValidation } from '../middleware/validation/validation.js';
import { UserService } from '../services/user.service.js';
import { checkAccessToken } from '../utils/checkHeader.utll.js';

const userRouter = express.Router();

userRouter.get('/', userValidation.readUser, async (req, res, next) => {
  try {
    const user_id = await checkAccessToken(req);

    if (!user_id) {
      throw new Error('undefined');
    }

    const resultUserInfo = await UserService.getUser(user_id);

    return res.status(200).send({ data: resultUserInfo });
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

userRouter.put('/', userValidation.updateUser, async (req, res, next) => {
  try {
    const update_date = req.body();
    const resultUserInfo = await UserService.editUserProfile(update_date);
    return res.status(200).send({ data: resultUserInfo });
  } catch (err) {
    next(err);
    return res.status(400).send({ message: err });
  }
});

userRouter.delete('/', userValidation.deleteUser, async (req, res, next) => {
  try {
    const user_id = await checkAccessToken(req);

    if (!user_id) {
      throw new Error('undefined');
    }

    const resultDelete = await UserService.deleteUser(user_id);

    return res.status(200).send({ message: 'success delete' });
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

export default userRouter;
