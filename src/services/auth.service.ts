import { logger } from '../config/logger.config';
import { TableQuery } from '../models/database';
import { RefreshTokenModel } from '../models/refreshToken.model';
import { UsersModel } from '../models/users.model';
import { getDate } from '../utils/getDate.util';
import { createAccessToken, createRefreshToken } from './jwt.service';
import { Oauth } from './axios.service';

// 회원가입
const signup = async (socialTokens: any) => {
  const userInfo = await Oauth(socialTokens);
  const sql = UsersModel.insertUser(userInfo);
  const runSQL = await TableQuery(sql);
  return runSQL;
};

// 로그인
const login = async (loginUserData: any) => {
  const userInfo: any = await Oauth(loginUserData);
  const { socialId } = userInfo;

  const sql = UsersModel.selectUserid(socialId);
  const loginUser: any = await TableQuery(sql);

  const { user_id } = loginUser[0][0];

  if (!user_id) {
    throw Error('uesr_id not defined');
  }

  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken('user_id');
  return { access_token, refresh_token };
};

// 로그아웃
const logout = async (logoutUser_id: any) => {
  const { user_id } = logoutUser_id;
  const connect_Date = getDate('');

  if (!user_id) {
    throw new Error('user_id not defined');
  }

  const logoutData = { user_id, connect_Date };

  const sql = UsersModel.updateConnect(logoutData);
  const runSQL = await TableQuery(sql);

  return runSQL;
};

// 토큰 재발급
const reissueTokens = async (refreshToken: any) => {
  const sql = RefreshTokenModel.selectRefresh_Token(refreshToken);
  const runSQL: any = await TableQuery(sql);

  if (!runSQL) {
    throw { message: 'refresh_token Not defiend!' };
  }

  const { user_id } = runSQL[0];
  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken(user_id);

  return { access_token, refresh_token };
};

export const AuthService = {
  signup,
  login,
  logout,
  reissueTokens,
};
