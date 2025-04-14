import express from 'express';
import { addReview, getReviews } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addReview);
router.get('/:locationId', getReviews);

export default router;
