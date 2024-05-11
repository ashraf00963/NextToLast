import { useState } from "react";
import { Blue1, Blue2,  Blue3, ShoppingBag } from "../assets";
import './collections.css';

function BlueCollection ({ addToBasket }) {
    const handleAddToBasket = (watchId) => {
        addToBasket(watchId);
    }
    return (
        <div className="collection-card black-blue-180deg">
            <h1 className="gray-blue-gray-font-90deg">NTL Metallic Blue Collection</h1>
            <div className="cards">
                <div className="card black-blue-0deg">
                    <img src={Blue1} alt="metallic blue ntl wrist watch" />
                    <div className="card__watch-info">
                        <div className="card__titles">
                            <p className="collection-name blue-white-font">NTL Blue Collection</p>
                            <p className="watch-name blue-white-font">Black River</p>
                        </div>
                        <button className='shopping-bag' onClick={() => handleAddToBasket(7)}><img src={ShoppingBag} alt='shopping Bag' /></button>
                    </div>
                </div>
                <div className="card black-blue-0deg">
                    <img src={Blue2} alt="metallic blue ntl wrist watch" />
                    <div className="card__watch-info">
                        <div className="card__titles">
                            <p className="collection-name blue-white-font">NTL Blue Collection</p>
                            <p className="watch-name blue-white-font">Black Sand</p>
                        </div>
                        <button className='shopping-bag' onClick={() => handleAddToBasket(8)}><img src={ShoppingBag} alt='shopping Bag' /></button>
                    </div>
                </div>
                <div className="card black-blue-0deg">
                    <img src={Blue3} alt="metallic blue ntl wrist watch" />
                    <div className="card__watch-info">
                        <div className="card__titles">
                            <p className="collection-name blue-white-font">NTL Blue Collection</p>
                            <p className="watch-name blue-white-font">Black Castle</p>
                        </div>
                        <button className='shopping-bag' onClick={() => handleAddToBasket(9)}><img src={ShoppingBag} alt='shopping Bag' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlueCollection;