import jwt from 'jsonwebtoken';
import { access_option, refresh_option, secretKey } from '../config/jwt.config.js';

export const createAccessToken = async (user_id) => {
  const payload = { id: user_id };
  const access_token = jwt.sign(payload, secretKey, access_option);
  return access_token;
};
export const createRefreshToken = async () => {
  const refresh_token = jwt.sign({}, secretKey, refresh_option);
  return refresh_token;
};
