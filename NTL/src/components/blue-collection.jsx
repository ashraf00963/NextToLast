import { Link } from 'react-router-dom';
import { useState } from "react";
import { Blue1, Blue2,  Blue3, ShoppingBag } from "../assets";
import './collections.css';

function BlueCollection ({ addToBasket, setWatchId }) {
    const handleAddToBasket = (watchId) => {
        addToBasket(watchId);
    }

    const handleWatchId = (id) => {
        setWatchId(id);
    }

    return (
        <div className="collection-card black-blue-180deg">
            <h1 className="gray-blue-gray-font-90deg">NTL Metallic Blue Collection</h1>
            <div className="cards">
                <div className="card black-blue-0deg">
                    <Link to='/watch' onClick={() => handleWatchId(7)}>
                        <img src={Blue1} alt='metallic blue ntl wrist watch' />
                    </Link>
                    <div className="card__watch-info">
                        <div className='card__titles-price'>
                            <div className="card__titles">
                                <p className="collection-name blue-white-font">NTL Blue Collection</p>
                                <p className="watch-name blue-white-font">Black River</p>
                            </div>
                            <p className="blue-white-font" id='collect-price'>$1299</p>
                        </div>
                    </div>
                </div>
                <div className="card black-blue-0deg">
                    <Link to='/watch' onClick={() => handleWatchId(8)}>
                        <img src={Blue2} alt='metallic blue ntl wrist watch' />
                    </Link>
                    <div className="card__watch-info">
                        <div className='card__titles-price'>
                            <div className="card__titles">
                                <p className="collection-name blue-white-font">NTL Blue Collection</p>
                                <p className="watch-name blue-white-font">Black Sand</p>
                            </div>
                            <p className="blue-white-font" id='collect-price'>$1599</p>
                        </div>
                    </div>
                </div>
                <div className="card black-blue-0deg">
                    <Link to='/watch' onClick={() => handleWatchId(9)}>
                        <img src={Blue3} alt='metallic blue ntl wrist watch' />
                    </Link>
                    <div className="card__watch-info">
                        <div className='card__titles-price'>
                            <div className="card__titles">
                                <p className="collection-name blue-white-font">NTL Blue Collection</p>
                                <p className="watch-name blue-white-font">Black Castle</p>
                            </div>
                            <p className="blue-white-font" id='collect-price'>$1099</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlueCollection;