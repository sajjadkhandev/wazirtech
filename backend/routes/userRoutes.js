import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/')
  .get(protect, admin, getAllUsers);

router.route('/:id/role')
  .put(protect, admin, updateUserRole);

router.route('/:id')
  .delete(protect, admin, deleteUser);

export default router;
