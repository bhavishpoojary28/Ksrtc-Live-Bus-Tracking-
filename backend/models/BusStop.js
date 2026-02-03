const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  placeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    index: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  types: [{
    type: String
  }],
  rating: {
    type: Number,
    default: null
  },
  userRatingsTotal: {
    type: Number,
    default: 0
  },
  photos: [{
    photoReference: String,
    height: Number,
    width: Number
  }],
  businessStatus: {
    type: String,
    default: 'OPERATIONAL'
  },
  vicinity: String,
  lastFetched: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for city-based queries
busStopSchema.index({ city: 1, lastFetched: -1 });

// Geospatial index for location-based queries
busStopSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

// TTL index to auto-delete old records after 30 days (optional)
busStopSchema.index({ lastFetched: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('BusStop', busStopSchema);

