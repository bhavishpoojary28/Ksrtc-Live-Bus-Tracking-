const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all active announcements
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const announcements = await Announcement.find({
      isActive: true,
      validFrom: { $lte: now },
      $or: [
        { validUntil: { $gte: now } },
        { validUntil: null }
      ]
    })
      .populate('targetRoutes')
      .sort({ priority: -1, createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('targetRoutes');

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get announcements by route
router.get('/route/:routeId', async (req, res) => {
  try {
    const now = new Date();
    const announcements = await Announcement.find({
      isActive: true,
      targetRoutes: req.params.routeId,
      validFrom: { $lte: now },
      $or: [
        { validUntil: { $gte: now } },
        { validUntil: null }
      ]
    })
      .populate('targetRoutes')
      .sort({ priority: -1, createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new announcement (Admin)
router.post('/', async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    await announcement.populate('targetRoutes');
    
    // Emit real-time announcement via WebSocket
    const io = req.app.get('io');
    io.emit('newAnnouncement', announcement);

    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update announcement (Admin)
router.put('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('targetRoutes');

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete announcement (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

