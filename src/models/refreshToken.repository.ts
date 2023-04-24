import { DbConnection } from './database';

// const selectRefresh_Token = (refreshtoken_data: any) => {
//   const { refresh_token } = refreshtoken_data;
//   const selectSQL = `SELECT user_id FROM USERS_REFRESH_TOKENS WHERE token='${refresh_token}'`;
//   return selectSQL;
// };
// const selectUser_id = (user_id: any) => {
//   const selectSQL = `SELECT user_id FROM USERS_REFRESH_TOKENS WHERE user_id='${user_id}'`;
//   return selectSQL;
// };
// const insertRefresh_Token = (refreshtoken_data: any) => {
//   const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
//   const insertSQL = `INSERT INTO USERS_REFRESH_TOKENS(user_id,ip,token,expired_at)\
//     VALUES('${user_id}','${user_ip}','${refresh_token}','${expiredDate}')`;
//   return insertSQL;
// };

// const updateRefreshToken = (refreshtoken_data: any) => {
//   const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
//   const updateSQL = `UPDATE USERS_REFRESH_TOKENS SET\
//   token='${refresh_token}', expired_at='${expiredDate}' WHERE user_id='${user_id}'`;
//   return updateSQL;
// };

// export const RefreshTokenModel = {
//   selectRefresh_Token,
//   selectUser_id,
//   updateRefreshToken,
//   insertRefresh_Token,
// };

export class AuthRepository {
  private dbConnection: DbConnection;

  constructor() {
    this.dbConnection = new DbConnection();
  }

  async selectRefresh_Token(refreshtoken_data: any) {
    const { refresh_token } = refreshtoken_data;
    const sql = 'SELECT user_id FROM USERS_REFRESH_TOKENS WHERE token=?';
    const params = [refresh_token];

    const result = await this.dbConnection.execute(sql, params);
    return result;
  }

  async loginUpdate(socialId: any) {
    const sql = ` UPDATE USERS SET is_connect='1' WHERE social_id=?`;
    const params = [];
  }

  async selectUser_id(user_id: any) {
    const sql = 'SELECT user_id FROM USERS_REFRESH_TOKENS WHERE user_id=?';
    const params = [user_id];

    const result = await this.dbConnection.execute(sql, params);
    return result;
  }

  async insertRefresh_Token(refreshtoken_data: any) {
    const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;

    const sql =
      'INSERT INTO USERS_REFRESH_TOKENS(user_id,ip,token,expired_at) VALUES(?,?,?,?)';
    const params = [user_id, user_ip, refresh_token, expiredDate];
    const result = await this.dbConnection.execute(sql, params);

    return result;
  }

  async updateRefreshToken(refreshtoken_data: any) {
    const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
    const sql = `UPDATE USERS_REFRESH_TOKENS SET token=? , expired_at=? WHERE user_id=?'`;
    const params = [refresh_token, expiredDate, user_id];
    const result = await this.dbConnection.execute(sql, params);
    return result;
  }
}
