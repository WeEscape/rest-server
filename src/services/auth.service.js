import axios from 'axios';
import { createJWT } from '../config/jwt.config.js';
import { userTable } from '../models/user.model.js';
import { Oauth } from './axios.service.js';

export const postLogin = async (data) => {
  const { id } = await Oauth(data);
  const runSQL = await userTable('select', id);
  const { user_id } = runSQL[0];
  const Token = await createJWT(user_id);
  return Token;
};

const postSignup = async (data) => {
  const userInfo = await Oauth(data);
  const runSQL = (await userTable('insert', userInfo)) ? true : false;
  return runSQL;
};
