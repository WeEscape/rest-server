import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const access_option = {
  expiresIn: '15m',
};
const refresh_option = {
  expiresIn: '14d',
};
export const createJWT = async (data) => {
  const payload = { id: data };
  const access_token = jwt.sign(payload, secretKey, access_option);
  const refresh_token = jwt.sign({}, secretKey, refresh_option);
  return { access_token, refresh_token };
};
