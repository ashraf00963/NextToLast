import { useState } from 'react';
import './admin.css';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [collection, setCollection] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('https://auth.nexttolast.store/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                setError('');
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleAddWatch = async () => {
        try {
            const response = await fetch('https://auth.nexttolast.store/admin/watches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, collection, img, price, description })
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
                setName('');
                setCollection('');
                setPrice('');
                setDescription('');
                setImg('');
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('https://auth.nexttolast.store/admin/upload-image', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                console.log('Image uploaded successfully');
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('An error occurred while uploading image', error);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-page">
                <div className='admin-login'>
                    <h1>Admin Login</h1>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className='admin-page-children'>
                <h1>Admin Section</h1>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
                <div className="admin-page-fields">
                    <input
                        type="text"
                        placeholder="Watch Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="collection name"
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
                </div>
                <div className='upload-img-file'>
                    <input type="file" id='img-file-input' onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload Image</button>
                </div>
                <button onClick={handleAddWatch}>Add Watch</button>
            </div>
        </div>
    );
};

export default Admin;
