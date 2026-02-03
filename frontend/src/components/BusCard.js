import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Grid,
  Divider
} from '@mui/material';
import {
  DirectionsBus,
  AccessTime,
  EventSeat,
  LocationOn
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BusCard = ({ schedule }) => {
  const navigate = useNavigate();
  const { bus, route, departureTime, arrivalTime, fare, seatAvailability } = schedule;

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time':
        return 'success';
      case 'Delayed':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewDetails = () => {
    navigate(`/bus/${bus._id}`);
  };

  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 3,
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)'
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Bus Info */}
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DirectionsBus color="primary" />
              <Typography variant="h6" fontWeight="bold">
                {bus.busNumber}
              </Typography>
            </Box>
            <Chip
              label={bus.busType}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            {bus.isAC && (
              <Chip
                label="AC"
                size="small"
                color="info"
                variant="outlined"
              />
            )}
            <Typography variant="caption" display="block" mt={1} color="text.secondary">
              {bus.registrationId}
            </Typography>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          {/* Route Info */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOn color="action" fontSize="small" />
              <Typography variant="body2" fontWeight="bold">
                {route.source.city} → {route.destination.city}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2} mt={1}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Departure
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {departureTime}
                </Typography>
              </Box>
              <AccessTime fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Arrival
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {arrivalTime}
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" mt={1}>
              Duration: {route.duration} mins
            </Typography>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          {/* Fare & Seats */}
          <Grid item xs={12} md={2}>
            <Box textAlign="center">
              <Typography variant="h5" color="primary" fontWeight="bold">
                ₹{fare}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                per seat
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
                <EventSeat fontSize="small" color={seatAvailability?.available > 0 ? 'success' : 'error'} />
                <Typography variant="body2">
                  {seatAvailability?.available || 0}/{seatAvailability?.total || 0} available
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Actions */}
          <Grid item xs={12} md={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleViewDetails}
                disabled={!seatAvailability?.available || seatAvailability?.available === 0}
              >
                View Details
              </Button>
              <Chip
                label={bus.status || 'Not Started'}
                size="small"
                color={getStatusColor(bus.status)}
                sx={{ width: '100%' }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BusCard;

