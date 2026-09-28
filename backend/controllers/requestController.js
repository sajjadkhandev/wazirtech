import mongoose from 'mongoose';
import ProjectRequest from '../models/ProjectRequest.js';
import memoryStore from '../utils/memoryStore.js';

// @desc    Submit a new project request
// @route   POST /api/requests
// @access  Public (Optionally authenticated)
export const createProjectRequest = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      projectTitle,
      description,
      budget,
      deadline,
      additionalRequirements
    } = req.body;

    if (!name || !email || !phone || !service || !projectTitle || !description || !budget || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const newRequest = await ProjectRequest.create({
        user: req.user ? req.user._id : null,
        name,
        email: cleanEmail,
        phone,
        company: company || '',
        service,
        projectTitle,
        description,
        budget,
        deadline,
        additionalRequirements: additionalRequirements || '',
        status: 'Pending'
      });
      return res.status(201).json({
        success: true,
        message: 'Your project request has been submitted successfully! Our team will review it shortly.',
        data: newRequest
      });
    }

    // In-memory create
    const newRequest = {
      _id: 'req_' + Date.now(),
      user: req.user ? req.user._id : null,
      name,
      email: cleanEmail,
      phone,
      company: company || '',
      service,
      projectTitle,
      description,
      budget,
      deadline,
      additionalRequirements: additionalRequirements || '',
      status: 'Pending',
      adminNotes: '',
      createdAt: new Date().toISOString()
    };
    memoryStore.requests.unshift(newRequest);

    res.status(201).json({
      success: true,
      message: 'Your project request has been submitted successfully! Our team will review it shortly.',
      data: newRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get requests belonging to logged-in user
// @route   GET /api/requests/my
// @access  Private
export const getMyRequests = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const requests = await ProjectRequest.find({
        $or: [
          { user: req.user._id },
          { email: req.user.email.toLowerCase() }
        ]
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: requests.length,
        data: requests
      });
    }

    // In-memory filter
    const userEmail = req.user.email.toLowerCase();
    const userId = req.user._id ? req.user._id.toString() : '';
    const myReqs = memoryStore.requests.filter(
      (r) =>
        r.email.toLowerCase() === userEmail ||
        (r.user && r.user.toString() === userId)
    );

    res.status(200).json({
      success: true,
      count: myReqs.length,
      data: myReqs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all project requests (Admin)
// @route   GET /api/requests
// @access  Private/Admin
export const getAllRequests = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { projectTitle: { $regex: search, $options: 'i' } },
          { service: { $regex: search, $options: 'i' } }
        ];
      }

      const requests = await ProjectRequest.find(query)
        .populate('user', 'name email role')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: requests.length,
        data: requests
      });
    }

    // In-memory filter
    let filtered = [...memoryStore.requests];
    if (status && status !== 'All') {
      filtered = filtered.filter((r) => r.status === status);
    }
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.email.toLowerCase().includes(term) ||
          r.projectTitle.toLowerCase().includes(term) ||
          r.service.toLowerCase().includes(term)
      );
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project request status & notes (Admin)
// @route   PUT /api/requests/:id/status
// @access  Private/Admin
export const updateRequestStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const allowedStatuses = ['Pending', 'Reviewing', 'Approved', 'In Progress', 'Completed', 'Rejected'];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`
      });
    }

    if (mongoose.connection.readyState === 1) {
      const request = await ProjectRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ success: false, message: 'Project request not found.' });
      }

      if (status) request.status = status;
      if (adminNotes !== undefined) request.adminNotes = adminNotes;

      const updatedRequest = await request.save();
      return res.status(200).json({
        success: true,
        message: `Project request updated to "${request.status}".`,
        data: updatedRequest
      });
    }

    const reqItem = memoryStore.requests.find((r) => r._id === req.params.id);
    if (!reqItem) {
      return res.status(404).json({ success: false, message: 'Project request not found.' });
    }

    if (status) reqItem.status = status;
    if (adminNotes !== undefined) reqItem.adminNotes = adminNotes;

    res.status(200).json({
      success: true,
      message: `Project request updated to "${reqItem.status}".`,
      data: reqItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project request (Admin)
// @route   DELETE /api/requests/:id
// @access  Private/Admin
export const deleteRequest = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const request = await ProjectRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ success: false, message: 'Project request not found.' });
      }
      await ProjectRequest.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Project request deleted successfully.' });
    }

    const index = memoryStore.requests.findIndex((r) => r._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project request not found.' });
    }
    memoryStore.requests.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Project request deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
