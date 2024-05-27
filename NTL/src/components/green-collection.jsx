import { Link } from 'react-router-dom';
import { Green1, Green2, Green3 } from '../assets';
import './collections.css';

function GreenCollection ({ regionCur, setWatchId }) {
    const handleWatchId = (id) => {
        setWatchId(id);
    }

    const price1 = 42592;
    const price2 = 23689;
    const price3 = 21760;

    return (
        <div className='collection-card black-green-180deg'>
            <h1 className='gray-green-gray-font-90deg'>NTL Lost Emerald Collection</h1>
            <div className='cards'>
                <div className='card black-green-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(4)}>
                        <img src={Green1} alt='metallic green ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name green-white-font'>Lost Emerald</p>
                                <p className='watch-name green-white-font'>End</p>
                            
                                <p className="green-white-font" id='collect-price'>{price1.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {regionCur}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card black-green-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(5)}>
                        <img src={Green2} alt='metallic green ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name green-white-font'>Lost Emerald</p>
                                <p className='watch-name green-white-font'>Fey Whisper</p>
                                <p className="green-white-font" id='collect-price'>{price2.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {regionCur}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card black-green-0deg'>
                    <Link to='/watch' onClick={() => handleWatchId(6)}>
                        <img src={Green3} alt='metallic green ntl wrist watch' />
                    </Link>
                    <div className='card__watch-info'>
                        <div className='card__titles-price'>
                            <div className='card__titles'>
                                <p className='collection-name green-white-font'>Lost Emerald</p>
                                <p className='watch-name green-white-font'>Aurora Tear</p>
                                <p className="green-white-font" id='collect-price'>{price3.toLocaleString('en-US', {
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

export default GreenCollection;