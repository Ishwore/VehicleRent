import React, { useState } from 'react';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const Next = () => {
        setCurrentIndex((previIndex) =>
            previIndex === images.length - 1 ? 0 : previIndex + 1
        );
    };

    const Previous = () => {
        setCurrentIndex((previIndex) =>
            previIndex === 0 ? images.length - 1 : previIndex - 1
        );
    };

    return (
        <div className="image-slider">
            <button onClick={Previous}>&lt;</button>
            <img src={images[currentIndex]} alt="Slider" />
            <button onClick={Next}>&gt;</button>
        </div>
    );
};

export default ImageSlider;
