import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  DirectionsBus,
  Search,
  Home,
  Dashboard,
  LocationOn
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Track Bus', icon: <DirectionsBus />, path: '/track' },
    { text: 'Search Routes', icon: <Search />, path: '/search' },
    { text: 'Bus Stops', icon: <LocationOn />, path: '/busstops' },
    { text: 'Admin', icon: <Dashboard />, path: '/admin' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <DirectionsBus sx={{ mr: 1, fontSize: 28 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: 1
            }}
          >
            KSRTC Live Tracking
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/track">
                Track Bus
              </Button>
              <Button color="inherit" component={Link} to="/search">
                Search Routes
              </Button>
              <Button color="inherit" component={Link} to="/busstops">
                Bus Stops
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to="/admin"
                sx={{ ml: 1 }}
              >
                Admin
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;

