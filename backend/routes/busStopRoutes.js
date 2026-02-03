const express = require('express');
const router = express.Router();
const BusStop = require('../models/BusStop');

/**
 * GET /api/busstops/:cityName
 * Fetch bus stops for a city from our own database (no external APIs)
 */
router.get('/:cityName', async (req, res) => {
  try {
    const cityName = (req.params.cityName || '').trim();

    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const stops = await BusStop.find({
      city: new RegExp(`^${cityName}$`, 'i')
    }).sort({ name: 1 });

    // Derive a simple center for the map using the average of stop coordinates.
    // Be defensive: only use stops that actually have valid coordinates.
    let cityCoordinates = null;
    const stopsWithCoords = stops.filter(
      (s) => s.coordinates &&
        typeof s.coordinates.latitude === 'number' &&
        typeof s.coordinates.longitude === 'number'
    );

    if (stopsWithCoords.length > 0) {
      const avgLat = stopsWithCoords.reduce((sum, s) => sum + s.coordinates.latitude, 0) / stopsWithCoords.length;
      const avgLng = stopsWithCoords.reduce((sum, s) => sum + s.coordinates.longitude, 0) / stopsWithCoords.length;
      cityCoordinates = { latitude: avgLat, longitude: avgLng };
    }

    return res.json({
      source: 'database',
      city: cityName,
      cityCoordinates,
      count: stops.length,
      busStops: stops
    });
  } catch (error) {
    console.error('Error fetching bus stops from database:', error);
    return res.status(500).json({
      error: 'Failed to fetch bus stops',
      message: error.message
    });
  }
});

/**
 * GET /api/busstops/nearby/:latitude/:longitude
 * Get bus stops near specific coordinates
 */
router.get('/nearby/:latitude/:longitude', async (req, res) => {
  try {
    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);
    const radius = parseInt(req.query.radius) || 5000; // meters

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    // Search in database first
    const nearbyStops = await BusStop.find({
      'coordinates.latitude': {
        $gte: latitude - 0.05,
        $lte: latitude + 0.05
      },
      'coordinates.longitude': {
        $gte: longitude - 0.05,
        $lte: longitude + 0.05
      }
    });

    res.json({
      latitude,
      longitude,
      radius,
      count: nearbyStops.length,
      busStops: nearbyStops
    });

  } catch (error) {
    console.error('Error fetching nearby bus stops:', error);
    res.status(500).json({
      error: 'Failed to fetch nearby bus stops',
      message: error.message
    });
  }
});

/**
 * GET /api/busstops/by-city/:cityName
 * Get all bus stops for a specific city (used for government stop based search)
 */
router.get('/by-city/:cityName', async (req, res) => {
  try {
    const cityName = (req.params.cityName || '').trim();

    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const stops = await BusStop.find({
      city: new RegExp(`^${cityName}$`, 'i')
    }).sort({ name: 1 });

    res.json(stops);
  } catch (error) {
    console.error('Error fetching bus stops by city:', error);
    res.status(500).json({
      error: 'Failed to fetch bus stops by city',
      message: error.message
    });
  }
});

/**
 * GET /api/busstops/cities/all
 * Get all unique cities from cached bus stops
 */
router.get('/cities/all', async (req, res) => {
  try {
    const cities = await BusStop.distinct('city');
    res.json(cities.sort());
  } catch (error) {
    console.error('Error fetching cities from bus stops:', error);
    res.status(500).json({
      error: 'Failed to fetch cities',
      message: error.message
    });
  }
});

/**
 * GET /api/busstops/
 * Get all cached bus stops (with pagination)
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const city = req.query.city;

    const filter = city ? { city: new RegExp(city, 'i') } : {};

    const busStops = await BusStop.find(filter)
      .sort({ city: 1, name: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await BusStop.countDocuments(filter);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      busStops
    });

  } catch (error) {
    console.error('Error fetching bus stops:', error);
    res.status(500).json({
      error: 'Failed to fetch bus stops',
      message: error.message
    });
  }
});

/**
 * DELETE /api/busstops/cache/:cityName
 * (Disabled) Previously used to clear Google Maps based cache.
 * Kept for backward compatibility but now returns a no-op response.
 */
router.delete('/cache/:cityName', async (req, res) => {
  return res.json({
    message: 'Bus stop caching via Google Maps is disabled; nothing to clear.',
    deletedCount: 0
  });
});

/**
 * POST /api/busstops/refresh-all
 * (Disabled) Previously used Google Maps to refresh all cached cities.
 */
router.post('/refresh-all', async (req, res) => {
  return res.json({
    message: 'Automatic refresh via Google Maps is disabled. Manage bus stops via seeds or admin tools.',
    results: []
  });
});

module.exports = router;

