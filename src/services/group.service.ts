import {
  DeleteGroup,
  EditGroup,
  GetGroup,
} from '../interfaces/group/group.interface';
import { TableQuery } from '../models/database';
import { GroupsModel, GroupUsersModel } from '../models/groups.model';

// // 그룹유저
// const createGroupUser = async (groupUesr_data: string) => {
//   const sql = GroupUsersModel.insertGroupUser(groupUesr_data);
//   const groupUser: any = await TableQuery(sql);
//   console.log(groupUser);
//   return groupUser[1][0];
// };

// const getGroupUser = async (groupUesr_data: GetGroup) => {
//   const sql = await GroupUsersModel.selectGroupUser(groupUesr_data);
//   const groupUser: any = await TableQuery(sql);
//   return { data: groupUser[0] };
// };

// const deleteGroupUser = async (groupUesr_data: DeleteGroup) => {
//   const sql = await GroupUsersModel.deleteGroupUser(groupUesr_data);
//   const groupUser: any = await TableQuery(sql);
//   return groupUser;
// };

// export const GroupService = {
//   createGroup,
//   getGroup,
//   editGroup,
//   deleteGroup,
//   createGroupUser,
//   getGroupUser,
//   deleteGroupUser,
// };

export class GroupService {
  async createGroup(groupData: string) {
    const sql = GroupsModel.insertGroup(groupData);
    const group: any = TableQuery(sql);
    return group[1][0];
  }

  async getGroup(groupData: GetGroup) {
    const sql = GroupsModel.selectGroup(groupData);
    const group: any = await TableQuery(sql);
    return { data: group[0] };
  }

  async editGroup(groupData: EditGroup) {
    const sql = GroupsModel.updateGroup(groupData);
    const group: any = await TableQuery(sql);
    return { data: group[0] };
  }

  async deleteGroup(groupData: DeleteGroup) {
    const sql = GroupsModel.deleteGroup(groupData);
    const group: any = await TableQuery(sql);
    return { data: group[0] };
  }
}
