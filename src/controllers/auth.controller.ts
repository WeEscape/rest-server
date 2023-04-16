import { Request, Response } from 'express';
import { errorHandler } from '../middleware/error.middleware';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const loginUserData = req.body;
      const resultLogin = await this.authService.login(loginUserData);

      return res.status(200).send();
    } catch (err: any) {
      return errorHandler(err, req, res);
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const socialTokens = req.body;
      const resultsigunup = await this.authService.signup(socialTokens);

      return res.status(200).send({ data: resultsigunup });
    } catch (err) {
      return errorHandler(err, req, res);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const logoutUser_id = req.body;
      const resultLogout = await this.authService.logout(logoutUser_id);

      return res.status(200).send({ data: resultLogout });
    } catch (err) {
      return errorHandler(err, req, res);
    }
  }

  async reissueToken(req: Request, res: Response) {
    try {
      const refreshToken = req.body;
      const resultTokens = await this.authService.reissueTokens(refreshToken);

      return res.status(200).send({ data: resultTokens });
    } catch (err) {
      return errorHandler(err, req, res);
    }
  }
}
