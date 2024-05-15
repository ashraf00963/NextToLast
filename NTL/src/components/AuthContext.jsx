import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('loggedIn');
        const storedUserId = localStorage.getItem('userId');
        console.log('isLoggedIn:', isLoggedIn); // Debugging statement
        console.log('id is saved', storedUserId);
        if (isLoggedIn) {
            setLoggedIn(true);
            if (storedUserId) {
                setUserId(storedUserId);
            }
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
                setUserId(data.user.id); // Set user ID from server response
                localStorage.setItem('loggedIn', 'true'); // Store login status in localStorage
                localStorage.setItem('userId', data.user.id); // Store user ID in localStorage
                console.log('Login status set to true'); // Debugging statement
            } else {
                setLoggedIn(false);
                setUserId(null);
                localStorage.removeItem('loggedIn'); // Remove login status from localStorage
                localStorage.removeItem('userId'); // Remove user ID from localStorage
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
                setUserId(null);
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('userId');
                console.log('Logged out successfully');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, userId, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
