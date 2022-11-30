import { logger } from '../config/logger.config.js';
import { TableQuery } from '../models/database.js';
import { RefreshTokenModel } from '../models/refreshToken.model.js';
import { UsersModel } from '../models/users.model.js';
import { getDate } from '../utils/getDate.util.js';
import { createAccessToken, createRefreshToken } from './/jwt.service.js';
import { Oauth } from './axios.service.js';

// 회원가입
export const signup = async (socialTokens) => {
  const userInfo = await Oauth(socialTokens);
  const sql = await UsersModel.insertUser(userInfo);
  const runSQL = await TableQuery(sql);
  return runSQL;
};

// 로그인
export const login = async (loginUserData) => {
  const { socialId } = await Oauth(loginUserData);
  const sql = await UsersModel.selectUserid(socialId);
  const runSQL = await TableQuery(sql);
  const { user_id } = runSQL[0][0];

  if (!user_id) {
    throw Error('uesr_id not defined');
  }

  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken(user_id);

  return { access_token, refresh_token };
};

// 로그아웃
export const logout = async (logoutUser_id) => {
  const { user_id } = logoutUser_id;
  const connect_Date = getDate();

  if (!user_id) {
    throw new Error('user_id not defined');
  }

  const logoutData = { user_id, connect_Date };

  const sql = await UsersModel.updateConnect(logoutData);
  const runSQL = await TableQuery(sql);

  return runSQL;
};

// 토큰 재발급
export const reissueTokens = async (refreshToken) => {
  const sql = await RefreshTokenModel.selectRefresh_Token(refreshToken);
  const runSQL = await TableQuery(sql);

  if (!runSQL) {
    throw { message: 'refresh_token Not defiend!' };
  }

  const { user_id } = runSQL[0];
  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken(user_id);

  return { access_token, refresh_token };
};
