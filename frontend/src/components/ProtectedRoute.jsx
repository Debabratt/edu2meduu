import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredUserType }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const userType = sessionStorage.getItem("userType");
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const admin = JSON.parse(sessionStorage.getItem("admin") || "null");

  console.log("ProtectedRoute Debug:");
  console.log("isAuthenticated:", isAuthenticated);
  console.log("userType:", userType);
  console.log("user:", user);
  console.log("admin:", admin);
  console.log("requiredUserType:", requiredUserType);

  if (!isAuthenticated) {
    console.log("Access denied: User not authenticated. Redirecting to /login");
    return <Navigate to="/login" />;
  }

  // Admin-specific route
  if (requiredUserType === "admin") {
    if (userType === "admin" && admin) {
      console.log("Access granted: Admin user");
      return children;
    } else {
      console.log("Access denied: User is not an admin. Redirecting to /login");
      return <Navigate to="/login" />;
    }
  }

  // User-specific route (for both education and healthcare)
  if (requiredUserType === "user") {
    if ((userType === "education" || userType === "healthcare") && user) {
      console.log("Access granted: Education/Healthcare user");
      return children;
    } else {
      console.log("Access denied: User is not authorized. Redirecting to /login");
      return <Navigate to="/login" />;
    }
  }

  // Default deny access
  console.log("Access denied: Redirecting to /login");
  return <Navigate to="/login" />;
};

export default ProtectedRoute;