import mongoose from 'mongoose';
import Project from '../models/Project.js';
import memoryStore from '../utils/memoryStore.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const projects = await Project.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    }

    // In-memory fallback
    let filtered = [...memoryStore.projects];
    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      filtered = filtered.filter((p) => p.featured === true);
    }
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
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

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
      return res.status(200).json({ success: true, data: project });
    }

    const project = memoryStore.projects.find((p) => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res, next) => {
  try {
    const { title, description, image, technologies, category, liveUrl, githubUrl, featured } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide project title and description.'
      });
    }

    const techArr = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map((t) => t.trim()) : []);

    if (mongoose.connection.readyState === 1) {
      const project = await Project.create({
        title,
        description,
        image: image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        technologies: techArr,
        category: category || 'Web Application',
        liveUrl: liveUrl || '#',
        githubUrl: githubUrl || '#',
        featured: Boolean(featured)
      });
      return res.status(201).json({
        success: true,
        message: 'Project created successfully.',
        data: project
      });
    }

    const newProject = {
      _id: 'prj_' + Date.now(),
      title,
      description,
      image: image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      technologies: techArr,
      category: category || 'Web Application',
      liveUrl: liveUrl || '#',
      githubUrl: githubUrl || '#',
      featured: Boolean(featured),
      createdAt: new Date().toISOString()
    };
    memoryStore.projects.unshift(newProject);

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      const { title, description, image, technologies, category, liveUrl, githubUrl, featured } = req.body;
      project.title = title || project.title;
      project.description = description || project.description;
      project.image = image || project.image;
      project.category = category || project.category;
      project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
      project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
      if (featured !== undefined) project.featured = Boolean(featured);
      if (technologies !== undefined) {
        project.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map((t) => t.trim());
      }

      const updatedProject = await project.save();
      return res.status(200).json({
        success: true,
        message: 'Project updated successfully.',
        data: updatedProject
      });
    }

    const index = memoryStore.projects.findIndex((p) => p._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const prj = memoryStore.projects[index];
    const { title, description, image, technologies, category, liveUrl, githubUrl, featured } = req.body;
    prj.title = title || prj.title;
    prj.description = description || prj.description;
    prj.image = image || prj.image;
    prj.category = category || prj.category;
    prj.liveUrl = liveUrl !== undefined ? liveUrl : prj.liveUrl;
    prj.githubUrl = githubUrl !== undefined ? githubUrl : prj.githubUrl;
    if (featured !== undefined) prj.featured = Boolean(featured);
    if (technologies !== undefined) {
      prj.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map((t) => t.trim());
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: prj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
      await Project.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
    }

    const index = memoryStore.projects.findIndex((p) => p._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    memoryStore.projects.splice(index, 1);

    res.status(200).json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
