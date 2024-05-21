import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart, UserIcon, Exchange, Money } from '../assets';
import { AuthContext } from './AuthContext';
import { BasketContext } from './BasketContext';
import './navbar.css';


function Navbar () {
    const { loggedIn, setLoggedIn, handleEuroRegionChange, handleDollerRegionChange, regionCur, setRegionCur } = useContext(AuthContext);
    const { basketItems } = useContext(BasketContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState({
        section1: false,
        section2: false,
        section3: false,
        section4: false,
    });

    const totalItems = basketItems.reduce((acc, item) => acc + item.quantity, 0);
    

    const toggleIsOpen = (section) => {
        setIsOpen(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    }

    const toggleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleLogout = async () => {
        const response = await fetch('http://auth.nexttolast.online:7532/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            setLoggedIn(false);
        }
    };
    
    const handleRegionChange = () => {
        if (regionCur === '$') {
            setRegionCur('€')
        } else {
            setRegionCur('$');
        }
    }

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
                            <span className='nav-btn'>{isOpen.section1 ? '-' : '+' }</span>
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
                            <span className='nav-btn'>{isOpen.section2 ? '-' : '+' }</span>
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
                            <span className='nav-btn'>{isOpen.section3 ? '-' : '+' }</span>
                        </div>
                        <ul className={`sidebar__lists ${isOpen.section3 ? 'isOpen' : ''}`}>
                            <Link to='/'><li>Purses</li></Link>
                            <Link to='/'> <li>Scarves</li></Link>
                            <Link to='/'> <li>Belts</li></Link>
                        </ul>
                    </div>
                    <div className='sidebar__button-container' id='img-exchange'>
                        <div className='sidebar__button'  onClick={() => toggleIsOpen('section4')}>
                            <img src={Exchange} alt='euro and doller exchange icon' />
                            <span className='nav-btn'>{isOpen.section4 ? '-' : '+' }</span>
                        </div>
                        <ul className={`sidebar__lists ${isOpen.section4 ? 'isOpen' : ''}`}>
                            <li><button className='doller' onClick={handleDollerRegionChange}>$</button></li>
                            <li><button className='euro' onClick={handleEuroRegionChange}>€</button></li>
                        </ul>
                    </div>
                </div>
                <img src={Money} onClick={handleRegionChange} />
            </div>
            <div className='ntl__logo yellow-to-gray-90deg'>
                <Link to='/'>
                    <h1>Next To Last</h1>
                </Link>
            </div>
            <div className='ntl__two-logos'>
                <div className='ntl__login-logo'>
                    {loggedIn ? (
                        <>
                        <Link to='/account' id='user-icon_img'>
                            <img src={UserIcon} />
                        </Link>
                        </>
                    ) : (
                        <Link to='/login' id='user-icon_img'>
                            <img src={UserIcon} />
                        </Link> 
                    )}
                </div>
                <div className='ntl__shopping-basket'>
                    <button className='bag-toggle'>
                        <Link to='/basket'>
                            <img src={Cart} /> 
                            {totalItems > 0 && <span className='basket-count'>{totalItems}</span>}
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;

