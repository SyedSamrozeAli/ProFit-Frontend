import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for token on component mount
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         setIsAuthenticated(true);
    //     }
    // }, []);

    // const login = () => {
    //     setIsAuthenticated(true);
    // };

    return (
        <AuthContext.Provider value={{ isAuthenticated , setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
