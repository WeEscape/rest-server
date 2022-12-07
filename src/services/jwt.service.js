import jwt from 'jsonwebtoken';
import {
  access_option,
  refresh_option,
  secretKey,
} from '../config/jwt.config.js';
import { TableQuery } from '../models/database.js';
import { RefreshTokenModel } from '../models/refreshToken.model.js';
import { getDate } from '../utils/getDate.util.js';

export const createAccessToken = async (user_id) => {
  const payload = { id: user_id };
  const access_token = jwt.sign(payload, secretKey, access_option);
  return access_token;
};

export const createRefreshToken = async (user_id) => {
  const selectSQL = RefreshTokenModel.selectUser_id(user_id);
  const checkRefreshToken = await TableQuery(selectSQL);

  const refresh_token = jwt.sign({}, secretKey, refresh_option);
  const expiredDate = await getDate('expired');
  const user_ip = '123.456.789';
  const refreshtoken_data = { user_id, user_ip, refresh_token, expiredDate };

  if (!checkRefreshToken[0]) {
    const insertSQL = RefreshTokenModel.insertRefresh_Token(refreshtoken_data);
    await TableQuery(insertSQL);
  }

  return refresh_token;
};
