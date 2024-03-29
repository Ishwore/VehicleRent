import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const resultData = useRef([]);
    const [message, showMessage] = useState("");
    // const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    useEffect(() => {
        getVehicles();
    }, []);
    const getVehicles = async () => {
        try {
            const result = await fetch('http://localhost:5000/api/product', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await result.json();

            // console.log('Fetched data:', data);

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
    console.warn("vehicles", vehicles);

    const deleteProduct = async (id) => {

        const answer = window.confirm("You want to delete vehicle!");
        if (answer === true) {
            const result = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: 'Delete',
                headers: {
                    Authorization: `Bearer ${JSON.parse(auth).token}`,
                },
            });
            const resultData = await result.json()
            if (resultData.message) {
                showMessage(resultData.message);
            }

        }

    }
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };


    return (
        <form className="inline-grid mt-28 mx-2 rounded-xl justify-center bg-stone-200">
            <div className="mt-4">
                <h1 className='text-center font-bold text-2xl text-stone-600'>Vehicle Lists</h1>
                <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
            </div>
            <div className="px-3 py-3">
                <table className='border-collapse border border-slate-950 my-5  '>
                    <thead className="text-base">
                        <tr>
                            <th className='px-1 py-2 border border-slate-800 '>S.No</th>
                            <th className='px-1 py-2 border border-slate-800 '>Vehicle Name</th>
                            <th className='px-1 py-2 border border-slate-800 '>Category</th>
                            <th className='px-1 py-2 border border-slate-800 '>Image</th>
                            <th className='px-1 py-2 border border-slate-800 '>RegistrationNo</th>
                            <th className='px-1 py-2 border border-slate-800 '>Quntity</th>
                            <th className='px-1 py-2 border border-slate-800 '>Rent Price</th>
                            <th className='px-1 py-2 border border-slate-800 '>Rating</th>
                            <th className='px-1 py-2 border border-slate-800 '>Reviews</th>
                            <th className='px-1 py-2 border border-slate-800 '> Description</th>
                            <th className='px-1 py-2 border border-slate-800 '>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {resultData.current.map((result, index) => (
                            <tr key={result._id}>
                                <td className='px-2 py-2 border border-slate-700'>{index + 1}</td>
                                <td className='px-2 py-2 border border-slate-700'>{result.name.toUpperCase()}</td>
                                <td className='px-2 py-2 border border-slate-700'>{result.category}</td>
                                <td className='px-2 py-2 border  border-slate-700'>
                                    <img
                                        src={getImageUrl(result.image)}
                                        alt={result.name}
                                        className="w-40 h-22 object-cover mb-4 rounded-md"
                                    /></td>
                                <td className='px-2 py-2 border border-slate-700'>{result.registrationNo}</td>
                                <td className='px-2 py-2 border border-slate-700'>{result.countInStock}</td>
                                <td className='px-2 py-2 border border-slate-700'>{result.price}</td>
                                <td className='px-2 py-2 border border-slate-700'>{result.rating}</td>
                                <td className='px-2 py-2 border border-slate-700'>{result.numReviews}</td>
                                <td className='px-2 py-2 border border-slate-700'>{result.description}</td>
                                <td className='px-2 py-2 border border-slate-700 text-white'>
                                    <Link to={"/UpdateVehicle/" + result._id} ><button className='mx-1 bg-stone-600 rounded-xl px-2 py-1 font-medium hover:bg-stone-700 hover:font-bold'>Update</button></Link>
                                    <button onClick={() => deleteProduct(result._id)} className='mx-1 mt-2 bg-red-600 rounded-xl px-2 py-1 font-medium hover:bg-red-700 hover:font-bold'>Delete</button>
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
