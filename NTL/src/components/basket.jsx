import { useState, useEffect } from 'react';
import axios from 'axios';

import { Visa, Americanexpress, Maestro, Paypal, Paysafe, Klarna } from '../assets';
import './basket.css';

function Basket () {
    const [basketItems, setBasketItems] = useState([]);

    const instance = axios.create({
        baseURL: 'http://172.31.27.64:3002',
    });

    const fetchBasketItems = () => {
        instance.get('/basket/items')
            .then(response => {
                setBasketItems(response.data.map(item => ({ ...item, quantity: 1})));
            })
            .catch(error => {
                console.log('Error fetching basket items:', error);
            });
    };

    useEffect(() => {
        fetchBasketItems();
    }, []);

    const updateBasketItems = (updateBasket) => {
        setBasketItems(updateBasket);
    };

    const handleAddToBasket = (itemToAdd) => {
        const itemIndex = basketItems.findIndex(item => item.id === itemToAdd.id);
        if (itemIndex !== -1) {
            const updateBasket = [...basketItems];
            updateBasket[itemIndex].quantity += 1;
            updateBasketItems(updateBasket);
        } else {
            instance.post('/basket/add', { id: itemToAdd.id }) // Call the server endpoint to add the item
                .then(response => {
                    console.log(response.data.message); // Log the response message
                    fetchBasketItems(); // Fetch updated basket items from the server
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
                instance.post('/basket/remove', { id: itemToRemove.id }) // Call the server endpoint to remove the item
                    .then(response => {
                        console.log(response.data.message); // Log the response message
                        fetchBasketItems(); // Fetch updated basket items from the server
                    })
                    .catch(error => {
                        console.log('Error removing item from basket:', error);
                    });
                updatedBasket.splice(itemIndex, 1);
            } else {
                updatedBasket[itemIndex].quantity--;
            }
            updateBasketItems(updatedBasket);
        }
    };
    

    const price = basketItems.length > 0 ? basketItems.reduce((total, item) => total + (item.quantity * item.price), 0) : 0;
    const shippingPrice = 0.00;
    const gstPrice = basketItems.length > 0 ? basketItems.reduce((gst, item) => gst + (item.quantity * 92), 0) : 0;
    const totalPrice = price + shippingPrice + gstPrice;

    return (
        <div className='ntl__basket'>
            <div className='ntl__basket-items'>
                <h2>My Basket</h2>
                {basketItems && basketItems.length > 0 && (
                    <ul className='ntl__basket-list'>
                        {basketItems.map(item => (
                            <li className='basket-item' key={item.id}>
                                <img className='basket-watch-img' src={`http://172.31.27.64:3002${item.img}`} alt='watch' />
                                <div className='item-details'>
                                    <div className='watch-collection'>{item.collection}</div>
                                    <div className='watch-name'>{item.name}</div>
                                    <div className='quantity-con'>
                                        <button className='remove-button' onClick={() => handleRemoveFromBasket(item)}>-</button>
                                        <div className='watch-quantity'>{item.quantity}</div>
                                        <button className='add-button' onClick={() => handleAddToBasket(item)}>+</button>
                                    </div>
                                    <div className='watch-price'>${item.price}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='ntl__basket-order_summary'>
                <h2>Order Summary</h2>
                <div className='ntl__basket-price_info'>
                    <div className='price__sub'>
                        <div className='subtotal'>
                            <p>Subtotal (INCL. TAX)</p>
                            <p>${totalPrice.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                        <div className='shipping-p'>
                            <p>Shipping & Handling</p>
                            <p>${shippingPrice.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                        <div className='gst-p'>
                            <p>GST</p>
                            <p>${gstPrice.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                    </div>
                    <div className='total__price'>
                        <p id='total'>Total</p>
                        <p>${totalPrice.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                    </div>
                </div>
                <button className='checkout'>Proceed To Checkout</button>
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
}

export default Basket;
