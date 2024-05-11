import { useState } from 'react';
import { Green1, Green2, Green3, ShoppingBag } from '../assets';
import './collections.css';

function GreenCollection ({ addToBasket }) {
    const handleAddToBasket = (watchId) => {
        addToBasket(watchId);
    }
    return (
        <div className='collection-card black-green-180deg'>
            <h1 className='gray-green-gray-font-90deg'>NTL Metallic Green Collection</h1>
            <div className='cards'>
                <div className='card black-green-0deg'>
                    <img src={Green1} alt='metallic green ntl wrist watch' />
                    <div className='card__watch-info'>
                        <div className='card__titles'>
                            <p className='collection-name green-white-font'>NTL Green Collection</p>
                            <p className='watch-name green-white-font'>Shadow</p>
                        </div>
                        <button className='shopping-bag' onClick={() => handleAddToBasket(4)}><img src={ShoppingBag} alt='shopping Bag' /></button>
                    </div>
                </div>
                <div className='card black-green-0deg'>
                    <img src={Green2} alt='metallic green ntl wrist watch' />
                    <div className='card__watch-info'>
                        <div className='card__titels'>
                           <p className='collection-name green-white-font'>NTL Green Collection</p>
                            <p className='watch-name green-white-font'>Half Luck</p>
                        </div>
                        <button className='shopping-bag' onClick={() => handleAddToBasket(5)}><img src={ShoppingBag} alt='shopping Bag' /></button>
                    </div>
                </div>
                <div className='card black-green-0deg'>
                    <img src={Green3} alt='metallic green ntl wrist watch' />
                    <div className='card__watch-info'>
                        <div className='card__titles'>
                            <p className='collection-name green-white-font'>NTL Green Collection</p>
                            <p className='watch-name green-white-font'>Morning</p>
                        </div>
                        <button className='shopping-bag' onClick={() => handleAddToBasket(6)}><img src={ShoppingBag} alt='shopping Bag' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreenCollection;