import { AuthRepository } from '../models/refreshToken.repository';
import { UserRepository } from '../models/users.repository';
import { AuthController } from './../controllers/auth.controller';
import express, { Request, Response, NextFunction, Router } from 'express';
import { authValidation } from '../middleware/validation/validation';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

class AuthRouter {
  router: Router = Router();
  authController: AuthController;

  constructor() {
    const userRepository = new UserRepository();
    const authRepository = new AuthRepository();
    const jwtService = new JwtService(authRepository);
    const authService = new AuthService(
      userRepository,
      authRepository,
      jwtService,
    );
    
    this.authController = new AuthController();
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
