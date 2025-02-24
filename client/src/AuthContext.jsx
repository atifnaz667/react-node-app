import { createContext, useContext, useState } from "react";
import API_BASE_URL from "./config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch(API_BASE_URL + 'api/auth/me', {
                method: 'get',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setAuthUser(data.user);
            } else {
                setAuthUser(null);
            }
        } catch (error) {
            console.error("Authentication check failed:", error);
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch(API_BASE_URL + 'api/auth/logout', {
                method: 'post',
                credentials: 'include'
            });
            setAuthUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);