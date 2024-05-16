import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Green1, Green2, Green3, ShoppingBag } from '../assets';
import './collections.css';

function GreenCollection ({ addToBasket, setWatchId }) {
    const handleAddToBasket = (watchId) => {
        addToBasket(watchId);
    }

    const handleWatchId = (id) => {
        setWatchId(id);
    }
    return (
        <div className='collection-card black-green-180deg'>
            <h1 className='gray-green-gray-font-90deg'>NTL Metallic Green Collection</h1>
            <div className='cards'>
                <div className='card black-green-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(4)}>
                        <img src={Green1} alt='metallic green ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles'>
                            <p className='collection-name green-white-font'>NTL Green Collection</p>
                            <p className='watch-name green-white-font'>Shadow</p>
                        </div>
                        <div onClick={() => handleAddToBasket(4)} className='shopping-bag'>
                            <span>
                                <span><img src={ShoppingBag} alt='shopping bag' /></span>
                                <span>Add to basket</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='card black-green-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(5)}>
                        <img src={Green2} alt='metallic green ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titels'>
                           <p className='collection-name green-white-font'>NTL Green Collection</p>
                            <p className='watch-name green-white-font'>Half Luck</p>
                        </div>
                        <div onClick={() => handleAddToBasket(5)} className='shopping-bag'>
                            <span>
                                <span><img src={ShoppingBag} alt='shopping bag' /></span>
                                <span>Add to basket</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='card black-green-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(6)}>
                        <img src={Green3} alt='metallic green ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles'>
                            <p className='collection-name green-white-font'>NTL Green Collection</p>
                            <p className='watch-name green-white-font'>Morning</p>
                        </div>
                        <div onClick={() => handleAddToBasket(6)} className='shopping-bag'>
                            <span>
                                <span><img src={ShoppingBag} alt='shopping bag' /></span>
                                <span>Add to basket</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreenCollection;