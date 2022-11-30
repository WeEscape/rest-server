import { TableQuery } from '../models/database.js';
import { GroupsModel, GroupUsersModel } from '../models/groups.model.js';

// 그룹
const createGroup = async (groupTable, groupData) => {
  const sql = await GroupsModel.insertGroup(groupData);
  const group = TableQuery(sql);
  return group[1][0];
};

const getGroup = async (groupTable, groupData) => {
  const sql = await GroupsModel.selectGroup(groupData);
  const group = await TableQuery(sql);
  return { data: group[0] };
};

const editGroup = async (groupTable, groupData) => {
  const sql = await GroupsModel.updateGroup(groupData);
  const group = await TableQuery(sql);
  return { data: group[0] };
};

const deleteGroup = async (groupTable, groupData) => {
  const sql = await GroupsModel.deleteGroup(groupData);
  const group = await TableQuery(sql);
  return { data: group[0] };
};

// 그룹유저
const createGroupUser = async (groupsUsersTable, groupUesr_data) => {
  const sql = await GroupUsersModel.insertGroupUser(groupUesr_data);
  const groupUser = await TableQuery(sql);
  console.log(groupUser);
  return groupUser[1][0];
};

const getGroupUser = async (groupsUsersTable, groupUesr_data) => {
  const sql = await GroupUsersModel.selectGroupUser(groupUesr_data);
  const groupUser = await TableQuery(sql);
  return { data: groupUser[0] };
};

const deleteGroupUser = async (groupsUsersTable, groupUesr_data) => {
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
