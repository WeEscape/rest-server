import { TableQuery } from '../models/database';
import { UsersModel } from '../models/users.model';

const getUser = async (user_id) => {
  const sql = UsersModel.selectUserInfo(user_id);
  const user = await TableQuery(sql);
  return user[0];
};

const editUserProfile = async (update_date) => {
  const sql = UsersModel.updateProfile(update_date);
  const user = await TableQuery(sql);
  return user;
};

const deleteUser = async (user_id) => {
  const sql = UsersModel.deleteProfile(user_id);
  const success = await TableQuery(sql);
  return success;
};

export const UserService = {
  getUser,
  editUserProfile,
  deleteUser,
};
