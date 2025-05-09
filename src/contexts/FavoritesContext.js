import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for favorite movies
const FavoritesContext = createContext();

// Provides favorite movies state and actions to the app
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // On mount, load favorites from localStorage if present
  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // Add a movie to favorites and save to localStorage
  const addFavorite = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  // Remove a movie from favorites and update localStorage
  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(m => m.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some(m => m.id === movieId);
  };

  // Provide favorites and actions to children
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to use favorites context
export const useFavorites = () => useContext(FavoritesContext);