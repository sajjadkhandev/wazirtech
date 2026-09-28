import mongoose from 'mongoose';
import Service from '../models/Service.js';
import memoryStore from '../utils/memoryStore.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const services = await Service.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: services.length,
        data: services
      });
    }

    // In-Memory Fallback
    let filtered = [...memoryStore.services];
    if (category && category !== 'All') {
      filtered = filtered.filter((s) => s.category === category);
    }
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term)
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

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found.'
        });
      }
      return res.status(200).json({
        success: true,
        data: service
      });
    }

    const service = memoryStore.services.find((s) => s._id === req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
  try {
    const { title, description, category, icon, features, technologies, price } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both service title and description.'
      });
    }

    const featArr = Array.isArray(features) ? features : (features ? features.split(',').map((f) => f.trim()) : []);
    const techArr = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map((t) => t.trim()) : []);

    if (mongoose.connection.readyState === 1) {
      const service = await Service.create({
        title,
        description,
        category: category || 'Development',
        icon: icon || 'Code',
        features: featArr,
        technologies: techArr,
        price: price || 'Starting at $499'
      });
      return res.status(201).json({
        success: true,
        message: 'Service created successfully.',
        data: service
      });
    }

    const newService = {
      _id: 'srv_' + Date.now(),
      title,
      description,
      category: category || 'Development',
      icon: icon || 'Code',
      features: featArr,
      technologies: techArr,
      price: price || 'Starting at $499',
      createdAt: new Date().toISOString()
    };
    memoryStore.services.unshift(newService);

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: newService
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found.' });
      }

      const { title, description, category, icon, features, technologies, price } = req.body;
      service.title = title || service.title;
      service.description = description || service.description;
      service.category = category || service.category;
      service.icon = icon || service.icon;
      service.price = price !== undefined ? price : service.price;

      if (features !== undefined) {
        service.features = Array.isArray(features) ? features : features.split(',').map((f) => f.trim());
      }
      if (technologies !== undefined) {
        service.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map((t) => t.trim());
      }

      const updatedService = await service.save();
      return res.status(200).json({
        success: true,
        message: 'Service updated successfully.',
        data: updatedService
      });
    }

    const index = memoryStore.services.findIndex((s) => s._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    const s = memoryStore.services[index];
    const { title, description, category, icon, features, technologies, price } = req.body;
    s.title = title || s.title;
    s.description = description || s.description;
    s.category = category || s.category;
    s.icon = icon || s.icon;
    s.price = price !== undefined ? price : s.price;
    if (features !== undefined) {
      s.features = Array.isArray(features) ? features : features.split(',').map((f) => f.trim());
    }
    if (technologies !== undefined) {
      s.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map((t) => t.trim());
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: s
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found.' });
      }
      await Service.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Service deleted successfully.'
      });
    }

    const index = memoryStore.services.findIndex((s) => s._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    memoryStore.services.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
