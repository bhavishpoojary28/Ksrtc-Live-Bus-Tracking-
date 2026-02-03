const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const Route = require('../models/Route');

// Get all buses
router.get('/', async (req, res) => {
  try {
    const { busType, isAC, status } = req.query;
    let filter = { isActive: true };

    if (busType) filter.busType = busType;
    if (isAC !== undefined) filter.isAC = isAC === 'true';
    if (status) filter.status = status;

    const buses = await Bus.find(filter).populate('route');
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bus by ID
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('route');
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bus by bus number
router.get('/number/:busNumber', async (req, res) => {
  try {
    const bus = await Bus.findOne({ 
      busNumber: req.params.busNumber,
      isActive: true 
    }).populate('route');
    
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bus location
router.get('/:id/location', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json({
      busNumber: bus.busNumber,
      currentLocation: bus.currentLocation,
      status: bus.status,
      nextStop: bus.nextStop,
      estimatedArrival: bus.estimatedArrival
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update bus location (for GPS tracking)
router.put('/:id/location', async (req, res) => {
  try {
    const { latitude, longitude, speed, nextStop, estimatedArrival } = req.body;
    
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        'currentLocation.latitude': latitude,
        'currentLocation.longitude': longitude,
        'currentLocation.lastUpdated': new Date(),
        nextStop,
        estimatedArrival
      },
      { new: true }
    ).populate('route');

    // Emit real-time update via WebSocket
    const io = req.app.get('io');
    io.to(`bus-${bus.busNumber}`).emit('busLocationUpdate', {
      busId: bus.busNumber,
      location: { latitude, longitude },
      speed,
      nextStop,
      estimatedArrival,
      timestamp: new Date()
    });

    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search buses by route
router.get('/search/route', async (req, res) => {
  try {
    const { source, destination } = req.query;
    
    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required' });
    }

    // Find routes matching source and destination
    const routes = await Route.find({
      'source.city': new RegExp(source, 'i'),
      'destination.city': new RegExp(destination, 'i'),
      isActive: true
    });

    const routeIds = routes.map(route => route._id);
    
    // Find buses for these routes
    const buses = await Bus.find({
      route: { $in: routeIds },
      isActive: true
    }).populate('route');

    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new bus (Admin)
router.post('/', async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update bus (Admin)
router.put('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('route');
    
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete bus (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json({ message: 'Bus deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

