import { v4 } from 'uuid';
import { dobbyDB } from './database.js';

const selectUser = (socialId) => {
  const userSelect = `SELECT * FROM dobby.USERS WHERE social_id='${socialId}';`;
  return userSelect;
};

const insertUser = async (user_data) => {
  const { id, type, nickname, profile_image } = user_data;
  const userInsert = `INSERT INTO USERS(user_id,social_id,social_type,user_name,profile_url) VALUES('${v4()}','${id}','${type}','${nickname}','${profile_image}');`;
  return userInsert;
};

const updateUser = () => {};

const deleteUser = () => {};

const sqlCommands = {
  select: selectUser,
  insert: insertUser,
  update: updateUser,
  delete: deleteUser,
};

export const UsersTable = async (sqlSyntax, userinfo) => {
  const connection = await dobbyDB.getConnection(async (conn) => conn);
  try {
    const sql = await sqlCommands[sqlSyntax](userinfo);
    const resultSets = await connection.query(sql);
    // console.log(res[0]);
    return resultSets[0];
  } catch (err) {
    return err;
  } finally {
    connection.release();
  }
};
