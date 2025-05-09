import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import MUI's ThemeProvider and CssBaseline for consistent theming
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
// Import custom ThemeProvider and hook for theme context
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';

// This component wraps the app with MUI's ThemeProvider using the theme from context
function AppWithTheme() {
  const { theme } = useThemeContext();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  );
}

// Create the root React node and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provide theme context to the app */}
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  </React.StrictMode>
);

// Optional: measure app performance
reportWebVitals();
