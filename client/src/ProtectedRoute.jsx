import { useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Loader from "./components/utility/Loader";

const ProtectedRoute = ({ children }) => {
    const { authUser, loading, checkAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!authUser) {
            checkAuth();
        }
    }, [authUser, checkAuth]);

    if (loading) {
        return <Loader />;
    }

    return authUser ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;