import { useCallback } from 'react';
import { useMovies } from '../contexts/MovieContext';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from './Navbar';

// Home page: shows search bar, trending/search results, and infinite scroll
export default function Home() {
  const { 
    searchQuery,
    movies,
    trending,
    loading,
    error,
    handleSearch,
    page,
    totalPages
  } = useMovies();

  // Choose which movies to display
  const displayMovies = searchQuery ? movies : trending;

  // Load more movies for infinite scroll
  const loadMore = useCallback(() => {
    if (page < totalPages) {
      handleSearch(searchQuery, page + 1);
    }
  }, [page, totalPages, searchQuery, handleSearch]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Navigation bar */}
      <Navbar />
      {/* Search bar */}
      <SearchBar />
      {/* Infinite scroll for movie cards */}
      <InfiniteScroll
        dataLength={displayMovies.length}
        next={loadMore}
        hasMore={page < totalPages && !!searchQuery}
        loader={<CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      >
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {displayMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      {/* Error message */}
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}