import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/profile" />;
  }

  return children;
}
