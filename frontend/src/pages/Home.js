import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Alert
} from '@mui/material';
import {
  DirectionsBus,
  Schedule,
  LocationOn,
  TrendingUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { useApp } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { announcements } = useApp();

  const features = [
    {
      icon: <DirectionsBus sx={{ fontSize: 48 }} />,
      title: 'Live Bus Tracking',
      description: 'Track your bus in real-time with GPS accuracy',
      action: () => navigate('/track')
    },
    {
      icon: <Schedule sx={{ fontSize: 48 }} />,
      title: 'View Schedules',
      description: 'Check bus timings and plan your journey',
      action: () => navigate('/search')
    },
    {
      icon: <LocationOn sx={{ fontSize: 48 }} />,
      title: 'Route Planning',
      description: 'Find the best routes between cities',
      action: () => navigate('/search')
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: 'Seat Availability',
      description: 'Check real-time seat availability',
      action: () => navigate('/search')
    }
  ];

  const handleSearch = (searchData) => {
    navigate('/search', { state: searchData });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #d32f2f 0%, #ffc107 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              KSRTC Live Bus Tracking
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.95,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Track Karnataka State Road Transport buses in real-time
            </Typography>
          </Box>
          <SearchBar onSearch={handleSearch} />
        </Container>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: { xs: 'none', md: 'block' }
          }}
        />
      </Box>

      {/* Announcements */}
      {announcements.length > 0 && (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Service Alerts
          </Typography>
          {announcements.slice(0, 3).map((announcement) => (
            <Alert
              key={announcement._id}
              severity={announcement.type === 'Alert' ? 'warning' : 'info'}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {announcement.title}
              </Typography>
              <Typography variant="body2">{announcement.message}</Typography>
            </Alert>
          ))}
        </Container>
      )}

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={4}
        >
          Features
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Box color="primary.main" mb={2}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={feature.action}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold">
                500+
              </Typography>
              <Typography variant="h6">Active Buses</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold">
                100+
              </Typography>
              <Typography variant="h6">Routes</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold">
                24/7
              </Typography>
              <Typography variant="h6">Service</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#333', color: 'white', py: 3, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" textAlign="center">
            © 2025 KSRTC Live Tracking. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

