import mongoose from 'mongoose';
import Review from '../models/Review.js';
import memoryStore from '../utils/memoryStore.js';

// @desc    Get all client reviews
// @route   GET /api/reviews
// @access  Public
export const getAllReviews = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews
      });
    }

    res.status(200).json({
      success: true,
      count: memoryStore.reviews.length,
      data: memoryStore.reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a review
// @route   POST /api/reviews
// @access  Public/Private
export const createReview = async (req, res, next) => {
  try {
    const { name, rating, comment, company, roleTitle, avatar } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Name, rating, and review comment are required.'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const review = await Review.create({
        user: req.user ? req.user._id : null,
        name,
        rating: Number(rating),
        comment,
        company: company || 'Enterprise Client',
        roleTitle: roleTitle || 'Product Director',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      });
      return res.status(201).json({
        success: true,
        message: 'Thank you for your feedback!',
        data: review
      });
    }

    const newReview = {
      _id: 'rev_' + Date.now(),
      user: req.user ? req.user._id : null,
      name,
      rating: Number(rating),
      comment,
      company: company || 'Enterprise Client',
      roleTitle: roleTitle || 'Product Director',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };
    memoryStore.reviews.unshift(newReview);

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      data: newReview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review (Admin)
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

      await Review.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Review deleted successfully.' });
    }

    const index = memoryStore.reviews.findIndex((r) => r._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Review not found.' });

    memoryStore.reviews.splice(index, 1);
    res.status(200).json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
