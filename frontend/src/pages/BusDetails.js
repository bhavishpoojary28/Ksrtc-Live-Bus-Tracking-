import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { DirectionsBus, Person, Phone, Route as RouteIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MapComponent from '../components/MapComponent';

const BusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBusById, loading } = useApp();
  const [bus, setBus] = useState(null);

  const fetchBusDetails = async () => {
    try {
      const data = await getBusById(id);
      setBus(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBusDetails();
    // We intentionally omit fetchBusDetails from dependencies to avoid recreating
    // the effect unnecessarily; it only depends on id which is already listed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !bus) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <DirectionsBus color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {bus.busNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {bus.registrationId}
                </Typography>
              </Box>
              <Box ml="auto">
                <Chip
                  label={bus.status}
                  color={bus.status === 'On Time' ? 'success' : 'warning'}
                  size="large"
                />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Bus Type
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {bus.busType}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  AC/Non-AC
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {bus.isAC ? 'AC' : 'Non-AC'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Total Seats
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {bus.totalSeats}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Available Seats
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="success.main">
                  {bus.availableSeats}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {bus.route && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                <RouteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Route Information
              </Typography>
              <Typography variant="body1" mb={2}>
                {bus.route.source.city} → {bus.route.destination.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distance: {bus.route.distance} km | Duration: {bus.route.duration} mins
              </Typography>

              {bus.route.stops && bus.route.stops.length > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight="bold" mt={2} mb={1}>
                    Stops:
                  </Typography>
                  <List dense>
                    {bus.route.stops.map((stop, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${index + 1}. ${stop.name}`}
                          secondary={stop.arrivalTime}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {bus.driver && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                Driver
              </Typography>
              <Typography variant="body1">{bus.driver.name}</Typography>
              {bus.driver.phone && (
                <Typography variant="body2" color="text.secondary">
                  <Phone fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                  {bus.driver.phone}
                </Typography>
              )}
            </Paper>
          )}

          {bus.conductor && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                Conductor
              </Typography>
              <Typography variant="body1">{bus.conductor.name}</Typography>
              {bus.conductor.phone && (
                <Typography variant="body2" color="text.secondary">
                  <Phone fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                  {bus.conductor.phone}
                </Typography>
              )}
            </Paper>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/track')}
          >
            Track Live
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Current Location
            </Typography>
            <MapComponent buses={[bus]} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusDetails;

