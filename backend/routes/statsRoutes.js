import express from 'express';
import { getAdminStats } from '../controllers/statsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getAdminStats);

export default router;
