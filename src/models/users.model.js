import { createRandomId } from '../utils/uniqueId.util.js';
import { dobbyDB } from './database.js';

const loginUser = (socialId) => {
  const checkSocialid = `SELECT user_id FROM dobby.USERS WHERE social_id='${socialId}';`;
  const loginUpdate = ` UPDATE dobby.USERS SET is_connect='1' WHERE social_id='${socialId}'`;
  return checkSocialid + loginUpdate;
};

const getUserInfo = (user_id) => {
  const userId_Select = `SELECT * FROM dobby.USERS WHERE user_id='${user_id}';`;
  userId_Select;
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
  const profileUpdate = `UPDATE USERS SET\
  user_name=${user_name} profile_url=${profile_url} profile_color=${profile_color}\
   WHERE user_id=${user_id}`;
  return profileUpdate;
};

const logoutUser = (logoutData) => {
  const { connect_Date } = logoutData;
  const logoutUpdate = `UPDATE USERS SET\
  is_connect=${0} last_connected_at=${connect_Date} WHERE user_id=${user_id}
  `;
};

const deleteProfile = (user_id) => {
  const profile_Delete = `DELETE FROM USERS WHERE user_id=${user_id}`;
  const refreshToken_Delete = `DELETE FROM USERS_REFRESH_TOKENS WHERE user_id=${user_id}`;
  return profile_Delete + refreshToken_Delete;
};

const sqlCommands = {
  login: loginUser,
  select_userId: getUserInfo,
  insert_newUser: socialSingup,
  editProfile: updateProfile,
  logout: logoutUser,
  delete: deleteProfile,
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
