import { TableQuery } from '../models/database';
import { TaskModel } from '../models/tasks.model';

const createTask = async (taskTable, taskData) => {
  const sql = await TaskModel.insertTask(taskData);
  const task = await TableQuery(sql);
  return task[1][0];
};
const getTask = async (taskTable, taskData) => {
  const sql = await TaskModel.selectTask(taskData);
  const task = await TableQuery(sql);
  return { data: task[0] };
};
const editTask = async (taskTable, taskData) => {
  const sql = await TaskModel.updateTask(taskData);
  const task = await TableQuery(sql);
  return task[1][0];
};
const deleteTask = async (taskTable, taskData) => {
  const sql = await TaskModel.deleteTask(taskData);
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
