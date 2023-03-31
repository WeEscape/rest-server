import dotenv from 'dotenv';
import { AppConfig } from '../interfaces/config/app.interface';
dotenv.config();

export const appConfig: AppConfig = {
  port: process.env.PORT || '',
  databaseURL: process.env.DATABASE_URI || '',
};
