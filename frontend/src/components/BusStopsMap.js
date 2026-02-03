import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Typography, Chip } from '@mui/material';

const BusStopsMap = ({ busStops = [], cityCoordinates = null }) => {
  // Karnataka state center coordinates
  const karnatakaCenter = {
    lat: 15.3173,
    lng: 75.7139
  };

  // Default center (Bangalore) - fallback
  const defaultCenter = {
    lat: 12.9716,
    lng: 77.5946
  };

  // Use city coordinates if available, otherwise use first bus stop or Karnataka center
  const mapCenter = cityCoordinates
    ? { lat: cityCoordinates.latitude, lng: cityCoordinates.longitude }
    : busStops.length > 0
    ? { lat: busStops[0].coordinates.latitude, lng: busStops[0].coordinates.longitude }
    : karnatakaCenter;

  // Determine zoom level based on context
  const getZoomLevel = () => {
    if (cityCoordinates && busStops.length > 0) {
      // City-level view with bus stops
      return 13;
    } else if (cityCoordinates) {
      // City-level view without bus stops yet
      return 12;
    } else if (busStops.length > 0) {
      // Multiple bus stops, adjust zoom to fit all
      return 11;
    } else {
      // Karnataka state view
      return 7;
    }
  };

  return (
    <MapContainer
      center={[mapCenter.lat, mapCenter.lng]}
      zoom={getZoomLevel()}
      style={{ width: '100%', height: '550px', borderRadius: '8px' }}
      scrollWheelZoom
      maxBounds={[[11.0, 74.0], [18.0, 78.5]]} // Karnataka state bounds
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {busStops.map((stop, index) => (
        <Marker
          key={stop._id || index}
          position={[stop.coordinates.latitude, stop.coordinates.longitude]}
        >
          <Popup>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {stop.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {stop.address}
              </Typography>
              {stop.rating && (
                <Box mt={1}>
                  <Chip
                    label={`⭐ ${stop.rating}`}
                    size="small"
                    color="primary"
                    sx={{ mr: 0.5 }}
                  />
                  <Chip
                    label={`${stop.userRatingsTotal} reviews`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              )}
              {stop.businessStatus === 'OPERATIONAL' && (
                <Chip
                  label="Open"
                  size="small"
                  color="success"
                  sx={{ mt: 1 }}
                />
              )}
              <Typography variant="caption" display="block" mt={1} color="text.secondary">
                Lat: {stop.coordinates.latitude.toFixed(6)}, Lng: {stop.coordinates.longitude.toFixed(6)}
              </Typography>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BusStopsMap;

