import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import memoryStore from '../utils/memoryStore.js';

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, subject, and message.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.create({
        name,
        email: cleanEmail,
        phone: phone || '',
        subject,
        message
      });
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! We have received your message and will respond shortly.',
        data: contact
      });
    }

    const newContact = {
      _id: 'msg_' + Date.now(),
      name,
      email: cleanEmail,
      phone: phone || '',
      subject,
      message,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    memoryStore.contacts.unshift(newContact);

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We have received your message and will respond shortly.',
      data: newContact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions (Admin)
// @route   GET /api/contact
// @access  Private/Admin
export const getAllContactMessages = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    }

    res.status(200).json({
      success: true,
      count: memoryStore.contacts.length,
      data: memoryStore.contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark contact message as read (Admin)
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
export const markContactAsRead = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });

      contact.isRead = req.body.isRead !== undefined ? req.body.isRead : true;
      await contact.save();
      return res.status(200).json({ success: true, data: contact });
    }

    const msg = memoryStore.contacts.find((m) => m._id === req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });

    msg.isRead = req.body.isRead !== undefined ? req.body.isRead : true;
    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContactMessage = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });

      await Contact.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Contact message deleted.' });
    }

    const index = memoryStore.contacts.findIndex((m) => m._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Message not found.' });

    memoryStore.contacts.splice(index, 1);
    res.status(200).json({ success: true, message: 'Contact message deleted.' });
  } catch (error) {
    next(error);
  }
};
