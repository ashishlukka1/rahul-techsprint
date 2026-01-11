import { Navigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export default function ProtectedRoute({ children }) {
  if (!authApi.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
