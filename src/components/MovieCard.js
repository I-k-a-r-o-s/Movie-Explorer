import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useFavorites } from '../contexts/FavoritesContext';

// Card component for displaying a single movie
export default function MovieCard({ movie }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Handle favorite button click
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
    };
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="300"
                image={movie.poster_path ?
                    `https://image.tmdb.org/t/p/w300${movie.poster_path}` :
                    '/no-poster.jpg'}
                alt={movie.title}
            />
            <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                {/* Favorite toggle button */}
                <Tooltip title={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}>
                    <IconButton
                        onClick={handleFavoriteClick}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }}
                    >
                        {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Tooltip>
                <Typography gutterBottom variant="h6" component="div">
                    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {movie.title}
                    </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {new Date(movie.release_date).getFullYear()}
                </Typography>
                <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                    sx={{ mt: 1 }}
                />
            </CardContent>
        </Card>
    );
}