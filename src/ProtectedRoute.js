// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from './AppContext';

/**
 * A wrapper component that checks if the user is authenticated
 * and redirects to the auth page if not.
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, updateUserData } = useAppContext();
  const location = useLocation();

  // Store the current path in context when redirecting to login
  useEffect(() => {
    if (!currentUser) {
      // Save the attempted URL for redirecting back after login
      updateUserData({ redirectAfterLogin: location.pathname });
    }
  }, [currentUser, location.pathname, updateUserData]);

  // If user is not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  // If user is authenticated, render the child components
  return children;
};

export default ProtectedRoute;