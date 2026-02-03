import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LiveTracking from './pages/LiveTracking';
import RouteSearch from './pages/RouteSearch';
import BusDetails from './pages/BusDetails';
import AdminDashboard from './pages/AdminDashboard';
import BusStops from './pages/BusStops';

// Context
import { AppProvider } from './context/AppContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', // KSRTC Red
      light: '#ff6659',
      dark: '#9a0007',
    },
    secondary: {
      main: '#ffc107', // Karnataka Yellow
      light: '#fff350',
      dark: '#c79100',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/track" element={<LiveTracking />} />
              <Route path="/search" element={<RouteSearch />} />
              <Route path="/bus/:id" element={<BusDetails />} />
              <Route path="/busstops" element={<BusStops />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

