import { dobbyDB } from './database.js';
import {
  createInviteCode,
  createRandomId,
} from '../utils/randomString.util.js';

const insertGroup = (group_data) => {
  const { user_id, title } = group_data;
  const insertSQL = `INSERT INTO GROUPS (group_id, user_id,title,invite_code) VALUES\
    ('${createRandomId()}','${user_id}','${title}','${createInviteCode()}');`;
  const selectSQL = `SELECT * FROM GROUPS WHERE  user_id='${user_id}'`;
  return insertSQL + selectSQL;
};

const selectGroup = (group_data) => {
  const { group_id, user_id } = group_data;
  const selectSQL = `SELECT * FROM GROUPS WHERE group_id='${group_id}' AND user_id='${user_id}'`;
  return selectSQL;
};

const updateGroup = (groupData) => {
  const { title, group_id } = groupData;
  const updateSQL = `UPDATE GROUPS SET title='${title}' WHERE group_id='${group_id}'`;
  return updateSQL;
};

const deleteGroup = (groupData) => {
  const { group_id, user_id } = groupData;
  const deleteSQL = `DELETE t1, t2 FROM GROUPS t1 LEFT JOIN GROUPS_USERS t2 ON t1.user_id = t2.user_id\
  WHERE t1.group_id = '${group_id}' AND t1.user_id = '${user_id}' ;`;

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
