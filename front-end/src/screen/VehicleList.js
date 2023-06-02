import React, { useState, useEffect, useRef } from "react";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const resultData = useRef([]);


    useEffect(() => {
        const getVehicles = async () => {
            try {
                const result = await fetch('http://localhost:5000/api/product', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await result.json();

                console.log('Fetched data:', data);

                if (Array.isArray(data)) {
                    resultData.current = data;
                    setVehicles(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getVehicles();
    }, []);

    console.warn("vehicles", vehicles);

    return (
        <form className="inline-grid mt-28 rounded-xl justify-center bg-stone-200">
            <div className="mt-2">
                <h1 className='text-center font-bold text-2xl text-stone-600'>User Details</h1>
            </div>
            <div>
                <table className='border-collapse border border-slate-950 my-5'>
                    <thead className="text-base">
                        <tr>
                            <th className='px-1 border border-slate-800 '>Vehicle ID</th>
                            <th className='px-1 border border-slate-800 '>Vehicle Name</th>
                            <th className='px-1 border border-slate-800 '>Category</th>
                            <th className='px-1 border border-slate-800 '>Image</th>
                            <th className='px-1 border border-slate-800 '>RegistrationNo</th>
                            <th className='px-1 border border-slate-800 '>Quntity</th>
                            <th className='px-1 border border-slate-800 '>Rent Price</th>
                            <th className='px-1 border border-slate-800 '>Reviews Rating</th>
                            <th className='px-1 border border-slate-800 '>Reviews Number</th>
                            <th className='px-1 border border-slate-800 '> Description</th>
                            <th className='px-1 border border-slate-800 '>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {resultData.current.map((result) => (
                            <tr key={result._id}>
                                <td className='px-1 border border-slate-700'>{result._id}</td>
                                <td className='px-1 border border-slate-700'>{result.name}</td>
                                <td className='px-1 border border-slate-700'>{result.category}</td>
                                <td className='px-1 border border-slate-700'>{result.image}</td>
                                <td className='px-1 border border-slate-700'>{result.registrationNo}</td>
                                <td className='px-1 border border-slate-700'>{result.countInStock}</td>
                                <td className='px-1 border border-slate-700'>{result.price}</td>
                                <td className='px-1 border border-slate-700'>{result.rating}</td>
                                <td className='px-1 border border-slate-700'>{result.numReviews}</td>
                                <td className='px-1 border border-slate-700'>{result.description}</td>
                                <td className='px-1 border border-slate-700 text-white'>
                                    <button className='mx-1 bg-stone-600 rounded-xl px-2 font-medium hover:bg-stone-700 hover:font-bold'>Edit</button>
                                    <button className='mx-1 bg-red-600 rounded-xl px-2 font-medium hover:bg-red-700'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
};

export default VehicleList;
