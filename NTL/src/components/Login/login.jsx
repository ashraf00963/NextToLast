import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login ({ onLogin }) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const [ loggedIn, setLoggedIn ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(loggedIn) {
            navigate('/');
        }
    }, [ loggedIn, navigate ]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {  
            const response = await fetch('https://172.31.27.64:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password: password }),
            });

            if(!response.ok){
                throw new Error('Login Failed');
            };

            const data = await response.json();

            if(data){
                console.log('Login successful');
                setLoggedIn(true);
                onLogin();
                setError(null);
            } else {
                console.error('Invalid response from server');
                setError('An error occurred while logging in');
            }
        } catch(error) {
            console.log('Login failed', error.message);
            setError(error.message);
        };
    };

    return (
        <div className='ntl__page'>
            <div className='ntl__page_card'>
                <h1>Login</h1>
                <p>{error}</p>
                <div className='ntl__page_input'>
                    <label>Email</label>
                    <input className='black-red-90deg' type='email' id='email' value={email} onChange={handleEmail} placeholder='email address' required />
                    <label>Password</label>
                    <input className='black-red-90deg' type='password' id='password' value={password} onChange={handlePassword} placeholder='*******' required />
                </div>
                <div className='ntl__two-btn'>
                    <button onClick={handleSubmit}>Login</button> 
                    <Link to='/register'>Reigster</Link>
                </div>      
            </div>
        </div>
    )

}

export default Login;