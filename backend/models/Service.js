import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Service description is required']
    },
    category: {
      type: String,
      default: 'Development',
      trim: true
    },
    icon: {
      type: String,
      default: 'Code',
      trim: true
    },
    features: {
      type: [String],
      default: []
    },
    technologies: {
      type: [String],
      default: []
    },
    price: {
      type: String,
      default: 'Starting at $499',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
