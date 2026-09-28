import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
      default: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    technologies: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      default: 'Web Application'
    },
    liveUrl: {
      type: String,
      default: '#'
    },
    githubUrl: {
      type: String,
      default: '#'
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
