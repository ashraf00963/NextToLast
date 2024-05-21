import React, { useState } from 'react';
import './imageModal.css';

function ImageModal({ imgSrc, onClose }) {
    const [scale, setScale] = useState(1);

    const handleZoom = () => {
        setScale(prevScale => (prevScale === 1 ? 2 : 1)); // Toggle between scale 1 and 2
    };

    return (
        <div className="image-modal">
            <div className="image-modal-content">
                <button className="close-button-img" onClick={onClose}>X</button>
                <div 
                    className="image-container" 
                    onClick={handleZoom} // Click to zoom in or out
                    style={{ cursor: scale === 1 ? 'zoom-in' : 'zoom-out' }}
                >
                    <img 
                        src={imgSrc} 
                        alt="Full size" 
                        style={{ transform: `scale(${scale})` }} 
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageModal;
