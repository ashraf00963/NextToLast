import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart, UserIcon } from '../assets';
import './navbar.css';


function Navbar ({ loggedIn, setLoggedIn }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
    const [isOpen, setIsOpen] = useState({
        section1: false,
        section2: false,
        section3: false,
    });

    const toggleIsOpen = (section) => {
        setIsOpen(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    }


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
                    <div className={`ntl__side-bar ${isSidebarOpen ? 'show' : ''}`}>
                        <div className='sidebar__button-container'>
                            <div className='sidebar__button' onClick={() => toggleIsOpen('section1')}>
                                <p>Watches</p>
                                <span className='btn'>{isOpen.section1 ? '△' : '▽' }</span>
                            </div>
                            <ul className={`sidebar__lists ${isOpen.section1 ? 'isOpen' : ''}`}>
                                <Link to='/'><li>Find Your NTL</li></Link>
                                <Link to='/'> <li>Men Watches</li></Link>
                                <Link to='/'> <li>Women Watches</li></Link>
                            </ul>
                        </div>
                        <div className='sidebar__button-container'>
                            <div className='sidebar__button' onClick={() => toggleIsOpen('section2')}>
                                <p>Jewelry</p>
                                <span className='btn'>{isOpen.section2 ? '△' : '▽' }</span>
                            </div>
                            <ul className={`sidebar__lists ${isOpen.section2 ? 'isOpen' : ''}`}>
                                <Link to='/'><li>Bracelets</li></Link>
                                <Link to='/'> <li>Earrings</li></Link>
                                <Link to='/'> <li>Rings</li></Link>
                            </ul>
                        </div>
                        <div className='sidebar__button-container'>
                            <div className='sidebar__button' onClick={() => toggleIsOpen('section3')}>
                                <p>Accessories</p>
                                <span className='btn'>{isOpen.section3 ? '△' : '▽' }</span>
                            </div>
                            <ul className={`sidebar__lists ${isOpen.section3 ? 'isOpen' : ''}`}>
                                <Link to='/'><li>Purses</li></Link>
                                <Link to='/'> <li>Scarves</li></Link>
                                <Link to='/'> <li>Belts</li></Link>
                            </ul>
                        </div>
                    </div>
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
