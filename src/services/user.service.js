import { TableQuery } from '../models/database.js';
import { UsersModel } from '../models/users.model.js';

const getUser = async (user_id) => {
  const sql = await UsersModel.selectUserid(user_id);
  const user = await TableQuery(sql);
  return user[0];
};

const editUserProfile = async (update_date) => {
  const sql = await UsersModel.updateProfile(update_date);
  const user = await TableQuery(sql);
  return user;
};

const deleteUser = async (user_id) => {
  const sql = await UsersModel.deleteProfile(user_id);
  const success = await TableQuery(sql);
  return success;
};

export const UserService = {
  getUser,
  editUserProfile,
  deleteUser,
};
