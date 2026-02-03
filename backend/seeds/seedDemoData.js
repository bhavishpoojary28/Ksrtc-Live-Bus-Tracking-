const mongoose = require('mongoose');
require('dotenv').config();
const Route = require('../models/Route');
const Bus = require('../models/Bus');
const Schedule = require('../models/Schedule');

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function routeData() {
  return [
    {
      routeNumber: 'BLR-MYS-101',
      routeName: 'Bangalore to Mysore',
      source: { city: 'Bangalore', busStand: 'Majestic', coordinates: { latitude: 12.9716, longitude: 77.5946 } },
      destination: { city: 'Mysore', busStand: 'Suburban', coordinates: { latitude: 12.2958, longitude: 76.6394 } },
      stops: [
        { name: 'Mandya', coordinates: { latitude: 12.5223, longitude: 76.8970 }, stopOrder: 1 },
        { name: 'Srirangapatna', coordinates: { latitude: 12.4220, longitude: 76.6936 }, stopOrder: 2 },
      ],
      distance: 150,
      duration: 240,
      baseFare: 300,
    },
    {
      routeNumber: 'BLR-MNG-202',
      routeName: 'Bangalore to Mangalore',
      source: { city: 'Bangalore', busStand: 'Majestic', coordinates: { latitude: 12.9716, longitude: 77.5946 } },
      destination: { city: 'Mangalore', busStand: 'KSRTC', coordinates: { latitude: 12.9141, longitude: 74.8560 } },
      stops: [
        { name: 'Hassan', coordinates: { latitude: 13.0050, longitude: 76.1020 }, stopOrder: 1 },
        { name: 'Udupi', coordinates: { latitude: 13.3409, longitude: 74.7421 }, stopOrder: 2 },
      ],
      distance: 350,
      duration: 540,
      baseFare: 600,
    },
    {
      routeNumber: 'MNG-UDP-303',
      routeName: 'Mangalore to Udupi',
      source: { city: 'Mangalore', busStand: 'KSRTC', coordinates: { latitude: 12.9141, longitude: 74.8560 } },
      destination: { city: 'Udupi', busStand: 'KSRTC', coordinates: { latitude: 13.3409, longitude: 74.7421 } },
      stops: [
        { name: 'Surathkal', coordinates: { latitude: 12.9816, longitude: 74.8080 }, stopOrder: 1 },
        { name: 'Kapu', coordinates: { latitude: 13.2095, longitude: 74.7475 }, stopOrder: 2 },
      ],
      distance: 60,
      duration: 120,
      baseFare: 120,
    },
    {
      routeNumber: 'HUB-BEG-404',
      routeName: 'Hubli to Belgaum',
      source: { city: 'Hubli', busStand: 'KSRTC', coordinates: { latitude: 15.3647, longitude: 75.1239 } },
      destination: { city: 'Belgaum', busStand: 'KSRTC', coordinates: { latitude: 15.8497, longitude: 74.4977 } },
      stops: [
        { name: 'Dharwad', coordinates: { latitude: 15.4589, longitude: 75.0078 }, stopOrder: 1 },
        { name: 'Khanapur', coordinates: { latitude: 15.6420, longitude: 74.5085 }, stopOrder: 2 },
      ],
      distance: 100,
      duration: 150,
      baseFare: 200,
    },
    {
      routeNumber: 'SHI-HAS-505',
      routeName: 'Shimoga to Hassan',
      source: { city: 'Shimoga', busStand: 'KSRTC', coordinates: { latitude: 13.9299, longitude: 75.5681 } },
      destination: { city: 'Hassan', busStand: 'KSRTC', coordinates: { latitude: 13.0050, longitude: 76.1020 } },
      stops: [
        { name: 'Arsikere', coordinates: { latitude: 13.3132, longitude: 76.2540 }, stopOrder: 1 },
        { name: 'Belur', coordinates: { latitude: 13.1629, longitude: 75.8651 }, stopOrder: 2 },
      ],
      distance: 140,
      duration: 210,
      baseFare: 260,
    },
    {
      routeNumber: 'GLB-BLY-606',
      routeName: 'Gulbarga to Bellary',
      source: { city: 'Gulbarga', busStand: 'KSRTC', coordinates: { latitude: 17.3297, longitude: 76.8343 } },
      destination: { city: 'Bellary', busStand: 'KSRTC', coordinates: { latitude: 15.1394, longitude: 76.9214 } },
      stops: [
        { name: 'Koppal', coordinates: { latitude: 15.3500, longitude: 76.1500 }, stopOrder: 1 },
        { name: 'Hospet', coordinates: { latitude: 15.2695, longitude: 76.3870 }, stopOrder: 2 },
      ],
      distance: 320,
      duration: 480,
      baseFare: 550,
    },
    {
      routeNumber: 'MNG-BTW-701',
      routeName: 'Mangalore to Bantwal',
      source: { city: 'Mangalore', busStand: 'KSRTC', coordinates: { latitude: 12.9141, longitude: 74.8560 } },
      destination: { city: 'Bantwal', busStand: 'BC Road', coordinates: { latitude: 12.8956, longitude: 75.0348 } },
      stops: [
        { name: 'Pumpwell', coordinates: { latitude: 12.8974, longitude: 74.8479 }, stopOrder: 1 },
        { name: 'BC Road', coordinates: { latitude: 12.8889, longitude: 75.0364 }, stopOrder: 2 },
        { name: 'Panemangalore', coordinates: { latitude: 12.8142, longitude: 75.0892 }, stopOrder: 3 }
      ],
      distance: 30,
      duration: 60,
      baseFare: 60,
    },
    {
      routeNumber: 'MNG-PTR-702',
      routeName: 'Mangalore to Puttur',
      source: { city: 'Mangalore', busStand: 'KSRTC', coordinates: { latitude: 12.9141, longitude: 74.8560 } },
      destination: { city: 'Puttur', busStand: 'Bus Stand', coordinates: { latitude: 12.7596, longitude: 75.1991 } },
      stops: [
        { name: 'BC Road', coordinates: { latitude: 12.8889, longitude: 75.0364 }, stopOrder: 1 },
        { name: 'Kabaka', coordinates: { latitude: 12.7231, longitude: 75.2489 }, stopOrder: 2 }
      ],
      distance: 50,
      duration: 90,
      baseFare: 100,
    },
    {
      routeNumber: 'MNG-MBD-703',
      routeName: 'Mangalore to Moodbidri',
      source: { city: 'Mangalore', busStand: 'KSRTC', coordinates: { latitude: 12.9141, longitude: 74.8560 } },
      destination: { city: 'Moodbidri', busStand: 'Bus Stand', coordinates: { latitude: 13.0676, longitude: 74.9934 } },
      stops: [
        { name: 'Surathkal', coordinates: { latitude: 13.0067, longitude: 74.7951 }, stopOrder: 1 }
      ],
      distance: 35,
      duration: 70,
      baseFare: 80,
    },
    {
      routeNumber: 'PTR-SUL-705',
      routeName: 'Puttur to Sullia',
      source: { city: 'Puttur', busStand: 'Bus Stand', coordinates: { latitude: 12.7596, longitude: 75.1991 } },
      destination: { city: 'Sullia', busStand: 'Bus Stand', coordinates: { latitude: 12.5605, longitude: 75.3859 } },
      stops: [
        { name: 'Uppinangady', coordinates: { latitude: 12.8917, longitude: 75.2861 }, stopOrder: 1 },
        { name: 'Bellare', coordinates: { latitude: 12.6789, longitude: 75.4123 }, stopOrder: 2 }
      ],
      distance: 45,
      duration: 80,
      baseFare: 90,
    },
  ];
}

function busData(routes) {
  const map = {};
  routes.forEach((r) => (map[r.routeNumber] = r));
  return [
    { busNumber: 'KA01-AB-1234', registrationId: 'KA01AB1234', busType: 'Ordinary', isAC: false, totalSeats: 40, availableSeats: 32, route: map['BLR-MYS-101']._id, currentLocation: { latitude: 12.9716, longitude: 77.5946 }, status: 'On Time' },
    { busNumber: 'KA09-XY-5678', registrationId: 'KA09XY5678', busType: 'Express', isAC: false, totalSeats: 45, availableSeats: 40, route: map['BLR-MNG-202']._id, currentLocation: { latitude: 12.9716, longitude: 77.5946 }, status: 'On Time' },
    { busNumber: 'KA19-MN-2468', registrationId: 'KA19MN2468', busType: 'Ordinary', isAC: false, totalSeats: 40, availableSeats: 36, route: map['MNG-UDP-303']._id, currentLocation: { latitude: 12.9141, longitude: 74.8560 }, status: 'On Time' },
    { busNumber: 'KA27-CD-1357', registrationId: 'KA27CD1357', busType: 'Rajahamsa', isAC: true, totalSeats: 40, availableSeats: 28, route: map['HUB-BEG-404']._id, currentLocation: { latitude: 15.3647, longitude: 75.1239 }, status: 'On Time' },
    { busNumber: 'KA05-EF-9876', registrationId: 'KA05EF9876', busType: 'Express', isAC: false, totalSeats: 45, availableSeats: 41, route: map['SHI-HAS-505']._id, currentLocation: { latitude: 13.9299, longitude: 75.5681 }, status: 'On Time' },
    { busNumber: 'KA22-GH-1122', registrationId: 'KA22GH1122', busType: 'Sleeper', isAC: true, totalSeats: 40, availableSeats: 34, route: map['GLB-BLY-606']._id, currentLocation: { latitude: 17.3297, longitude: 76.8343 }, status: 'On Time' },
    { busNumber: 'KA19-DK-7001', registrationId: 'KA19DK7001', busType: 'Ordinary', isAC: false, totalSeats: 40, availableSeats: 35, route: map['MNG-BTW-701']?._id, currentLocation: { latitude: 12.8974, longitude: 74.8479 }, status: 'On Time' },
    { busNumber: 'KA19-DK-7002', registrationId: 'KA19DK7002', busType: 'Express', isAC: false, totalSeats: 45, availableSeats: 42, route: map['MNG-PTR-702']?._id, currentLocation: { latitude: 12.8889, longitude: 75.0364 }, status: 'On Time' },
    { busNumber: 'KA19-DK-7003', registrationId: 'KA19DK7003', busType: 'Ordinary', isAC: false, totalSeats: 40, availableSeats: 38, route: map['MNG-MBD-703']?._id, currentLocation: { latitude: 13.0067, longitude: 74.7951 }, status: 'On Time' },
    { busNumber: 'KA19-DK-7005', registrationId: 'KA19DK7005', busType: 'Ordinary', isAC: false, totalSeats: 40, availableSeats: 37, route: map['PTR-SUL-705']?._id, currentLocation: { latitude: 12.7596, longitude: 75.1991 }, status: 'On Time' },
  ];
}

function scheduleData(buses, routes) {
  const today = new Date();
  return buses.map((b, i) => {
    const route = routes.find((r) => String(r._id) === String(b.route));
    const dep = `${8 + i}:00`;
    const arr = `${(8 + i + Math.ceil(route.duration / 60)) % 24}:00`;
    return {
      bus: b._id,
      route: route._id,
      departureTime: dep,
      arrivalTime: arr,
      date: today,
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      frequency: 'Daily',
      fare: route.baseFare,
      seatAvailability: { total: b.totalSeats, available: b.availableSeats, booked: b.totalSeats - b.availableSeats },
    };
  });
}

async function upsertRoute(r) {
  const existing = await Route.findOne({ routeNumber: r.routeNumber });
  if (existing) return existing;
  const doc = new Route({ ...r, isActive: true });
  return doc.save();
}

async function upsertBus(b) {
  const existing = await Bus.findOne({ busNumber: b.busNumber });
  if (existing) return existing;
  const doc = new Bus({ ...b, amenities: [], isActive: true });
  return doc.save();
}

async function upsertSchedule(s) {
  const existing = await Schedule.findOne({ bus: s.bus, route: s.route, date: s.date, departureTime: s.departureTime });
  if (existing) return existing;
  const doc = new Schedule({ ...s, isActive: true });
  return doc.save();
}

async function main() {
  await connect();
  const routesInput = routeData();
  const routes = [];
  for (const r of routesInput) {
    routes.push(await upsertRoute(r));
  }
  const busesInput = busData(routes);
  const buses = [];
  for (const b of busesInput) {
    buses.push(await upsertBus(b));
  }
  const schedulesInput = scheduleData(buses, routes);
  for (const s of schedulesInput) {
    await upsertSchedule(s);
  }
  console.log(`Seeded ${routes.length} routes, ${buses.length} buses, ${schedulesInput.length} schedules`);
  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});
