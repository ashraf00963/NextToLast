import React, { useContext, useEffect, useState } from 'react';
import './popup.css';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Popup({ watch, onClose }) {
    const { regionCur } = useContext(AuthContext);
    const [price, setPrice] = useState(watch.price);

    useEffect(() => {
        if (regionCur === '$') {
            setPrice(watch.price + 200);
        } else {
            setPrice(watch.price);
        }
    }, [regionCur, watch.price]);

    return (
        <div className="popup white-gold-0deg">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={`https://auth.nexttolast.store${watch.img}`} alt={watch.name} />
                <div className='popup-info'>
                    <h2>Watch Added to Basket</h2>
                    <p>{watch.collection}</p>
                    <p>{watch.name}</p>
                    <p>{price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} {regionCur}</p>
                    <Link to='/basket'>
                        <button>Show in basket</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Popup;
