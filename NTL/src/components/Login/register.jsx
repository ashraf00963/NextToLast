import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import './login.css';

function Register () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [registered, setregistered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (registered) {
            navigate('/login');
        }
    }, [registered, navigate]);
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(password !== confirmPassword) {
            setError('Passwords don`t match!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setError('Invalid email address');
            return;
        }

        if(password.length < 8){
            setError('password must be more than 8 characters');
            return;
        }

        try {
            const response = await fetch('https://3.75.172.221:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password: password }),
            })

            if(!response.ok){
                throw new Error('Server Failed to Register');
            };
            
            console.log('User Registered Successfully');
            setregistered(true);
            setError(null);
        } catch(error){
            console.log('Failed to Fetch', error.message);
            setError('Failed to register');
        }
    }   

    return (
        <div className='ntl__page'>
            <div className='ntl__page_card'>
                <h1>Register</h1>
                <p>{error}</p>
                <div className='ntl__page_input'>
                    <label>Email</label>
                    <input className='black-red-90deg' type='email' id='email' value={email} onChange={handleEmail} placeholder='email address' required />
                    <label>Password</label>
                    <input className='black-red-90deg' type='password' id='password' value={password} onChange={handlePassword} placeholder='********' required />
                    <label>Confirm Password</label>
                    <input className='black-red-90deg' type='password' id='Confirm password' value={confirmPassword} onChange={handleConfirmPassword} placeholder='********' required />
                </div>
                <div className='ntl__two-btn'>
                    <button onClick={handleSubmit}>Register</button>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;