import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// Create a context for theme state and toggling
const ThemeContext = createContext();

// Provides theme state and toggle function to the app
export function ThemeProvider({ children }) {
  // State for current theme mode
  const [mode, setMode] = useState('light');

  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Memoized MUI theme object, updates when mode changes
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? {
        background: {
          default: '#f8f9fa',
          paper: '#ffffff',
        }
      } : {
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        }
      })
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#1976d2' : '#121212',
          }
        }
      }
    }
  }), [mode]);

  // Provide theme, toggle function, and mode to children
  return (
    <ThemeContext.Provider value={{ theme, toggleColorMode, mode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);