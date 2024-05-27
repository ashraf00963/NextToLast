import { useContext, useState } from 'react';
import { Americanexpress, Klarna, Maestro, Paypal, Paysafe, Visa } from '../assets';
import './payment.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BasketContext } from './BasketContext';

function Payment () {
    const [isOpen, setIsOpen] = useState({
        section1: false,
        section2: false,
        section3: false,
        section4: false,
    });
    const [cardNumber, setCardNumber] = useState('');
    const [creditInfo, setCreditInfo] = useState({
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { Fname, totalPrice, street, postalCode, city, country, email } = location.state;
    const { fetchBasketItems } = useContext(BasketContext);


    const instance = axios.create({
        baseURL: 'https://auth.nexttolast.store',
    });


    const toggleIsOpen = (section) => {
        setIsOpen(prevState => ({
            ...Object.fromEntries(
                Object.entries(prevState).map(([key, value]) => [key, key === section])
            )
        }));
    };

    const handleClearBasket = () => {
        instance.post('/basket/clear')
            .then(response => {
                console.log(response.data.message);
                fetchBasketItems();
            })
            .catch(error => {
                console.log('Error clearing basket:', error);
            });
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreditInfo({
            ...creditInfo,
            [name]: value,
        });
    };

    const handlePaypalNavigation = () => {
        window.open('https://www.paypal.com/login', '_blank');
    };

    const handleKlarnaNavigation = () => {
        window.open('https://www.klarna.com/login', '_blank');
    };

    const handlePaysafeNavigation = () => {
        window.open('https://login.paysafecard.com/login', '_blank');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/confirmation', { state: { Fname, totalPrice, street, postalCode, city, country, email } });
        handleClearBasket();
    }

    return (
        <div className='payment-page'>
            <div className='payment-form'>
                <h2>Payment Methods</h2>
                <div className='checkout-breadcrumbs'>
                    <Link to='/basket'><p>1. Basket</p></Link>
                    <Link to='/delivery'><p>2. Shipping</p></Link>
                    <p id='i-am-here'>3. Payment</p>
                    <p>4. Confirmation</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='payment-methods'>
                        <div className='payment-method'>
                            <div className='card-icons-payment' onClick={() => toggleIsOpen('section1')}>
                                <p>Credit card</p>
                                <div>
                                    <img src={Visa} alt='Visa'/>
                                    <img src={Americanexpress} alt='American Express'/>
                                    <img src={Maestro} alt='Maestro'/>
                                </div>
                            </div>
                            <div className={`payment-info ${isOpen.section1 ? 'isOpen' : ''}`}>
                                <p>Enter payment details</p>
                                <div className='card-number'>
                                    <input type='text' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Card Number' className='card-input' />
                                    <div className='expiry-inputs'>
                                        <input
                                            type='text'
                                            name='expiryMonth'
                                            value={creditInfo.expiryMonth}
                                            onChange={handleInputChange}
                                            placeholder='MM'
                                            className='expiry-input'
                                        />
                                        /
                                        <input
                                            type='text'
                                            name='expiryYear'
                                            value={creditInfo.expiryYear}
                                            onChange={handleInputChange}
                                            placeholder='YY'
                                            className='expiry-input'
                                        />
                                        <input
                                            type='text'
                                            name='cvc'
                                            value={creditInfo.cvc}
                                            onChange={handleInputChange}
                                            placeholder='CVC'
                                            className='cvc-input'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='payment-method'>
                            <div className='card-icons-payment' onClick={() => toggleIsOpen('section2')}>
                                <p>Paypal</p>
                                <img src={Paypal} alt='PayPal'/>
                            </div>
                            <div className={`payment-info ${isOpen.section2 ? 'isOpen' : ''}`}>
                                <p>Login to Paypal</p>
                                <button type='button' className='paypal-btn' onClick={handlePaypalNavigation}>PayPal</button>
                            </div>
                        </div>
                        <div className='payment-method'>
                            <div className='card-icons-payment' onClick={() => toggleIsOpen('section3')}>
                                <p>Klarna</p>
                                <img src={Klarna} alt='Klarna'/>
                            </div>
                            <div className={`payment-info ${isOpen.section3 ? 'isOpen' : ''}`}>
                                <p>Pay with Klarna</p>
                                <button type='button' className='klarna-btn' onClick={handleKlarnaNavigation}>Klarna</button>
                            </div>
                        </div>
                        <div className='payment-method'>
                            <div className='card-icons-payment' onClick={() => toggleIsOpen('section4')}>
                                <p>Paysafe</p>
                                <img src={Paysafe} alt='Paysafe'/>
                            </div>
                            <div className={`payment-info ${isOpen.section4 ? 'isOpen' : ''}`}>
                                <p>Pay with Paysafe</p>
                                <button type='button' className='paysafe-btn' onClick={handlePaysafeNavigation}>Paysafe</button>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='submit-btn'>Submit Payment</button>
                </form>
            </div>
        </div>
    )
};

export default Payment;
