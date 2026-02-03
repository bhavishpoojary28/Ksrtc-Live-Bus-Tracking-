const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  registrationId: {
    type: String,
    required: true,
    unique: true
  },
  busType: {
    type: String,
    enum: ['Rajahamsa', 'Airavat', 'Airavat Club Class', 'Ordinary', 'Express', 'Sleeper', 'Volvo'],
    required: true
  },
  isAC: {
    type: Boolean,
    default: false
  },
  totalSeats: {
    type: Number,
    required: true,
    default: 40
  },
  availableSeats: {
    type: Number,
    default: 40
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  currentLocation: {
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    enum: ['On Time', 'Delayed', 'Arrived', 'Cancelled', 'Not Started'],
    default: 'Not Started'
  },
  driver: {
    name: String,
    phone: String,
    licenseNumber: String
  },
  conductor: {
    name: String,
    phone: String,
    employeeId: String
  },
  nextStop: {
    type: String,
    default: null
  },
  estimatedArrival: {
    type: Date,
    default: null
  },
  amenities: [{
    type: String,
    enum: ['WiFi', 'Charging Point', 'Water Bottle', 'Reading Light', 'Blanket', 'Snacks']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for geospatial queries
busSchema.index({ 'currentLocation.latitude': 1, 'currentLocation.longitude': 1 });

module.exports = mongoose.model('Bus', busSchema);

