// Comprehensive dummy data for KSRTC bus search
const dummyBusData = {
  // 20+ source-destination pairs with multiple buses each
  routes: [
    {
      id: 'blr-mys',
      source: 'Bangalore',
      destination: 'Mysore',
      buses: [
        {
          id: 'bus1',
          busNumber: 'KA01-AB-1234',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '06:00',
          arrivalTime: '09:30',
          fare: 350,
          availableSeats: 38,
          totalSeats: 45,
          duration: '3h 30m',
          status: 'On Time'
        },
        {
          id: 'bus2',
          busNumber: 'KA01-CD-5678',
          busType: 'Airavat',
          isAC: true,
          departureTime: '08:00',
          arrivalTime: '11:30',
          fare: 400,
          availableSeats: 42,
          totalSeats: 50,
          duration: '3h 30m',
          status: 'On Time'
        },
        {
          id: 'bus3',
          busNumber: 'KA01-EF-9012',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '10:00',
          arrivalTime: '13:45',
          fare: 200,
          availableSeats: 35,
          totalSeats: 40,
          duration: '3h 45m',
          status: 'On Time'
        },
        {
          id: 'bus4',
          busNumber: 'KA01-GH-3456',
          busType: 'Express',
          isAC: false,
          departureTime: '14:00',
          arrivalTime: '17:30',
          fare: 250,
          availableSeats: 28,
          totalSeats: 35,
          duration: '3h 30m',
          status: 'Delayed'
        }
      ]
    },
    {
      id: 'blr-mng',
      source: 'Bangalore',
      destination: 'Mangalore',
      buses: [
        {
          id: 'bus5',
          busNumber: 'KA09-AB-1234',
          busType: 'Volvo',
          isAC: true,
          departureTime: '07:00',
          arrivalTime: '15:00',
          fare: 800,
          availableSeats: 40,
          totalSeats: 45,
          duration: '8h',
          status: 'On Time'
        },
        {
          id: 'bus6',
          busNumber: 'KA09-CD-5678',
          busType: 'Airavat Club Class',
          isAC: true,
          departureTime: '09:00',
          arrivalTime: '17:00',
          fare: 1200,
          availableSeats: 25,
          totalSeats: 30,
          duration: '8h',
          status: 'On Time'
        },
        {
          id: 'bus7',
          busNumber: 'KA09-EF-9012',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '21:00',
          arrivalTime: '05:00',
          fare: 600,
          availableSeats: 38,
          totalSeats: 42,
          duration: '8h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'blr-hub',
      source: 'Bangalore',
      destination: 'Hubli',
      buses: [
        {
          id: 'bus8',
          busNumber: 'KA27-AB-1234',
          busType: 'Airavat',
          isAC: true,
          departureTime: '06:30',
          arrivalTime: '13:30',
          fare: 700,
          availableSeats: 35,
          totalSeats: 40,
          duration: '7h',
          status: 'On Time'
        },
        {
          id: 'bus9',
          busNumber: 'KA27-CD-5678',
          busType: 'Sleeper',
          isAC: true,
          departureTime: '22:00',
          arrivalTime: '05:00',
          fare: 900,
          availableSeats: 20,
          totalSeats: 28,
          duration: '7h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'mys-blr',
      source: 'Mysore',
      destination: 'Bangalore',
      buses: [
        {
          id: 'bus10',
          busNumber: 'KA13-AB-1234',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '07:00',
          arrivalTime: '10:30',
          fare: 350,
          availableSeats: 40,
          totalSeats: 45,
          duration: '3h 30m',
          status: 'On Time'
        },
        {
          id: 'bus11',
          busNumber: 'KA13-CD-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '11:00',
          arrivalTime: '14:45',
          fare: 220,
          availableSeats: 30,
          totalSeats: 38,
          duration: '3h 45m',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'mng-udp',
      source: 'Mangalore',
      destination: 'Udupi',
      buses: [
        {
          id: 'bus12',
          busNumber: 'KA19-AB-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '08:00',
          arrivalTime: '10:00',
          fare: 120,
          availableSeats: 35,
          totalSeats: 40,
          duration: '2h',
          status: 'On Time'
        },
        {
          id: 'bus13',
          busNumber: 'KA19-CD-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '14:00',
          arrivalTime: '16:00',
          fare: 150,
          availableSeats: 42,
          totalSeats: 48,
          duration: '2h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'hub-blg',
      source: 'Hubli',
      destination: 'Belgaum',
      buses: [
        {
          id: 'bus14',
          busNumber: 'KA25-AB-1234',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '09:00',
          arrivalTime: '11:30',
          fare: 250,
          availableSeats: 38,
          totalSeats: 42,
          duration: '2h 30m',
          status: 'On Time'
        },
        {
          id: 'bus15',
          busNumber: 'KA25-CD-5678',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '13:00',
          arrivalTime: '15:45',
          fare: 150,
          availableSeats: 25,
          totalSeats: 35,
          duration: '2h 45m',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'shi-has',
      source: 'Shimoga',
      destination: 'Hassan',
      buses: [
        {
          id: 'bus16',
          busNumber: 'KA22-AB-1234',
          busType: 'Express',
          isAC: false,
          departureTime: '07:30',
          arrivalTime: '10:30',
          fare: 180,
          availableSeats: 32,
          totalSeats: 40,
          duration: '3h',
          status: 'On Time'
        },
        {
          id: 'bus17',
          busNumber: 'KA22-CD-5678',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '14:00',
          arrivalTime: '17:00',
          fare: 280,
          availableSeats: 28,
          totalSeats: 35,
          duration: '3h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'glb-bly',
      source: 'Gulbarga',
      destination: 'Bellary',
      buses: [
        {
          id: 'bus18',
          busNumber: 'KA31-AB-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '06:00',
          arrivalTime: '12:00',
          fare: 350,
          availableSeats: 30,
          totalSeats: 38,
          duration: '6h',
          status: 'On Time'
        },
        {
          id: 'bus19',
          busNumber: 'KA31-CD-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '13:00',
          arrivalTime: '19:00',
          fare: 400,
          availableSeats: 35,
          totalSeats: 42,
          duration: '6h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'tum-blr',
      source: 'Tumkur',
      destination: 'Bangalore',
      buses: [
        {
          id: 'bus20',
          busNumber: 'KA11-AB-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '08:00',
          arrivalTime: '10:30',
          fare: 150,
          availableSeats: 38,
          totalSeats: 45,
          duration: '2h 30m',
          status: 'On Time'
        },
        {
          id: 'bus21',
          busNumber: 'KA11-CD-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '15:00',
          arrivalTime: '17:30',
          fare: 180,
          availableSeats: 25,
          totalSeats: 32,
          duration: '2h 30m',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'dav-blr',
      source: 'Davangere',
      destination: 'Bangalore',
      buses: [
        {
          id: 'bus22',
          busNumber: 'KA20-AB-1234',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '07:00',
          arrivalTime: '12:00',
          fare: 450,
          availableSeats: 40,
          totalSeats: 48,
          duration: '5h',
          status: 'On Time'
        },
        {
          id: 'bus23',
          busNumber: 'KA20-CD-5678',
          busType: 'Sleeper',
          isAC: true,
          departureTime: '22:00',
          arrivalTime: '03:00',
          fare: 650,
          availableSeats: 18,
          totalSeats: 24,
          duration: '5h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'bid-glb',
      source: 'Bidar',
      destination: 'Gulbarga',
      buses: [
        {
          id: 'bus24',
          busNumber: 'KA32-AB-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '09:00',
          arrivalTime: '12:00',
          fare: 120,
          availableSeats: 28,
          totalSeats: 35,
          duration: '3h',
          status: 'On Time'
        },
        {
          id: 'bus25',
          busNumber: 'KA32-CD-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '15:00',
          arrivalTime: '17:30',
          fare: 150,
          availableSeats: 33,
          totalSeats: 40,
          duration: '2h 30m',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'udp-mng',
      source: 'Udupi',
      destination: 'Mangalore',
      buses: [
        {
          id: 'bus26',
          busNumber: 'KA19-EF-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '09:00',
          arrivalTime: '11:00',
          fare: 120,
          availableSeats: 35,
          totalSeats: 40,
          duration: '2h',
          status: 'On Time'
        },
        {
          id: 'bus27',
          busNumber: 'KA19-GH-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '16:00',
          arrivalTime: '18:00',
          fare: 140,
          availableSeats: 30,
          totalSeats: 36,
          duration: '2h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'blg-hub',
      source: 'Belgaum',
      destination: 'Hubli',
      buses: [
        {
          id: 'bus28',
          busNumber: 'KA25-EF-1234',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '08:00',
          arrivalTime: '10:30',
          fare: 250,
          availableSeats: 36,
          totalSeats: 42,
          duration: '2h 30m',
          status: 'On Time'
        },
        {
          id: 'bus29',
          busNumber: 'KA25-GH-5678',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '14:00',
          arrivalTime: '16:45',
          fare: 160,
          availableSeats: 28,
          totalSeats: 35,
          duration: '2h 45m',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'has-shi',
      source: 'Hassan',
      destination: 'Shimoga',
      buses: [
        {
          id: 'bus30',
          busNumber: 'KA22-EF-1234',
          busType: 'Express',
          isAC: false,
          departureTime: '08:30',
          arrivalTime: '11:30',
          fare: 180,
          availableSeats: 34,
          totalSeats: 40,
          duration: '3h',
          status: 'On Time'
        },
        {
          id: 'bus31',
          busNumber: 'KA22-GH-5678',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '15:00',
          arrivalTime: '18:00',
          fare: 280,
          availableSeats: 25,
          totalSeats: 32,
          duration: '3h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'bly-glb',
      source: 'Bellary',
      destination: 'Gulbarga',
      buses: [
        {
          id: 'bus32',
          busNumber: 'KA31-EF-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '07:00',
          arrivalTime: '13:00',
          fare: 350,
          availableSeats: 32,
          totalSeats: 40,
          duration: '6h',
          status: 'On Time'
        },
        {
          id: 'bus33',
          busNumber: 'KA31-GH-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '14:00',
          arrivalTime: '20:00',
          fare: 400,
          availableSeats: 38,
          totalSeats: 45,
          duration: '6h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'blr-tum',
      source: 'Bangalore',
      destination: 'Tumkur',
      buses: [
        {
          id: 'bus34',
          busNumber: 'KA11-EF-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '09:00',
          arrivalTime: '11:30',
          fare: 150,
          availableSeats: 40,
          totalSeats: 48,
          duration: '2h 30m',
          status: 'On Time'
        },
        {
          id: 'bus35',
          busNumber: 'KA11-GH-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '16:00',
          arrivalTime: '18:30',
          fare: 180,
          availableSeats: 30,
          totalSeats: 36,
          duration: '2h 30m',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'blr-dav',
      source: 'Bangalore',
      destination: 'Davangere',
      buses: [
        {
          id: 'bus36',
          busNumber: 'KA20-EF-1234',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '08:00',
          arrivalTime: '13:00',
          fare: 450,
          availableSeats: 42,
          totalSeats: 50,
          duration: '5h',
          status: 'On Time'
        },
        {
          id: 'bus37',
          busNumber: 'KA20-GH-5678',
          busType: 'Sleeper',
          isAC: true,
          departureTime: '21:00',
          arrivalTime: '02:00',
          fare: 650,
          availableSeats: 20,
          totalSeats: 28,
          duration: '5h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'glb-bid',
      source: 'Gulbarga',
      destination: 'Bidar',
      buses: [
        {
          id: 'bus38',
          busNumber: 'KA32-EF-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '10:00',
          arrivalTime: '13:00',
          fare: 120,
          availableSeats: 30,
          totalSeats: 38,
          duration: '3h',
          status: 'On Time'
        },
        {
          id: 'bus39',
          busNumber: 'KA32-GH-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '16:00',
          arrivalTime: '18:30',
          fare: 150,
          availableSeats: 35,
          totalSeats: 42,
          duration: '2h 30m',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'chi-mag',
      source: 'Chikmagalur',
      destination: 'Mangalore',
      buses: [
        {
          id: 'bus40',
          busNumber: 'KA18-AB-1234',
          busType: 'Express',
          isAC: false,
          departureTime: '07:00',
          arrivalTime: '11:00',
          fare: 280,
          availableSeats: 28,
          totalSeats: 35,
          duration: '4h',
          status: 'On Time'
        },
        {
          id: 'bus41',
          busNumber: 'KA18-CD-5678',
          busType: 'Rajahamsa',
          isAC: true,
          departureTime: '13:00',
          arrivalTime: '17:00',
          fare: 380,
          availableSeats: 32,
          totalSeats: 40,
          duration: '4h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'kod-mys',
      source: 'Coorg',
      destination: 'Mysore',
      buses: [
        {
          id: 'bus42',
          busNumber: 'KA57-AB-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '08:00',
          arrivalTime: '11:00',
          fare: 200,
          availableSeats: 25,
          totalSeats: 32,
          duration: '3h',
          status: 'On Time'
        },
        {
          id: 'bus43',
          busNumber: 'KA57-CD-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '14:00',
          arrivalTime: '17:00',
          fare: 250,
          availableSeats: 30,
          totalSeats: 38,
          duration: '3h',
          status: 'On Time'
        }
      ]
    },
    {
      id: 'kar-ngo',
      source: 'Karwar',
      destination: 'Mangalore',
      buses: [
        {
          id: 'bus44',
          busNumber: 'KA53-AB-1234',
          busType: 'Ordinary',
          isAC: false,
          departureTime: '06:00',
          arrivalTime: '12:00',
          fare: 320,
          availableSeats: 35,
          totalSeats: 42,
          duration: '6h',
          status: 'On Time'
        },
        {
          id: 'bus45',
          busNumber: 'KA53-CD-5678',
          busType: 'Express',
          isAC: false,
          departureTime: '13:00',
          arrivalTime: '19:00',
          fare: 380,
          availableSeats: 28,
          totalSeats: 35,
          duration: '6h',
          status: 'On Time'
        }
      ]
    }
  ],

  // Helper function to search for buses
  searchBuses: function(source, destination, date) {
    const sourceLower = source.toLowerCase();
    const destLower = destination.toLowerCase();
    
    // Find matching route
    const route = this.routes.find(r => 
      r.source.toLowerCase() === sourceLower && 
      r.destination.toLowerCase() === destLower
    );
    
    if (!route) {
      return [];
    }
    
    // Convert to schedule format for frontend compatibility
    return route.buses.map(bus => ({
      _id: bus.id,
      bus: {
        _id: bus.id,
        busNumber: bus.busNumber,
        busType: bus.busType,
        isAC: bus.isAC,
        totalSeats: bus.totalSeats,
        availableSeats: bus.availableSeats,
        status: bus.status,
        amenities: this.getAmenities(bus.busType)
      },
      route: {
        _id: route.id,
        routeNumber: `${this.getRouteCode(source)}-${this.getRouteCode(destination)}-001`,
        routeName: `${source} to ${destination}`,
        source: { city: source, busStand: 'KSRTC' },
        destination: { city: destination, busStand: 'KSRTC' },
        distance: this.getDistance(source, destination),
        duration: this.getDurationMinutes(bus.duration),
        baseFare: bus.fare
      },
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      date: new Date(date),
      fare: bus.fare,
      seatAvailability: { 
        total: bus.totalSeats, 
        available: bus.availableSeats, 
        booked: bus.totalSeats - bus.availableSeats 
      },
      frequency: 'Daily'
    }));
  },

  // Helper functions
  getAmenities: function(busType) {
    const amenitiesMap = {
      'Volvo': ['WiFi', 'Charging Point', 'Water Bottle', 'Reading Light', 'Blanket'],
      'Airavat Club Class': ['WiFi', 'Charging Point', 'Water Bottle', 'Reading Light', 'Blanket', 'Snacks'],
      'Airavat': ['WiFi', 'Charging Point', 'Water Bottle', 'Snacks'],
      'Rajahamsa': ['WiFi', 'Charging Point', 'Water Bottle'],
      'Sleeper': ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
      'Express': ['Charging Point', 'Water Bottle'],
      'Ordinary': ['Water Bottle']
    };
    return amenitiesMap[busType] || ['Water Bottle'];
  },

  getRouteCode: function(city) {
    const codes = {
      'Bangalore': 'BLR',
      'Mysore': 'MYS',
      'Mangalore': 'MNG',
      'Hubli': 'HUB',
      'Belgaum': 'BLG',
      'Gulbarga': 'GLB',
      'Tumkur': 'TUM',
      'Shimoga': 'SHI',
      'Hassan': 'HAS',
      'Davangere': 'DAV',
      'Bellary': 'BLY',
      'Bijapur': 'BJP',
      'Udupi': 'UDP',
      'Chikmagalur': 'CHI',
      'Coorg': 'KOD',
      'Chitradurga': 'CHI',
      'Raichur': 'RCU',
      'Kolar': 'KLR',
      'Ranebennur': 'RBN',
      'Gadag': 'GDG',
      'Bagalkot': 'BKG',
      'Bidar': 'BID',
      'Hospet': 'HPT',
      'Chikballapur': 'CBP',
      'Mandya': 'MDY',
      'Ramanagara': 'RMG',
      'Kundapura': 'KDR',
      'Sirsi': 'SRS',
      'Sagar': 'SGR',
      'Karwar': 'KRW',
      'Yellapur': 'YLP',
      'Nargund': 'NRD',
      'Lakshmeshwar': 'LKS',
      'Gokak': 'GOK',
      'Saundatti': 'SDT',
      'Mudhol': 'MDL',
      'Athani': 'ATN',
      'Kumta': 'KMT',
      'Honnavar': 'HNR',
      'Bhatkal': 'BTK',
      'Siddapur': 'SDP',
      'Yana': 'YNA',
      'Joida': 'JDA'
    };
    return codes[city] || city.substring(0, 3).toUpperCase();
  },

  getDistance: function(source, destination) {
    // Approximate distances in km
    const distances = {
      'Bangalore-Mysore': 150,
      'Bangalore-Mangalore': 350,
      'Bangalore-Hubli': 400,
      'Mysore-Bangalore': 150,
      'Mangalore-Udupi': 60,
      'Hubli-Belgaum': 100,
      'Shimoga-Hassan': 140,
      'Gulbarga-Bellary': 320,
      'Tumkur-Bangalore': 70,
      'Davangere-Bangalore': 260,
      'Bidar-Gulbarga': 120,
      'Udupi-Mangalore': 60,
      'Belgaum-Hubli': 100,
      'Hassan-Shimoga': 140,
      'Bellary-Gulbarga': 320,
      'Bangalore-Tumkur': 70,
      'Bangalore-Davangere': 260,
      'Gulbarga-Bidar': 120,
      'Chikmagalur-Mangalore': 200,
      'Coorg-Mysore': 120,
      'Karwar-Mangalore': 300
    };
    return distances[`${source}-${destination}`] || 200;
  },

  getDurationMinutes: function(duration) {
    // Convert "3h 30m" to minutes
    if (duration.includes('h')) {
      const parts = duration.split('h');
      const hours = parseInt(parts[0]);
      const minutes = parts[1] ? parseInt(parts[1].replace('m', '').trim()) : 0;
      return hours * 60 + minutes;
    }
    return parseInt(duration);
  }
};

module.exports = dummyBusData;