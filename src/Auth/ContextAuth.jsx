import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Check if a token exists in localStorage when app loads
        return Boolean(localStorage.getItem('token'));
    });

    useEffect(() => {
        // Sync auth state with localStorage
        setIsAuthenticated(Boolean(localStorage.getItem('token')));
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
