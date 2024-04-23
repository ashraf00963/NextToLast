import { useState } from 'react';
import './navbar.css';

function Navbar () {
    const [ showMenu, setShowMenu ] = useState(false);


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    return (
        <div className='ntl__navbar'>
            <div className='ntl__navbar-logo yellow-to-gray-90deg'>
                <h1>Next To Last</h1>
            </div>
            <button className='menu-toggle' onClick={toggleMenu}>
                &#9776;
            </button>
            <ul className={`ntl__navbar-menu ${showMenu ? 'show' : ''}`}>
                <li><a href='#'>Gallery</a></li>
                <li><a href='#'>Products</a></li>
                <li><a href='#'>Login</a></li>
            </ul>
        </div>
    )
}

export default Navbar;