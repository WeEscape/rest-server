import {
  GetCategory,
  EditCategory,
  DeleteCategory,
} from './../interfaces/categories/categories.interface';
import { CategoriesModel } from '../models/categories.model';
import { TableQuery } from '../models/database';

const createCategory = async (categoryData: string) => {
  const sql = CategoriesModel.insertCategory(categoryData);
  const category: any = await TableQuery(sql);
  return category[1][0];
};

const getCategory = async (categoryData: GetCategory) => {
  const sql = CategoriesModel.selectCategory(categoryData);
  const category: any = await TableQuery(sql);
  return { data: category[0] };
};

const editCategory = async (categoryData: EditCategory) => {
  const sql = CategoriesModel.updateCategory(categoryData);
  const category: any = await TableQuery(sql);
  return category[1][0];
};

const deleteCategory = async (categoryData: DeleteCategory) => {
  const sql = CategoriesModel.deleteCategory(categoryData);
  const category: any = await TableQuery(sql);
  return category;
};

export const CategoriesService = {
  createCategory,
  getCategory,
  editCategory,
  deleteCategory,
};
