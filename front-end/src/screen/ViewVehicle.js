import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

const ViewVehicle = () => {
    const [category, setcatName] = useState("");
    const [name, setName] = useState("");
    const [countInStock, setQty] = useState("");
    const [registrationNo, setRegNo] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDes] = useState("");
    const [Image, setImage] = useState("");
    const params = useParams();
    useEffect(() => {
        getVehicleDetails();
    })
    console.log(category, name, countInStock, registrationNo, price, description, Image);
    const getVehicleDetails = async () => {
        // console.log(params);
        const result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resultData = await result.json();
        // console.log(resultData);
        setcatName(resultData.category);
        setName(resultData.name);
        setQty(resultData.countInStock);
        setRegNo(resultData.registrationNo);
        setPrice(resultData.price);
        setDes(resultData.description);
        setImage(resultData.image);

    }
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    return (
        <form className="inline-grid mt-24 rounded-3xl justify-center bg-orange-300">
            <div className=" mt-4">
                <img
                    src={getImageUrl(Image)}
                    alt={name}
                    className="w-max h-96 rounded-full object-cover px-8  my-4" />
                <div className="font-bold  inline-grid ">
                    <span className="text-xl mt-3">Name : <span className="ml-24">{name.toUpperCase()}</span></span>
                    <span className="text-xl mt-2">Category : <span className="ml-28">{category}</span> </span>
                    <span className="text-xl mt-2">RegistrationNo : <span className="ml-10">{registrationNo}</span></span>
                    <span className="text-xl mt-2">Rent Price Per Day : <span className="ml-2">{price}</span></span>
                    <span className="text-xl mt-2">Stock: <span className="ml-40">{countInStock}</span></span>
                    <span className="text-xl mt-2">Description : <span >{description}</span></span>
                    <div className="flex text-white mb-3 mt-4 justify-between">
                        <Link to={`/book/${params.id}`}>
                            <button
                                className='w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' >
                                Book Now
                            </button>
                        </Link>
                        <Link to="/home" className='w-24 ml-24 rounded-xl h-12 text-center font-semibold mt-5 pt-2.5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full'>Cancel</Link>
                    </div>

                </div>

            </div>
        </form>
    )
}

export default ViewVehicle;
