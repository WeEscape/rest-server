import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateErrors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ error: errors.array() });
  }
  next();
};

const validateBody = (key: string) => {
  return body(key)
    .isString()
    .notEmpty()
    .withMessage(`value of ${key} is empty`);
};

const access_token = validateBody('access_token');
const refresh_token = validateBody('refresh_token');
const social_type = validateBody('social_type');
const user_id = validateBody('user_id');
const group_id = validateBody('group_id');
const title = validateBody('title');
const user_name = validateBody('user_name');
const profile_url = validateBody('profile_url');
const profile_color = validateBody('profile_color');
const task_id = validateBody('task_id');
const category_id = validateBody('category_id');
const memo = validateBody('memo');

export const authValidation = {
  login: [access_token, refresh_token, validateErrors],
  signup: [access_token, social_type, validateErrors],
  logout: [user_id, validateErrors],
  refreshToken: [refresh_token, validateErrors],
};

export const userValidation = {
  readUser: [access_token, validateErrors],
  updateUser: [
    access_token,
    user_name,
    profile_url,
    profile_color,
    validateErrors,
  ],
  deleteUser: [access_token, validateErrors],
};

export const taskValidation = {
  createTask: [user_id, category_id, validateErrors],
  readTask: [access_token, task_id, validateErrors],
  updateTask: [access_token, task_id, memo, validateErrors],
  deleteTask: [access_token, task_id, validateErrors],
};

export const categoryValidation = {
  createCategory: [user_id, group_id, title, validateErrors],
  readCategory: [access_token, category_id, validateErrors],
  updateCategory: [access_token, category_id, title, validateErrors],
  deleteCategory: [access_token, category_id, validateErrors],
};

export const groupValidation = {
  createGroup: [user_id, title, validateErrors],
  createGroupUser: [user_id, group_id, validateErrors],
  readGroup: [access_token, group_id, validateErrors],
  updateGroup: [access_token, title, validateErrors],
  deleteGroup: [access_token, group_id, validateErrors],
};
