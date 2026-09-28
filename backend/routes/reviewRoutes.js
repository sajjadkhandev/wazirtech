import express from 'express';
import {
  getAllReviews,
  createReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect, admin, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllReviews)
  .post(optionalAuth, createReview);

router.route('/:id')
  .delete(protect, admin, deleteReview);

export default router;
