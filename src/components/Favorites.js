import { Box, Grid, Typography } from '@mui/material';
import { useFavorites } from '../contexts/FavoritesContext';
import MovieCard from './MovieCard';
import Navbar from './Navbar';

// Favorites page: displays user's favorite movies
export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      {/* Navigation bar */}
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Favorite Movies
        </Typography>
        {/* Show message if no favorites */}
        {favorites.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No favorites yet. Start adding movies by clicking the heart icon!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}