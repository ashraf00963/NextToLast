import { useState } from 'react';
import { Facebook, Instagram, X } from '../assets';
import './footer.css';
import { Link } from 'react-browser-router';

function Footer () {
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

    return (
        <div className='footer'>
            <div className='footer__help'>
                <div className='footer__section-container'>
                    <div className='footer__section' onClick={() => toggleIsOpen('section1')}>
                        <p>Products</p>
                        <span className='btn'>{isOpen.section1 ? '-' : '+' }</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section1 ? 'isOpen' : ''}`}>
                        <li><Link to='/coming-soon'>All NTL Watches</Link></li>
                        <li><Link to='/coming-soon'>Replacement Parts</Link></li>
                        <li><Link to='/coming-soon'>Misc</Link></li>
                    </ul>
                </div>
                <div className='footer__section-container'>
                    <div className='footer__section' onClick={() => toggleIsOpen('section2')}>
                        <p>Support</p>
                        <span className='btn'>{isOpen.section2 ? '-' : '+' }</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section2 ? 'isOpen' : ''}`}>
                        <li><Link to='/coming-soon'>Customer Support</Link></li>
                        <li><Link to='/coming-soon'>Manuals</Link></li>
                        <li><Link to='/coming-soon'>Product Registration</Link></li>
                        <li><Link to='/coming-soon'>Daylight Savings Time</Link></li>
                    </ul>
                </div>
                <div className='footer__section-container'>
                    <div className='footer__section'  onClick={() => toggleIsOpen('section3')}>
                        <p>Corporate</p>
                        <span className='btn'>{isOpen.section3 ? '-' : '+' }</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section3 ? 'isOpen' : ''}`}>
                        <li><Link to='/coming-soon'>Corporate Site</Link></li>
                        <li><Link to='/coming-soon'>Careers</Link></li>
                    </ul>
                </div>
            </div>
            <div className='footer__rights'>
                <div className="footer__social-media-section">
                    <ul className="social-media-icons">
                        <li><Link to='/coming-soon'><img src={Facebook} alt="Facebook" /></Link></li>
                        <li><Link to='/coming-soon'><img src={Instagram} alt="Twitter" /></Link></li>
                        <li><Link to='/coming-soon'><img src={X} alt="Instagram" /></Link></li>
                    </ul>
                    <p className="copyright">© 2024 NextToLast. All rights reserved</p>
                </div>
            </div>
        </div>
    )
};


export default Footer;