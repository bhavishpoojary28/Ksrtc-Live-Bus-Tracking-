const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  daysOfWeek: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Specific Days'],
    default: 'Daily'
  },
  fare: {
    type: Number,
    required: true
  },
  seatAvailability: {
    total: Number,
    available: Number,
    booked: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for efficient schedule queries
scheduleSchema.index({ route: 1, date: 1, departureTime: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);

