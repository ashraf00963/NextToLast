import { Green1, Green2, Green3 } from '../assets';
import './collections.css';

function GreenCollection () {
    return (
        <div className='collection-card black-green-180deg'>
            <h1 className='gray-green-gray-font-90deg'>NTL Metallic Green Collection</h1>
            <div className='cards'>
                <div className='card black-green-0deg'>
                    <img src={Green1} alt='metallic green ntl wrist watch' />
                    <p className='collection-name green-white-font'>NTL Green Collection</p>
                    <p className='watch-name green-white-font'>Shadow In Between</p>
                </div>
                <div className='card black-green-0deg'>
                    <img src={Green2} alt='metallic green ntl wrist watch' />
                    <p className='collection-name green-white-font'>NTL Green Collection</p>
                    <p className='watch-name green-white-font'>Half Luck</p>
                </div>
                <div className='card black-green-0deg'>
                    <img src={Green3} alt='metallic green ntl wrist watch' />
                    <p className='collection-name green-white-font'>NTL Green Collection</p>
                    <p className='watch-name green-white-font'>Morning Dream</p>
                </div>
            </div>
        </div>
    )
}

export default GreenCollection;