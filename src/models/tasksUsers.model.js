const sqlCommands = {
    login: selectUserid,
    select_userId: selectUserInfo,
    insert_newUser: insertUser,
    editProfile: updateProfile,
    logout: updateConnect,
    delete: deleteProfile,
  };

export const taskUsersTable = async (sqlSyntax, userinfo) => {
    const connection = await dobbyDB.getConnection(async (conn) => conn);
    try {
      const sql = await sqlCommands[sqlSyntax](userinfo);
      await connection.beginTransaction();
      const resultSets = await connection.query(sql);
      await connection.commit();
      return resultSets[0];
    } catch (err) {
      await connection.rollback();
      return err;
    } finally {
      connection.release();
    }
  };
  