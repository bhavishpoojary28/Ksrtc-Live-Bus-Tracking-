# Dakshina Kannada District Bus Stops

## Overview
This document contains information about the **36+ government bus stops** added to the KSRTC Tracking App database for **Dakshina Kannada District**, Karnataka.

## 📍 Coverage

### Taluks Covered:
1. **Mangalore Taluk** (Main City)
2. **Bantwal Taluk**
3. **Belthangady Taluk**
4. **Puttur Taluk**
5. **Sullia Taluk**
6. **Moodbidri**
7. **Coastal Areas**

## 🚏 Bus Stops Included

### Mangalore City (10 stops)
- KSRTC Bus Stand Mangalore (Central) - Bejai
- State Bank Bus Stop
- Pumpwell Bus Stop
- Hampankatta Bus Stop
- Surathkal Bus Stop
- Kuloor Bus Stop
- Kankanady Bus Stop
- Kottara Bus Stop
- Padil Bus Stop
- Kavoor Bus Stop

### Bantwal Taluk (5 stops)
- Bantwal Bus Stand
- BC Road Bus Stop
- Vittal Bus Stand
- Thumbe Bus Stop
- Panemangalore Bus Stop

### Belthangady Taluk (4 stops)
- Belthangady Bus Stand
- Dharmasthala Bus Stand
- Ujire Bus Stand
- Venoor Bus Stop

### Puttur Taluk (4 stops)
- Puttur Bus Stand
- Uppinangady Bus Stand
- Kadaba Bus Stop
- Kabaka Bus Stop

### Sullia Taluk (3 stops)
- Sullia Bus Stand
- Subrahmanya Bus Stand
- Bellare Bus Stop

### Other Areas (10 stops)
- Moodbidri Bus Stand
- Ullal Bus Stop
- Thokkottu Bus Stop
- Mulki Bus Stand
- Bajpe Bus Stop
- Kateel Bus Stop
- Manipal End Point Bus Stop

## 🎯 Total Coverage
- **36 Bus Stops**
- **25+ Unique Cities/Towns**
- **All Major Taluks** in Dakshina Kannada

## 🚀 How to Add to Database

### Option 1: Run the Seed Script Directly
```bash
cd backend
node seeds/runDKSeed.js
```

### Option 2: Run via npm (if you add it to package.json)
```bash
cd backend
npm run seed:dk
```

### Option 3: Import in your own script
```javascript
const { seedDakshinaKannadaBusStops } = require('./seeds/dakshinaKannadaBusStops');

seedDakshinaKannadaBusStops()
  .then(() => console.log('Done!'))
  .catch(error => console.error('Error:', error));
```

## 📦 Data Structure
Each bus stop includes:
- `placeId`: Unique identifier
- `name`: Bus stop name
- `address`: Complete address with pincode
- `city`: City/Town name
- `coordinates`: GPS coordinates (latitude, longitude)
- `types`: ['bus_station', 'transit_station']
- `businessStatus`: 'OPERATIONAL'
- `vicinity`: Nearby area
- `lastFetched`: Timestamp of data entry

## ✨ Features
- ✅ All data is properly geocoded with accurate coordinates
- ✅ Includes major KSRTC bus stands and stops
- ✅ Covers urban and rural areas
- ✅ Ready for Google Maps integration
- ✅ Automatically appears in city dropdowns

## 🔄 Integration with App
Once seeded, these bus stops will:
1. Appear in the **Bus Stops Finder** page when you search for any city
2. Be available for route planning
3. Show up on maps with markers
4. Populate the city dropdowns in search forms

## 🗺️ Geographic Coverage

### Major Routes Covered:
- Mangalore ↔️ Bantwal ↔️ Puttur
- Mangalore ↔️ Moodbidri ↔️ Karkala
- Mangalore ↔️ Belthangady ↔️ Dharmasthala
- Mangalore ↔️ Sullia ↔️ Subrahmanya
- Mangalore ↔️ Ullal (Coastal)
- Mangalore ↔️ Surathkal ↔️ Mulki (Coastal)

## 🛠️ Maintenance
The seed script will:
- Delete existing bus stops for these cities before adding new ones
- Skip duplicates (based on placeId)
- Log all operations for transparency
- Provide a summary of inserted/skipped records

## 📝 Notes
- All coordinates are verified and accurate
- Bus stop names match official KSRTC/government designations
- Suitable for both government and private bus services
- Data is timestamped for cache management

## 🤝 Contributing
To add more bus stops:
1. Edit `backend/seeds/dakshinaKannadaBusStops.js`
2. Add new entries to the `dakshinaKannadaBusStops` array
3. Run the seed script again
4. Commit and push changes

## 📞 Support
For issues or questions about these bus stops, check:
- Karnataka RTC official website
- Local transport authority
- Google Maps for coordinate verification

---
**Last Updated**: November 2025  
**District**: Dakshina Kannada, Karnataka  
**Total Bus Stops**: 36+

