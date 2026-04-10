import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// ProtectedRoute component - Guards routes that require authentication
// If user is NOT logged in, redirect to login page
// If user IS logged in, show the requested page
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in, so show the protected page
  return children;
}
