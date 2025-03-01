import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const userType = sessionStorage.getItem("userType");
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const admin = JSON.parse(sessionStorage.getItem("admin") || "null");

  // Protect based on user type
  if (isAuthenticated) {
    if (userType === "admin" && admin) {
      return children; // Admin can access admin pages
    } else if ((userType === "education" || userType === "healthcare") && user) {
      return children; // Education/Healthcare users can access user pages
    }
  }

  // Redirect if not authenticated or userType is mismatched
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
