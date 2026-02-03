import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || '/api';
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('newAnnouncement', (announcement) => {
      setAnnouncements((prev) => [announcement, ...prev]);
    });

    return () => newSocket.close();
  }, [SOCKET_URL]);

  // Fetch announcements and cities on initial load
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchAnnouncements(), fetchCities()]);
    };

    initializeData();
    // We intentionally omit fetchAnnouncements and fetchCities from dependencies
    // because they are stable across renders and we only want this to run once
    // on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API_URL}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

const fetchCities = async () => {
    try {
      // Fetch cities from routes
      const routeCitiesResponse = await axios.get(`${API_URL}/routes/cities/all`);
      const routeCities = routeCitiesResponse.data || [];
      
      // Fetch cities from bus stops (fallback/additional)
      let busStopCities = [];
      try {
        const busStopCitiesResponse = await axios.get(`${API_URL}/busstops/cities/all`);
        busStopCities = busStopCitiesResponse.data || [];
      } catch (busStopError) {
        console.log('Bus stops cities not available:', busStopError.message);
      }
      
      // Combine and deduplicate cities
      let allCities = [...new Set([...routeCities, ...busStopCities])];

      // If no cities from API, use comprehensive Karnataka cities list
      if (allCities.length === 0) {
        allCities = [
          'Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga',
          'Tumkur', 'Shimoga', 'Hassan', 'Davangere', 'Bellary', 'Bijapur',
          'Udupi', 'Chikmagalur', 'Coorg', 'Chitradurga', 'Raichur', 'Kolar',
          'Ranebennur', 'Gadag', 'Bagalkot', 'Bidar', 'Hospet', 'Chikballapur',
          'Mandya', 'Ramanagara', 'Kundapura', 'Sirsi', 'Sagar', 'Karwar',
          'Yellapur', 'Nargund', 'Lakshmeshwar', 'Gokak', 'Saundatti', 'Mudhol',
          'Athani', 'Kumta', 'Honnavar', 'Bhatkal', 'Siddapur', 'Yana', 'Joida',
          'Mulgund', 'Shiggaon', 'Bankapura', 'Haveri', 'Ranebennur',
          'Byadgi', 'Savanur', 'Hangal', 'Shirahatti', 'Gundlupet', 'Nanjangud',
          'T. Narsipur', 'K.R. Nagar', 'Piriyapatna', 'Hunsur', 'Periyapatna',
          'Sakleshpur', 'Belur', 'Halebeedu', 'Arsikere', 'Channarayapatna',
          'Nagamangala', 'K.R. Pet', 'Maddur', 'Malavalli', 'Srirangapatna',
          'Tiptur', 'Sira', 'Pavagada', 'Madhugiri', 'Koratagere', 'Chiknayakanhalli',
          'Gubbi', 'Turuvekere', 'Yelahanka', 'Kengeri', 'Whitefield', 'Electronic City',
          'Hebbal', 'Jayanagar', 'Basavangudi', 'Malleshwaram', 'Rajajinagar',
          'Vijayanagar', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Marathahalli',
          'Bannerghatta Road', 'Airport Road', 'Old Airport Road', 'Residency Road',
          'Brigade Road', 'Commercial Street', 'Cubbon Park', 'Lalbagh', 'MG Road',
          'Richmond Road', 'Richmond Town', 'Frazer Town', 'Cook Town', 'Cox Town',
          'Benson Town', 'Town Hall', 'Vidhana Soudha', 'High Court', 'Central',
          'Majestic', 'City Market', 'Kalasipalyam', 'Shivajinagar', 'Russell Market',
          'Chickpet', 'Avenue Road', 'Gandhi Bazaar', 'Basavanagudi', 'Bull Temple',
          'Bugle Rock', 'Nandi Hills', 'Devanahalli', 'Hoskote', 'Anekal', 'Kanakapura',
          'Ramanagaram', 'Channapatna', 'Maddur', 'Mandya', 'Srirangapatna',
          'Mysore Road', 'Kengeri', 'Bidadi', 'Ramanagara', 'Channapatna', 'Maddur'
        ];
      }

      // Restrict to Karnataka-only by intersecting with bus stop cities when available
      if (busStopCities.length > 0) {
        const ksrtcCitySet = new Set(busStopCities.map((c) => (c || '').toLowerCase()));
        allCities = allCities.filter((c) => ksrtcCitySet.has((c || '').toLowerCase()));
      }

      setCities(allCities.sort());
      
      console.log(`Loaded ${allCities.length} cities (${routeCities.length} from routes, ${busStopCities.length} from bus stops)`);
    } catch (error) {
      console.error('Error fetching cities:', error);
      // Set comprehensive Karnataka cities as fallback
      setCities([
        'Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga',
        'Tumkur', 'Shimoga', 'Hassan', 'Davangere', 'Bellary', 'Bijapur',
        'Udupi', 'Chikmagalur', 'Coorg', 'Chitradurga', 'Raichur', 'Kolar',
        'Ranebennur', 'Gadag', 'Bagalkot', 'Bidar', 'Hospet', 'Chikballapur',
        'Mandya', 'Ramanagara', 'Kundapura', 'Sirsi', 'Sagar', 'Karwar',
        'Yellapur', 'Nargund', 'Lakshmeshwar', 'Gokak', 'Saundatti', 'Mudhol',
        'Athani', 'Kumta', 'Honnavar', 'Bhatkal', 'Siddapur', 'Yana', 'Joida',
        'Mulgund', 'Shiggaon', 'Bankapura', 'Haveri', 'Ranebennur',
        'Byadgi', 'Savanur', 'Hangal', 'Shirahatti', 'Gundlupet', 'Nanjangud',
        'T. Narsipur', 'K.R. Nagar', 'Piriyapatna', 'Hunsur', 'Periyapatna',
        'Sakleshpur', 'Belur', 'Halebeedu', 'Arsikere', 'Channarayapatna',
        'Nagamangala', 'K.R. Pet', 'Maddur', 'Malavalli', 'Srirangapatna',
        'Tiptur', 'Sira', 'Pavagada', 'Madhugiri', 'Koratagere', 'Chiknayakanhalli',
        'Gubbi', 'Turuvekere', 'Yelahanka', 'Kengeri', 'Whitefield', 'Electronic City',
        'Hebbal', 'Jayanagar', 'Basavangudi', 'Malleshwaram', 'Rajajinagar',
        'Vijayanagar', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Marathahalli',
        'Bannerghatta Road', 'Airport Road', 'Old Airport Road', 'Residency Road',
        'Brigade Road', 'Commercial Street', 'Cubbon Park', 'Lalbagh', 'MG Road',
        'Richmond Road', 'Richmond Town', 'Frazer Town', 'Cook Town', 'Cox Town',
        'Benson Town', 'Town Hall', 'Vidhana Soudha', 'High Court', 'Central',
        'Majestic', 'City Market', 'Kalasipalyam', 'Shivajinagar', 'Russell Market',
        'Chickpet', 'Avenue Road', 'Gandhi Bazaar', 'Basavanagudi', 'Bull Temple',
        'Bugle Rock', 'Nandi Hills', 'Devanahalli', 'Hoskote', 'Anekal', 'Kanakapura',
        'Ramanagaram', 'Channapatna', 'Maddur', 'Mandya', 'Srirangapatna',
        'Mysore Road', 'Kengeri', 'Bidadi', 'Ramanagara', 'Channapatna', 'Maddur'
      ]);
    }
  };

const searchBuses = async (source, destination, date) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/schedules/search/route-date`, {
        params: { source, destination, date }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching buses:', error);
      // Return mock data when API fails
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
      
      // Filter mock data based on search criteria
      const filteredMock = mockSchedules.filter(schedule => {
        const routeSource = schedule.route.source.city.toLowerCase();
        const routeDest = schedule.route.destination.city.toLowerCase();
        const searchSource = source.toLowerCase();
        const searchDest = destination.toLowerCase();
        
        return routeSource.includes(searchSource) && routeDest.includes(searchDest);
      });
      
      return filteredMock.length > 0 ? filteredMock : mockSchedules;
    } finally {
      setLoading(false);
    }
  };

  const getBusById = async (busId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/buses/${busId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bus:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const trackBus = (busNumber) => {
    if (socket) {
      socket.emit('trackBus', busNumber);
    }
  };

  const stopTrackingBus = (busNumber) => {
    if (socket) {
      socket.emit('stopTrackingBus', busNumber);
    }
  };

  const value = {
    socket,
    announcements,
    cities,
    loading,
    searchBuses,
    getBusById,
    trackBus,
    stopTrackingBus,
    API_URL
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

