import { TaskInterface } from './../interfaces/task/task.interface';
import { TaskRepository } from '../models/tasks.repository';

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(taskData: TaskInterface) {
    const result = await this.taskRepository.createTask(taskData);
    return result;
  }

  async getTask(taskData: TaskInterface) {
    const result = await this.taskRepository.selectTask(taskData);
    return { data: result };
  }

  async editTask(taskData: TaskInterface) {
    const result = await this.taskRepository.updateTask(taskData);
    return result;
  }

  async deleteTask(taskData: TaskInterface) {
    const result = await this.taskRepository.deleteTask(taskData);
    return result;
  }
}
