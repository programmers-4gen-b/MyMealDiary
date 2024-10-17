import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    console.log('protected 단' , isLoggedIn);

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
