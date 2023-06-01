import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
    const [category, setcatName] = useState("");
    const [name, setName] = useState("");
    const [countInStock, setQty] = useState("");
    const [registrationNo, setRegNo] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDes] = useState("");
    // let [image, setImage] = useState(null);
    const navigate = useNavigate();


    const vehicleData = async () => {
        // const image = imagePath;
        // console.log(category, name, countInStock, registrationNo, price, description, image);
        const image = '/uploads/image-1685614771716.jpg'
        const result = await fetch("http://localhost:5000/api/product", {
            method: 'post',
            body: JSON.stringify({ category, name, countInStock, registrationNo, price, description, image }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const resultData = await result.json();
        localStorage.setItem("vehicle", JSON.stringify(resultData));
        console.warn(resultData);
        navigate('/addvehicle');
    }

    const imageUpload = async (e) => {
        const image = e.target.files[0];
        // image = setImage;
        const formData = new FormData();
        formData.append('image', image);
        const result = await fetch("http://localhost:5000/api/upload", {
            method: 'post',
            body: formData

        });
        const data = await result.json();
        const imagePath = data.path; // Assuming the server returns the image path in the "path" property
        console.log(imagePath);



    }





    return (
        <div className="inline-grid mt-28 rounded-3xl justify-center bg-stone-200">
            <div className="mt-2">
                <h1 className='text-center font-bold text-2xl text-stone-600'>Add Vehicle</h1>
            </div>
            <div className="flex mt-2">
                <label htmlFor="catname" className="text-left font-medium text-stone-500 mt-2 ml-3">*Category Name* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-16 mr-3" value={category} onChange={(e) => setcatName(e.target.value)} type="text" placeholder="Enter category name.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle name" className="text-left font-medium text-stone-500 ml-3 mt-2">*Vehicle Name* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-20 mr-3" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter vehicle name.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle qty" className="text-left font-medium text-stone-500 mt-2 ml-3">*Vehicle Quantity* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-16 mr-3" value={countInStock} onChange={(e) => setQty(e.target.value)} type="number" placeholder="Enter vehicle quantity" required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle reg" className="text-left font-medium text-stone-500 ml-2 mt-2">*Vehicle Registration No* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 mr-3 ml-3" value={registrationNo} onChange={(e) => setRegNo(e.target.value)} type="text" placeholder="Enter vehicle registration no.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="rent" className="text-left font-medium text-stone-500 mt-2 ml-2">*Rent Price* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 mr-3 ml-28" value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter rent price.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="image" className="text-left font-medium text-stone-500 mt-2 ml-2">*Image* :</label>
                {/* <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 mr-3 ml-36" onChange={(e) => imageUpload(setImage = e.target.files[0])} type="file" required /> */}
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 mr-3 ml-36" onChange={(e) => imageUpload(e)} type="file" required />

            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle des" className="text-left font-medium text-stone-500 mt-2 ml-2">*Vehicle Description* :</label>
                <textarea className="w-72 outline outline-offset-2 outline-2 rounded-md mt-2 mr-3 ml-12" value={description} onChange={(e) => setDes(e.target.value)} placeholder="Write something.." required />
            </div>
            <div className="flex text-white mb-3 mt-4 justify-between">
                <input type="submit" onClick={vehicleData} className='w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' value="Add Vehicle" />
                <input type="reset" className='w-24 mr-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full' value="Clear" />
            </div>
        </div>
    )
}

export default AddVehicle;
