import React, { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);

  // If AuthContext is not ready yet
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  // Wait for Supabase session restore to finish
  if (auth.loading) {
    return <div>Loading...</div>;
  }

  // Redirect non-admin users
  if (!auth.user || auth.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
