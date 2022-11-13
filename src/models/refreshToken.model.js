import { dobbyDB } from './database.js';

const selectRefresh_Token = async (refreshtoken_data) => {
  const { refresh_token } = refreshtoken_data;
  const selectSQL = `SELECT user_id,expired_at FROM dobby.USERS_REFRESH_TOKENS WHERE token='${refresh_token}'`;
  return selectSQL;
};
const insertRefresh_Token = async (refreshtoken_data) => {
  const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
  const insertSQL = `INSERT INTO USERS_REFRESH_TOKENS(user_id,ip,token,expired_at)\
    VALUES('${user_id}','${user_ip}','${refresh_token}','${expiredDate}')`;
  return insertSQL;
};

const sqlCommands = {
  select: selectRefresh_Token,
  insert: insertRefresh_Token,
};

export const RefreshTokenTable = async (sqlSyntax, refreshtoken_data) => {
  const connection = await dobbyDB.getConnection(async (conn) => conn);
  try {
    const sql = await sqlCommands[sqlSyntax](refreshtoken_data);
    const resultSets = await connection.query(sql);
    return resultSets[0];
  } catch (err) {
    return err;
  } finally {
    connection.release();
  }
};
