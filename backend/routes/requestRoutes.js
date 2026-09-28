import express from 'express';
import {
  createProjectRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
  deleteRequest
} from '../controllers/requestController.js';
import { protect, admin, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(optionalAuth, createProjectRequest)
  .get(protect, admin, getAllRequests);

router.route('/my')
  .get(protect, getMyRequests);

router.route('/:id/status')
  .put(protect, admin, updateRequestStatus);

router.route('/:id')
  .delete(protect, admin, deleteRequest);

export default router;
