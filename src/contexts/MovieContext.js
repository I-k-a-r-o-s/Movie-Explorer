import { createContext, useContext, useState, useEffect } from 'react';
import { searchMovies, getTrendingMovies } from '../api/tmdb';

// Create a context for movie data and actions
const MovieContext = createContext();

// Provides movie data and search/trending actions to the app
export function MovieProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch trending movies from API
  const fetchTrending = async () => {
    try {
      setLoading(true);
      const data = await getTrendingMovies();
      setTrending(data.results);
    } catch (err) {
      setError('Failed to load trending movies');
    } finally {
      setLoading(false);
    }
  };

  // Search for movies by query
  const handleSearch = async (query, newPage = 1) => {
    if (!query) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      const data = await searchMovies(query, newPage);
      setMovies(prev => newPage === 1 ? data.results : [...prev, ...data.results]);
      setTotalPages(data.total_pages);
      setPage(newPage);
    } catch (err) {
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  // On mount, fetch trending movies
  useEffect(() => {
    fetchTrending();
  }, []);

  // Provide movie data and actions to children
  return (
    <MovieContext.Provider value={{
      searchQuery,
      setSearchQuery,
      movies,
      trending,
      loading,
      error,
      handleSearch,
      page,
      totalPages,
    }}>
      {children}
    </MovieContext.Provider>
  );
}

// Custom hook to use movie context
export const useMovies = () => useContext(MovieContext);