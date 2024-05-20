import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './account.css';

function Account() {
    const { loggedIn, logout, userId } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('United States');
    const [region, setRegion] = useState('');
    const [emailSettings, setEmailSettings] = useState(false);
    const [passwordSettings, setPasswordSettings] = useState(false);
    const [addressSettings, setAddressSettings] = useState(false);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await fetch(`http://auth.nexttolast.online:7532/account/email/${userId}`);
                if (response.ok) {
                    const { email } = await response.json();
                    setEmail(email);
                } else {
                    console.error('Error fetching user email:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        };
    
        const fetchUserAddress = async () => {
            try {
                const response = await fetch(`http://auth.nexttolast.online:7532/account/address/${userId}`);
                if (response.ok) {
                    const { street, postalcode, city, region, country } = await response.json();
                    setStreet(street);
                    setPostalCode(postalcode);
                    setCity(city);
                    setRegion(region);
                    setCountry(country);
                } else {
                    console.error('Error fetching user address:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user address:', error);
            }
        };
    
        fetchUserEmail();
        fetchUserAddress();
    }, [userId]);

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleStreet = (e) => {
        setStreet(e.target.value);
    };

    const handlePostalCode = (e) => {
        setPostalCode(e.target.value);
    };

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const handleRegionChange = (selectedRegion, selectedCountry) => {
        setRegion(selectedRegion);
        setCountry(selectedCountry);
    };

    const handleEmailSettings = () => {
        setEmailSettings(!emailSettings);
    };

    const handlePasswordSettings = () => {
        setPasswordSettings(!passwordSettings);
    };

    const handleAddressSettings = () => {
        setAddressSettings(!addressSettings);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://auth.nexttolast.online:7532/account/email/${userId}`, {
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
            const response = await fetch(`http://auth.nexttolast.online:7532/account/password/${userId}`, {
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
            const response = await fetch(`http://auth.nexttolast.online:7532/account/address/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ street, postalcode: postalCode, city, region, country }) // Ensure postalcode matches backend
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
    

    // Dropdown functionality
    const handleDropdownClick = () => {
        const dropdownOptions = document.querySelector('.dropdown-options');
        dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
    };

    const handleOptionClick = (e) => {
        const [selectedRegion, selectedCountry] = e.target.getAttribute('data-value').split('|');
        handleRegionChange(selectedRegion, selectedCountry);
        document.querySelector('.dropdown-select').textContent = e.target.textContent;
        document.querySelector('.dropdown-options').style.display = 'none';
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown')) {
            document.querySelector('.dropdown-options').style.display = 'none';
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                <button onClick={handleAddressSettings}>Change Address</button>
                {addressSettings &&
                    <>
                        <div className='account-input'>
                            <label>Street</label>
                            <input className='black-red-90deg' type='text' value={street} onChange={handleStreet} placeholder={street ? street : 'Street'} />
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
                            <label>Region and Country</label>
                            <div className="dropdown">
                                <div className="dropdown-select black-red-90deg" onClick={handleDropdownClick}>
                                    {region && country ? `${region} - ${country}` : 'Select an option'}
                                </div>
                                <div className="dropdown-options">
                                    <div data-value="€|Austria" onClick={handleOptionClick}>Austria</div>
                                    <div data-value="€|Belgium" onClick={handleOptionClick}>Belgium</div>
                                    <div data-value="€|Cyprus" onClick={handleOptionClick}>Cyprus</div>
                                    <div data-value="€|Estonia" onClick={handleOptionClick}>Estonia</div>
                                    <div data-value="€|Finland" onClick={handleOptionClick}>Finland</div>
                                    <div data-value="€|France" onClick={handleOptionClick}>France</div>
                                    <div data-value="€|Germany" onClick={handleOptionClick}>Germany</div>
                                    <div data-value="€|Greece" onClick={handleOptionClick}>Greece</div>
                                    <div data-value="€|Ireland" onClick={handleOptionClick}>Ireland</div>
                                    <div data-value="€|Italy" onClick={handleOptionClick}>Italy</div>
                                    <div data-value="€|Latvia" onClick={handleOptionClick}>Latvia</div>
                                    <div data-value="€|Lithuania" onClick={handleOptionClick}>Lithuania</div>
                                    <div data-value="€|Luxembourg" onClick={handleOptionClick}>Luxembourg</div>
                                    <div data-value="€|Malta" onClick={handleOptionClick}>Malta</div>
                                    <div data-value="€|Netherlands" onClick={handleOptionClick}>Netherlands</div>
                                    <div data-value="€|Portugal" onClick={handleOptionClick}>Portugal</div>
                                    <div data-value="€|Slovakia" onClick={handleOptionClick}>Slovakia</div>
                                    <div data-value="€|Slovenia" onClick={handleOptionClick}>Slovenia</div>
                                    <div data-value="$|United States" onClick={handleOptionClick}>United States</div>
                                </div>
                            </div>
                        </div>
                        <div className='two-buttons'>
                            <button onClick={handleAddressSubmit} type='submit'>Change Address</button>
                        </div>
                    </>
                }
                <button onClick={handleLogout} id='log-btn-out'>Logout</button>
            </div>
        </div>
    );
}

export default Account;
