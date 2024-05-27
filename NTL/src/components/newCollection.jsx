import axios from 'axios';
import './collections.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-browser-router';

function NewCollection({ setWatchId, regionCur }) {
    const [ watches, setWatches] = useState([]);

    useEffect(() => {
        axios.get('https://auth.nexttolast.store/watches')
            .then(response => {
                const data = response.data;
                const latestWatches = data.slice(-3); 
                setWatches(latestWatches); 
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='collection-card black-to-black-180deg'>
            <h1 className='black-white-black-font-90deg'>NTL Newest Watches</h1>
            <div className='cards'>
                {watches.map(watch => (
                    <div className='card'>
                        <Link to='/watch' onClick={() => setWatchId(`${watch.id}`)}>
                            <img src={`https://auth.nexttolast.store/${watch.img}`} alt={watch.name} />
                        </Link>
                        <div className='card__watch-info'>
                            <div className='card__titles-price'>
                                <div className='card__titles'>
                                    <p className='collection-name gold-white-font'>{watch.collection}</p>
                                    <p className='watch-name gold-white-font'>{watch.name}</p>
                                    <p className='gold-white-font' id='collect-price'>{watch.price.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })} {regionCur}</p>
                                </div>  
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewCollection;