import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    // Kalau belum login, redirect ke /login
    return <Navigate to="/login" replace />;
  }
  // Kalau sudah login, render children (halaman aslinya)
  return children;
}