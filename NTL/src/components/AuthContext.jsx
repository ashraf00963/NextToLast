import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('loggedIn');
        console.log('isLoggedIn:', isLoggedIn); // Debugging statement
        if (isLoggedIn) {
            setLoggedIn(true);
        } else {
            checkAuth();
        }
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://54.93.168.94:8080/auth-check', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.loggedIn) {
                setLoggedIn(true);
                localStorage.setItem('loggedIn', 'true'); // Store login status in localStorage
                console.log('Login status set to true'); // Debugging statement
            } else {
                setLoggedIn(false);
                localStorage.removeItem('loggedIn'); // Remove login status from localStorage
                console.log('Login status removed'); // Debugging statement
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://54.93.168.94:8080/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setLoggedIn(false);
                localStorage.removeItem('loggedIn');
                console.log('Logged out successfully');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
