import { dobbyDB } from './database';

const insertGroup = (group_data) => {
  const { group_id, user_id, title, invite_code } = group_data;
  const insertSQL = `INSERT INTO GROUPS (group_id, user_id,title,invite_code) VALUES\
    ('${group_id}','${user_id}','${title}','${invite_code}')
    `;
  return insertSQL;
};

const selectGroup = (group_id) => {
  const selectSQL = `SELECT * FROM GROUPS WHERE group_id='${group_id}'`;
  return selectSQL;
};

const updateGroup = (group_data) => {
  const { title, group_id } = group_data;
  const updateSQL = `UPDATE GROUPS SET title='${title}' WHERE group_id='${group_id}'`;
  return updateSQL;
};

const deleteGroup = (group_data) => {
  const { group_id, user_id } = group_data;
  const deleteSQL = `DELETE FROM GROUPS WHERE group_id = '${group_id}' AND user_id = '${user_id}'`;
  return deleteSQL;
};

const sqlCommands = {
  insert: insertGroup,
  select: selectGroup,
  update: updateGroup,
  delete: deleteGroup,
};

// GROUPS 테이블
export const GroupsTable = async (sqlSyntax, userinfo) => {
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
