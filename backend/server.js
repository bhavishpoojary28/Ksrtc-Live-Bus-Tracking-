const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const busRoutes = require('./routes/busRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const routeRoutes = require('./routes/routeRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const adminRoutes = require('./routes/adminRoutes');
const busStopRoutes = require('./routes/busStopRoutes');

// API Routes
app.use('/api/buses', busRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/busstops', busStopRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'KSRTC API is running' });
});

// WebSocket Connection for Real-time Updates
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('trackBus', (busId) => {
    console.log(`Tracking bus: ${busId}`);
    socket.join(`bus-${busId}`);
  });

  socket.on('stopTrackingBus', (busId) => {
    socket.leave(`bus-${busId}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

setInterval(() => {
  const demoBuses = [
    { id: 'KA01-AB-1234', base: { lat: 12.9716, lng: 77.5946 } },
    { id: 'KA09-XY-5678', base: { lat: 12.9716, lng: 77.5946 } },
    { id: 'KA19-MN-2468', base: { lat: 12.9141, lng: 74.8560 } },
    { id: 'KA27-CD-1357', base: { lat: 15.3647, lng: 75.1239 } }
  ];
  demoBuses.forEach((b) => {
    const mock = {
      busId: b.id,
      location: {
        latitude: b.base.lat + (Math.random() - 0.5) * 0.01,
        longitude: b.base.lng + (Math.random() - 0.5) * 0.01
      },
      speed: Math.floor(Math.random() * 60) + 20,
      timestamp: new Date()
    };
    io.to(`bus-${mock.busId}`).emit('busLocationUpdate', mock);
  });
}, 5000);

// Make io accessible to routes
app.set('io', io);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
});

module.exports = { app, io };

