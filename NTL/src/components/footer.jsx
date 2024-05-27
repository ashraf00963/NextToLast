import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, X, Visa, Americanexpress, Maestro, Paypal, Paysafe, Klarna, FreeDelivery, NTLReturn, NTLGuarantee, SecurePayments, NTLlogo } from '../assets';
import './footer.css';

function Footer() {
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
            <div className='footer__brand'>
                <img src={NTLlogo} alt="Next To Last Logo" className='footer__logo' />
                <p className='footer__description'>
                    NTL, also known as Next To Last, is synonymous with luxury and elegance. We offer only the finest, purest materials and each piece is meticulously handcrafted by the world's top artisans. Experience unparalleled quality and timeless beauty with our exquisite collection of watches.
                </p>
            </div>
            <div className='footer__benefits'>
                <div className='footer__benefit'>
                    <img src={FreeDelivery} alt="Free Delivery" className='footer__benefit-logo' />
                    <p>Free Delivery</p>
                </div>
                <div className='footer__benefit'>
                    <img src={NTLReturn} alt="NTL Return" className='footer__benefit-logo' />
                    <p>NTL Return</p>
                </div>
                <div className='footer__benefit'>
                    <img src={NTLGuarantee} alt="NTL Guarantee" className='footer__benefit-logo' />
                    <p>NTL Guarantee</p>
                </div>
                <div className='footer__benefit'>
                    <img src={SecurePayments} alt="Secure Payments" className='footer__benefit-logo' />
                    <p>Secure Payments</p>
                </div>
            </div>
            <div className='footer__help'>
                <div className='footer__section-container'>
                    <div className='footer__section' onClick={() => toggleIsOpen('section1')}>
                        <p>Products</p>
                        <span className='btn'>{isOpen.section1 ? '-' : '+'}</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section1 ? 'isOpen' : ''}`}>
                        <li><Link to='/watcheslist'>All NTL Watches</Link></li>
                    </ul>
                </div>
                <div className='footer__section-container'>
                    <div className='footer__section' onClick={() => toggleIsOpen('section2')}>
                        <p>Support</p>
                        <span className='btn'>{isOpen.section2 ? '-' : '+'}</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section2 ? 'isOpen' : ''}`}>
                        <li><Link to='/customer-support'>Customer Support Form</Link></li>
                    </ul>
                </div>
                <div className='footer__section-container'>
                    <div className='footer__section' onClick={() => toggleIsOpen('section3')}>
                        <p>About Us</p>
                        <span className='btn'>{isOpen.section3 ? '-' : '+'}</span>
                    </div>
                    <ul className={`footer__section-list ${isOpen.section3 ? 'isOpen' : ''}`}>
                        <li><Link to='/about-us'>NTL Headquarters</Link></li>
                        <li><Link to='/coming-soon'>Careers</Link></li>
                    </ul>
                </div>
            </div>
            <div className='footer__newsletter'>
                <h4>Newsletter</h4>
                <p>Subscribe for updates, offers, and news.</p>
                <form className='newsletter-form'>
                    <input type='email' placeholder='Your Email' required />
                    <button type='submit'>Subscribe</button>
                </form>
            </div>
            <div className='footer__contact'>
                <h4>Contact Us</h4>
                <p>Email: <a href='mailto:info@nexttolast.store'>info@nexttolast.store</a></p>
                <p>Phone: <a href='tel:17621674747'>+176 216 74747</a></p>
                <p>Address: 123 Watch Street, Berlin, Germany</p>
            </div>
            <div className='footer__social'>
                <h4>Follow Us</h4>
                <ul className='social-media-icons'>
                    <li><a href='#'><img src={Facebook} alt='Facebook' /></a></li>
                    <li><a href='#'><img src={Instagram} alt='Instagram' /></a></li>
                    <li><a href='#'><img src={X} alt='Twitter' /></a></li>
                </ul>
            </div>
            <div className='footer__payment'>
                <h4>We Accept</h4>
                <div className='payment-icons'>
                    <img src={Visa} alt='Visa' />
                    <img src={Americanexpress} alt='American Express' />
                    <img src={Maestro} alt='Maestro' />
                    <img src={Paypal} alt='PayPal' />
                    <img src={Paysafe} alt='Paysafe' />
                    <img src={Klarna} alt='Klarna' />
                </div>
            </div>
            <div className='footer__rights'>
                <p>© 2024 NextToLast. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer;
