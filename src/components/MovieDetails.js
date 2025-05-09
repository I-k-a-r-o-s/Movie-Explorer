import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Chip,
    Button,
    CircularProgress,
    Alert,
    Rating
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { PlayCircleOutline, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useFavorites } from '../contexts/FavoritesContext';
import IconButton from '@mui/material/IconButton';
import { instance } from '../api/tmdb';
import Navbar from './Navbar';

// Movie details page: shows info, trailer, and cast for a selected movie
export default function MovieDetails() {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch movie details, credits, and trailer on mount or when id changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = process.env.REACT_APP_TMDB_API_KEY;

                // Fetch movie details
                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}`,
                    { params: { api_key: apiKey } }
                );

                // Fetch credits
                const creditsResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/credits`,
                    { params: { api_key: apiKey } }
                );

                // Fetch videos
                const videosResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/videos`,
                    { params: { api_key: apiKey } }
                );

                setMovie(movieResponse.data);
                setCast(creditsResponse.data.cast.slice(0, 10));
                setTrailer(videosResponse.data.results.find(v => v.site === 'YouTube'));
                setLoading(false);
            } catch (err) {
                setError('Failed to load movie details');
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Show loading spinner
    if (loading) return <>
            <Navbar />
            <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
        </>;
    // Show error message
    if (error) return <><Navbar /><Alert severity="error">{error}</Alert></>;

    return (
        <>
            {/* Navigation bar */}
            <Navbar />
            <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
                <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
                    Back to Home
                </Button>

                {/* Movie Poster and Basic Info */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <img
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : '/no-poster.jpg'}
                            alt={movie.title}
                            style={{ width: '100%', borderRadius: 8 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h3" gutterBottom>
                                {movie.title}
                            </Typography>
                            {/* Favorite toggle button */}
                            <IconButton
                                onClick={() => isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie)}
                                color="error"
                                size="large"
                                aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                {isFavorite(movie.id) ? (
                                    <Favorite fontSize="large" />
                                ) : (
                                    <FavoriteBorder fontSize="large" />
                                )}
                            </IconButton>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Chip label={format(new Date(movie.release_date), 'yyyy')} sx={{ mr: 1 }} />
                            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
                            <Typography variant="body2" sx={{ ml: 1, display: 'inline' }}>
                                ({movie.vote_count} votes)
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            {movie.genres.map(genre => (
                                <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>

                        <Typography variant="body1" paragraph>
                            {movie.overview}
                        </Typography>

                        {/* Trailer button */}
                        {trailer && (
                            <Button
                                variant="contained"
                                startIcon={<PlayCircleOutline />}
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noopener"
                                sx={{ mt: 2 }}
                            >
                                Watch Trailer
                            </Button>
                        )}
                    </Grid>
                </Grid>

                {/* Cast Section */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Top Cast
                    </Typography>
                    <Grid container spacing={2}>
                        {cast.map(actor => (
                            <Grid item xs={6} sm={4} md={2} key={actor.id}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img
                                        src={actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                            : '/no-avatar.jpg'}
                                        alt={actor.name}
                                        style={{ width: '100%', borderRadius: '50%', marginBottom: 8 }}
                                    />
                                    <Typography variant="body2">{actor.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {actor.character}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}