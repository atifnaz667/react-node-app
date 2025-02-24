import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})
  
router.get('/profile', authMiddleware, (req, res) => {
    res.send('Hello World!')
})

export default router;