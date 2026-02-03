import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Autocomplete,
  Grid
} from '@mui/material';
import { Search, SwapHoriz } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const SearchBar = ({ onSearch }) => {
  const { cities } = useApp();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSwapCities = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleSearch = () => {
    if (source && destination && date) {
      onSearch({ source, destination, date });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)'
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3.5}>
          <Autocomplete
            value={source}
            onChange={(event, newValue) => setSource(newValue)}
            onInputChange={(event, newInputValue) => setSource(newInputValue)}
            options={cities}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                placeholder="Enter or select source city"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={0.5} sx={{ textAlign: 'center' }}>
          <Button
            onClick={handleSwapCities}
            sx={{
              minWidth: 'auto',
              borderRadius: '50%',
              width: 40,
              height: 40
            }}
          >
            <SwapHoriz />
          </Button>
        </Grid>

        <Grid item xs={12} md={3.5}>
          <Autocomplete
            value={destination}
            onChange={(event, newValue) => setDestination(newValue)}
            onInputChange={(event, newInputValue) => setDestination(newInputValue)}
            options={cities}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                placeholder="Enter or select destination city"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={2.5}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split('T')[0]
            }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<Search />}
            onClick={handleSearch}
            disabled={!source || !destination || !date}
            sx={{ height: 56 }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchBar;

