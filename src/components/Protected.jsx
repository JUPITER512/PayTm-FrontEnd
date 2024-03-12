
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isUserAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const ProtectedRoute = () => {
  const isAuthenticated = isUserAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;