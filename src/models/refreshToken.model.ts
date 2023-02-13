import { dobbyDB } from './database';

const selectRefresh_Token = (refreshtoken_data: any) => {
  const { refresh_token } = refreshtoken_data;
  const selectSQL = `SELECT user_id FROM USERS_REFRESH_TOKENS WHERE token='${refresh_token}'`;
  return selectSQL;
};
const selectUser_id = (user_id: any) => {
  const selectSQL = `SELECT user_id FROM USERS_REFRESH_TOKENS WHERE user_id='${user_id}'`;
  return selectSQL;
};
const insertRefresh_Token = (refreshtoken_data: any) => {
  const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
  const insertSQL = `INSERT INTO USERS_REFRESH_TOKENS(user_id,ip,token,expired_at)\
    VALUES('${user_id}','${user_ip}','${refresh_token}','${expiredDate}')`;
  return insertSQL;
};

const updateRefreshToken = (refreshtoken_data: any) => {
  const { user_id, user_ip, refresh_token, expiredDate } = refreshtoken_data;
  const updateSQL = `UPDATE USERS_REFRESH_TOKENS SET\
  token='${refresh_token}', expired_at='${expiredDate}' WHERE user_id='${user_id}'`;
  return updateSQL;
};

export const RefreshTokenModel = {
  selectRefresh_Token,
  selectUser_id,
  updateRefreshToken,
  insertRefresh_Token,
};
