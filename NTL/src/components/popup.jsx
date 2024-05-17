import React from 'react';
import './popup.css';
import { Link } from 'react-router-dom';

function Popup({ watch, onClose }) {
    return (
        <div className="popup white-gold-0deg">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={`http://3.68.198.175:3002${watch.img}`} alt={watch.name} />
                <div className='popup-info'>
                    <h2>Watch Added to Basket</h2>
                    <p>{watch.collection}</p>
                    <p>{watch.name}</p>
                    <p>{watch.price}$</p>
                    <Link to='/basket'>
                        <button>Show in basket</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Popup;
