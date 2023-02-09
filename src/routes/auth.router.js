import express from 'express';
import { body } from 'express-validator';
import { authValidation } from '../middleware/validation/validation.js';
import { AuthService } from '../services/auth.service.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send(''));

authRouter.post('/login', authValidation.login, async (req, res, next) => {
  try {
    const loginUserData = req.body;
    const resultLogin = await AuthService.login(loginUserData);

    return res.status(200).send();
  } catch (err) {
    next(err);
  }
});

authRouter.post('/signup', authValidation.signup, async (req, res, next) => {
  try {
    const socialTokens = req.body;
    const resultsigunup = await AuthService.signup(socialTokens);
    return res.status(200).send({ data: resultsigunup });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/logout', authValidation.logout, async (req, res, next) => {
  try {
    const logoutUser_id = req.body;
    const resultLogout = await AuthService.logout(logoutUser_id);
    return res.status(200).send({ data: resultLogout });
  } catch (err) {
    next(err);
  }
});

authRouter.post(
  '/tokens',
  authValidation.refreshToken,
  async (req, res, next) => {
    try {
      const refreshToken = req.body;
      const resultTokens = await AuthService.reissueTokens(refreshToken);
      return res.status(200).send({ data: resultTokens });
    } catch (err) {
      next(err);
    }
  },
);

export default authRouter;
