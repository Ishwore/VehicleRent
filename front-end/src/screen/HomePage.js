import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/product");
                const data = await response.json();
                setVehicles(data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchVehicles();
    }, []);

    const getImageUrl = (imageName) => {
        return `http://localhost:5000/upload/${imageName}`;
    };

    return (
        <div >
            <div className="grid grid-cols-3 gap-4 mx-10">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle._id}
                        className="bg-stone-200 p-4 rounded-lg shadow-lg mt-20 "
                    >
                        <img
                            src={getImageUrl(vehicle.image)}
                            alt={vehicle.name}
                            className="w-full h-40 object-cover mb-4 rounded-md"
                        />
                        <h2 className="text-xl font-semibold text-stone-600">
                            {vehicle.name}
                        </h2>
                        <p className="text-stone-400">Category: {vehicle.category}</p>
                        <p className="text-stone-400">Price: ${vehicle.price}</p>
                        <div className="flex justify-between mt-4">
                            <Link
                                to={`/view/${vehicle._id}`}
                                className="bg-stone-600 text-white py-2 px-4 rounded-md font-medium hover:bg-stone-700"
                            >
                                View
                            </Link>
                            <button
                                className="bg-stone-600 text-white py-2 px-4 rounded-md font-medium hover:bg-stone-700"
                            // onClick={() => handleBook(vehicle._id)}
                            >
                                Book
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
