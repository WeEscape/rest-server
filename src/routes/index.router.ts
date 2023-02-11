import express, { Router, Request, Response } from 'express';
import { logger } from '../config/logger.config';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  logger.info('GET /');
  return res.send('hello world!');
});
// router.get('/user');
// router.post('/user');
// router.put('/user');
// router.delete('/user');

export default router;
