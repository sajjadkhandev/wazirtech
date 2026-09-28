import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import memoryStore from '../utils/memoryStore.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id).select('+password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      user.name = req.body.name || user.name;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      if (req.body.profileImage) user.profileImage = req.body.profileImage;

      if (req.body.password) {
        if (req.body.password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'New password must be at least 6 characters long.'
          });
        }
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          role: updatedUser.role,
          profileImage: updatedUser.profileImage,
          createdAt: updatedUser.createdAt
        }
      });
    }

    // In-memory update
    const user = memoryStore.users.find((u) => u._id.toString() === req.user._id.toString());
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    if (req.body.profileImage) user.profileImage = req.body.profileImage;
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.'
        });
      }
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(req.body.password, salt);
    }

    const { password, ...safeUser } = user;
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: safeUser
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const users = await User.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    }

    const safeUsers = memoryStore.users.map(({ password, ...u }) => u);
    res.status(200).json({
      success: true,
      count: safeUsers.length,
      data: safeUsers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either "user" or "admin".'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

      if (req.user._id.toString() === user._id.toString() && role !== 'admin') {
        return res.status(400).json({
          success: false,
          message: 'You cannot revoke your own administrator privileges.'
        });
      }

      user.role = role;
      await user.save();
      return res.status(200).json({
        success: true,
        message: `User role updated to ${role}.`,
        data: user
      });
    }

    const user = memoryStore.users.find((u) => u._id.toString() === req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    if (req.user._id.toString() === user._id.toString() && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'You cannot revoke your own administrator privileges.'
      });
    }

    user.role = role;
    const { password, ...safeUser } = user;
    res.status(200).json({
      success: true,
      message: `User role updated to ${role}.`,
      data: safeUser
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

      if (req.user._id.toString() === user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: 'You cannot delete your own account from the admin dashboard.'
        });
      }

      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully.'
      });
    }

    const index = memoryStore.users.findIndex((u) => u._id.toString() === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account from the admin dashboard.'
      });
    }

    memoryStore.users.splice(index, 1);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
