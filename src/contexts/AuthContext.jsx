import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a new context for authentication
export const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthContextProvider component to wrap the entire app
export const AuthProvider = ({ children }) => {
    // State to hold the user's authentication token
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    // State to track authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    // Effect to update local storage and authentication status when the token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    }, [token]);

    // Function to handle user login
    const login = (newToken) => {
        setToken(newToken);
    };

    // Function to handle user logout
    const logout = () => {
        setToken(null);
    };

    // The value provided to components wrapped by this provider
    const value = {
        token,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
