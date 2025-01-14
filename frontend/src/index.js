import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';  // <-- Import Router here

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color for the primary theme
    },
    secondary: {
      main: '#d32f2f', // Red color for the secondary theme
    },
    background: {
      default: '#f5f5f5', // Light grey background color
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>  {/* <-- Wrap App in Router */}
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
