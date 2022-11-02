import express from 'express';

const authRouter = express.Router();

authRouter.route('/login').get().post();

export default authRouter;
