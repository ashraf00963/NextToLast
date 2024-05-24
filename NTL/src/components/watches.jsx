import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Popup from "./popup";
import { BasketContext } from "./BasketContext";
import './watches.css';
import { AuthContext } from "./AuthContext";
import ImageModal from "./imageModal";
import { Mag } from "../assets";

function Watches({ watchId }) {
    const [watch, setWatch] = useState({});
    const [priceW, setPriceW] = useState('');
    const { addToBasket } = useContext(BasketContext);
    const { regionCur } = useContext(AuthContext);
    const [popup, setPopup] = useState({ show: false, watch: null });
    const [isAddingToBasket, setIsAddingToBasket] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const navigate = useNavigate();

    const fetchWatch = async (id) => {
        try {
            const response = await axios.get(`https://auth.nexttolast.store/watches/${id}`);
            const fetchedWatch = response.data;
            setWatch(fetchedWatch);
            updatePrice(fetchedWatch.price, regionCur);
        } catch (error) {
            console.error('Error fetching watch:', error);
        }
    };

    const updatePrice = (price, region) => {
        if (region === '$') {
            setPriceW(price + 200);
        } else {
            setPriceW(price);
        }
    };

    const handleAddToBasket = async (id) => {
        if (isAddingToBasket) return;

        try {
            setIsAddingToBasket(true);
            const response = await axios.post('https://auth.nexttolast.store/basket/add', { id });
            console.log('Watch added to basket:', response.data.watch);

            setPopup({ show: true, watch });

            addToBasket(response.data.watch);
        } catch (error) {
            console.error('Error adding watch to basket:', error);
        } finally {
            setIsAddingToBasket(false);
        }
    };

    const handleClosePopup = () => {
        setPopup({ show: false, watch: null });
    };

    const saveWatchIdToLocalStorage = (id) => {
        localStorage.setItem('watchId', id);
    };

    const getWatchIdFromLocalStorage = () => {
        return localStorage.getItem('watchId');
    };

    useEffect(() => {
        const storedWatchId = getWatchIdFromLocalStorage();
        const idToFetch = watchId || storedWatchId;

        if (idToFetch) {
            fetchWatch(idToFetch);
            saveWatchIdToLocalStorage(idToFetch);
        }
    }, [watchId]);

    useEffect(() => {
        if (watch.price) {
            updatePrice(watch.price, regionCur);
        }
    }, [regionCur, watch.price]);

    return (
        <div className="watches-page">
            <button className="go-back-btn" onClick={() => navigate('/')}>{'<'}</button>
            <div className="watch-page black-red-0deg">
                {watch.img && 
                    <>
                    <img 
                        src={`https://auth.nexttolast.store${watch.img}`} 
                        alt="ntl watch" 
                        onClick={() => setIsImageModalOpen(true)} // Open modal on image click
                    />
                    <img src={Mag} alt="magni" id="watch-pag-img-mag" />
                    
                    </>
                }
                <div className="watch-page-info">
                    <div className="watch-page-headers">
                        <h3>{watch.collection}</h3>
                        <h2>{watch.name}</h2>
                        <p>{watch.description}</p>
                    </div>
                    <div className="watch-page-price">
                        {watch.price &&
                        <p className="green-white-font">{priceW.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} {regionCur}</p>
                        }
                        <p id="inta">INCL. TAX.</p>
                        <button 
                            onClick={() => handleAddToBasket(watch.id)} 
                            disabled={isAddingToBasket}
                        >
                            {isAddingToBasket ? 'Adding...' : 'Add to basket'}
                        </button>
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
            {isImageModalOpen && <ImageModal imgSrc={`https://auth.nexttolast.store${watch.img}`} onClose={() => setIsImageModalOpen(false)} />}
        </div> 
    );
}

export default Watches;
