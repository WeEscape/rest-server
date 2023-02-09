import mysql from 'mysql2/promise';
import { dbconfig } from '../config/db.configs.js';

export const dobbyDB = mysql.createPool(dbconfig);

export const TableQuery = async (sql) => {
  const connection = await dobbyDB.getConnection(async (conn) => conn);
  try {
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
