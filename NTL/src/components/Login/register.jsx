import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('€');
    const [country, setCountry] = useState('Germany');
    const [error, setError] = useState(null);
    const [registered, setRegistered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (registered) {
            navigate('/login');
        }
    }, [registered, navigate]);

    const handleDropdownClick = () => {
        const dropdownOptions = document.querySelector('.dropdown-options');
        dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
    };

    const handleOptionClick = (e) => {
        const [selectedRegion, selectedCountry] = e.target.getAttribute('data-value').split('|');
        setRegion(selectedRegion);
        setCountry(selectedCountry);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords don’t match!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }

        if (password.length < 8) {
            setError('Password must be more than 8 characters');
            return;
        }

        try {
            const response = await fetch('http://54.93.168.94:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password,
                    street,
                    postalcode: postalCode, // Ensure this matches the backend
                    city,
                    country
                }),
            });

            if (!response.ok) {
                throw new Error('Server failed to register');
            }

            console.log('User registered successfully');
            setRegistered(true);
            setError(null);
        } catch (error) {
            console.log('Failed to fetch', error.message);
            setError('Failed to register');
        }
    };

    return (
        <div className='ntl__page'>
            <div className='ntl__page_card'>
                <h2>Register</h2>
                {error && <p>{error}</p>}
                <div className='ntl__page_input'>
                    <label>Email</label>
                    <input className='black-red-90deg' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' required />
                    <label>Password</label>
                    <input className='black-red-90deg' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' required />
                    <label>Confirm Password</label>
                    <input className='black-red-90deg' type='password' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='********' required />
                    <label>Street</label>
                    <input className='black-red-90deg' type='text' id='street' value={street} onChange={(e) => setStreet(e.target.value)} placeholder='Street' required />
                    <label>Postal Code</label>
                    <input className='black-red-90deg' type='text' id='postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder='Postal Code' required />
                    <label>City</label>
                    <input className='black-red-90deg' type='text' id='city' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' required />
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
                </div>
                <div className='ntl__two-btn'>
                    <button onClick={handleSubmit}>Register</button>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
