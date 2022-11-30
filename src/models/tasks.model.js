import { getDate } from '../utils/getDate.util.js';

const insertTask = async (taskData) => {
  const { user_id, category_id } = taskData;
  const insertSQL = `INSERT INTO TASKS (task_id, user_id, category_id, notice_available,title) VALUES\
  ('${createRandomId()}','${user_id}','${category_id}','1');
  `;
  const selectSQL = `SELECT * FROM TASKS WHERE user_id='${user_id}'`;
  return insertSQL + selectSQL;
};

const selectTask = async (taskData) => {
  const { user_id, task_id } = taskData;
  const selectSQL = `SELECT * FROM TASKS WHERE user_id='${user_id}' AND task_id=${task_id}`;
  return selectSQL;
};

const updateTask = async (taskData) => {
  const { excute_at, memo } = taskData;
  const updateSQL = `UPDATE TASKS SET excute_at=${excute_at} memo=${memo}
  FROM WHERE user_id='${user_id}' AND task_id=${task_id}`;
  return updateSQL;
};

const deleteTask = async (taskData) => {
  const { user_id, task_id } = taskData;
  const deleteSQL = `DELETE FROM TASKS WHERE task_id = '${task_id}' AND user_id = '${user_id}'`;
  return deleteSQL;
};

export const TaskModel = {
  insertTask,
  selectTask,
  updateTask,
  deleteTask,
};
