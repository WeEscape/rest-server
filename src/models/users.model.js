import { createRandomId } from '../utils/uniqueId.util.js';
import { dobbyDB } from './database.js';

const checkSignup = (socialId) => {
  const socialId_Select = `SELECT * FROM dobby.USERS WHERE social_id='${socialId}';`;
  return socialId_Select;
};

const getUserInfo = (userId) => {
  const userId_Select = `SELECT * FROM dobby.USERS WHERE user_id='${userId}';`;
  return userId_Select;
};

const socialSingup = (user_data) => {
  const { socialId, type, user_name, profile_url } = user_data;
  const userInsert = `INSERT INTO USERS(user_id,social_id,social_type,user_name,profile_url)\ 
  VALUES('${createRandomId()}','${socialId}','${type}','${user_name}','${profile_url}');`;
  return userInsert;
};

const updateProfile = (user_data) => {
  const { user_id, user_name, profile_url, profile_color } = user_data;
  const user_Update = `UPDATE USERS SET\
  user_name=${user_name} profile_url=${profile_url} profile_color=${profile_color}\
   WHERE user_id=${user_id}`;
  return user_Update;
};

const deleteUser = () => {};

const sqlCommands = {
  select_socialId: checkSignup,
  select_userId: getUserInfo,
  insert_newUser: socialSingup,
  update: updateProfile,
  delete: deleteUser,
};

// USERS 테이블
export const UsersTable = async (sqlSyntax, userinfo) => {
  const connection = await dobbyDB.getConnection(async (conn) => conn);
  // const VALUES = Object.values(userinfo);
  try {
    const sql = await sqlCommands[sqlSyntax](userinfo);
    const resultSets = await connection.query(sql);
    return resultSets[0];
  } catch (err) {
    return err;
  } finally {
    connection.release();
  }
};
