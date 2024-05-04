import { useState } from "react";


function Arrow () {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
        const cardContainer = document.querySelector('.cards');
        cardContainer.scrollLeft -= cardContainer.offsetWidth;
        setScrollPosition(cardContainer.scrollLeft);
    };

    const scrollRight = () => {
        const cardContainer = document.querySelector('.cards');
        cardContainer.scrollLeft += cardContainer.offsetWidth;
        setScrollPosition(cardContainer.scrollLeft);
    };

    return (
        <>
            <button className="card-arrow prev" onClick={scrollLeft}>❮</button>
            <button className="card-arrow next" onClick={scrollRight}>❯</button>
        </>
    )

};


export default Arrow;