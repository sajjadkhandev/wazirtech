import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllProjects)
  .post(protect, admin, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router;
