import { Red1, Red2, Red3 } from '../assets';
import './collections.css';

function RedCollection () {
    return (
        <div className='collection-card black-to-red-180deg'>
            <h1 className='gray-red-gray-font-90deg'>NTL metallic Red Collection</h1>
            <div className='cards'>
                <div className='card black-red-0deg'>
                    <img src={Red1} alt='metallic red ntl wrist watch' />
                    <p className='collection-name red-white-font'>NTL Red Collection</p>
                    <p className='watch-name red-white-font'>Red Posh</p>
                </div>
                <div className='card black-red-0deg'>
                    <img src={Red2} alt='metallic red ntl wrist watch' />
                    <p className='collection-name red-white-font'>NTL Red Collection</p>
                    <p className='watch-name red-white-font'>RedEye Of Time</p>
                </div>
                <div className='card black-red-0deg'>
                    <img src={Red3} alt='metallic red ntl wrist watch' />
                    <p className='collection-name red-white-font'>NTL Red Collection</p>
                    <p className='watch-name red-white-font'>RedSteel</p>
                </div>
            </div>
        </div>
    )
}

export default RedCollection;