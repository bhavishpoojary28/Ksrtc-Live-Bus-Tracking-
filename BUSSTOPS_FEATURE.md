# Bus Stops Finder Feature

## 🚏 Overview

The Bus Stops Finder feature automatically fetches real bus stops and nearby places using Google Maps APIs (Geocoding API and Places API). It includes smart caching to reduce API calls and provides an interactive map view with detailed information about each bus stop.

## ✨ Key Features

- **Automatic Bus Stop Discovery**: Fetches bus stops within a 5 km radius of any city
- **Smart Caching**: Stores results in MongoDB for 7 days to minimize API usage
- **Interactive Map View**: Display bus stops on Google Maps with custom markers
- **Detailed Information**: Shows ratings, addresses, and operational status
- **Real-time or Cached**: Toggle between cached data and fresh API calls
- **Search Filters**: Find bus stops with multiple strategies (bus_station, transit_station, keyword search)

## 📁 Files Created

### Backend

1. **`backend/models/BusStop.js`** - MongoDB model for caching bus stops
2. **`backend/services/googleMapsService.js`** - Service layer for Google Maps API calls
3. **`backend/routes/busStopRoutes.js`** - API endpoints for bus stops

### Frontend

1. **`frontend/src/pages/BusStops.js`** - Main bus stops page
2. **`frontend/src/components/BusStopsMap.js`** - Map component with custom markers

## 🔧 Backend Implementation

### API Endpoints

#### 1. Get Bus Stops by City
```
GET /api/busstops/:cityName
```

**Parameters:**
- `cityName` (path) - Name of the city (e.g., "Bangalore")
- `refresh` (query, optional) - Set to `true` to force fresh API call

**Response:**
```json
{
  "source": "cache" | "google_maps_api",
  "city": "Bangalore",
  "cityCoordinates": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "formattedAddress": "Bangalore, Karnataka, India"
  },
  "count": 25,
  "busStops": [
    {
      "_id": "...",
      "placeId": "ChIJ...",
      "name": "Majestic Bus Stand",
      "address": "K.H. Road, Bangalore",
      "city": "Bangalore",
      "coordinates": {
        "latitude": 12.9775,
        "longitude": 77.5714
      },
      "types": ["bus_station", "transit_station"],
      "rating": 4.2,
      "userRatingsTotal": 1250,
      "businessStatus": "OPERATIONAL"
    }
  ]
}
```

#### 2. Get Nearby Bus Stops by Coordinates
```
GET /api/busstops/nearby/:latitude/:longitude?radius=5000
```

#### 3. Get All Cached Bus Stops
```
GET /api/busstops?page=1&limit=50&city=Bangalore
```

#### 4. Clear Cache for a City (Admin)
```
DELETE /api/busstops/cache/:cityName
```

#### 5. Refresh All Cached Cities (Admin)
```
POST /api/busstops/refresh-all
```

### Caching Strategy

- **Cache Duration**: 7 days
- **Auto-expiration**: TTL index automatically removes old records after 30 days
- **Smart Fetching**: 
  1. Check MongoDB cache first
  2. If cache is older than 7 days or doesn't exist, fetch from Google Maps
  3. Combine results from multiple search strategies
  4. Remove duplicates and save to database

### Google Maps API Usage

The service uses three strategies to find bus stops:

1. **Type: `bus_station`** - Primary search for bus stations
2. **Type: `transit_station`** - Fallback for general transit stations
3. **Keyword: `"bus stop"`** - Additional keyword-based search

## 🎨 Frontend Implementation

### Bus Stops Page (`/busstops`)

**Features:**
- City selector dropdown
- Search and refresh functionality
- Split view: Map (left) + List (right)
- Statistics cards
- Cache status indicator

**Components:**
- `BusStops.js` - Main page component
- `BusStopsMap.js` - Interactive map with markers
- Material-UI for styling

### Custom Map Markers

- **Default Marker**: Red bus icon
- **Selected Marker**: Yellow bus icon with bounce animation
- **Info Windows**: Show name, address, rating, and coordinates

## 🚀 Setup Instructions

### 1. Enable Google Maps APIs

Go to [Google Cloud Console](https://console.cloud.google.com/) and enable:

- ✅ **Maps JavaScript API**
- ✅ **Geocoding API** 
- ✅ **Places API**

### 2. Update Environment Variables

**Backend** (`backend/.env`):
```env
GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 3. Install Dependencies

No additional dependencies needed - all required packages are already in `package.json`.

### 4. Start the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

### 5. Access the Feature

Navigate to: **http://localhost:3000/busstops**

## 📊 Usage Examples

### Fetch Bus Stops for a City

1. Select a city from the dropdown (e.g., "Bangalore")
2. Click "Search" button
3. View results on map and in the list
4. Click on markers to see detailed information

### Refresh Data

- Click "Refresh Data" button to fetch fresh data from Google Maps API
- Useful when you want the latest information

### View Statistics

The page displays:
- Total bus stops found
- Average rating
- Number of rated stops
- Data source (Cached vs Live API)

## 💡 Best Practices

### Minimize API Costs

1. **Use cached data** whenever possible
2. Only refresh when necessary (data older than 7 days)
3. Cache is shared across all users
4. Consider implementing rate limiting for refresh requests

### API Key Security

- Never commit API keys to version control
- Use environment variables
- Restrict API keys in Google Cloud Console:
  - HTTP referrers: `http://localhost:*`
  - API restrictions: Only enable required APIs

### Database Indexes

The BusStop model includes optimized indexes:
- `city + lastFetched` for cache lookups
- `latitude + longitude` for geospatial queries
- `placeId` unique index to prevent duplicates
- TTL index for auto-cleanup

## 🔍 Testing the Feature

### Test Scenarios

1. **First-time Search**
   - Search for "Bangalore"
   - Should show "Fresh data fetched from Google Maps API"
   - Data is cached in MongoDB

2. **Cached Search**
   - Search for the same city again
   - Should show "Showing cached data"
   - Much faster response time

3. **Force Refresh**
   - Click "Refresh Data" button
   - Should fetch fresh data from API
   - Cache is updated

4. **Multiple Cities**
   - Search different cities
   - Each city maintains its own cache

5. **Map Interaction**
   - Click on markers to view details
   - Info windows should show ratings and addresses
   - Selected marker changes color

## 📈 Performance Metrics

### Without Caching
- API call latency: ~2-3 seconds
- Cost: ~3 API calls per search (Geocoding + 2-3 Places API calls)

### With Caching
- Response time: <100ms
- Cost: $0 (served from MongoDB)
- Cache hit rate: ~90% (estimated)

## 🛠️ Troubleshooting

### No bus stops found

**Possible causes:**
1. Google Maps API key not configured
2. APIs not enabled in Google Cloud Console
3. City name not recognized
4. No bus stations in the area

**Solutions:**
- Verify API key in `.env` files
- Check Google Cloud Console for API status
- Try a different city name
- Check browser console for errors

### Map not loading

**Causes:**
- Missing or invalid API key
- API restrictions blocking requests

**Solutions:**
- Check `REACT_APP_GOOGLE_MAPS_API_KEY` in frontend `.env`
- Verify API key restrictions in Google Cloud Console

### Cache not working

**Causes:**
- MongoDB not connected
- Database permissions issue

**Solutions:**
- Check MongoDB connection in backend console
- Verify `MONGODB_URI` in backend `.env`

## 🎯 Future Enhancements

- [ ] Add route planning between bus stops
- [ ] Show real-time bus ETA at stops
- [ ] User ratings and reviews for bus stops
- [ ] Favorite bus stops feature
- [ ] Offline mode with cached data
- [ ] Export bus stops to CSV/JSON
- [ ] Admin panel for managing bus stops
- [ ] Integration with bus schedules
- [ ] Mobile app support

## 📝 API Cost Estimation

### Google Maps API Pricing (as of 2024)

- **Geocoding API**: $5 per 1,000 requests
- **Places API (Nearby Search)**: $32 per 1,000 requests

### Example Monthly Cost

Assumptions:
- 1,000 unique city searches per month
- 90% cache hit rate
- 100 new searches = 100 API calls

**Monthly cost:**
- Geocoding: 100 × $0.005 = $0.50
- Places: 300 × $0.032 = $9.60
- **Total: ~$10/month**

With caching, you save ~$90/month compared to no caching!

## 🤝 Contributing

To improve this feature:

1. Add more search strategies (e.g., `point_of_interest`)
2. Implement user feedback/ratings
3. Add photo gallery from Google Places
4. Optimize cache invalidation strategy
5. Add analytics for API usage

---

**Built with ❤️ using Google Maps Platform APIs**

