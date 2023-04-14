import { TaskInterface } from './../interfaces/task/task.interface';
import { TableQuery } from '../models/database';
import { TaskModel } from '../models/tasks.model';

export class TaskService {
  async createTask(taskData: TaskInterface) {
    const sql = TaskModel.insertTask(taskData);
    const task: any = await TableQuery(sql);
    return task[1][0];
  }

  async getTask(taskData: TaskInterface) {
    const sql = TaskModel.selectTask(taskData);
    const task: any = await TableQuery(sql);
    return { data: task[0] };
  }

  async editTask(taskData: TaskInterface) {
    const sql = TaskModel.updateTask(taskData);
    const task: any = await TableQuery(sql);
    return task[1][0];
  }

  async deleteTask(taskData: TaskInterface) {
    const sql = TaskModel.deleteTask(taskData);
    const task: any = await TableQuery(sql);
    return task;
  }
}
