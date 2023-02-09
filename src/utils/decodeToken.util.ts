import { secretKey } from '../config/jwt.config';

export const decodeAccessToken = async (token) => {
  jwt
  try {
    const jwtDecode = jwt.verify(token, secretKey);
    return jwtDecode;
  } catch (err) {
    return err;
  }
};
