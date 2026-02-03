import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import {
  LocationOn,
  DirectionsBus,
  Refresh,
  Search
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import BusStopsMap from '../components/BusStopsMap';
import { useApp } from '../context/AppContext';

const BusStops = () => {
  const { cities } = useApp();
  const [selectedCity, setSelectedCity] = useState('');
  const [busStops, setBusStops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [cityCoordinates, setCityCoordinates] = useState(null);

  // Fetch bus stops directly from OpenStreetMap (Nominatim + Overpass), no backend API.
  const fetchBusStops = async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    try {
// 1) Geocode city using Nominatim, restricted to Karnataka, India
      const nominatimQuery = `${cityName}, Karnataka, India`;
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&addressdetails=1&q=${encodeURIComponent(nominatimQuery)}`;
      const geoRes = await axios.get(nominatimUrl, {
        headers: {
          // Nominatim policy requires a valid User-Agent or Referer identifying the app
          'Accept': 'application/json',
          'User-Agent': 'KSRTC-Tracking-App/1.0'
        }
      });

      if (!Array.isArray(geoRes.data) || geoRes.data.length === 0) {
        toast.error(`Could not find location for city "${cityName}" in OpenStreetMap`);
        setBusStops([]);
        setCityCoordinates(null);
        setDataSource(null);
        return;
      }

      const { lat, lon } = geoRes.data[0];
      const centerLat = parseFloat(lat);
      const centerLon = parseFloat(lon);

      setCityCoordinates({ latitude: centerLat, longitude: centerLon });

      // 2) Use Overpass API to fetch bus stops around the city center (within ~8km for better coverage), restricted to Karnataka state area
      const overpassQuery = `\
[out:json][timeout:30];\
area["name"="Karnataka"]["boundary"="administrative"]->.searchArea;\
(\
  node(around:8000,${centerLat},${centerLon})["highway"="bus_stop"](area.searchArea);\
  node(around:8000,${centerLat},${centerLon})["public_transport"="platform"]["bus"="yes"](area.searchArea);\
  node(around:8000,${centerLat},${centerLon})["amenity"="bus_station"](area.searchArea);\
  node(around:8000,${centerLat},${centerLon})["highway"="bus_stop"]["shelter"="yes"](area.searchArea);\
);\
out body;\
>;\
out skel qt;`;

      const overpassUrl = 'https://overpass-api.de/api/interpreter';
      const overpassRes = await axios.post(overpassUrl, overpassQuery, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });

      const elements = Array.isArray(overpassRes.data.elements)
        ? overpassRes.data.elements
        : [];

      const stops = elements
        .filter((el) => el.type === 'node' && el.lat && el.lon)
        .map((el, index) => {
          const tags = el.tags || {};
          return {
            _id: el.id || index,
            placeId: `osm_${el.id}`,
            name: tags.name || 'Bus Stop',
            address:
              tags['addr:full'] ||
              (tags['addr:street'] ? `${tags['addr:street']}, ${cityName}` : cityName),
            city: cityName,
            coordinates: {
              latitude: el.lat,
              longitude: el.lon
            },
            types: ['bus_stop'],
            rating: null,
            userRatingsTotal: 0,
            businessStatus: 'OPERATIONAL',
            vicinity: tags.locality || cityName
          };
        });

      setBusStops(stops);
      setDataSource('openstreetmap');

      toast.success(`Found ${stops.length} bus stops around ${cityName}, Karnataka (OpenStreetMap)`);
    } catch (error) {
      console.error('Error fetching bus stops from OpenStreetMap:', error);
      toast.error('Failed to fetch bus stops from OpenStreetMap');
      setBusStops([]);
      setCityCoordinates(null);
      setDataSource(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (event, value) => {
    setSelectedCity(value);
    if (value) {
      fetchBusStops(value);
    } else {
      setBusStops([]);
      setDataSource(null);
      setCityCoordinates(null);
    }
  };

  const handleRefresh = () => {
    if (selectedCity) {
      toast.info('Reloading bus stops from OpenStreetMap...');
      fetchBusStops(selectedCity);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Bus Stops Finder
        </Typography>
        {selectedCity && (
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh Data
          </Button>
        )}
      </Box>

      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={10}>
            <Autocomplete
              value={selectedCity}
              onChange={handleCitySelect}
              onInputChange={(event, newInputValue) => {
                if (event && event.type === 'change') {
                  setSelectedCity(newInputValue);
                }
              }}
              options={cities}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select City"
                  placeholder="Enter or select a Karnataka city to find bus stops"
                  variant="outlined"
                  fullWidth
                />
              )}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<Search />}
              onClick={() => selectedCity && fetchBusStops(selectedCity)}
              disabled={!selectedCity || loading}
              sx={{ height: 56 }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Source Info */}
      {dataSource && (
        <Alert
          severity="info"
          sx={{ mb: 3 }}
        >
{dataSource === 'openstreetmap'
            ? 'Showing bus stops in Karnataka fetched live from OpenStreetMap (Nominatim + Overpass).'
            : 'Showing bus stops in Karnataka fetched from OpenStreetMap.'}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" py={8}>
          <CircularProgress />
          <Typography variant="h6" ml={2}>
            {dataSource ? 'Refreshing bus stops...' : 'Searching for bus stops...'}
          </Typography>
        </Box>
      )}

      {/* Results */}
      {!loading && busStops.length > 0 && (
        <Grid container spacing={3}>
          {/* Map Section */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                Bus Stops Map
              </Typography>
              <BusStopsMap
                busStops={busStops}
                cityCoordinates={cityCoordinates}
                cityName={selectedCity}
              />
            </Paper>
          </Grid>

          {/* List Section */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 2, maxHeight: 600, overflow: 'auto' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  <DirectionsBus sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Bus Stops ({busStops.length})
                </Typography>
              </Box>

              <List>
                {busStops.map((stop, index) => (
                  <ListItem
                    key={stop._id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': {
                        boxShadow: 3,
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}
                      >
                        {index + 1}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          {stop.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" mb={0.5}>
                            {stop.address}
                          </Typography>
                          {stop.rating && (
                            <Chip
                              label={`⭐ ${stop.rating} (${stop.userRatingsTotal} reviews)`}
                              size="small"
                              sx={{ mt: 0.5 }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Statistics */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Total Bus Stops
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {busStops.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Average Rating
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="secondary">
                      {busStops.length > 0
                        ? (
                            busStops.filter(s => s.rating).reduce((sum, s) => sum + s.rating, 0) /
                            busStops.filter(s => s.rating).length
                          ).toFixed(1)
                        : 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Rated Stops
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {busStops.filter(s => s.rating).length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Data Source
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="info.main">
                      {dataSource === 'cache' ? 'Cached' : 'Live API'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Empty State */}
      {!loading && busStops.length === 0 && !selectedCity && (
        <Box
          sx={{
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2
          }}
        >
          <DirectionsBus sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
<Typography variant="h6" color="text.secondary" textAlign="center">
            Select a Karnataka city to find nearby bus stops
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Bus stops are loaded directly from OpenStreetMap data around the selected Karnataka city.
          </Typography>
        </Box>
      )}

      {!loading && busStops.length === 0 && selectedCity && (
        <Box
          sx={{
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No bus stops found in {selectedCity}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default BusStops;

