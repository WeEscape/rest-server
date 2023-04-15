import { TableQuery } from '../models/database';
import { UsersModel } from '../models/users.model';

export class UserService {
  async getUser(user_id: string) {
    const sql = UsersModel.selectUserInfo(user_id);
    const user = await TableQuery(sql);
    return user;
  }

  async editUserProfile(update_date: string) {
    const sql = UsersModel.updateProfile(update_date);
    const user = await TableQuery(sql);
    return user;
  }

  async deleteUser(user_id: string) {
    const sql = UsersModel.deleteProfile(user_id);
    const success = await TableQuery(sql);
    return success;
  }
}
