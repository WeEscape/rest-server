const createCategory = async (categoriesTable, categoryData) => {
  const runSQL = await categoriesTable('insert', categoryData);
  return runSQL[1][0];
};
const getCategory = async (categoriesTable, categoryData) => {
  const runSQL = await categoriesTable('select', categoryData);
  return { data: runSQL[0] };
};
const editCategory = async (categoriesTable, categoryData) => {
  const runSQL = await categoriesTable('update', categoryData);
  return runSQL[1][0];
};
const deleteCategory = async (categoriesTable, categoryData) => {
  const runSQL = await categoriesTable('delete', categoryData);
  return runSQL;
};

export const CategoriesService = {
  createCategory,
  getCategory,
  editCategory,
  deleteCategory,
};
