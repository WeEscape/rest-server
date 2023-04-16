import { GroupService } from './../services/group.service';
import { errorHandler } from './../middleware/error.middleware';
import { Request, Response } from 'express';
import { logger } from '../config/logger.config';
import { checkAccessToken } from '../utils/checkHeader.utll';

export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  async createGroup(req: Request, res: Response) {
    try {
      const groupData = req.body;
      const result = await this.groupService.createGroup(groupData);

      return res.status(200).send({ message: 'success!', data: result });
    } catch (err) {
      logger.error(err);

      return errorHandler(err, req, res);
    }
  }

  async getGroup(req: Request, res: Response) {
    try {
      const user_id = await checkAccessToken(req);
      const { group_id } = req.params;
      const groupData = { group_id, user_id };
      const result = await this.groupService.getGroup(groupData);

      if (!result) {
        throw new Error('undefined');
      }

      return res.status(200).send(result);
    } catch (err) {
      logger.error(err);

      return errorHandler(err, req, res);
    }
  }

  async updateGruop(req: Request, res: Response) {
    try {
      const user_id = await checkAccessToken(req);
      const { group_id } = req.params;
      const { title } = req.body;
      if (!user_id) {
        throw new Error('undefined');
      }

      const groupData = { title, group_id, user_id };
      const result = await this.groupService.editGroup(groupData);

      return res.status(200).send(result);
    } catch (err) {
      logger.error(err);

      return errorHandler(err, req, res);
    }
  }

  async deleteGroup(req: Request, res: Response) {
    try {
      const user_id = await checkAccessToken(req);
      const { group_id } = req.params;

      if (!user_id) {
        throw new Error('undefined');
      }

      const groupData = { group_id, user_id };
      await this.groupService.deleteGroup(groupData);

      return res.status(200).send({ message: 'success delete' });
    } catch (err) {
      logger.error(err);

      return errorHandler(err, req, res);
    }
  }
}
