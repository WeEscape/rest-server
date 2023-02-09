import { TableQuery } from '../models/database';
import { TaskModel } from '../models/tasks.model';

const createTask = async (taskData) => {
  const sql = TaskModel.insertTask(taskData);
  const task = await TableQuery(sql);
  return task[1][0];
};
const getTask = async (taskData) => {
  const sql = TaskModel.selectTask(taskData);
  const task = await TableQuery(sql);
  return { data: task[0] };
};
const editTask = async (taskData) => {
  const sql = TaskModel.updateTask(taskData);
  const task = await TableQuery(sql);
  return task[1][0];
};
const deleteTask = async (taskData) => {
  const sql = TaskModel.deleteTask(taskData);
  const task = await TableQuery(sql);
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
