import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cart, UserIcon, Money } from '../assets';
import { AuthContext } from './AuthContext';
import { BasketContext } from './BasketContext';
import './navbar.css';

function Navbar() {
    const { loggedIn, setLoggedIn, setRegionCur, regionCur } = useContext(AuthContext);
    const { basketItems } = useContext(BasketContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState('');
    const location = useLocation(); // Get the current location

    const totalItems = basketItems.reduce((acc, item) => acc + item.quantity, 0);

    const toggleIsOpen = (section) => {
        setIsOpen(prevState => (prevState === section ? '' : section));
    };

    const toggleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        const response = await fetch('https://auth.nexttolast.store/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            setLoggedIn(false);
        }
    };

    const handleRegionChange = () => {
        setRegionCur(prevState => (prevState === '$' ? '€' : '$'));
    };

    // Close the sidebar whenever the location changes
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

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
                            <span className='nav-btn'>{isOpen === 'section1' ? '-' : '+'}</span>
                        </div>
                        <ul className={`sidebar__lists ${isOpen === 'section1' ? 'isOpen' : ''}`}>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Find Your NTL</li></Link>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Men Watches</li></Link>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Women Watches</li></Link>
                        </ul>
                    </div>
                    <div className='sidebar__button-container'>
                        <div className='sidebar__button' onClick={() => toggleIsOpen('section2')}>
                            <p>Jewelry</p>
                            <span className='nav-btn'>{isOpen === 'section2' ? '-' : '+'}</span>
                        </div>
                        <ul className={`sidebar__lists ${isOpen === 'section2' ? 'isOpen' : ''}`}>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Bracelets</li></Link>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Earrings</li></Link>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Rings</li></Link>
                        </ul>
                    </div>
                    <div className='sidebar__button-container'>
                        <div className='sidebar__button' onClick={() => toggleIsOpen('section3')}>
                            <p>Accessories</p>
                            <span className='nav-btn'>{isOpen === 'section3' ? '-' : '+'}</span>
                        </div>
                        <ul className={`sidebar__lists ${isOpen === 'section3' ? 'isOpen' : ''}`}>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Purses</li></Link>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Scarves</li></Link>
                            <Link to='/coming-soon' onClick={() => setIsSidebarOpen(false)}><li>Belts</li></Link>
                        </ul>
                    </div>
                </div>
                <img src={Money} onClick={handleRegionChange} />
            </div>
            <div className='ntl__logo yellow-to-gray-90deg'>
                <Link to='/' onClick={() => setIsSidebarOpen(false)}>
                    <h1>Next To Last</h1>
                </Link>
            </div>
            <div className='ntl__two-logos'>
                <div className='ntl__login-logo'>
                    {loggedIn ? (
                        <>
                            <Link to='/account' id='user-icon_img' onClick={() => setIsSidebarOpen(false)}>
                                <img src={UserIcon} />
                            </Link>
                        </>
                    ) : (
                        <Link to='/login' id='user-icon_img' onClick={() => setIsSidebarOpen(false)}>
                            <img src={UserIcon} />
                        </Link>
                    )}
                </div>
                <div className='ntl__shopping-basket'>
                    <button className='bag-toggle'>
                        <Link to='/basket' onClick={() => setIsSidebarOpen(false)}>
                            <img src={Cart} />
                            {totalItems > 0 && <span className='basket-count'>{totalItems}</span>}
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
