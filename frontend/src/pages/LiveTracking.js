import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';
import { GpsFixed } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import MapComponent from '../components/MapComponent';
import axios from 'axios';
import { toast } from 'react-toastify';

const LiveTracking = () => {
  const { socket, trackBus, stopTrackingBus, API_URL } = useApp();
  const [busNumber, setBusNumber] = useState('');
  const [tracking, setTracking] = useState(false);
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (socket && tracking && busNumber) {
      socket.on('busLocationUpdate', (data) => {
        if (data.busId === busNumber) {
          setBusData((prev) => ({
            ...prev,
            currentLocation: data.location,
            speed: data.speed,
            nextStop: data.nextStop,
            estimatedArrival: data.estimatedArrival
          }));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('busLocationUpdate');
      }
    };
  }, [socket, tracking, busNumber]);

  const handleTrackBus = async () => {
    if (!busNumber) {
      toast.error('Please enter a bus number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/buses/number/${busNumber}`);
      setBusData(response.data);
      trackBus(busNumber);
      setTracking(true);
      toast.success(`Tracking bus ${busNumber}`);
    } catch (error) {
      toast.error('Bus not found');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopTracking = () => {
    stopTrackingBus(busNumber);
    setTracking(false);
    setBusData(null);
    toast.info('Stopped tracking');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Live Bus Tracking
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            label="Enter Bus Number"
            placeholder="e.g., KA01-AB-1234"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            fullWidth
            disabled={tracking}
          />
          {!tracking ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleTrackBus}
              startIcon={loading ? <CircularProgress size={20} /> : <GpsFixed />}
              disabled={loading}
              sx={{ minWidth: 150 }}
            >
              Track
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="error"
              onClick={handleStopTracking}
              sx={{ minWidth: 150 }}
            >
              Stop
            </Button>
          )}
        </Box>
      </Paper>

      {busData && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bus: {busData.busNumber} - {busData.busType}
            </Typography>
            <Typography variant="body1">
              Status: <strong>{busData.status}</strong>
            </Typography>
            <Typography variant="body1">
              Next Stop: <strong>{busData.nextStop || 'N/A'}</strong>
            </Typography>
            {busData.route && (
              <Typography variant="body1">
                Route: {busData.route.source.city} → {busData.route.destination.city}
              </Typography>
            )}
          </Paper>

          <MapComponent buses={[busData]} />
        </>
      )}

      {!busData && !loading && (
        <Box
          sx={{
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Enter a bus number to start tracking
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default LiveTracking;

