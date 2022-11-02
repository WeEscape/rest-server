import express from 'express';

const userRouter = express.Router();

userRouter.route('/user').get().post();

export default userRouter;
