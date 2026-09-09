import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export function TradingProtectedRoute({ children }) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/trade/login" replace />;
  }
  return children;
}
