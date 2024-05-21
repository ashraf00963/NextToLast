import { useState } from 'react';
import { Facebook, Instagram, X } from '../assets';
import './footer.css';

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
                        <li><a href='#'>All NTL Watches</a></li>
                        <li><a href='#'>Replacement Parts</a></li>
                        <li><a href='#'>Misc</a></li>
                    </ul>
                </div>
                <div className='footer__section-container'>
                    <div className='footer__section' onClick={() => toggleIsOpen('section2')}>
                        <p>Support</p>
                        <span className='btn'>{isOpen.section2 ? '-' : '+' }</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section2 ? 'isOpen' : ''}`}>
                        <li><a href='#'>Customer Support</a></li>
                        <li><a href='#'>Manuals</a></li>
                        <li><a href='#'>Product Registration</a></li>
                        <li><a href='#'>Daylight Savings Time</a></li>
                    </ul>
                </div>
                <div className='footer__section-container'>
                    <div className='footer__section'  onClick={() => toggleIsOpen('section3')}>
                        <p>Corporate</p>
                        <span className='btn'>{isOpen.section3 ? '-' : '+' }</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section3 ? 'isOpen' : ''}`}>
                        <li><a href='#'>Corporate Site</a></li>
                        <li><a href='#'>Careers</a></li>
                    </ul>
                </div>
            </div>
            <div className='footer__rights'>
                <div className="footer__social-media-section">
                    <ul className="social-media-icons">
                        <li><a href="#"><img src={Facebook} alt="Facebook" /></a></li>
                        <li><a href="#"><img src={Instagram} alt="Twitter" /></a></li>
                        <li><a href="#"><img src={X} alt="Instagram" /></a></li>
                    </ul>
                    <p className="copyright">© 2024 NextToLast. All rights reserved</p>
                </div>
            </div>
        </div>
    )
};


export default Footer;