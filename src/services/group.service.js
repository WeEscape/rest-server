// 그룹
const createGroup = async (groupTable, groupData) => {
  const runSQL = await groupTable('insert', groupData);
  return runSQL[1][0];
};

const getGroup = async (groupTable, groupData) => {
  const runSQL = await groupTable('select', groupData);
  return { data: runSQL[0] };
};

const editGroup = async (groupTable, groupData) => {
  const runSQL = await groupTable('update', groupData);
  return { data: runSQL[0] };
};

const deleteGroup = async (groupTable, groupData) => {
  const runSQL = await groupTable('delete', groupData);
  return { data: runSQL[0] };
};

// 그룹유저
const createGroupUser = async (groupsUsersTable, groupUesr_data) => {
  const runSQL = await groupsUsersTable('insert', groupUesr_data);
  console.log(runSQL);
  return runSQL[1][0];
};

const getGroupUser = async (groupsUsersTable, groupUesr_data) => {
  const runSQL = await groupsUsersTable('select', groupUesr_data);
  return { data: runSQL[0] };
};

const deleteGroupUser = async (groupsUsersTable, groupUesr_data) => {
  const runSQL = await groupsUsersTable('delete', groupUesr_data);
  return runSQL;
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
