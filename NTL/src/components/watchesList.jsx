import React, { useState, useEffect, useContext } from 'react';
import './watchesList.css';
import { AuthContext } from './AuthContext';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-browser-router';

const WatchesList = ({ setWatchId }) => {
    const [watches, setWatches] = useState([]);
    const [filteredWatches, setFilteredWatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [collection, setCollection] = useState('');
    const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collections, setCollections] = useState([]);
    const { regionCur } = useContext(AuthContext);

    useEffect(() => {
        fetchWatches();
    }, []);

    const fetchWatches = async () => {
        try {
            const response = await axios.get('https://auth.nexttolast.store/watches');
            const data = response.data;
            setWatches(data);
            setFilteredWatches(data);
            extractCollections(data);
        } catch (error) {
            console.error('Error fetching watches:', error);
        }
    };

    const extractCollections = (data) => {
        const uniqueCollections = [...new Set(data.map(watch => watch.collection))];
        setCollections(uniqueCollections);
    };

    useEffect(() => {
        filterWatches();
    }, [searchTerm, collection]);

    const filterWatches = () => {
        let filtered = watches;

        if (searchTerm.trim()) {
            filtered = filtered.filter(watch =>
                watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                watch.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
                watch.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                watch.img.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (collection && collection !== 'all') {
            filtered = filtered.filter(watch => watch.collection === collection);
        }

        setFilteredWatches(filtered);
    };

    const handleDropdownClick = (type) => {
        if (type === 'collection') {
            setCollectionDropdownOpen(!collectionDropdownOpen);
        }
    };

    const handleOptionClick = (type, value) => {
        if (type === 'collection') {
            setCollection(value);
            setCollectionDropdownOpen(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="watches-container">
            <button className="filter-toggle-button" onClick={toggleSidebar}>
                <FaFilter />
            </button>
            <div className={`filter-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="filter-fixed">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value.replace(/\s+/g, ' '))}
                    />
                    <div className="filter-collection">
                        <h3>Collection</h3>
                        <div className="dropdown-filter">
                            <div className="dropdown-filter-select" onClick={() => handleDropdownClick('collection')}>
                                {collection || 'Select Collection'}
                            </div>
                            {collectionDropdownOpen && (
                                <div className="dropdown-filter-options">
                                    <div onClick={() => handleOptionClick('collection', 'all')}>All</div>
                                    {collections.map((col, index) => (
                                        <div key={index} onClick={() => handleOptionClick('collection', col)}>
                                            {col}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="watches-list">
                {filteredWatches.map(watch => (
                    <div key={watch.id} className="watch-item black-purple-180deg">
                        <Link to='/watch' onClick={() => setWatchId(`${watch.id}`)}>
                            <img src={`https://auth.nexttolast.store${watch.img}`} alt={watch.name} />
                        </Link>
                        <p className='purple-white-font'>{watch.collection}</p>
                        <h2 className='purple-white-font'>{watch.name}</h2>
                        <p className='purple-white-font'>{watch.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} {regionCur}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WatchesList;
