import { UsersTable } from '../models/users.model.js';

export const getUser = async (user_id) => {
  const userProfile = await UsersTable('select_userId', user_id);
  return userProfile[0];
};

export const editUserProfile = async (update_date) => {
  const updateInfo = await UsersTable('update', update_date);
  return updateInfo;
};

export const deleteUser = async (user_id) => {
  const successDelete = await UsersTable('delete', user_id);
  return successDelete;
};
