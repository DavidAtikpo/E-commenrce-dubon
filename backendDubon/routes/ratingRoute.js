import express from 'express';
import createRating  from '../controllers/RatingCtrl.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour créer une évaluation
router.post('/ratings',authMiddleware.authMiddleware, createRating.createRating);
router.get('/ratings/:productId',createRating.getRating)
router.get('/status',createRating.getOrderStatus)

export default router;