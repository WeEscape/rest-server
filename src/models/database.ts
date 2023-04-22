import mysql, { Pool } from 'mysql2/promise';
import { dbconfig } from '../config/db.config';

export class DbConnection {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool(dbconfig);
  }

  async execute(sql: any, params: any) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await connection.query(sql, params);
      await connection.commit();
      return result[0];
    } catch (err) {
      await connection.rollback();
      return err;
    } finally {
      connection.release();
    }
  }
}
