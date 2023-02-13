import { JwtPayload } from 'jsonwebtoken';
import { decodeAccessToken } from './decodeToken.util';

export const checkAccessToken = async (req: any) => {
  const request_header = req.headers['authorization'];
  const access_token = request_header.split(' ')[1];
  const user_id = decodeAccessToken(access_token);

  return user_id;
};
