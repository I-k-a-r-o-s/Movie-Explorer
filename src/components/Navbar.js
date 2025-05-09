import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../contexts/ThemeContext';

// Navigation bar component with theme toggle, favorites, and user menu
export default function Navbar() {
  const { toggleColorMode, mode } = useThemeContext();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  // Open user menu
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  // Close user menu
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App title and home link */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/" color="inherit">
            Movie Explorer
          </Button>
        </Typography>

        {/* Theme toggle button */}
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          sx={{ mr: 1 }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Favorites page link */}
        <Button
          component={Link}
          to="/favorites"
          color="inherit"
          startIcon={<Favorite />}
          sx={{ mr: 2 }}
        >
          Favorites
        </Button>

        {/* User avatar and logout menu */}
        {user && (
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar sx={{
                bgcolor: 'background.paper',
                width: 40,
                height: 40
              }}>
                <AccountCircle color="primary" fontSize="medium" />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <MenuItem onClick={() => {
                logout();
                handleClose();
              }}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}