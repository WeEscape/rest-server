import { Request, Response } from 'express';
import { logger } from '../config/logger.config';
import { UserService } from '../services/user.service';
import { checkAccessToken } from '../utils/checkHeader.utll';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUser(req: Request, res: Response) {
    try {
      logger.info('[GET] /user - 회원조회 ');
      const user_id = await checkAccessToken(req);

      if (!user_id) {
        throw new Error('undefined');
      }

      const resultUserInfo = await this.userService.getUser(user_id);

      return res.status(200).send({ data: resultUserInfo });
    } catch (err) {
      logger.error(err);

      return res.status(400).send({ message: 'access_token is not defined' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      logger.info('[PUT] /user - 회원수정 ');

      const update_date = req.body();
      const resultUserInfo = await this.userService.editUserProfile(
        update_date,
      );

      return res.status(200).send({ data: resultUserInfo });
    } catch (err) {
      logger.error(err);

      return res.status(400).send({ message: err });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      logger.info('[DELETE] /delete - 회원조회 ');
      const user_id = await checkAccessToken(req);

      if (!user_id) {
        throw new Error('undefined');
      }

      const resultDelete = await this.userService.deleteUser(user_id);

      return res.status(200).send({ message: 'success delete' });
    } catch (err) {
      logger.error(err);

      return res.status(400).send({ message: 'access_token is not defined' });
    }
  }
}
