import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [regionCur, setRegionCur] = useState('€');

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('loggedIn');
        const storedUserId = localStorage.getItem('userId');
        const currency = localStorage.getItem('region');

        console.log('isLoggedIn:', isLoggedIn); // Debugging statement
        console.log('id is saved:', storedUserId);
        console.log('currency:', currency);

        if (isLoggedIn) {
            setLoggedIn(true);
            if (storedUserId) {
                setUserId(storedUserId);
                fetchRegionCurrency(storedUserId); // Fetch currency based on user ID
            }
            if (currency) {
                setRegionCur(currency);
            }
        } else {
            checkAuth();
        }
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://auth.nexttolast.online:7532/auth-check', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.loggedIn) {
                setLoggedIn(true);
                setUserId(data.user.id); // Set user ID from server response
                localStorage.setItem('loggedIn', 'true'); // Store login status in localStorage
                localStorage.setItem('userId', data.user.id); // Store user ID in localStorage
                fetchRegionCurrency(data.user.id); // Fetch currency based on user ID
                console.log('Login status set to true'); // Debugging statement
            } else {
                setLoggedIn(false);
                setUserId(null);
                localStorage.removeItem('loggedIn'); // Remove login status from localStorage
                localStorage.removeItem('userId'); // Remove user ID from localStorage
                localStorage.removeItem('region'); // Remove region from localStorage
                console.log('Login status removed'); // Debugging statement
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    };

    const fetchRegionCurrency = async (userId) => {
        try {
            const response = await fetch(`http://auth.nexttolast.online:7532/account/address/${userId}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (data && data.address && data.address.region) {
                setRegionCur(data.address.region);
                localStorage.setItem('region', data.address.region);
                console.log('Region currency set:', data.address.region);
            } else {
                setRegionCur('€');
                localStorage.removeItem('region');
                console.log('Region currency set to default: $');
            }
        } catch (error) {
            console.error('Error fetching the region:', error);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://auth.nexttolast.online:7532/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setLoggedIn(false);
                setUserId(null);
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('userId');
                localStorage.removeItem('region');
                console.log('Logged out successfully');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleDollerRegionChange = () => {
        setRegionCur('$');
        localStorage.setItem('region', '$');
    };

    const handleEuroRegionChange = () => {
        setRegionCur('€');
        localStorage.setItem('region', '€');
    };

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, userId, logout, regionCur, setRegionCur, handleDollerRegionChange, handleEuroRegionChange }}>
            {children}
        </AuthContext.Provider>
    );
};
