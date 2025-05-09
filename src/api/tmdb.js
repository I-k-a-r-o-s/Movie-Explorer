import axios from 'axios';

// Create an axios instance for TMDB API requests
const instance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'en-US',
  },
});

// Search for movies by query and page
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await instance.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get trending movies for the week
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await instance.get('/trending/movie/week', { params: { page } });
    return response.data;
  } catch (error) {
    throw error;
  }
};