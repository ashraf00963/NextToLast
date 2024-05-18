import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Basket, BlueCollection, Footer, GreenCollection, Header, RedCollection } from './components';
import Popup from './components/popup';
import { BasketContext } from './components/BasketContext';
import './App.css';
import { AuthContext } from './components/AuthContext';


function HomePage ({ setWatchId }) {
    const [watches, setWatches] = useState([]);
    const [popup, setPopup] = useState({ show: false, watch: null });
    const { addToBasket } = useContext(BasketContext);
    const { regionCur } = useContext(AuthContext);

    const instance = axios.create({
        baseURL: 'http://3.68.198.175:3002',
    });

    useEffect(() => {
        // Function to fetch all watches from the server
        const fetchWatches = async () => {
            try {
                const response = await axios.get('http://3.68.198.175:3002/watches');
                setWatches(response.data);
            } catch (error) {
                console.error('Error fetching watches:', error);
            }
        };

        fetchWatches();
    }, []);

     // Function to handle adding a watch to the basket
     const handleAddToBasket = async (watchId) => {
        if (popup.show) {
            return;
        }
        try {
            // Send the watch ID to the server to add it to the basket
            const response = await axios.post('http://3.68.198.175:3002/basket/add', { id: watchId });
            console.log('Watch added to basket:', response.data.watch);

            // Find the added watch details
            const addedWatch = watches.find(watch => watch.id === watchId);

            // Show popup with the added watch details
            setPopup({ show: true, watch: addedWatch });

            // Update the basket context
            addToBasket(response.data.watch);

        } catch (error) {
            console.error('Error adding watch to basket:', error);
        }
    };

    const handleClosePopup = () => {
        setPopup({ show: false, watch: null });
    };

    return (
        <>
            <Header />
            <RedCollection addToBasket={handleAddToBasket} setWatchId={setWatchId} regionCur={regionCur} />
            <GreenCollection addToBasket={handleAddToBasket} setWatchId={setWatchId} regionCur={regionCur} />
            <BlueCollection addToBasket={handleAddToBasket} setWatchId={setWatchId} regionCur={regionCur} />
            <Footer />
            {popup.show && <Popup watch={popup.watch} onClose={handleClosePopup} />}
        </>
    );
}

export default HomePage;
