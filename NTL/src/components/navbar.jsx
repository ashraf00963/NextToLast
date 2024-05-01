import { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar ({loggedIn, setLoggedIn}) {
    const [ showMenu, setShowMenu ] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <div className='ntl__navbar'>
            <div className='ntl__navbar-logo yellow-to-gray-90deg'>
                <Link to='/'>
                <h1>Next To Last</h1>
                </Link>
            </div>
            <button className='menu-toggle' onClick={toggleMenu}>
                &#9776;
            </button>
            <ul className={`ntl__navbar-menu ${showMenu ? 'show' : ''}`}>
                <Link to='/'><li>Gallery</li></Link>
                <Link to='/'><li>Products</li></Link>
                {loggedIn ? (
                    <li><button onClick={handleLogout}>Logout</button></li>
                ) : (
                    <>
                        <Link to='/Login'><li>Login</li></Link>
                        <Link to='/register'><li>Register</li></Link>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar;