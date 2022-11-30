import { CategoriesModel } from '../models/categories.model.js';
import { TableQuery } from '../models/database.js';

const createCategory = async (categoryData) => {
  const sql = await CategoriesModel.insertCategory(categoryData);
  const category = await TableQuery(sql);
  return category[1][0];
};

const getCategory = async (categoryData) => {
  const sql = await CategoriesModel.selectCategory(categoryData);
  const category = await TableQuery(sql);
  return { data: category[0] };
};

const editCategory = async (categoryData) => {
  const sql = await CategoriesModel.updateCategory(categoryData);
  const category = await TableQuery(sql);
  return category[1][0];
};

const deleteCategory = async (categoryData) => {
  const sql = await CategoriesModel.deleteCategory(categoryData);
  const category = await TableQuery(sql);
  return category;
};

export const CategoriesService = {
  createCategory,
  getCategory,
  editCategory,
  deleteCategory,
};
