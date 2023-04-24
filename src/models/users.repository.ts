import { DbConnection } from './database';
import { createRandomId } from '../utils/randomString.util';

// const selectUserid = (socialId: any) => {
//   const checkSocialid = `SELECT user_id FROM USERS WHERE social_id='${socialId}';`;
//   const loginUpdate = ` UPDATE USERS SET is_connect='1' WHERE social_id='${socialId}'`;
//   return checkSocialid + loginUpdate;
// };

// const selectUserInfo = (user_id: any) => {
//   const userId_Select = `SELECT * FROM USERS WHERE user_id='${user_id}'`;
//   return userId_Select;
// };

// // 회원가입
// const insertUser = (user_data: any) => {
//   const { socialId, type, user_name, profile_url } = user_data;
//   const userInsert = `INSERT INTO USERS(user_id,social_id,social_type,user_name,profile_url)\
//   VALUES('${createRandomId()}','${socialId}','${type}','${user_name}','${profile_url}');`;
//   return userInsert;
// };

// const updateProfile = (user_data: any) => {
//   const { user_id, user_name, profile_url, profile_color } = user_data;
//   const profileUpdate = `UPDATE USERS SET\
//   user_name=${user_name} profile_url=${profile_url} profile_color=${profile_color}\
//    WHERE user_id=${user_id}`;
//   return profileUpdate;
// };

// const updateConnect = (logout_Data: any) => {
//   const { connect_Date, user_id } = logout_Data;
//   const logoutUpdate = `UPDATE USERS SET\
//   is_connect=0 last_connected_at=${connect_Date} WHERE user_id=${user_id}
//   `;
// };

// const deleteProfile = (user_id: any) => {
//   const profile_Delete = `DELETE FROM USERS WHERE user_id='${user_id}';`;
//   const refreshToken_Delete = `DELETE FROM USERS_REFRESH_TOKENS WHERE user_id='${user_id}'`;
//   return profile_Delete + refreshToken_Delete;
// };

// export const UsersModel = {
//   selectUserid,
//   selectUserInfo,
//   insertUser,
//   updateProfile,
//   updateConnect,
//   deleteProfile,
// };

export class UserRepository {
  private dbConnection: DbConnection;

  constructor() {
    this.dbConnection = new DbConnection();
  }

  async createUser(user_data: any) {
    const { socialId, type, user_name, profile_url } = user_data;
    const sql =
      'INSERT INTO USERS(user_id,social_id,social_type,user_name,profile_url) VALUES (?, ?, ?, ?)';
    const params = [createRandomId(), socialId, type, user_name, profile_url];
    const result = await this.dbConnection.execute(sql, params);

    return result;
  }

  async selectUserInfo(user_id: any) {
    const sql = 'SELECT * FROM USERS WHERE user_id=?';
    const params = [user_id];

    const result = await this.dbConnection.execute(sql, params);

    return result;
  }

  async selectUserid(socialId: any) {
    const sql = 'SELECT user_id FROM USERS WHERE social_id=?';
    const params = [socialId];

    const result = await this.dbConnection.execute(sql, params);
    return result;
  }

  async updateProfile(user_data: any) {
    const { user_id, user_name, profile_url, profile_color } = user_data;

    const sql =
      'UPDATE USERS SET user_name = ? profile_url = ? profile_color = ? WHERE user_id = ?';
    const params = [user_id, user_name, profile_url, profile_color];
    const result = await this.dbConnection.execute(sql, params);

    return result;
  }

  async updateConnect(logout_Data: any) {
    const { connect_Date, user_id } = logout_Data;

    const sql =
      'UPDATE USERS SET is_connect = ? last_connected_at = ? WHERE user_id = ?';
    const params = [connect_Date, user_id];

    const result = await this.dbConnection.execute(sql, params);

    return result;
  }

  async deleteUserid(user_id: any) {
    const sql = `DELETE FROM USERS WHERE user_id='${user_id}';`;
    const params = [user_id];
    const result = await this.dbConnection.execute(sql, params);

    return result;
  }

  async deleteRefreshToken(user_id: any) {
    const sql = 'DELETE FROM USERS_REFRESH_TOKENS WHERE user_id=?';
    const params = [user_id];
    const result = await this.dbConnection.execute(sql, params);

    return result;
  }
}
