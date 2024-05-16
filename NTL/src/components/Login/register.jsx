import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import './login.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('$');
    const [country, setCountry] = useState('United States');
    const [error, setError] = useState(null);
    const [registered, setRegistered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (registered) {
            navigate('/login');
        }
    }, [registered, navigate]);

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
                    address: {
                        street,
                        postalCode,
                        city,
                        region,
                        country
                    }
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

    const handleRegionChange = (e) => {
        const [selectedRegion, selectedCountry] = e.target.value.split('|');
        setRegion(selectedRegion);
        setCountry(selectedCountry);
    };

    return (
        <div className='ntl__page'>
            <div className='ntl__page_card'>
                <h2>Register</h2>
                <p>{error}</p>
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
                    <label>Region</label>
                    <select onChange={handleRegionChange} value={`${region}|${country}`} className='reigon black-red-90deg'>
                        <option value='€|Austria'>Austria - €</option>
                        <option value='€|Belgium'>Belgium - €</option>
                        <option value='€|Cyprus'>Cyprus - €</option>
                        <option value='€|Estonia'>Estonia - €</option>
                        <option value='€|Finland'>Finland - €</option>
                        <option value='€|France'>France - €</option>
                        <option value='€|Germany'>Germany - €</option>
                        <option value='€|Greece'>Greece - €</option>
                        <option value='€|Ireland'>Ireland - €</option>
                        <option value='€|Italy'>Italy - €</option>
                        <option value='€|Latvia'>Latvia - €</option>
                        <option value='€|Lithuania'>Lithuania - €</option>
                        <option value='€|Luxembourg'>Luxembourg - €</option>
                        <option value='€|Malta'>Malta - €</option>
                        <option value='€|Netherlands'>Netherlands - €</option>
                        <option value='€|Portugal'>Portugal - €</option>
                        <option value='€|Slovakia'>Slovakia - €</option>
                        <option value='€|Slovenia'>Slovenia - €</option>
                        <option value='$|United States'>United States - $</option>
                    </select>
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
