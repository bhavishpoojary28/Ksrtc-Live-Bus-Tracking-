const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find({ isActive: true });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search routes by source and destination
router.get('/search/cities', async (req, res) => {
  try {
    const { source, destination } = req.query;
    
    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required' });
    }

    const routes = await Route.find({
      'source.city': new RegExp(source, 'i'),
      'destination.city': new RegExp(destination, 'i'),
      isActive: true
    });

    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all cities (unique sources and destinations)
router.get('/cities/all', async (req, res) => {
  try {
    const routes = await Route.find({ isActive: true });
    const cities = new Set();
    
    routes.forEach(route => {
      cities.add(route.source.city);
      cities.add(route.destination.city);
    });

    res.json(Array.from(cities).sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new route (Admin)
router.post('/', async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update route (Admin)
router.put('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete route (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json({ message: 'Route deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

