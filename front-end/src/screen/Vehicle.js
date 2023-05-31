import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
    const [category, setcatName] = useState("");
    const [name, setName] = useState("");
    const [countInStock, setQty] = useState("");
    const [registrationNo, setRegNo] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDes] = useState("");
    const navigate = useNavigate();

    const vehicleData = async () => {
        // console.log(category, name, countInStock, registrationNo, price, description);
        const result = await fetch("http://localhost:5000/api/product", {
            method: 'post',
            body: JSON.stringify({ category, name, countInStock, registrationNo, price, description }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const resultData = await result.json();
        // console.warn(resultData);
        localStorage.setItem("vehicle", JSON.stringify(resultData));
        navigate('/addvehicle');
    }


    return (
        <div className="inline-grid mt-28 rounded-3xl  justify-center bg-stone-200">
            <div className=" mt-2">
                <h1 class='text-center font-bold text-2xl text-stone-600 '>Add Vehicle</h1>
            </div>
            <div className=" flex mt-2">
                <label class="text-left font-medium text-stone-500 mt-2  ml-3">*Category Name* :</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-16 mr-3" value={category} onChange={(e) => setcatName(e.target.value)} type="text" placeholder="Enter category name .. " required />
            </div>
            <div className=" flex mt-2">
                <label class="text-left font-medium text-stone-500 ml-3 mt-2 ">*Vehicle Name* :</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-20  mr-3" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter vehicle name.. " required />
            </div>
            <div className=" flex mt-2">
                <label class="text-left font-medium text-stone-500 mt-2 ml-3">*Vehicle Quntity* :</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-16  mr-3 " value={countInStock} onChange={(e) => setQty(e.target.value)} type="number" placeholder="Enter vehicle  quntity " required />
            </div>
            <div className=" flex mt-2">
                <label class="text-left font-medium text-stone-500 ml-2 mt-2">*Vehicle Registration No* :</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 mr-3 ml-3" value={registrationNo} onChange={(e) => setRegNo(e.target.value)} type="text" placeholder="Enter vehicle registration no.." required />
            </div>
            < div className=" flex mt-2">
                <label class="text-left font-medium text-stone-500 mt-2 ml-2">*Rent Price* :</label>
                <input class=" w-72 outline outline-offset-2 outline-2  text-center  rounded-md mt-2 mr-3 ml-28" value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter rent price.." required />
            </div>
            {/* <div className=" flex mt-2">
                <label class="text-left font-medium text-stone-500 mt-2 ml-2">*Image* :</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 mr-3 ml-36" type="file" required />
            </div> */}
            <div className=" flex mt-2">
                <label class="text-left font-medium text-stone-500 mt-2  ml-2">*Vehicle Description* :</label>
                <textarea class=" w-72 outline outline-offset-2 outline-2  rounded-md mt-2 mr-3 ml-12 " value={description} onChange={(e) => setDes(e.target.value)} placeholder="write somthings .. " required />
            </div>


            <div className="flex text-white mb-3 mt-4 justify-between">
                <input type="submit" onClick={vehicleData} class=' w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' value="Add Vehicle" />
                <input type="reset" class=' w-24 mr-3 rounded-xl h-12 text-center  font-semibold mt-5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full' value="Clear" />
            </div>

        </div>
    )
}

export default AddVehicle;