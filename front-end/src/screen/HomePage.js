import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const [vehicles, setVehicles] = useState([]);
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
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
        return `http://localhost:5000${imageName}`;
    };
    const cardHandle = async (id, name, category, image, price, description, registrationNo) => {
        // const id = num;
        if (auth) {
            const vehicle_id = id;
            const user_id = JSON.parse(auth)._id;
            console.log(vehicle_id, user_id, name, category, image, price, description, registrationNo);
            const result = await fetch("http://localhost:5000/api/card", {
                method: 'post',
                body: JSON.stringify({ user_id, vehicle_id, category, name, registrationNo, price, description, image }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const resultData = await result.json();
            console.log(resultData);

        } else {
            navigate('/login');
        }

    };

    return (
        <div className=" pt-14"  >
            <div className="grid grid-cols-3 gap-4 mx-10">
                {vehicles.length > 0 ? <> {
                    vehicles.map((vehicle) => (
                        <div
                            key={vehicle._id}
                            className="mt-8 bg-stone-200 p-4 rounded-lg shadow-lg  "
                        >
                            <img
                                src={getImageUrl(vehicle.image)}
                                alt={vehicle.name}
                                className="w-full h-60 object-cover mb-4 rounded-md"
                            />
                            <h2 className="text-xl font-semibold mt-2 ">
                                {vehicle.name.toUpperCase()}
                            </h2>
                            <p className="mt-2">{vehicle.description}</p>
                            <p className=" bg-sky-400 h-10 pt-2 mt-2 rounded-sm "> Rent Price Per Day: NRs {vehicle.price}</p>
                            <div className="flex justify-between mt-4">
                                <button onClick={() => cardHandle(vehicle._id, vehicle.name, vehicle.category, vehicle.image, vehicle.price, vehicle.description, vehicle.registrationNo)}
                                    className="bg-amber-600 text-white py-2 px-4 rounded-md font-medium hover:bg-amber-700 hover:font-bold"
                                >
                                    Add Card
                                </button>
                                <Link to={`/view/${vehicle._id}`}>
                                    <button
                                        className="bg-red-700 text-white py-2 px-4 rounded-md font-medium hover:bg-red-800 hover:font-bold"
                                    >
                                        Book Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                }</>
                    :
                    <h1 className="mt-20 text-5xl  text-red-600">No data found !</h1>
                }
                :
            </div>
        </div>
    );
};

export default HomePage;
