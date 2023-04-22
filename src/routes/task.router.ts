import { TaskRepository } from './../models/tasks.model';
import express, { Request, Response, NextFunction, Router } from 'express';
import { logger } from '../config/logger.config';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';

class TaskRouter {
  router: Router = Router();
  taskController: TaskController;

  constructor() {
    const taskRepository = new TaskRepository();
    const taskService = new TaskService(taskRepository);
    this.taskController = new TaskController(taskService);
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/:task_id', this.taskController.getTask);
    this.router.post('/', this.taskController.createTask);
    this.router.put('/:task_id', this.taskController.updateTask);
    this.router.delete('/:task_id', this.taskController.deleteTask);
  }
}

const taskRouter = new TaskRouter();

export default taskRouter.router;
