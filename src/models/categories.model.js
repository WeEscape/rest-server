import { createRandomId } from '../utils/randomString.util.js';
import { dobbyDB } from './database.js';

const insertCategory = (categoryData) => {
  const { user_id, group_id, title } = categoryData;
  const insertSQL = `INSERT INTO CATEGORIES (category_id, user_id,group_id,title) VALUES\
    ('${createRandomId()}','${user_id}','${group_id}','${title}');
    `;
  const selectSQL = `SELECT * FROM CATEGORIES WHERE user_id='${user_id}'`;
  return insertSQL + selectSQL;
};
const selectCategory = (categoryData) => {
  const { user_id, category_id } = categoryData;
  const selectSQL = `SELECT * FROM CATEGORIES WHERE user_id='${user_id}' AND category_id='${category_id}'`;
  return selectSQL;
};
const updateCategory = (categoryData) => {
  const { category_id, user_id, title } = categoryData;
  const updateSQL = `UPDATE CATEGORIES SET title='${title}' WHERE category_id='${category_id}' AND user_id='${user_id}';`;
  const selectSQL = `SELECT * FROM CATEGORIES WHERE category_id='${category_id}' AND user_id='${user_id}'`;
  return updateSQL + selectSQL;
};
const deleteCategory = (categoryData) => {
  const { user_id, category_id } = categoryData;
  const deleteSQL = `DELETE FROM CATEGORIES WHERE category_id = '${category_id}' AND user_id = '${user_id}'`;
  console.log(deleteSQL);
  return deleteSQL;
};

const sqlCommands = {
  insert: insertCategory,
  select: selectCategory,
  update: updateCategory,
  delete: deleteCategory,
};

export const CategoriesTable = async (sqlSyntax, userinfo) => {
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
