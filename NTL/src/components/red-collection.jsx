import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Red1, Red2, Red3, ShoppingBag } from '../assets';
import './collections.css';

function RedCollection ({ addToBasket }) {
    const handleAddToBasket = (watchId) => {
        addToBasket(watchId);
    }
    return (
        <div className='collection-card black-to-red-180deg'>
            <h1 className='gray-red-gray-font-90deg'>NTL metallic Red Collection</h1>
            <div className='cards'>
               
                <div className='card black-red-0deg'> 
                    <Link to='/login'>
                        <img src={Red1} alt='metallic red ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles'>
                            <p className='collection-name red-white-font'>NTL Red Collection</p>
                            <p className='watch-name red-white-font'>Red Posh</p>
                        </div>
                        <div onClick={() => handleAddToBasket(1)} className='shopping-bag'>
                            <span>
                                <span><img src={ShoppingBag} alt='shopping bag' /></span>
                                <span>Add to basket</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='card black-red-0deg'>
                    <img src={Red2} alt='metallic red ntl wrist watch' />
                    <div className='card__watch-info'>
                        <div className='card__titles'>
                            <p className='collection-name red-white-font'>NTL Red Collection</p>
                            <p className='watch-name red-white-font'>RedEye</p>
                        </div>
                        <div onClick={() => handleAddToBasket(2)} className='shopping-bag'>
                            <span>
                                <span><img src={ShoppingBag} alt='shopping bag' /></span>
                                <span>Add to basket</span>
                            </span>
                        </div>
                    </div>
                    
                </div>
                <div className='card black-red-0deg'>
                    <img src={Red3} alt='metallic red ntl wrist watch' />
                    <div className='card__watch-info'>
                        <div className='card__titles'>
                            <p className='collection-name red-white-font'>NTL Red Collection</p>
                            <p className='watch-name red-white-font'>RedSteel</p>
                        </div>
                        <div onClick={() => handleAddToBasket(3)} className='shopping-bag'>
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

export default RedCollection;