import express from 'express';
import {
  createContactMessage,
  getAllContactMessages,
  markContactAsRead,
  deleteContactMessage
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createContactMessage)
  .get(protect, admin, getAllContactMessages);

router.route('/:id/read')
  .put(protect, admin, markContactAsRead);

router.route('/:id')
  .delete(protect, admin, deleteContactMessage);

export default router;
