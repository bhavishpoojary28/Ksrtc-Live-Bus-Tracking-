// Mock data for testing when database is not available
const mockSchedules = [
  {
    _id: '1',
    bus: {
      _id: 'bus1',
      busNumber: 'KA01-AB-1234',
      registrationId: 'KA01AB1234',
      busType: 'Ordinary',
      isAC: false,
      totalSeats: 40,
      availableSeats: 32,
      status: 'On Time',
      amenities: ['Water Bottle']
    },
    route: {
      _id: 'route1',
      routeNumber: 'BLR-MYS-101',
      routeName: 'Bangalore to Mysore',
      source: { city: 'Bangalore', busStand: 'Majestic' },
      destination: { city: 'Mysore', busStand: 'Suburban' },
      distance: 150,
      duration: 240,
      baseFare: 300
    },
    departureTime: '08:00',
    arrivalTime: '12:00',
    date: new Date(),
    fare: 300,
    seatAvailability: { total: 40, available: 32, booked: 8 },
    frequency: 'Daily'
  },
  {
    _id: '2',
    bus: {
      _id: 'bus2',
      busNumber: 'KA09-XY-5678',
      registrationId: 'KA09XY5678',
      busType: 'Express',
      isAC: false,
      totalSeats: 45,
      availableSeats: 40,
      status: 'On Time',
      amenities: ['Charging Point', 'Water Bottle']
    },
    route: {
      _id: 'route2',
      routeNumber: 'BLR-MNG-202',
      routeName: 'Bangalore to Mangalore',
      source: { city: 'Bangalore', busStand: 'Majestic' },
      destination: { city: 'Mangalore', busStand: 'KSRTC' },
      distance: 350,
      duration: 540,
      baseFare: 600
    },
    departureTime: '09:00',
    arrivalTime: '18:00',
    date: new Date(),
    fare: 600,
    seatAvailability: { total: 45, available: 40, booked: 5 },
    frequency: 'Daily'
  },
  {
    _id: '3',
    bus: {
      _id: 'bus3',
      busNumber: 'KA27-CD-1357',
      registrationId: 'KA27CD1357',
      busType: 'Rajahamsa',
      isAC: true,
      totalSeats: 40,
      availableSeats: 28,
      status: 'On Time',
      amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket']
    },
    route: {
      _id: 'route3',
      routeNumber: 'HUB-BEG-404',
      routeName: 'Hubli to Belgaum',
      source: { city: 'Hubli', busStand: 'KSRTC' },
      destination: { city: 'Belgaum', busStand: 'KSRTC' },
      distance: 100,
      duration: 150,
      baseFare: 200
    },
    departureTime: '10:00',
    arrivalTime: '12:30',
    date: new Date(),
    fare: 200,
    seatAvailability: { total: 40, available: 28, booked: 12 },
    frequency: 'Daily'
  },
  {
    _id: '4',
    bus: {
      _id: 'bus4',
      busNumber: 'KA19-MN-2468',
      registrationId: 'KA19MN2468',
      busType: 'Volvo',
      isAC: true,
      totalSeats: 40,
      availableSeats: 35,
      status: 'On Time',
      amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Reading Light', 'Blanket']
    },
    route: {
      _id: 'route4',
      routeNumber: 'MNG-UDP-303',
      routeName: 'Mangalore to Udupi',
      source: { city: 'Mangalore', busStand: 'KSRTC' },
      destination: { city: 'Udupi', busStand: 'KSRTC' },
      distance: 60,
      duration: 120,
      baseFare: 120
    },
    departureTime: '11:00',
    arrivalTime: '13:00',
    date: new Date(),
    fare: 120,
    seatAvailability: { total: 40, available: 35, booked: 5 },
    frequency: 'Daily'
  },
  {
    _id: '5',
    bus: {
      _id: 'bus5',
      busNumber: 'KA05-EF-9876',
      registrationId: 'KA05EF9876',
      busType: 'Airavat',
      isAC: true,
      totalSeats: 45,
      availableSeats: 41,
      status: 'On Time',
      amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Snacks']
    },
    route: {
      _id: 'route5',
      routeNumber: 'SHI-HAS-505',
      routeName: 'Shimoga to Hassan',
      source: { city: 'Shimoga', busStand: 'KSRTC' },
      destination: { city: 'Hassan', busStand: 'KSRTC' },
      distance: 140,
      duration: 210,
      baseFare: 260
    },
    departureTime: '07:00',
    arrivalTime: '10:30',
    date: new Date(),
    fare: 260,
    seatAvailability: { total: 45, available: 41, booked: 4 },
    frequency: 'Daily'
  }
];

module.exports = mockSchedules;