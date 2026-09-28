import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
      default: 5
    },
    comment: {
      type: String,
      required: [true, 'Comment is required']
    },
    company: {
      type: String,
      default: 'Client'
    },
    roleTitle: {
      type: String,
      default: 'Founder & CEO'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
