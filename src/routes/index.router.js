import express, { Router } from 'express';
import { logger } from '../config/logger.config.js';
const router = express.Router();

router.get('/', (req, res) => {
  logger.info('GET /');
  return res.send('hello world!');
});
// router.get('/user');
// router.post('/user');
// router.put('/user');
// router.delete('/user');

export default router;
