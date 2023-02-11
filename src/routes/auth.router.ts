import express, { Request, Response, NextFunction } from 'express';
import { authValidation } from '../middleware/validation/validation';
import { AuthService } from '../services/auth.service';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send(''));

authRouter.post(
  '/login',
  authValidation.login,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUserData = req.body;
      const resultLogin = await AuthService.login(loginUserData);

      return res.status(200).send();
    } catch (err: any) {
      next(err);
    }
  },
);

authRouter.post(
  '/signup',
  authValidation.signup,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const socialTokens = req.body;
      const resultsigunup = await AuthService.signup(socialTokens);
      return res.status(200).send({ data: resultsigunup });
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post(
  '/logout',
  authValidation.logout,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logoutUser_id = req.body;
      const resultLogout = await AuthService.logout(logoutUser_id);
      return res.status(200).send({ data: resultLogout });
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post(
  '/tokens',
  authValidation.refreshToken,
  async (req: Request, res: Response, next: NextFunction) => {
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
