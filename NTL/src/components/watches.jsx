import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Popup from "./popup";
import { BasketContext } from "./BasketContext";
import './watches.css';
import { AuthContext } from "./AuthContext";
import ImageModal from "./imageModal";
import { Mag } from "../assets";

function Watches({ watchId, setWatchId }) {
    const [watch, setWatch] = useState({});
    const [priceW, setPriceW] = useState('');
    const { addToBasket } = useContext(BasketContext);
    const { regionCur } = useContext(AuthContext);
    const [popup, setPopup] = useState({ show: false, watch: null });
    const [isAddingToBasket, setIsAddingToBasket] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [allWatches, setAllWatches] = useState([]);
    const scrollableRef = useRef(null);

    const navigate = useNavigate();

    // Fetch watch data based on watchId
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

    // Fetch all watches data
    const fetchAllWatches = async () => {
        try {
            const response = await axios.get('https://auth.nexttolast.store/watches');
            setAllWatches(response.data);
        } catch (error) {
            console.error('Error fetching all watches:', error);
        }
    };

    // Update the displayed price based on the region currency
    const updatePrice = (price, region) => {
        if (region === '$') {
            setPriceW(price + 200);
        } else {
            setPriceW(price);
        }
    };

    // Handle adding watch to basket
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

    // Handle popup close
    const handleClosePopup = () => {
        setPopup({ show: false, watch: null });
    };

    // Save watchId to localStorage
    const saveWatchIdToLocalStorage = (id) => {
        localStorage.setItem('watchId', id);
    };

    // Retrieve watchId from localStorage
    const getWatchIdFromLocalStorage = () => {
        return localStorage.getItem('watchId');
    };

    // Fetch watch data when watchId changes or on component mount
    useEffect(() => {
        const storedWatchId = getWatchIdFromLocalStorage();
        const idToFetch = watchId || storedWatchId;

        if (idToFetch) {
            fetchWatch(idToFetch);
            saveWatchIdToLocalStorage(idToFetch);
        }
    }, [watchId]);

    // Fetch all watches on component mount
    useEffect(() => {
        fetchAllWatches();
    }, []);

    // Update price when region currency changes
    useEffect(() => {
        if (watch.price) {
            updatePrice(watch.price, regionCur);
        }
    }, [regionCur, watch.price]);

    // Scroll functions
    const scrollLeft = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleSetWatchId = (id) => {
        setWatchId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

            <div className="all-watches-section black-red-180deg">
                <h3>All Watches</h3>
                <div className="scrollable-watches-container">
                    <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
                    <div className="scrollable-watches" ref={scrollableRef}>
                        {allWatches.map(watch => (
                            <div key={watch.id} className="watch-card-sec" onClick={() => handleSetWatchId(`${watch.id}`)}>
                                <img src={`https://auth.nexttolast.store${watch.img}`} alt={watch.name} />
                                <h4>{watch.name}</h4>
                                <p>{watch.collection}</p>
                                <p>{watch.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} {regionCur}</p>
                            </div>
                        ))}
                    </div>
                    <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
                </div>
            </div>

            <Footer />
            {popup.show && <Popup watch={popup.watch} onClose={handleClosePopup} />}
            {isImageModalOpen && <ImageModal imgSrc={`https://auth.nexttolast.store${watch.img}`} onClose={() => setIsImageModalOpen(false)} />}
        </div> 
    );
}

export default Watches;
