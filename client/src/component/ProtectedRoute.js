import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import { useUser } from './UserContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const { userId } = useUser();

    return isLoggedIn ? React.cloneElement(children, { userId }) : <Navigate to="/login" />;
};

export default ProtectedRoute;
