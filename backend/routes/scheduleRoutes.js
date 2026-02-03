const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const Route = require('../models/Route');
const BusStop = require('../models/BusStop');

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const { date, routeId } = req.query;
    let filter = { isActive: true };

    if (date) filter.date = new Date(date);
    if (routeId) filter.route = routeId;

    const schedules = await Schedule.find(filter)
      .populate('bus')
      .populate('route')
      .sort({ departureTime: 1 });

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search schedules by route and date (city-based)
router.get('/search/route-date', async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    if (!source || !destination || !date) {
      return res.status(400).json({ 
        error: 'Source, destination, and date are required' 
      });
    }

    // First find matching routes by source and destination city
    const routes = await Route.find({
      'source.city': new RegExp(source, 'i'),
      'destination.city': new RegExp(destination, 'i'),
      isActive: true
    });

    const govCities = await BusStop.distinct('city');
    const govCitySet = new Set(govCities.map(c => (c || '').toLowerCase()));
    let filteredRoutes = routes;
    if (govCitySet.size > 0) {
      const governmentRoutes = routes.filter(r =>
        govCitySet.has((r.source.city || '').toLowerCase()) &&
        govCitySet.has((r.destination.city || '').toLowerCase())
      );
      if (governmentRoutes.length > 0) {
        filteredRoutes = governmentRoutes;
      }
    }

    const routeIds = filteredRoutes.map(r => r._id);

    const schedules = await Schedule.find({
      route: { $in: routeIds },
      isActive: true
    })
      .populate('bus')
      .populate('route')
      .sort({ departureTime: 1 });

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search schedules by government bus stops (source/destination stops)
router.get('/search/by-stops', async (req, res) => {
  try {
    const { sourceStopId, destinationStopId, date } = req.query;

    if (!sourceStopId || !destinationStopId || !date) {
      return res.status(400).json({
        error: 'sourceStopId, destinationStopId, and date are required'
      });
    }

    const [sourceStop, destinationStop] = await Promise.all([
      BusStop.findById(sourceStopId),
      BusStop.findById(destinationStopId)
    ]);

    if (!sourceStop || !destinationStop) {
      return res.status(404).json({
        error: 'Source or destination bus stop not found'
      });
    }

    // Primary match: routes whose source/destination cities match the bus stop cities
    let routes = await Route.find({
      'source.city': new RegExp(`^${sourceStop.city}$`, 'i'),
      'destination.city': new RegExp(`^${destinationStop.city}$`, 'i'),
      isActive: true
    });

    // Fallback: also consider routes that explicitly list these stops in the `stops` array
    if (routes.length === 0) {
      routes = await Route.find({
        isActive: true,
        'stops.name': {
          $in: [
            new RegExp(sourceStop.name, 'i'),
            new RegExp(destinationStop.name, 'i')
          ]
        }
      });
    }

    const routeIds = routes.map(r => r._id);

    if (routeIds.length === 0) {
      return res.json([]);
    }

    // Same behavior as city-based search: treat schedules as recurring and
    // do not strictly filter by date for now.
    const schedules = await Schedule.find({
      route: { $in: routeIds },
      isActive: true
    })
      .populate('bus')
      .populate('route')
      .sort({ departureTime: 1 });

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('bus')
      .populate('route');

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new schedule (Admin)
router.post('/', async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    await schedule.populate('bus');
    await schedule.populate('route');
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update schedule (Admin)
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('bus')
      .populate('route');

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete schedule (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

