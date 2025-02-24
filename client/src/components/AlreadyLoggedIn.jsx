import { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from './utility/Loader';

const AlreadyLoggedIn = ({children}) => {
    const location = useLocation();
    const {authUser, checkAuth, loading} = useAuth();
    useEffect(() => {
        if (!authUser) {
            checkAuth();
        }
    }, [authUser, checkAuth]);

    if (loading) {
        return <Loader />;
    }

    return authUser ? <Navigate to="/" state={{ from: location }} replace /> : children;
}

export default AlreadyLoggedIn