// src/components/auth/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../ui/Spinner';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { userProfile, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (userProfile?.role !== 'admin') {
        // If user is not an admin, redirect them to the homepage
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;