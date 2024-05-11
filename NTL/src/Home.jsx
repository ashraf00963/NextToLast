import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Basket, BlueCollection, Footer, GreenCollection, Header, RedCollection } from './components';


function HomePage () {
    const [watches, setWatches] = useState([]);

    const instance = axios.create({
        baseURL: 'http://localhost:3000',
    });

    useEffect(() => {
        // Function to fetch all watches from the server
        const fetchWatches = async () => {
            try {
                const response = await axios.get('http://localhost:3000/watches');
                setWatches(response.data);
            } catch (error) {
                console.error('Error fetching watches:', error);
            }
        };

        fetchWatches();
    }, []);

    // Function to handle adding a watch to the basket
    const addToBasket = async (watchId) => {
        try {
            // Send the watch ID to the server to add it to the basket
            const response = await axios.post('http://localhost:3000/basket/add', { id: watchId });
            console.log('Watch added to basket:', response.data.watch);
        } catch (error) {
            console.error('Error adding watch to basket:', error);
        }
    };


    return (
        <>
            <Header />
            <RedCollection addToBasket={addToBasket} />
            <GreenCollection addToBasket={addToBasket} />
            <BlueCollection addToBasket={addToBasket} />
            <Footer />
        </>
    )
}

export default HomePage;