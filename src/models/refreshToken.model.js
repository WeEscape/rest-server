import { dobbyDB } from './database.js';

const selectRefresh_Token = async (refreshtoken_data) => {
  const { refresh_token } = refreshtoken_data;
  const selectSQL = `SELECT user_id FROM USERS_REFRESH_TOKENS WHERE token='${refresh_token}'`;
  return selectSQL;
};
const selectUser_id = async (user_id) => {
  const selectSQL = `SELECT user_id FROM USERS_REFRESH_TOKENS WHERE user_id='${user_id}'`;
  return selectSQL;
};
const insertRefresh_Token = async (refreshtoken_data) => {
  const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
  const insertSQL = `INSERT INTO USERS_REFRESH_TOKENS(user_id,ip,token,expired_at)\
    VALUES('${user_id}','${user_ip}','${refresh_token}','${expiredDate}')`;
  return insertSQL;
};

const updateRefreshToken = (refreshtoken_data) => {
  const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
  const updateSQL = `UPDATE USERS_REFRESH_TOKENS SET\
  token='${refresh_token}', expired_at='${expiredDate}' WHERE user_id='${user_id}'`;
  return updateSQL;
};

const sqlCommands = {
  checkToken: selectRefresh_Token,
  checkUserid: selectUser_id,
  updateToken: updateRefreshToken,
  insert: insertRefresh_Token,
};

export const RefreshTokenTable = async (sqlSyntax, refreshtoken_data) => {
  const connection = await dobbyDB.getConnection(async (conn) => conn);
  try {
    const sql = await sqlCommands[sqlSyntax](refreshtoken_data);
    await connection.beginTransaction();
    const resultSets = await connection.query(sql);
    await connection.commit();
    console.log(resultSets[0]);
    return resultSets[0];
  } catch (err) {
    await connection.rollback();
    return err;
  } finally {
    connection.release();
  }
};
