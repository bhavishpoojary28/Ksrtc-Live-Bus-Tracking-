import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { Box, Typography } from '@mui/material';

const MapComponent = ({ buses = [], route = null, center = null }) => {
  const defaultCenter = center || {
    lat: 12.9716,
    lng: 77.5946
  }; // Bangalore

  const routePath =
    route?.stops?.map((stop) => [stop.coordinates.latitude, stop.coordinates.longitude]) || [];

  // Choose a sensible center: provided center, else first bus, else first route stop, else default
  const firstBusWithLocation = buses.find(
    (bus) => bus.currentLocation?.latitude && bus.currentLocation?.longitude
  );

  const effectiveCenter = firstBusWithLocation
    ? {
        lat: firstBusWithLocation.currentLocation.latitude,
        lng: firstBusWithLocation.currentLocation.longitude
      }
    : routePath.length > 0
    ? { lat: routePath[0][0], lng: routePath[0][1] }
    : defaultCenter;

  return (
    <MapContainer
      center={[effectiveCenter.lat, effectiveCenter.lng]}
      zoom={12}
      style={{ width: '100%', height: '500px', borderRadius: '8px' }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Bus Markers */}
      {buses.map((bus, index) => {
        if (bus.currentLocation?.latitude && bus.currentLocation?.longitude) {
          return (
            <Marker
              key={bus._id || index}
              position={[bus.currentLocation.latitude, bus.currentLocation.longitude]}
            >
              <Popup>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {bus.busNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {bus.status}
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}

      {/* Route Polyline */}
      {routePath.length > 0 && (
        <Polyline
          positions={routePath}
          pathOptions={{
            color: '#d32f2f',
            weight: 4,
            opacity: 0.8
          }}
        />
      )}

      {/* Route Stop Markers */}
      {route?.stops?.map((stop, index) => (
        <Marker
          key={index}
          position={[stop.coordinates.latitude, stop.coordinates.longitude]}
        >
          <Popup>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {index + 1}. {stop.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lat: {stop.coordinates.latitude.toFixed(6)}, Lng:{' '}
                {stop.coordinates.longitude.toFixed(6)}
              </Typography>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

