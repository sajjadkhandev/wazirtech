import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import memoryStore from '../utils/memoryStore.js';

// Protect routes - must be logged in
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'wazirtech_fallback_jwt_secret_key_2026'
      );

      if (mongoose.connection.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const u = memoryStore.users.find(
          (user) => user._id.toString() === decoded.id.toString()
        );
        if (u) {
          const { password, ...rest } = u;
          req.user = rest;
        }
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token no longer exists.'
        });
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token is invalid or expired.'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please log in to access this resource.'
    });
  }
};

// Check if user has admin role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Administrator privileges required.'
    });
  }
};

// Optional auth: attaches req.user if token provided, otherwise continues
export const optionalAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'wazirtech_fallback_jwt_secret_key_2026'
      );

      if (mongoose.connection.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const u = memoryStore.users.find(
          (user) => user._id.toString() === decoded.id.toString()
        );
        if (u) {
          const { password, ...rest } = u;
          req.user = rest;
        }
      }
    } catch (error) {
      req.user = null;
    }
  }
  next();
};
