import { logger } from './../config/logger.config';
import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { errorHandler } from '../middleware/error.middleware';

class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      logger.info('[POST] /posts - 게시물 생성');
      const taskData = req.body;
      const result = await TaskService.createTask(taskData);
      return res.status(200).send({ message: 'success!', data: result });
    } catch (err) {
      logger.error(err);
      return errorHandler(err, req, res);
    }
  }

  async getTask(req: Request, res: Response) {}
}

const taskController = new TaskController();

export default taskController;
