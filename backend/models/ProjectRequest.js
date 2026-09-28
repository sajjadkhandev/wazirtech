import mongoose from 'mongoose';

const projectRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    company: {
      type: String,
      default: '',
      trim: true
    },
    service: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true
    },
    projectTitle: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    budget: {
      type: String,
      required: [true, 'Budget range is required'],
      trim: true
    },
    deadline: {
      type: String,
      required: [true, 'Expected deadline is required'],
      trim: true
    },
    additionalRequirements: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewing', 'Approved', 'In Progress', 'Completed', 'Rejected'],
      default: 'Pending'
    },
    adminNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const ProjectRequest = mongoose.model('ProjectRequest', projectRequestSchema);
export default ProjectRequest;
