import { decodeAccessToken } from './jwt.service.js';
import { UsersTable } from '../models/users.model.js';

export const getUser = async (access_token) => {
  try {
    const decodedInfo = await decodeAccessToken(access_token);
    const { id: user_id } = decodedInfo;
    const userProfile = await UsersTable('select_userId', user_id);
    return userProfile;
  } catch (err) {
    return err;
  }
};

export const editUserProfile = async (update_date) => {
  try {
    const updateInfo = await UsersTable('update', update_date);
    return updateInfo;
  } catch (err) {
    return err;
  }
};

export const deleteUser = async (access_token) => {
  try {
    const decodedInfo = await decodeAccessToken(access_token);
    const { id: user_id } = decodedInfo;
    const successDelete = await UsersTable('delete', user_id);
    return successDelete;
  } catch (err) {
    return err;
  }
};
