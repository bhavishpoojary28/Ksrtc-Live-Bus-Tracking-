import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BusCard from '../components/BusCard';
import MapComponent from '../components/MapComponent';
import { useApp } from '../context/AppContext';
import { toast } from 'react-toastify';

const RouteSearch = () => {
  const location = useLocation();
  const { searchBuses, loading } = useApp();
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [busTypeFilter, setBusTypeFilter] = useState('');
  const [acFilter, setAcFilter] = useState('');

  useEffect(() => {
    if (location.state) {
      handleSearch(location.state);
    }
    // We intentionally omit handleSearch from dependencies to avoid re-triggering
    // searches when its identity changes; it does not depend on props or state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleSearch = async (searchData) => {
    try {
      const results = await searchBuses(
        searchData.source,
        searchData.destination,
        searchData.date
      );
      setSchedules(results);
      setFilteredSchedules(results);
      if (results.length === 0) {
        toast.info('No buses found for this route');
      }
    } catch (error) {
      toast.error('Error searching buses');
    }
  };

  useEffect(() => {
    let filtered = [...schedules];

    if (busTypeFilter) {
      filtered = filtered.filter((s) => s.bus.busType === busTypeFilter);
    }

    if (acFilter === 'ac') {
      filtered = filtered.filter((s) => s.bus.isAC);
    } else if (acFilter === 'non-ac') {
      filtered = filtered.filter((s) => !s.bus.isAC);
    }

    setFilteredSchedules(filtered);
  }, [busTypeFilter, acFilter, schedules]);

  const busTypes = [...new Set(schedules.map((s) => s.bus.busType))];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Search Routes & Schedules
      </Typography>

      <SearchBar onSearch={handleSearch} />

      {/* Map showing the selected government bus routes */}
      {filteredSchedules.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Route Map (OpenStreetMap)
          </Typography>
          <Paper sx={{ p: 1, mb: 3 }}>
            <MapComponent
              buses={filteredSchedules.map((s) => s.bus)}
              route={filteredSchedules[0].route}
            />
          </Paper>
        </Box>
      )}

      {schedules.length > 0 && (
        <Paper sx={{ p: 2, my: 3 }}>
          <Box display="flex" gap={2} flexWrap="wrap">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Bus Type</InputLabel>
              <Select
                value={busTypeFilter}
                onChange={(e) => setBusTypeFilter(e.target.value)}
                label="Bus Type"
              >
                <MenuItem value="">All</MenuItem>
                {busTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>AC/Non-AC</InputLabel>
              <Select
                value={acFilter}
                onChange={(e) => setAcFilter(e.target.value)}
                label="AC/Non-AC"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ac">AC</MenuItem>
                <MenuItem value="non-ac">Non-AC</MenuItem>
              </Select>
            </FormControl>

            <Box flexGrow={1} display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredSchedules.length} of {schedules.length} buses
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {!loading && filteredSchedules.length > 0 && (
        <Box mt={3}>
          {filteredSchedules.map((schedule) => (
            <BusCard key={schedule._id} schedule={schedule} />
          ))}
        </Box>
      )}

      {!loading && schedules.length === 0 && !location.state && (
        <Box
          sx={{
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            mt: 3
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Search for buses using the form above
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default RouteSearch;

