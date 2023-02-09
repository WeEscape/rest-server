import { TableQuery } from '../models/database';
import { GroupsModel, GroupUsersModel } from '../models/groups.model';

// 그룹
const createGroup = async (groupData) => {
  const sql = GroupsModel.insertGroup(groupData);
  const group = TableQuery(sql);
  return group[1][0];
};

const getGroup = async (groupData) => {
  const sql = GroupsModel.selectGroup(groupData);
  const group = await TableQuery(sql);
  return { data: group[0] };
};

const editGroup = async (groupData) => {
  const sql = GroupsModel.updateGroup(groupData);
  const group = await TableQuery(sql);
  return { data: group[0] };
};

const deleteGroup = async (groupData) => {
  const sql = GroupsModel.deleteGroup(groupData);
  const group = await TableQuery(sql);
  return { data: group[0] };
};

// 그룹유저
const createGroupUser = async (groupUesr_data) => {
  const sql = GroupUsersModel.insertGroupUser(groupUesr_data);
  const groupUser = await TableQuery(sql);
  console.log(groupUser);
  return groupUser[1][0];
};

const getGroupUser = async (groupUesr_data) => {
  const sql = await GroupUsersModel.selectGroupUser(groupUesr_data);
  const groupUser = await TableQuery(sql);
  return { data: groupUser[0] };
};

const deleteGroupUser = async (groupUesr_data) => {
  const sql = await GroupUsersModel.deleteGroupUser(groupUesr_data);
  const groupUser = await TableQuery(sql);
  return groupUser;
};

export const GroupService = {
  createGroup,
  getGroup,
  editGroup,
  deleteGroup,
  createGroupUser,
  getGroupUser,
  deleteGroupUser,
};
