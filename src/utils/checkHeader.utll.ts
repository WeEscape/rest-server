import { decodeAccessToken } from './decodeToken.util';

export const checkAccessToken = async (req) => {
  const request_header = req.headers['authorization'];
  const access_token = request_header.split(' ')[1];
  const { id: user_id } = await decodeAccessToken(access_token);
  return user_id;
};
