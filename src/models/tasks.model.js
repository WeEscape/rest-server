import { getDate } from '../utils/getDate.util.js';

const insertTask = (taskData) => {
  const { user_id, category_id } = taskData;
  const insertSQL = `INSERT INTO TASKS (task_id, user_id, category_id, notice_available,title) VALUES\
  ('${createRandomId()}','${user_id}','${category_id}','1');
  `;
  const selectSQL = `SELECT * FROM TASKS WHERE user_id='${user_id}'`;
  return insertSQL + selectSQL;
};

const selectTask = (taskData) => {
  const { user_id, task_id } = taskData;
  const selectSQL = `SELECT * FROM TASKS WHERE user_id='${user_id}' AND task_id=${task_id}`;
  return selectSQL;
};

const updateTask = (taskData) => {
  const { excute_at, memo } = taskData;
  const updateSQL = `UPDATE TASKS SET excute_at=${excute_at} memo=${memo}
  FROM WHERE user_id='${user_id}' AND task_id=${task_id}`;
  return updateSQL;
};

const deleteTask = (taskData) => {
  const { user_id, task_id } = taskData;
  const deleteSQL = `DELETE FROM TASKS WHERE task_id = '${task_id}' AND user_id = '${user_id}'`;
  return deleteSQL;
};

const sqlCommands = {
  insert: insertTask,
  select: selectTask,
  update: updateTask,
  delete: deleteTask,
};

export const taskTable = async (sqlSyntax, userinfo) => {
  const connection = await dobbyDB.getConnection(async (conn) => conn);
  try {
    const sql = await sqlCommands[sqlSyntax](userinfo);
    await connection.beginTransaction();
    const resultSets = await connection.query(sql);
    await connection.commit();
    return resultSets[0];
  } catch (err) {
    await connection.rollback();
    return err;
  } finally {
    connection.release();
  }
};
