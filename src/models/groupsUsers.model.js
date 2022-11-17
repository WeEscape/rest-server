import { dobbyDB } from './database';

const insertGroupUser = (groupUser_data) => {
  const { group_id, user_id } = groupUser_data;
  const insertSQL = `INSERT INTO GROUPS (group_id, user_id) VALUES ('${group_id}','${user_id}')`;
  return insertSQL;
};
const selectGroupUser = (group_id) => {
  const selectSQL = `SELECT * FROM GROUPS WHERE group_id='${group_id}'`;
  return selectSQL;
};
const deleteGroupUser = (groupUser_data) => {
  const { group_id, user_id } = groupUser_data;
  const deleteSQL = `DELETE FROM GROUPS WHERE group_id = '${group_id}' AND user_id = '${user_id}'`;
  return deleteSQL;
};

const sqlCommands = {
  insert: insertGroupUser,
  select: selectGroupUser,
  delete: deleteGroupUser,
};

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
