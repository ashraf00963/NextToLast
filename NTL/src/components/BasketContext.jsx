import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    const instance = axios.create({
        baseURL: 'https://auth.nexttolast.store',
    });

    const addToBasket = (item) => {
        setBasketItems(prevItems => {
            const itemIndex = prevItems.findIndex(basketItem => basketItem.id === item.id);
            if (itemIndex !== -1) {
                const newItems = [...prevItems];
                newItems[itemIndex].quantity += 1;
                return newItems;
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const calculateTotalPrice = () => {
        return basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const fetchBasketItems = () => {
        instance.get('/basket/items')
            .then(response => {
                setBasketItems(response.data);
            })
            .catch(error => {
                console.log('Error fetching basket items:', error);
            });
    };

    useEffect(() => {
        fetchBasketItems();
    }, []);

    const handleClearBasket = () => {
        instance.post('/basket/clear')
            .then(response => {
                console.log(response.data.message);
                fetchBasketItems();
            })
            .catch(error => {
                console.log('Error clearing basket:', error);
            });
    };

    return (
        <BasketContext.Provider value={{ basketItems, setBasketItems, addToBasket, fetchBasketItems, calculateTotalPrice, handleClearBasket }}>
            {children}
        </BasketContext.Provider>
    );
};
