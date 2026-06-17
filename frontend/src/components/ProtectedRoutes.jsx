import { Children } from "react";
import { useAuth } from "../context/authContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  // console.log("PROTECTED ROUTE, context value:", useAuth());
  // console.log("USER:", user);
  // console.log("ALLOWED ROLE:", allowedRole);
  // console.log("USER ROLE:", user?.role);
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
