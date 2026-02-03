const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Alert', 'Info', 'Warning', 'Maintenance', 'Promotion'],
    default: 'Info'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  targetRoutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for active announcements
announcementSchema.index({ isActive: 1, validFrom: 1, validUntil: 1 });

module.exports = mongoose.model('Announcement', announcementSchema);

