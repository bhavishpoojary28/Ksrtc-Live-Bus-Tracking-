const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeNumber: {
    type: String,
    required: true,
    unique: true
  },
  routeName: {
    type: String,
    required: true
  },
  source: {
    city: {
      type: String,
      required: true
    },
    busStand: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  destination: {
    city: {
      type: String,
      required: true
    },
    busStand: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  stops: [{
    name: {
      type: String,
      required: true
    },
    arrivalTime: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    stopOrder: Number
  }],
  distance: {
    type: Number, // in kilometers
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  baseFare: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster source-destination queries
routeSchema.index({ 'source.city': 1, 'destination.city': 1 });

module.exports = mongoose.model('Route', routeSchema);

