const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Bus = require('../models/Bus');
const Route = require('../models/Route');
const Schedule = require('../models/Schedule');
const Announcement = require('../models/Announcement');

// Simple JWT auth middleware for admin routes
const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Admin login to obtain JWT token
router.post(
  '/login',
  [
    body('username').isString().trim().notEmpty(),
    body('password').isString().trim().notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      return res.status(500).json({ error: 'Admin credentials not configured' });
    }
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ role: 'admin', username }, process.env.JWT_SECRET, {
      expiresIn: '12h'
    });
    res.json({ token });
  }
);

// Protect everything below this line
router.use(authenticateAdmin);

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalBuses = await Bus.countDocuments({ isActive: true });
    const activeBuses = await Bus.countDocuments({ 
      isActive: true, 
      status: { $in: ['On Time', 'Delayed'] } 
    });
    const totalRoutes = await Route.countDocuments({ isActive: true });
    const todaySchedules = await Schedule.countDocuments({
      date: { 
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      },
      isActive: true
    });
    const activeAnnouncements = await Announcement.countDocuments({ isActive: true });

    // Get buses by status
    const busesByStatus = await Bus.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get buses by type
    const busesByType = await Bus.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$busType', count: { $sum: 1 } } }
    ]);

    res.json({
      totalBuses,
      activeBuses,
      totalRoutes,
      todaySchedules,
      activeAnnouncements,
      busesByStatus,
      busesByType
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all buses for admin management
router.get('/buses', async (req, res) => {
  try {
    const buses = await Bus.find().populate('route').sort({ createdAt: -1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all routes for admin management
router.get('/routes', async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all schedules for admin management
router.get('/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('bus')
      .populate('route')
      .sort({ date: -1, departureTime: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all announcements for admin management
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('targetRoutes')
      .sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk update bus locations (simulate GPS data)
router.post('/buses/update-locations', async (req, res) => {
  try {
    const { updates } = req.body; // Array of {busId, latitude, longitude, nextStop, eta}

    const io = req.app.get('io');
    const results = [];

    for (const update of updates) {
      const bus = await Bus.findByIdAndUpdate(
        update.busId,
        {
          'currentLocation.latitude': update.latitude,
          'currentLocation.longitude': update.longitude,
          'currentLocation.lastUpdated': new Date(),
          nextStop: update.nextStop,
          estimatedArrival: update.eta
        },
        { new: true }
      );

      if (bus) {
        io.to(`bus-${bus.busNumber}`).emit('busLocationUpdate', {
          busId: bus.busNumber,
          location: { latitude: update.latitude, longitude: update.longitude },
          nextStop: update.nextStop,
          estimatedArrival: update.eta,
          timestamp: new Date()
        });
        results.push(bus);
      }
    }

    res.json({ message: 'Locations updated', updated: results.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

