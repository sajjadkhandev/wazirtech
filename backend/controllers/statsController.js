import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import ProjectRequest from '../models/ProjectRequest.js';
import Contact from '../models/Contact.js';
import memoryStore from '../utils/memoryStore.js';

// @desc    Get dashboard metrics & summary
// @route   GET /api/stats
// @access  Private/Admin
export const getAdminStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const [
        totalUsers,
        totalProjects,
        totalServices,
        totalRequests,
        totalMessages,
        pendingRequests,
        inProgressRequests,
        completedRequests
      ] = await Promise.all([
        User.countDocuments(),
        Project.countDocuments(),
        Service.countDocuments(),
        ProjectRequest.countDocuments(),
        Contact.countDocuments(),
        ProjectRequest.countDocuments({ status: 'Pending' }),
        ProjectRequest.countDocuments({ status: 'In Progress' }),
        ProjectRequest.countDocuments({ status: 'Completed' })
      ]);

      const recentRequests = await ProjectRequest.find().sort({ createdAt: -1 }).limit(5);
      const recentMessages = await Contact.find().sort({ createdAt: -1 }).limit(5);

      return res.status(200).json({
        success: true,
        data: {
          totalUsers,
          totalProjects,
          totalServices,
          totalRequests,
          totalMessages,
          pendingRequests,
          inProgressRequests,
          completedRequests,
          recentRequests,
          recentMessages
        }
      });
    }

    // In-memory calculations
    const totalUsers = memoryStore.users.length;
    const totalProjects = memoryStore.projects.length;
    const totalServices = memoryStore.services.length;
    const totalRequests = memoryStore.requests.length;
    const totalMessages = memoryStore.contacts.length;
    const pendingRequests = memoryStore.requests.filter((r) => r.status === 'Pending').length;
    const inProgressRequests = memoryStore.requests.filter((r) => r.status === 'In Progress').length;
    const completedRequests = memoryStore.requests.filter((r) => r.status === 'Completed').length;
    const recentRequests = memoryStore.requests.slice(0, 5);
    const recentMessages = memoryStore.contacts.slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProjects,
        totalServices,
        totalRequests,
        totalMessages,
        pendingRequests,
        inProgressRequests,
        completedRequests,
        recentRequests,
        recentMessages
      }
    });
  } catch (error) {
    next(error);
  }
};
