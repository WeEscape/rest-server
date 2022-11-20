const createTask = async (taskTable, taskData) => {
  const runSQL = taskTable('insert', taskData);
  return runSQL[1][0];
};
const getTask = async (taskTable, taskData) => {
  const runSQL = await taskTable('select', taskData);
  return { data: runSQL[0] };
};
const editTask = async (taskTable, taskData) => {
  const runSQL = await taskTable('update', taskData);
  return runSQL[1][0];
};
const deleteTask = async (taskTable, taskData) => {
  const runSQL = await taskTable('delete', taskData);
  return runSQL;
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
