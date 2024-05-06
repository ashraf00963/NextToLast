import { useEffect } from 'react';
import { Video, Image } from '../assets';

import './header.css';

function Header () {
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const hourHand = document.querySelector('.hour-hand');
            const minuteHand = document.querySelector('.minute-hand');
            const secondHand = document.querySelector('.second-hand');

            const hourDegrees = (hours % 12) * 30 + (minutes / 60) * 30;
            const minuteDegrees = minutes * 6 + (seconds / 60) * 6;
            const secondDegrees = seconds * 6;

            if (hourHand && minuteHand && secondHand) {
                hourHand.style.transform = `rotate(${hourDegrees}deg)`;
                minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
                secondHand.style.transform = `rotate(${secondDegrees}deg)`;
            }
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className='ntl__header'>
            <img className='background-gif' src={Video} alt='Red Lightning' />
            <img className='watch-img' src={Image} alt='metallic red wrist watch with ntl logo' />
            <div className='watch-face'>
                <div className='watch-hands'>
                    <div className='hour-hand '></div>
                    <div className='minute-hand'></div>
                    <div className='second-hand'></div>
                    <div className='middle'></div>
                </div>
            </div>
        </div>
    );
};

export default Header;