// components/ProtectedRoute.jsx
// Route guard for admin pages. Redirects to /admin/login if there's no
// authenticated admin once the initial auth check has finished.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner full />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
