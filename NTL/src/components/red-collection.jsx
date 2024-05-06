import { useState } from 'react';
import { Red1, Red2, Red3 } from '../assets';
import './collections.css';

function RedCollection () {
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if(touchStartX && touchEndX) {
            const diff = touchStartX - touchEndX;
            if(Math.abs(diff) > 50) {
                if (diff > 0) {
                    setScrollLeft(scrollLeft + 200);
                } else {
                    setScrollLeft(scrollLeft - 200);
                }
            }
        }
        setTouchStartX(null);
        setTouchEndX(null);
    };

    return (
        <div className='collection-card black-to-red-180deg'>
            <h1 className='gray-red-gray-font-90deg'>NTL metallic Red Collection</h1>
            <ul className='cards'>
                <li className='card black-red-0deg'>
                    <img src={Red1} alt='metallic red ntl wrist watch' />
                    <p className='collection-name red-white-font'>NTL Red Collection</p>
                    <p className='watch-name red-white-font'>Red Posh</p>
                </li>
                <li className='card black-red-0deg'>
                    <img src={Red2} alt='metallic red ntl wrist watch' />
                    <p className='collection-name red-white-font'>NTL Red Collection</p>
                    <p className='watch-name red-white-font'>RedEye Of Time</p>
                </li>
                <li className='card black-red-0deg'>
                    <img src={Red3} alt='metallic red ntl wrist watch' />
                    <p className='collection-name red-white-font'>NTL Red Collection</p>
                    <p className='watch-name red-white-font'>RedSteel</p>
                </li>
            </ul>
        </div>
    )
}

export default RedCollection;