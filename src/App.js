import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import context providers for authentication, movies, and favorites
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
// Import route protection and page components
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';

// Main App component sets up context providers and routing
export default function App() {
  return (
    // Provide authentication context
    <AuthProvider>
      {/* Provide movie data context */}
      <MovieProvider>
        {/* Provide favorites context */}
        <FavoritesProvider>
          {/* Set up routing */}
          <Router>
            <Routes>
              {/* Public login route */}
              <Route path="/login" element={<Login />} />
              {/* Protected routes */}
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/movie/:id" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
              <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </MovieProvider>
    </AuthProvider>
  );
}