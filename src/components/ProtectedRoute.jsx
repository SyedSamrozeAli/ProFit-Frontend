import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/ContextAuth';

function ProtectedRoute({ element }) {
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('token'); // Check token as a backup

    if (!isAuthenticated && !token) {
        // Redirect to login if not authenticated
        return <Navigate to="/" replace />;
    }

    return element;
}
export default ProtectedRoute;
