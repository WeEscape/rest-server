import { UsersTable } from '../models/users.model.js';
import { getDate } from '../utils/getDate.util.js';
import { createAccessToken, createRefreshToken } from './/jwt.service.js';
import { Oauth } from './axios.service.js';

export const postLogin = async (loginUserData) => {
  const { socialId } = await Oauth(loginUserData);
  const runSQL = await UsersTable('login', socialId);
  const { user_id } = runSQL[0][0];
  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken(user_id);
  return { access_token, refresh_token };
};

export const postSignup = async (socialTokens) => {
  const userInfo = await Oauth(socialTokens);
  const runSQL = await UsersTable('insert_newUser', userInfo);
  return runSQL;
};

export const postLogout = async (logoutUser_id) => {
  const { user_id } = logoutUser_id;
  const connect_Date = getDate();
  const logoutData = { user_id, connect_Date };
  const runSQL = await UsersTable('editProfile', logoutData);
  return runSQL;
};
