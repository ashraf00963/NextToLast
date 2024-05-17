import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    const instance = axios.create({
        baseURL: 'http://3.68.198.175:3002',
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

    return (
        <BasketContext.Provider value={{ basketItems, setBasketItems, addToBasket, fetchBasketItems }}>
            {children}
        </BasketContext.Provider>
    );
};
