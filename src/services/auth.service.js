import { UsersTable } from '../models/user.model.js';
import { createAccessToken, createRefreshToken } from './/jwt.service.js';
import { Oauth } from './axios.service.js';

export const postLogin = async (loginUserData) => {
  const { socialId } = await Oauth(loginUserData);
  const runSQL = await UsersTable('select', socialId);
  const { user_id } = runSQL[0];
  if (!user_id) throw err;
  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken(user_id);
  return { access_token, refresh_token };
};

const postSignup = async (loginUserData) => {
  const userInfo = await Oauth(loginUserData);
  const runSQL = (await UsersTable('insert', userInfo)) ? true : false;
  return runSQL;
};
