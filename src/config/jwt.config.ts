import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const access_option = {
  expiresIn: '15m',
};
const refresh_option = {
  expiresIn: '14d',
};

export { secretKey, access_option, refresh_option };
