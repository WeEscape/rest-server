import mysql from 'mysql2/promise';
import { dbconfig } from '../config/db.configs.js';

export const dobbyDB = mysql.createPool(dbconfig);
