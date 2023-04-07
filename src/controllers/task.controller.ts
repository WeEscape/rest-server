import { logger } from './../config/logger.config';
import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { errorHandler } from '../middleware/error.middleware';
import { checkAccessToken } from '../utils/checkHeader.utll';

class TaskController {
  constructor(private taskService: TaskService) {}

  async createTask(req: Request, res: Response) {
    try {
      logger.info('[POST] /posts - 게시물 생성');
      const taskData = req.body;
      const result = await this.taskService.createTask(taskData);
      return res.status(200).send({ message: 'success!', data: result });
    } catch (err) {
      logger.error(err);
      return errorHandler(err, req, res);
    }
  }

  async getTask(req: Request, res: Response) {
    try {
      logger.info('[GET] /posts - 게시물 조회');
      const user_id = await checkAccessToken(req);
      const { task_id } = req.params;

      const taskData = { task_id, user_id };
      const result = await this.taskService.getTask(taskData);

      if (!result.data) {
        throw new Error('undefined');
      }

      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).send({ message: 'task_id is not defined' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const user_id = await checkAccessToken(req);

      if (!user_id) {
        throw new Error('undefined');
      }

      const taskData = { ...req.params, user_id, ...req.body };
      const result = await this.taskService.editTask(taskData);

      return res.status(200).send({ message: 'success!', data: result });
    } catch (err) {
      return res.status(400).send({ message: 'access_token is not defined' });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const user_id = await checkAccessToken(req);
      const { task_id } = req.params;

      if (!user_id) {
        throw new Error('user_id is undefined');
      }

      const taskData = { task_id, user_id };
      const result = await this.taskService.deleteTask(taskData);
      return res.status(200).send({ message: 'success delete' });
    } catch (err) {
      return res.status(400).send({ message: 'access_token is not defined' });
    }
  }
}

const taskService = new TaskService();
const taskController = new TaskController(taskService);
export default taskController;


