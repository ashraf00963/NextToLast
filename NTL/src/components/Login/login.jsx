import { useState } from 'react';
import './login.css';

function Login () {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const [ loggedIn, setLoggedIn ] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {  
            const response = await fetch('http://localhost/3001/login', {
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
                setError(null);
            } else {
                console.error('Invalid response from server');
                setError('An error occurred while logging in');
            }
        } catch(error) {
            console.log('Login failed', error.message);
            setError(error);
        };
    };

    const handlLoggedIn = () => {
        setLoggedIn(!loggedIn);
    }

    return (
        <div className='ntl__login-page'>
            <div className='ntl__login-page_card'>
                <h1>Login</h1>
                <div className='ntl__login-page_input'>
                    <label>Email address:</label>
                    <input type='Email' id='Email' value={email} onChange={handleEmail} placeholder='Email' />
                    <label>Password: </label>
                    <input type='password' id='password' value={password} onChange={handlePassword} placeholder='*******' />
                    {error && <p>{error}</p>}
                </div>
            <button onClick={handleSubmit}>Login</button>            
            </div>
        </div>
    )

}

export default Login;