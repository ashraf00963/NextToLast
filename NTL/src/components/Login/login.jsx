import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../AuthContext';

function Login () {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const { setLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {  
            const response = await fetch('https://auth.nexttolast.store/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username: email, password: password }),
            });
    
            if (!response.ok) {
                throw new Error('Login Failed');
            }
    
            const data = await response.json();
    
            if (data && data.userId) {
                console.log('Login successful');
                localStorage.setItem('loggedIn', 'true'); // Set loggedIn to true in localStorage
                localStorage.setItem('userId', data.userId); // Store user ID in localStorage
                setLoggedIn(true);
                setError(null);
                navigate('/');
            } else {
                console.error('Invalid response from server');
                setError('An error occurred while logging in');
            }
        } catch (error) {
            console.log('Login failed', error.message);
            setError(error.message);
        }
    };
    
    

    return (
      <div className='ntl__page'>
          <div className='ntl__page_card'>
              <h2>Login</h2>
              <p>{error}</p>
              <div className='ntl__page_input'>
                  <label>Email</label>
                  <input className='black-red-90deg' type='email' id='email' value={email} onChange={handleEmail} placeholder='email address' required />
                  <label>Password</label>
                  <input className='black-red-90deg' type='password' id='password' value={password} onChange={handlePassword} placeholder='*******' required />
              </div>
              <div className='ntl__two-btn'>
                  <button onClick={handleSubmit}>Login</button> 
                  <Link to='/register'>Register</Link>
              </div>
          </div>
      </div>
    )
}

export default Login;

