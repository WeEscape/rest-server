import { getDate } from '../utils/getDate.util';
import { createRandomId } from '../utils/randomString.util';

const insertTask = (taskData: any) => {
  const { user_id, category_id } = taskData;
  const insertSQL = `INSERT INTO TASKS (task_id, user_id, category_id, notice_available,title) VALUES\
  ('${createRandomId()}','${user_id}','${category_id}','1');
  `;
  const selectSQL = `SELECT * FROM TASKS WHERE user_id='${user_id}'`;
  return insertSQL + selectSQL;
};

const selectTask = (taskData: any) => {
  const { user_id, task_id } = taskData;
  const selectSQL = `SELECT * FROM TASKS WHERE user_id='${user_id}' AND task_id=${task_id}`;
  return selectSQL;
};

// user_id , task_id 없음
const updateTask = (taskData: any) => {
  const { excute_at, memo, user_id, task_id } = taskData;
  const updateSQL = `UPDATE TASKS SET excute_at=${excute_at} memo=${memo}
  FROM WHERE user_id='${user_id}' AND task_id=${task_id}`;
  return updateSQL;
};

const deleteTask = (taskData: any) => {
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
