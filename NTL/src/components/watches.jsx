import axios from "axios";
import { useState, useEffect } from "react";
import './watches.css';
import Footer from "./footer";

function Watches({ watchId }) {
    const [watch, setWatch] = useState({});

    const fetchWatch = async (watchId) => {
        try {
            const response = await axios.get(`http://3.68.198.175:3002/watches/${watchId}`);
            setWatch(response.data);
        } catch (error) {
            console.error('Error fetching watch:', error);
        }
    };
    
    const addToBasket = async (watchId) => {
        try {
            // Send the watch ID to the server to add it to the basket
            const response = await axios.post('http://3.68.198.175:3002/basket/add', { id: watchId });
            console.log('Watch added to basket:', response.data.watch);
        } catch (error) {
            console.error('Error adding watch to basket:', error);
        }
    };

    useEffect(() => {
        if (watchId) {
            fetchWatch(watchId);
        }
    }, [watchId]);

    const price = watch.price;

    return (
        <div className="watches-page">
            <div className="watch-page">
                <img src={`http://3.68.198.175:3002${watch.img}`} alt="ntl watch" />
                <div className="watch-page-info">
                    <div className="watch-page-headers">
                        <h3 className="gold-white-font">{watch.collection}</h3>
                        <h2 className="gold-white-font">{watch.name}</h2>
                        <p>{watch.description}</p>
                    </div>
                    <div className="watch-page-price">
                        {price &&
                        <p>{price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })} $</p>
                        }
                        <p id="inta">INCL. TAX.</p>
                        <button onClick={() =>  addToBasket(watchId)}>Add to basket</button>
                    </div>
                    <div className="watch-page-features">
                        <div className="first-feat">
                            <span><p>&#10003; Free Delivery and Returns</p></span>
                            <span><p>&#10003; 5-Year Warranty</p></span>
                        </div>
                        <div className="second-feat">
                            <span><p>&#10003; Secure Payment</p></span>
                            <span><p>&#10003; Safe Checkout</p></span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div> 
    );
}

export default Watches;
