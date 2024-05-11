import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart, UserIcon } from '../assets';
import './navbar.css';


function Navbar ({ loggedIn, setLoggedIn }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);

    const toggleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleLoginPage = () => {
        setIsLoginPageOpen(!isLoginPageOpen);
    }

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
            <div className='ntl__navbar black-red-90deg'>
                <div className='ntl__menu-bar'>
                    <button className='menu-toggle' onClick={toggleMenu}>
                            {isSidebarOpen ? '✕' : '☰'}
                    </button>
                    <ul className={`ntl__side-bar ${isSidebarOpen ? 'show' : ''}`}>
                        <li><Link to='/'>Watches</Link></li>
                        <li><Link to='/'>Jewelry</Link></li>
                        <li><Link to='/'>Accessories</Link></li>
                    </ul>
                </div>
                <div className='ntl__logo yellow-to-gray-90deg'>
                    <Link to='/'>
                        <h1>Next To Last</h1>
                    </Link>
                </div>
                <div className='ntl__two-logos'>
                    <div className='ntl__login-logo'>
                        <button className='login-toggle'>
                            <Link to='/login'>
                                <img src={UserIcon} />
                            </Link>
                        </button>
                    </div>
                    <div className='ntl__shopping-basket'>
                        <button className='bag-toggle'>
                            <Link to='/basket'>
                                <img src={Cart} />
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default Navbar;
