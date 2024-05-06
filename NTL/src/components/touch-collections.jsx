import { useState } from "react";
import RedCollection from "./red-collection";
import { Red1, Red2, Red3 } from "../assets";


function Touch () {
    const [startX, setStartX] = useState(null);
    const [isSwiping, setIsSwiping] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const cards = [Red1, Red2, Red3];

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;

        const deltaX = e.touches[0].clientX - startX;
        const threshold = 50;

        if (deltaX > threshold) {
            setCurrentCardIndex((prevIndex) => Math.max(0, prevIndex - 1));
        } else if (deltaX < -threshold) {
            setCurrentCardIndex((prevIndex) => Math.min(cards.length - 1, prevIndex + 1));
        }
    };

    const handleTouchEnd = () => {
        setStartX(null);
        setIsSwiping(false);
    };

    return (
        <RedCollection
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            currentCardIndex={currentCardIndex}
            cards={cards}
        />
    )

};


export default Touch;