import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './account.css';

function Account() {
    const { loggedIn, logout } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [emailSettings, setEmailSettings] = useState(false);
    const [passwordSettings, setPasswordSettings] = useState(false);
    const [addressSettings, setAddressSettings] = useState(false);

    useEffect(() => {
        // Fetch user data from the server
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://54.93.168.94:8080/auth-check');
                if (response.ok) {
                    const userData = await response.json();
                    if(userData.user) {
                        setUser(userData.user.username);
                        // Set other fields like street, postal code, city, and state if available
                        if (userData.user.address) {
                            setStreet(userData.user.address.street);
                            setPostalCode(userData.user.address.postalCode);
                            setCity(userData.user.address.city);
                            setState(userData.user.address.state);
                        }
                    }
                } else {
                    // Handle server error or unauthorized access
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                // Handle network error
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []);
    

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleStreet = (e) => {
        setStreet(e.target.value);
    }

    const handlePostalCode = (e) => {
        setPostalCode(e.target.value);
    }

    const handleCity = (e) => {
        setCity(e.target.value);
    }

    const handleState = (e) => {
        setState(e.target.value);
    }

    const handleEmailSettings = () => {
        setEmailSettings(!emailSettings);
    }

    const handlePasswordSettings = () => {
        setPasswordSettings(!passwordSettings);
    }

    const handleAddressSettings = () => {
        setAddressSettings(!addressSettings);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://54.93.168.94:8080/account/email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                alert('Email updated successfully');
            } else {
                alert('Failed to update email');
            }
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };
    
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://54.93.168.94:8080/account/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });
            if (response.ok) {
                alert('Password updated successfully');
            } else {
                alert('Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };
    
    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://54.93.168.94:8080/account/address', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address: { street, postalCode, city, state } })
            });
            if (response.ok) {
                alert('Address updated successfully');
            } else {
                alert('Failed to update address');
            }
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };
    

    return (
        <div className="account-page">
            <div className='account-card'>
                <h2>Account Settings</h2>
                <button onClick={handleEmailSettings}>Change Email</button>
                {emailSettings &&
                    <>
                        <div className="account-input">
                            <h3>{user}</h3>
                            <label>Email</label>
                            <input className='black-red-90deg' type="email" value={email} onChange={handleEmail} placeholder={user} />
                        </div>
                        <div className='two-buttons'>
                            <button onClick={handleEmailSubmit} type="submit">Update Email</button>
                        </div>
                    </>
                }
                <button onClick={handlePasswordSettings}>Change Password</button>
                {passwordSettings &&
                    <>
                        <div className="account-input">
                            <label>Password</label>
                            <input className='black-red-90deg' type="password" value={password} onChange={handlePassword} />
                        </div>
                        <div className="account-input">
                            <label>Confirm Password</label>
                            <input className='black-red-90deg' type="password" value={confirmPassword} onChange={handleConfirmPassword} />
                        </div>
                        <div className='two-buttons'>
                            <button onClick={handlePasswordSubmit} type="submit">Update Password</button>
                        </div>
                    </>
                }
                <button onClick={handleAddressSettings}>Add Address</button>
                {addressSettings &&
                    <>
                        <div className='account-input'>
                            <label>Street</label>
                            <input className='black-red-90deg' type='text' value={street} onChange={handleStreet} />
                        </div>
                        <div className='account-input'>
                            <label>Postal Code</label>
                            <input className='black-red-90deg' type='text' value={postalCode} onChange={handlePostalCode} />
                        </div>
                        <div className='account-input'>
                            <label>City</label>
                            <input className='black-red-90deg' type='text' value={city} onChange={handleCity} />
                        </div>
                        <div className='account-input'>
                            <label>State</label>
                            <input className='black-red-90deg' type='text' value={state} onChange={handleState} />
                        </div>
                        <div className='two-buttons'>
                            <button onClick={handleAddressSubmit} type='submit'>Add Address</button>
                        </div>
                    </>
                }
                <button onClick={handleLogout} id='log-btn-out'>Logout</button>
            </div>
        </div>
    );
}

export default Account;
