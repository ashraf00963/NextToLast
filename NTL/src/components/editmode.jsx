import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './editmode.css';

const EditMode = () => {
    const [watches, setWatches] = useState([]);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [name, setName] = useState('');
    const [collection, setCollection] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchWatches();
    }, []);

    const fetchWatches = async () => {
        try {
            const response = await fetch('https://auth.nexttolast.store/watches');
            const result = await response.json();
            if (response.ok) {
                setWatches(result);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('An error occurred while fetching watches.');
        }
    };

    const handleSelectWatch = (watch) => {
        setSelectedWatch(watch);
        setName(watch.name);
        setCollection(watch.collection);
        setPrice(watch.price);
        setDescription(watch.description);
        setImg(watch.img);
    };

    const handleUpdateWatch = async () => {
        try {
            const priceNumber = parseFloat(price);

            const response = await fetch(`https://auth.nexttolast.store/admin/watches/${selectedWatch.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ img, name, collection, price: priceNumber, description,  })
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('Watch updated successfully!');
                setError('');
                fetchWatches(); // Refresh the list of watches
            } else {
                setError(result.message);
                setMessage('');
            }
        } catch (error) {
            setError('An error occurred while updating the watch.');
            setMessage('');
        }
    };

    const handleDeleteWatch = async () => {
        try {
            const response = await fetch(`https://auth.nexttolast.store/admin/watches/${selectedWatch.id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('Watch deleted successfully!');
                setError('');
                fetchWatches(); // Refresh the list of watches
                setSelectedWatch(null); // Clear the selected watch
            } else {
                setError(result.message);
                setMessage('');
            }
        } catch (error) {
            setError('An error occurred while deleting the watch.');
            setMessage('');
        }
    };

    return (
        <div className="edit-api-page">
            <h1>Edit Watch</h1>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <div className="watch-list">
                <h2>Watches</h2>
                <ul>
                    {watches.map((watch) => (
                        <li key={watch.id} onClick={() => handleSelectWatch(watch)}>
                            {watch.name}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedWatch && (
                <div className="edit-watch">
                    <h2>Edit Watch Details</h2>
                    <input
                        type="text"
                        placeholder="Watch Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Collection Name"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleUpdateWatch}>Update Watch</button>
                    <button onClick={handleDeleteWatch} className="delete-button">Delete Watch</button>
                    {error && <p className="error">{error}</p>}
                    {message && <p className="message">{message}</p>}
                </div>
            )}
        </div>
    );
};

export default EditMode;
