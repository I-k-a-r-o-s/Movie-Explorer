import { useState } from 'react';
import { useMovies } from '../contexts/MovieContext';
import { TextField, debounce } from '@mui/material';

// Search bar component for searching movies
export default function SearchBar() {
  const { setSearchQuery, handleSearch } = useMovies();
  const [localQuery, setLocalQuery] = useState('');

  // Debounced search to avoid excessive API calls
  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
    handleSearch(value);
  }, 500);

  // Handle input change and trigger debounced search
  const handleChange = (e) => {
    setLocalQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search movies..."
      value={localQuery}
      onChange={handleChange}
      sx={{ maxWidth: 600, margin: '0 auto', display: 'block' }}
    />
  );
}