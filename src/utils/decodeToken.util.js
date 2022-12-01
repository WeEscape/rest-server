import { secretKey } from '../config/jwt.config.js';

export const decodeAccessToken = async (token) => {
  try {
    const jwtDecode = jwt.verify(token, secretKey);
    return jwtDecode;
  } catch (err) {
    return err;
  }
};
