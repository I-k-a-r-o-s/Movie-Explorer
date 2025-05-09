import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication state and actions
const AuthContext = createContext();

// Provides authentication state and actions to the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, load user from localStorage if present
  useEffect(() => {
    const storedUser = localStorage.getItem('movieUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Log in by saving user to state and localStorage
  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('movieUser', JSON.stringify(userData));
  };

  // Log out by clearing user from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieUser');
  };

  // Provide user, login, and logout to children
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);