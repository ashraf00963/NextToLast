import { Link } from 'react-router-dom';
import { Blue1, Blue2,  Blue3 } from "../assets";
import './collections.css';

function BlueCollection ({ regionCur, setWatchId }) {
    const handleWatchId = (id) => {
        setWatchId(id);
    }

    const price1 = 68950;
    const price2 = 46999;
    const price3 = 27980;

    return (
        <div className="collection-card black-blue-180deg">
            <h1 className="gray-blue-gray-font-90deg">NTL The Great Poseidon Collection</h1>
            <div className="cards">
                <div className="card black-blue-0deg">
                    <Link to='/watch' onClick={() => handleWatchId(7)}>
                        <img src={Blue1} alt='metallic blue ntl wrist watch' />
                    </Link>
                    <div className="card__watch-info">
                        <div className='card__titles-price'>
                            <div className="card__titles">
                                <p className="collection-name blue-white-font">The Great Poseidon</p>
                                <p className="watch-name blue-white-font">Leviathan</p>
                                <p className="blue-white-font" id='collect-price'>{price1.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {regionCur}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card black-blue-0deg">
                    <Link to='/watch' onClick={() => handleWatchId(8)}>
                        <img src={Blue2} alt='metallic blue ntl wrist watch' />
                    </Link>
                    <div className="card__watch-info">
                        <div className='card__titles-price'>
                            <div className="card__titles">
                                <p className="collection-name blue-white-font">The Great Poseidon</p>
                                <p className="watch-name blue-white-font">Triton Wrath</p>
                                <p className="blue-white-font" id='collect-price'>{price2.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {regionCur}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card black-blue-0deg">
                    <Link to='/watch' onClick={() => handleWatchId(9)}>
                        <img src={Blue3} alt='metallic blue ntl wrist watch' />
                    </Link>
                    <div className="card__watch-info">
                        <div className='card__titles-price'>
                            <div className="card__titles">
                                <p className="collection-name blue-white-font">The Great Poseidon</p>
                                <p className="watch-name blue-white-font">Cerulean</p>
                                <p className="blue-white-font" id='collect-price'>{price3.toLocaleString('en-US', {
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

export default BlueCollection;