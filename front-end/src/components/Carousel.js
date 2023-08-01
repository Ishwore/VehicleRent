import React, { useState } from 'react';

const Carousel = ({ images }) => {
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="mt-30">
            <button onClick={prevSlide} className="absolute top-1/2 transform -translate-y-1/2 left-4 text-2xl z-10">
                &#10094;
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 transform -translate-y-1/2 right-4 text-2xl z-10">
                &#10095;
            </button>
            <div className=" flex items-center justify-center relative">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`none opacity 0.5s ease-in-out ${index === currentIndex ? 'block' : ''}`}
                    >
                        <img src={getImageUrl(image)} alt={`Slide ${index}`} className="w-full h-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
