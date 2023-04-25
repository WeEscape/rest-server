import { TableQuery } from '../models/database';
import { UsersModel } from '../models/users.model';
import { UserRepository } from '../models/users.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(user_id: string) {
    const result = await this.userRepository.selectUserInfo(user_id);

    return result;
  }

  async editUserProfile(update_date: string) {
    const result = await this.userRepository.updateProfile(update_date);
    return result;
  }

  async deleteUser(user_id: string) {
    const result = await this.userRepository.deleteUserid(user_id);

    return result;
  }
}
