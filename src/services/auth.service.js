import { RefreshTokenTable } from '../models/refreshToken.model.js';
import { UsersTable } from '../models/users.model.js';
import { getDate } from '../utils/getDate.util.js';
import { createAccessToken, createRefreshToken } from './/jwt.service.js';
import { Oauth } from './axios.service.js';

// 회원가입
export const postSignup = async (socialTokens) => {
  const userInfo = await Oauth(socialTokens);
  const runSQL = await UsersTable('insert_newUser', userInfo);
  return runSQL;
};

// 로그인
export const postLogin = async (loginUserData) => {
  const { socialId } = await Oauth(loginUserData);
  const runSQL = await UsersTable('login', socialId);
  const { user_id } = runSQL[0][0];

  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken(user_id);
  return { access_token, refresh_token };
};

// 로그아웃
export const postLogout = async (logoutUser_id) => {
  const { user_id } = logoutUser_id;
  if(!user_id) throw new Error('user_id not defined');
  const connect_Date = getDate();
  const logoutData = { user_id, connect_Date };
  const runSQL = await UsersTable('editProfile', logoutData);
  return runSQL;
};

// 토큰 재발급
export const reissueTokens = async (refreshToken) => {
  const runSQL = RefreshTokenTable('checkToken', refreshToken);
  if (!runSQL) throw { message: 'refresh_token Not defiend!' };
  const { user_id } = runSQL[0];
  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken(user_id);
  return { access_token, refresh_token };
};
