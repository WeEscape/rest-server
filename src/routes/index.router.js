import express, { Router } from 'express';
const router = express.Router();

router.get('/', (req, res) => res.send('hello world!'));
// router.get('/user');
// router.post('/user');
// router.put('/user');
// router.delete('/user');

export default router;
