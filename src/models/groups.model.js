import {
  createInviteCode,
  createRandomId,
} from '../utils/randomString.util.js';

const insertGroup = async (group_data) => {
  const { user_id, title } = group_data;
  const insertSQL = `INSERT INTO GROUPS (group_id, user_id,title,invite_code) VALUES\
    ('${createRandomId()}','${user_id}','${title}','${createInviteCode()}');`;
  const selectSQL = `SELECT * FROM GROUPS WHERE  user_id='${user_id}'`;
  return insertSQL + selectSQL;
};

const selectGroup = async (group_data) => {
  const { group_id, user_id } = group_data;
  const selectSQL = `SELECT * FROM GROUPS WHERE group_id='${group_id}' AND user_id='${user_id}'`;
  return selectSQL;
};

const updateGroup = async (groupData) => {
  const { title, group_id, uesr_id } = groupData;
  const updateSQL = `UPDATE GROUPS SET title='${title}' WHERE group_id='${group_id}' AND user_id='${uesr_id}'`;
  return updateSQL;
};

const deleteGroup = async (groupData) => {
  const { group_id, user_id } = groupData;
  const deleteSQL = `DELETE t1, t2 FROM GROUPS t1 LEFT JOIN GROUPS_USERS t2 ON t1.user_id = t2.user_id\
  WHERE t1.group_id = '${group_id}' AND t1.user_id = '${user_id}' ;`;

  return deleteSQL;
};

export const GroupsModel = {
  insertGroup,
  selectGroup,
  updateGroup,
  deleteGroup,
};

const insertGroupUser = async (groupUser_data) => {
  const { group_id, user_id } = groupUser_data;
  const insertSQL = `INSERT INTO GROUPS_USERS (group_id, user_id) VALUES ('${group_id}','${user_id}');`;
  const selectSQL = `SELECT * FROM GROUPS_USERS WHERE  user_id='${user_id}'`;
  return insertSQL + selectSQL;
};
const selectGroupUser = async (groupUser_data) => {
  const { group_id, user_id } = groupUser_data;
  const selectSQL = `SELECT * FROM GROUPS_USERS WHERE group_id='${group_id}' AND user_id='${user_id}'`;
  return selectSQL;
};
const deleteGroupUser = async (groupUser_data) => {
  const { group_id, user_id } = groupUser_data;
  const deleteSQL = `DELETE FROM GROUPS_USERS WHERE group_id = '${group_id}' AND user_id = '${user_id}'`;
  return deleteSQL;
};

export const GroupUsersModel = {
  insertGroupUser,
  selectGroupUser,
  deleteGroupUser,
};
