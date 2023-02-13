import dotenv from 'dotenv';
import { PoolOptions } from 'mysql2';
dotenv.config();

export const dbconfig: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 10,
  dateStrings: ['DATE'],
  multipleStatements: true,
};
