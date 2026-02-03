import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import {
  DirectionsBus,
  Route as RouteIcon,
  Schedule,
  Announcement as AnnouncementIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {
  const { API_URL } = useApp();
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    // We intentionally omit fetchStats from dependencies since it does not depend on
    // props/state and we only want an initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statCards = [
    {
      title: 'Total Buses',
      value: stats?.totalBuses || 0,
      icon: <DirectionsBus sx={{ fontSize: 40 }} />,
      color: '#d32f2f'
    },
    {
      title: 'Active Buses',
      value: stats?.activeBuses || 0,
      icon: <DirectionsBus sx={{ fontSize: 40 }} />,
      color: '#4caf50'
    },
    {
      title: 'Total Routes',
      value: stats?.totalRoutes || 0,
      icon: <RouteIcon sx={{ fontSize: 40 }} />,
      color: '#2196f3'
    },
    {
      title: 'Today Schedules',
      value: stats?.todaySchedules || 0,
      icon: <Schedule sx={{ fontSize: 40 }} />,
      color: '#ff9800'
    },
    {
      title: 'Active Announcements',
      value: stats?.activeAnnouncements || 0,
      icon: <AnnouncementIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} mb={4}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                color: 'white'
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {card.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.7 }}>{card.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Buses by Status
            </Typography>
            {stats?.busesByStatus?.map((item) => (
              <Box
                key={item._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <Typography>{item._id}</Typography>
                <Typography fontWeight="bold">{item.count}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Buses by Type
            </Typography>
            {stats?.busesByType?.map((item) => (
              <Box
                key={item._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <Typography>{item._id}</Typography>
                <Typography fontWeight="bold">{item.count}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          This is a simplified admin dashboard. In production, add forms to manage buses, routes, schedules, and announcements.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminDashboard;

