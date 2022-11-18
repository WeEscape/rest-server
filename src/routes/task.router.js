import express from 'express';
import { logger } from '../config/logger.config.js';
import { CategoriesTable } from '../models/categories.model.js';
import { CategoriesService } from '../services/categories.service.js';
import { decodeAccessToken } from '../services/jwt.service.js';

const taskRouter = express.Router();

taskRouter.post('/', async (req, res, next) => {});
taskRouter.get('/', async (req, res, next) => {});
taskRouter.put('/', async (req, res, next) => {});
taskRouter.delete('/', async (req, res, next) => {});

taskRouter.post('/categories', async (req, res, next) => {
  try {
    const categoryData = req.body;
    const result = await CategoriesService.createCategory(
      CategoriesTable,
      categoryData,
    );
    return res.status(200).send({ message: 'success!', data: result });
  } catch (err) {
    logger.error(err);
    return res.status(400).send(err);
  }
});
taskRouter.get('/categories/:category_id', async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    const categoryData = { category_id, user_id };
    const result = await CategoriesService.getCategory(
      CategoriesTable,
      categoryData,
    );
    if (!result.data) throw new Error('undefined');
    return res.status(200).send(result);
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'category_id is notdefined' });
  }
});
taskRouter.put('/categories/:category_id', async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { title } = req.body;
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('undefined');
    const categoryData = { category_id, user_id, title };
    const result = await CategoriesService.editCategory(
      CategoriesTable,
      categoryData,
    );
    return res.status(200).send({ message: 'success!', data: result });
  } catch (err) {
    next(err);
  }
});
taskRouter.delete('/categories/:category_id', async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const request_header = req.headers['authorization'];
    const access_token = request_header.split(' ')[1];
    const { id: user_id } = await decodeAccessToken(access_token);
    if (!user_id) throw new Error('user_id is undefined');
    const categoryData = { category_id, user_id };
    const result = await CategoriesService.deleteCategory(
      CategoriesTable,
      categoryData,
    );
    return res.status(200).send({ message: 'success delete' });
  } catch (err) {
    next(err);
    return res.status(400).send({ message: 'access_token is not defined' });
  }
});

export default taskRouter;
