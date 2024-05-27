import { Link } from 'react-router-dom';
import { Red1, Red2, Red3 } from '../assets';
import './collections.css';

function RedCollection ({ regionCur, setWatchId }) {
    const handleWatchId = (id) => {
        setWatchId(id);
    }

    const price1 = 73430;
    const price2 = 128550;
    const price3 = 56890;


    return (
        <div className='collection-card black-to-red-180deg'>
            <h1 className='gray-red-gray-font-90deg'>NTL Satan's Son Collection</h1>
            <div className='cards'>
                <div className='card black-red-0deg'> 
                    <Link to='/watch' onClick={() => handleWatchId(1)}>
                        <img src={Red1} alt='metallic red ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name red-white-font'>Satan's Son</p>
                                <p className='watch-name red-white-font'>Scarlet Eyes</p>
                                <p className='red-white-font' id='collect-price'>{price1.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {regionCur}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card black-red-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(2)}>
                        <img src={Red2} alt='metallic red ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name red-white-font'>Satan's Son</p>
                                <p className='watch-name red-white-font'>Sultriness</p>
                                <p className='red-white-font' id='collect-price'>{price2.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {regionCur}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card black-red-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(3)}>
                        <img src={Red3} alt='metallic red ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name red-white-font'>Satan's Son</p>
                                <p className='watch-name red-white-font'>Red Oasis</p>
                                <p className='red-white-font' id='collect-price'>{price3.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {regionCur}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RedCollection;