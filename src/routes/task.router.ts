import express from 'express';
import { logger } from '../config/logger.config.js';
import {
  categoryValidation,
  taskValidation,
} from '../middleware/validation/validation.js';
import { CategoriesService } from '../services/categories.service.js';
import { TaskService } from '../services/task.service.js';
import { checkAccessToken } from '../utils/checkHeader.utll.js';

const taskRouter = express.Router();

// 테스크

taskRouter.post('/', taskValidation.createTask, async (req, res, next) => {
  try {
    const taskData = req.body;
    const result = await TaskService.createTask(taskData);
    return res.status(200).send({ message: 'success!', data: result });
  } catch (err) {
    logger.error(err);
    return res.status(400).send(err);
  }
});

taskRouter.get('/:task_id', taskValidation.readTask, async (req, res, next) => {
  try {
    const user_id = await checkAccessToken(req);
    const { task_id } = req.params;

    const taskData = { task_id, user_id };
    const result = await TaskService.getTask(taskData);

    if (!result.data) {
      throw new Error('undefined');
    }

    return res.status(200).send(result);
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'task_id is not defined' });
  }
});

taskRouter.put(
  '/:task_id',
  taskValidation.updateTask,
  async (req, res, next) => {
    try {
      const user_id = await checkAccessToken(req);

      if (!user_id) {
        throw new Error('undefined');
      }

      const taskData = { ...req.params, user_id, ...req.body };
      const result = await TaskService.editTask(taskData);

      return res.status(200).send({ message: 'success!', data: result });
    } catch (err) {
      next(err);
      return res.status(400).send({ message: 'access_token is not defined' });
    }
  },
);

taskRouter.delete(
  '/:task_id',
  taskValidation.deleteTask,
  async (req, res, next) => {
    try {
      const user_id = await checkAccessToken(req);
      const { task_id } = req.params;

      if (!user_id) {
        throw new Error('user_id is undefined');
      }

      const taskData = { task_id, user_id };
      const result = await TaskService.deleteTask(taskData);
      return res.status(200).send({ message: 'success delete' });
    } catch (err) {
      next(err);
      return res.status(400).send({ message: 'access_token is not defined' });
    }
  },
);

//카테고리
taskRouter.post(
  '/categories',
  categoryValidation.createCategory,
  async (req, res, next) => {
    try {
      const categoryData = req.body;
      const result = await CategoriesService.createCategory(categoryData);

      return res.status(200).send({ message: 'success!', data: result });
    } catch (err) {
      logger.error(err);
      return res.status(400).send(err);
    }
  },
);
taskRouter.get(
  '/categories/:category_id',
  categoryValidation.readCategory,
  async (req, res, next) => {
    try {
      const user_id = await checkAccessToken(req);
      const { category_id } = req.params;

      if (!user_id) {
        throw new Error('user_id is not defined');
      }

      const categoryData = { category_id, user_id };
      const result = await CategoriesService.getCategory(categoryData);

      return res.status(200).send(result);
    } catch (err) {
      next(err);
      return res.status(400).send({ message: 'category_id is notdefined' });
    }
  },
);

taskRouter.put(
  '/categories/:category_id',
  categoryValidation.updateCategory,
  async (req, res, next) => {
    try {
      const user_id = await checkAccessToken(req);
      const { category_id } = req.params;
      const { title } = req.body;

      if (!user_id) {
        throw new Error('user_id is not defined');
      }

      const categoryData = { category_id, user_id, title };
      const result = await CategoriesService.editCategory(categoryData);

      return res.status(200).send({ message: 'success!', data: result });
    } catch (err) {
      next(err);
      return res.status(400).send({ message: 'category_id is notdefined' });
    }
  },
);

taskRouter.delete(
  '/categories/:category_id',
  categoryValidation.deleteCategory,
  async (req, res, next) => {
    try {
      const user_id = await checkAccessToken(req);
      const { category_id } = req.params;

      if (!user_id) {
        throw new Error('user_id is undefined');
      }

      const categoryData = { category_id, user_id };
      const result = await CategoriesService.deleteCategory(categoryData);

      return res.status(200).send({ message: 'success delete' });
    } catch (err) {
      next(err);
      return res.status(400).send({ message: 'access_token is not defined' });
    }
  },
);

export default taskRouter;
