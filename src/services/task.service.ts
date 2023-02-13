import { TaskInterface } from './../interfaces/task/task.interface';
import { TableQuery } from '../models/database';
import { TaskModel } from '../models/tasks.model';

const createTask = async (taskData :string) => {
  const sql = TaskModel.insertTask(taskData);
  const task: any = await TableQuery(sql);
  return task[1][0];
};
const getTask = async (taskData: TaskInterface) => {
  const sql = TaskModel.selectTask(taskData);
  const task: any = await TableQuery(sql);
  return { data: task[0] };
};
const editTask = async (taskData: any) => {
  const sql = TaskModel.updateTask(taskData);
  const task: any = await TableQuery(sql);
  return task[1][0];
};
const deleteTask = async (taskData: TaskInterface) => {
  const sql = TaskModel.deleteTask(taskData);
  const task: any = await TableQuery(sql);
  return task;
};

const createTaskUser = async () => {};
const selectTaskUser = async () => {};
const editTaskUser = async () => {};
const deleteTaskUser = async () => {};

export const TaskService = {
  createTask,
  getTask,
  editTask,
  deleteTask,
};
