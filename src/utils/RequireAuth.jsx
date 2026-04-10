import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("authUser") !== null;

  if (!isLoggedIn) {
    // Redirect to login, and remember where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}