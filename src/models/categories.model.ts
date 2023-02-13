import { createRandomId } from '../utils/randomString.util';
import { dobbyDB } from './database';

const insertCategory = (categoryData: any) => {
  const { user_id, group_id, title } = categoryData;
  const insertSQL = `INSERT INTO CATEGORIES (category_id, user_id,group_id,title) VALUES\
    ('${createRandomId()}','${user_id}','${group_id}','${title}');
    `;
  const selectSQL = `SELECT * FROM CATEGORIES WHERE user_id='${user_id}'`;
  return insertSQL + selectSQL;
};

const selectCategory = (categoryData: any) => {
  const { user_id, category_id } = categoryData;
  const selectSQL = `SELECT * FROM CATEGORIES WHERE user_id='${user_id}' AND category_id='${category_id}'`;
  return selectSQL;
};

const updateCategory = (categoryData: any) => {
  const { category_id, user_id, title } = categoryData;
  const updateSQL = `UPDATE CATEGORIES SET title='${title}' WHERE category_id='${category_id}' AND user_id='${user_id}';`;
  const selectSQL = `SELECT * FROM CATEGORIES WHERE category_id='${category_id}' AND user_id='${user_id}'`;
  return updateSQL + selectSQL;
};

const deleteCategory = (categoryData: any) => {
  const { user_id, category_id } = categoryData;
  const deleteSQL = `DELETE FROM CATEGORIES WHERE category_id = '${category_id}' AND user_id = '${user_id}'`;
  console.log(deleteSQL);
  return deleteSQL;
};

export const CategoriesModel = {
  insertCategory,
  selectCategory,
  updateCategory,
  deleteCategory,
};
