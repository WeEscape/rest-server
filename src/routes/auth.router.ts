import { AuthController } from './../controllers/auth.controller';
import express, { Request, Response, NextFunction, Router } from 'express';
import { authValidation } from '../middleware/validation/validation';
import { AuthService } from '../services/auth.service';

class AuthRouter {
  router: Router = Router();
  authController: AuthController;

  constructor() {
    const authService = new AuthService();
    this.authController = new AuthController(authService);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/signup', this.authController.signup);
    this.router.post('/login', this.authController.login);
    this.router.post('/logout', this.authController.logout);
    this.router.post('/tokens', this.authController.reissueToken);
  }
}

const authRouter = new AuthRouter();

export default authRouter.router;
