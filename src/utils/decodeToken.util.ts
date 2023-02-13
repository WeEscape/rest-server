import jwt from 'jsonwebtoken';
import { secretKey } from '../config/jwt.config';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    user_id: string;
  }
}

export const decodeAccessToken = (token: string) => {
  const { user_id } = <jwt.UserIDJwtPayload>jwt.verify(token, secretKey!);
  return user_id;
};
