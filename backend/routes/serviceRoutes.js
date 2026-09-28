import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllServices)
  .post(protect, admin, createService);

router.route('/:id')
  .get(getServiceById)
  .put(protect, admin, updateService)
  .delete(protect, admin, deleteService);

export default router;
