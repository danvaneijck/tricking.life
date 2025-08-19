// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../ui/Spinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading && currentUser) {
        // Show a loading spinner while we check the auth state
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (!currentUser) {
        // If the user is not logged in, redirect them to the login page.
        // We pass the current location in state so we can redirect them back
        // after they log in.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If the user is logged in, render the component that was passed in
    return <>{children}</>;
};

export default ProtectedRoute;