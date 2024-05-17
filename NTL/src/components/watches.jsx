import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Footer from "./footer";
import Popup from "./popup";
import { BasketContext } from "./BasketContext";
import './watches.css';

function Watches({ watchId }) {
    const [watch, setWatch] = useState({});
    const { addToBasket } = useContext(BasketContext);
    const [popup, setPopup] = useState({ show: false, watch: null });
    const [isAddingToBasket, setIsAddingToBasket] = useState(false); // Add state to track if adding to basket is in progress

    const fetchWatch = async (watchId) => {
        try {
            const response = await axios.get(`http://3.68.198.175:3002/watches/${watchId}`);
            setWatch(response.data);
        } catch (error) {
            console.error('Error fetching watch:', error);
        }
    };
    
    const handleAddToBasket = async (watchId) => {
        if (isAddingToBasket) return; // If adding to basket is already in progress, exit the function
        
        try {
            setIsAddingToBasket(true); // Set adding to basket in progress

            // Send the watch ID to the server to add it to the basket
            const response = await axios.post('http://3.68.198.175:3002/basket/add', { id: watchId });
            console.log('Watch added to basket:', response.data.watch);

            // Show popup with the added watch details
            setPopup({ show: true, watch });

            // Update the basket context
            addToBasket(response.data.watch);
        } catch (error) {
            console.error('Error adding watch to basket:', error);
        } finally {
            setIsAddingToBasket(false); // Reset adding to basket status
        }
    };

    const handleClosePopup = () => {
        setPopup({ show: false, watch: null });
    };

    useEffect(() => {
        if (watchId) {
            fetchWatch(watchId);
        }
    }, [watchId]);

    const price = watch.price;

    return (
        <div className="watches-page">
            <div className="watch-page black-gold-90deg">
                <img src={`http://3.68.198.175:3002${watch.img}`} alt="ntl watch" />
                <div className="watch-page-info">
                    <div className="watch-page-headers">
                        <h3>{watch.collection}</h3>
                        <h2>{watch.name}</h2>
                        <p>{watch.description}</p>
                    </div>
                    <div className="watch-page-price">
                        {price &&
                        <p className="green-white-font">{price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })} $</p>
                        }
                        <p id="inta">INCL. TAX.</p>
                        <button onClick={() => handleAddToBasket(watchId)} disabled={isAddingToBasket}>Add to basket</button> {/* Disable button if adding to basket is in progress */}
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
            {popup.show && <Popup watch={popup.watch} onClose={handleClosePopup} />}
        </div> 
    );
}

export default Watches;
