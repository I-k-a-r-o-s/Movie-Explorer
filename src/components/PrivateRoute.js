import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Protects routes from unauthenticated access
export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  // If user is authenticated, render children; otherwise, redirect to login
  return user ? children : <Navigate to="/login" />;
}