import { userTable } from '../models/user.model.js';
import { createAccessToken, createRefreshToken } from '../utils/jwt.util.js';
import { Oauth } from './axios.service.js';

export const postLogin = async (loginUserData) => {
  const { socialId } = await Oauth(loginUserData);
  const runSQL = await userTable('select', socialId);
  const { user_id } = runSQL[0];
  const access_token = await createAccessToken(user_id);
  const refresh_token = await createRefreshToken();
  return { access_token, refresh_token };
};

const postSignup = async (loginUserData) => {
  const userInfo = await Oauth(loginUserData);
  const runSQL = (await userTable('insert', userInfo)) ? true : false;
  return runSQL;
};
