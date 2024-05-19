import { useContext, useState, useEffect } from 'react';
import { BasketContext } from './BasketContext';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Visa, Americanexpress, Maestro, Paypal, Paysafe, Klarna } from '../assets';
import './basket.css';
import { Link } from 'react-router-dom';

function Basket() {
    const { basketItems, setBasketItems, fetchBasketItems, calculateTotalPrice } = useContext(BasketContext);
    const { regionCur } = useContext(AuthContext);
    const [address, setAddress] = useState('');
    const [checkoutStatus, setCheckoutStatus] = useState({ success: false, message: '' });

    const instance = axios.create({
        baseURL: 'http://3.68.198.175:3002',
    });

    const anotherInstance = axios.create({
        baseURL: 'http://54.93.168.94:8080',
    });

    anotherInstance.interceptors.request.use(
        config => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                config.headers['user-id'] = userId;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );


    const fetchUserAddress = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            anotherInstance.get(`/account/address/${userId}`)
                .then(response => {
                    setAddress(response.data.address);
                })
                .catch(error => {
                    console.log('Error fetching the address:', error);
                });
        } else {
            console.log('User ID not found in localStorage');
        }
    };

    useEffect(() => {
        fetchUserAddress();
    }, []);

    const handleAddToBasket = (itemToAdd) => {
        const itemIndex = basketItems.findIndex(item => item.id === itemToAdd.id);
        if (itemIndex !== -1) {
            const updateBasket = [...basketItems];
            updateBasket[itemIndex].quantity += 1;
            setBasketItems(updateBasket);
            instance.post('/basket/update', { id: itemToAdd.id, quantity: updateBasket[itemIndex].quantity })
                .catch(error => {
                    console.log('Error updating item quantity:', error);
                });
        } else {
            instance.post('/basket/add', { id: itemToAdd.id })
                .then(response => {
                    console.log(response.data.message);
                    fetchBasketItems();
                })
                .catch(error => {
                    console.log('Error adding item to basket:', error);
                });
        }
    };

    const handleRemoveFromBasket = (itemToRemove) => {
        const itemIndex = basketItems.findIndex(item => item.id === itemToRemove.id);
        if (itemIndex !== -1) {
            const updatedBasket = [...basketItems];
            if (updatedBasket[itemIndex].quantity <= 1) {
                instance.post('/basket/remove', { id: itemToRemove.id })
                    .then(response => {
                        console.log(response.data.message);
                        fetchBasketItems();
                    })
                    .catch(error => {
                        console.log('Error removing item from basket:', error);
                    });
                updatedBasket.splice(itemIndex, 1);
            } else {
                updatedBasket[itemIndex].quantity--;
                instance.post('/basket/update', { id: itemToRemove.id, quantity: updatedBasket[itemIndex].quantity })
                    .catch(error => {
                        console.log('Error updating item quantity:', error);
                    });
            }
            setBasketItems(updatedBasket);
        }
    };

    const handleRemoveWatchBtn = (itemToRemove) => {
        instance.post('/basket/removeWatch', { id: itemToRemove.id })
            .then(response => {
                console.log(response.data.message);
                fetchBasketItems();  // Fetch updated items from server
            })
            .catch(error => {
                console.log('Error completely removing item from basket:', error);
            });
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

    const navigate = useNavigate();

    const handleCheckOut = () => {
        const totalPrice1 = calculateTotalPrice();
        navigate('/delivery', { state: { totalPrice1 }});

        setCheckoutStatus({ success: true, message: `Thank you for your purchase with the total of ${regionCur}${totalPrice.toFixed(2)}. The order will be delivered shortly to ${joinedDelivery}.` });
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
        <div className='ntl__basket'>
            <div className='ntl__basket-items'>
                <h2>My Basket</h2>
                <div className='checkout-breadcrumbs'>
                    <p id='i-am-here'>1. Basket</p>
                    <p>2. Shipping</p>
                    <p>3. Payment</p>
                    <p>4. Confirmation</p>
                </div>
                {basketItems && basketItems.length > 0 && (
                    <ul className='ntl__basket-list'>
                        {basketItems.map(item => (
                            <li className='basket-item' key={item.id}>
                                <button className="remove-watch" onClick={() => handleRemoveWatchBtn(item)}>X</button>
                                <img className='basket-watch-img' src={`http://3.68.198.175:3002${item.img}`} alt='watch' />
                                <div className='item-details'>
                                    <div className='watch-collection'>{item.collection}</div>
                                    <div className='watch-name'>{item.name}</div>
                                    <div className='quantity-con'>
                                        <button className='remove-button' onClick={() => handleRemoveFromBasket(item)}>-</button>
                                        <div className='watch-quantity'>{item.quantity}</div>
                                        <button className='add-button' onClick={() => handleAddToBasket(item)}>+</button>
                                    </div>
                                    <div className='watch-price'>{regionCur}{calculateItemPrice(item.price).toFixed(2)}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) || 
                <div className='empty-basket'>
                    <h3>No Items in Basket</h3> <Link to='/'><p>Go Home!!</p></Link>
                </div>
                }
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
                <button className='checkout' onClick={handleCheckOut}>Proceed To Checkout</button>
                {checkoutStatus.success && <p>{checkoutStatus.message}</p>}
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

export default Basket;
