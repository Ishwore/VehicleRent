import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
    const [vehicles, setVehicles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/product/top`);
                const data = await response.json();
                setVehicles(data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };
        fetchVehicles();
    }, []);

    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
    }, [vehicles]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
    }, [vehicles]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            nextSlide();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [currentIndex, nextSlide]);


    return (
        <div className="mt-30 inline-grid">
            <button onClick={prevSlide} className="absolute top-44 transform -translate-y-1/2 left-4 text-2xl z-10">
                &#10094;
            </button>
            <button onClick={nextSlide} className="absolute top-44 transform -translate-y-1/2 right-4 text-2xl z-10">
                &#10095;
            </button>
            <div className="flex items-center justify-center ">
                {vehicles.map((vehicle, index) => (
                    <Link to={`/view/${vehicle._id}`} key={index}>
                        <div className={`transition-opacity duration-200 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}>
                            <img src={getImageUrl(vehicle.image)} alt={vehicle.name} className="w-full h-60" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
