import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Red1, Red2, Red3, ShoppingBag } from '../assets';
import './collections.css';

function RedCollection ({ addToBasket, setWatchId }) {
    const handleAddToBasket = (watchId) => {
        addToBasket(watchId);
    }
    
    const handleWatchId = (id) => {
        setWatchId(id);
    }

    return (
        <div className='collection-card black-to-red-180deg'>
            <h1 className='gray-red-gray-font-90deg'>NTL metallic Red Collection</h1>
            <div className='cards'>
                <div className='card black-red-0deg'> 
                    <Link to='/watch' onClick={() => handleWatchId(1)}>
                        <img src={Red1} alt='metallic red ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name red-white-font'>NTL Red Collection</p>
                                <p className='watch-name red-white-font'>Red Posh</p>
                            </div>
                            <p className='red-white-font' id='collect-price'>$899</p>
                        </div>
                    </div>
                </div>
                <div className='card black-red-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(2)}>
                        <img src={Red2} alt='metallic red ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name red-white-font'>NTL Red Collection</p>
                                <p className='watch-name red-white-font'>RedEye</p>
                            </div>
                            <p className='red-white-font' id='collect-price'>$999</p>
                        </div>
                    </div>
                </div>
                <div className='card black-red-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(3)}>
                        <img src={Red3} alt='metallic red ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name red-white-font'>NTL Red Collection</p>
                                <p className='watch-name red-white-font'>RedSteel</p>
                            </div>
                            <p className='red-white-font' id='collect-price'>$1099</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RedCollection;