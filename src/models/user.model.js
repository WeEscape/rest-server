import { v4 } from 'uuid';
import { dobbyDB } from './database.js';

export const userTable = async (type, userinfo) => {
  const sqlStatement = {
    select: selectUser,
    insert: insertUser,
    update: updateUser,
    delete: deleteUser,
  };

  const connection = await dobbyDB.getConnection(async (conn) => conn);
  try {
    const sql = await sqlStatement[type](userinfo);
    const resultSets = await connection.query(sql);
    // console.log(res[0]);
    return resultSets[0];
  } catch (err) {
    return err;
  } finally {
    connection.release();
  }
};

const selectUser = (socialId) => {
  const userSelect = `SELECT * FROM dobby.USERS WHERE social_id='${socialId}';`;
  return userSelect;
};

const insertUser = async (data) => {
  const { id, type, nickname, profile_image } = data;
  const userInsert = `INSERT INTO USERS(user_id,social_id,social_type,user_name,profile_url) VALUES('${v4()}','${id}','${type}','${nickname}','${profile_image}');`;
  return userInsert;
};

const updateUser = () => {};

const deleteUser = () => {};
