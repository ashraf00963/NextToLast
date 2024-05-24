import { useContext, useState, useEffect } from 'react';
import './delivery.css';
import { AuthContext } from './AuthContext';
import { BasketContext } from './BasketContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Basket from './basket';
import { Visa, Americanexpress, Maestro, Paypal, Paysafe, Klarna } from '../assets';

function Delivery () {
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState({});
    const { userId, loggedIn, regionCur } = useContext(AuthContext);
    const { basketItems, setBasketItems, fetchBasketItems, calculateTotalPrice } = useContext(BasketContext);
    const location = useLocation();
    const { totalPrice1 } = location.state;
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await fetch(`https://auth.nexttolast.store/account/email/${userId}`);
                if (response.ok) {
                    const { email } = await response.json();
                    setEmail(email);
                } else {
                    console.error('Error fetching user email:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        };
    
        const fetchUserAddress = async () => {
            try {
                const response = await fetch(`https://auth.nexttolast.store/account/address/${userId}`);
                if (response.ok) {
                    const { street, postalcode, city, country } = await response.json();
                    setStreet(street);
                    setPostalCode(postalcode);
                    setCity(city);
                    setCountry(country);
                } else {
                    console.error('Error fetching user address:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user address:', error);
            }
        };
    
        if (userId) {
            fetchUserAddress();
            fetchUserEmail();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        const fieldsToValidate = [
            { name: 'Fname', value: Fname },
            { name: 'Lname', value: Lname },
            { name: 'street', value: street },
            { name: 'postalCode', value: postalCode },
            { name: 'city', value: city },
            { name: 'country', value: country },
            { name: 'email', value: email },
            { name: 'phoneNumber', value: phoneNumber }
        ];
    
        const newErrors = {};
        fieldsToValidate.forEach(field => {
            if (!field.value.trim()) {
                newErrors[field.name] = 'Required*';
            }
        });
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            navigate('/payment', { state: { Fname, totalPrice, street, postalCode, city, country, email } });
        }
    };
    

    
    const calculateItemPrice = (price) => {
        return regionCur === '$' ? price + 200 : price;
    };

    const price = basketItems.length > 0 ? basketItems.reduce((total, item) => total + (item.quantity * calculateItemPrice(item.price)), 0) : 0;
    const shippingPrice = 0.00;
    const taxLabel = regionCur === '$' ? 'Sales Tax' : 'VAT';
    const taxPrice = basketItems.length > 0 ? basketItems.reduce((tax, item) => tax + (item.quantity * 92), 0) : 0;
    const totalPrice = price + shippingPrice + taxPrice;

    return (
        <div className='checkout-page'>
            <div className='checkout-form'>
                <h2>Shipping</h2>
                <div className='checkout-breadcrumbs'>
                    <p>1. Basket</p>
                    <p id='i-am-here'>2. Shipping</p>
                    <p>3. Payment</p>
                    <p>4. Confirmation</p>
                </div>
                <div className='field'>
                    <select>
                        <option value='Mr'>Mr*</option>
                        <option value='Ms'>Ms</option>
                    </select>
                </div>
                <div className='two-fields'>
                    <div className='sec-checkout'>
                        <input type='text' value={Fname} onChange={(e) => setFname(e.target.value)} placeholder={errors.Fname || 'First name*'} required className={errors.Fname ? 'error' : ''} />
                    </div> 
                    <div className='sec-checkout'>
                        <input type='text' value={Lname} onChange={(e) => setLname(e.target.value)} placeholder={errors.Lname || 'Last name*'} required className={errors.Fname ? 'error' : ''} />
                    </div>
                </div>
                <div className='field'>
                    <div className='sec-checkout'>
                        <input type='text' value={street} onChange={(e) => setStreet(e.target.value)} placeholder={errors.street || (street ? street : 'Street & housenumber*')} required className={errors.Fname ? 'error' : ''} />
                    </div>
                </div>
                <div className='field'>
                    <div className='sec-checkout'>
                        <input type='text' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder={errors.postalCode || (postalCode ? postalCode : 'Postal code*')} required className={errors.Fname ? 'error' : ''} />
                    </div>
                </div>
                <div className='field'>
                    <div className='sec-checkout'>
                        <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder={errors.city || (city ? city : 'City*')} required className={errors.Fname ? 'error' : ''} />
                    </div>
                </div>
                <div className='field'>
                    <div className='sec-checkout'>
                        <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} placeholder={errors.country || (country ? country : 'Country*')} required className={errors.Fname ? 'error' : ''} />
                    </div>
                </div>
                <div className='field'>
                    <div className='sec-checkout'>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={errors.email || (email ? email : 'email address*')} required className={errors.Fname ? 'error' : ''} />
                    </div>
                </div>
                <div className='field'>
                    <div className='sec-checkout'>
                        <input type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder={errors.phoneNumber || 'Phone number*'} required className={errors.Fname ? 'error' : ''} />
                    </div>
                </div>
            </div>
            <div className='ntl__basket-order_summary'>
                <h2>Order Summary</h2>
                <div className='ntl__basket-price_info'>
                    <div className='price__sub'>
                        <div className='subtotal'>
                            <p>Subtotal (INCL. TAX)</p>
                            <p>{regionCur}{price.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                        <div className='shipping-p'>
                            <p>Shipping & Handling</p>
                            <p>{regionCur}{shippingPrice.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                        <div className='tax-p'>
                            <p>{taxLabel}</p>
                            <p>{regionCur}{taxPrice.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                    </div>
                    <div className='total__price'>
                        <p id='total'>Total</p>
                        <p>{regionCur}{totalPrice.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                    </div>
                </div>
                <button className='checkout' onClick={handleSubmit}>Proceed To Payment</button>
                <div className='payments'>
                    <ul className='payments-logos'>
                        <li><img src={Visa} alt='Visa logo' /></li>
                        <li><img src={Paypal} alt='Paypal logo' /></li>
                        <li><img src={Americanexpress} alt='americanexpress logo' /></li>
                        <li><img src={Klarna} alt='Klarna logo' /></li>
                        <li><img src={Maestro} alt='maestro logo' /></li>
                        <li><img src={Paysafe} alt='paysafe logo' /></li>
                    </ul>
                </div>
            </div>
        </div>
    )    
};

export default Delivery;