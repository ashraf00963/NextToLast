import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './confirm.css';

function Confirmation() {
    const location = useLocation();
    const { Fname, totalPrice, street, postalCode, city, country, email } = location.state;
    const { userId, loggedIn, regionCur } = useContext(AuthContext);
    const deliveryNumber = Math.floor(100000 + Math.random() * 900000);

    return (
        <div className='confirmation-page-container'>
            <div className='confirmation-page'>
                <div className='delivery-details'>
                    <h2 style={{ color: 'green' }}><span>&#10004;</span>Your order has been completed</h2>
                    <div className='delivery-details-info'>
                        <span><h3>Thank you for choosing <span className='yellow-to-gray-90deg' id='logo-n'>Next To Last</span></h3></span>
                        <p id='margin-btm'><span id='color-ch'>Order number:</span> {deliveryNumber}</p>
                        <p id='color-ch'><span>Shipping address:</span></p>
                        <p id='to-right'>{postalCode} {street}, {city}, {country}</p>
                        <span><p id='margin-top'>Order confirmation will be sent to:</p></span>
                        <p id='to-right'>{email}</p>
                    </div>
                    <div className='home-button'>
                        <button onClick={() => history.push('/')}>Go to Homepage</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
