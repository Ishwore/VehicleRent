import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

const ViewVehicle = () => {
    const [category, setcatName] = useState("");
    const [name, setName] = useState("");
    const [countInStock, setQty] = useState("");
    const [registrationNo, setRegNo] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDes] = useState("");
    const [Image, setImage] = useState("");
    const params = useParams();
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
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
        getVehicleDetails();
        //related vehicle fetch
        const getRelatedDetails = async () => {
            const key = category;
            try {
                console.log(key);
                const relatedResult = await fetch(`http://localhost:5000/api/product/search/${key}`);
                const relatedResultData = await relatedResult.json();
                setVehicles(relatedResultData);
                // console.log('Related details fetched:', relatedResultData);
            } catch (error) {
                console.error('Error fetching related details:', error);
            }
        }
        if (category) {
            getRelatedDetails();
        }
        // getRelatedDetails();
    }, [category, params.id]);

    // console.log(category, name, countInStock, registrationNo, price, description, Image);


    // const getRelatedDetails = async () => {
    //     const key = category;
    //     const relatedResult = await fetch(`http://localhost:5000/api/product/search/${key}`)
    //     const relatedResultData = await relatedResult.json();
    //     setVehicles(relatedResultData);
    // }
    const handleGoBack = () => {
        navigate('/');
    };
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    return (
        // <form className="inline-grid mt-24 rounded-3xl justify-center bg-orange-300">
        //     <div className=" mt-4">
        //         <div>
        //             <img
        //                 src={getImageUrl(Image)}
        //                 alt={name}
        //                 className="w-max h-96 rounded-full object-cover px-8  my-4" />
        //         </div>

        //         <div className="font-bold  inline-grid ">
        //             <span className="text-xl mt-3">Name : <span className="ml-24">{name.toUpperCase()}</span></span>
        //             <span className="text-xl mt-2">Category : <span className="ml-28">{category}</span> </span>
        //             <span className="text-xl mt-2">RegistrationNo : <span className="ml-10">{registrationNo}</span></span>
        //             <span className="text-xl mt-2">Rent Price Per Day : <span className="ml-2">{price}</span></span>
        //             <span className="text-xl mt-2">Stock: <span className="ml-40">{countInStock}</span></span>
        //             <span className="text-xl mt-2">Description : <span >{description}</span></span>
        //             <div className="flex text-white mb-3 mt-4 justify-between">
        //                 <Link to={`/book/${params.id}`}>
        //                     <button
        //                         className='w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' >
        //                         Book Now
        //                     </button>
        //                 </Link>
        //                 <Link to="/home" className='w-24 ml-24 rounded-xl h-12 text-center font-semibold mt-5 pt-2.5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full'>Cancel</Link>
        //             </div>

        //         </div>

        //     </div>
        // </form>
        <div className="inline-grid mt-20 ">
            <button onClick={handleGoBack} className="rounded text-white text-left w-20 px-2 ml-10 bg-red-400 hover:bg-red-600 hover:font-semibold">Go Back</button>
            <div className="grid grid-cols-2 gap-6 w-screen  mt-5 bg-stone-200">
                <div className="col-span-1 justify-center">
                    <img
                        src={getImageUrl(Image)}
                        alt={name}
                        className="w-max h-96 rounded-xl object-cover px-8 my-4"
                    />
                </div>

                <div className="font-bold inline-grid col-span-1 text-left">
                    <span className="text-xl mt-3">Name : <span>{name.toUpperCase()}</span></span>
                    <span className="text-xl mt-2">Category : <span>{category}</span> </span>
                    <span className="text-xl mt-2">RegistrationNo : <span>{registrationNo}</span></span>
                    <span className="text-xl mt-2">Rent Price Per Day : <span>NRs {price}</span></span>
                    <span className="text-xl mt-2">Stock: <span>{countInStock}</span></span>
                    <span className="text-xl mt-2">Description : <span>{description}</span> </span>

                    <div className="flex text-white mb-3 mt-4 justify-between">
                        <Link to={`/book/${params.id}`}>
                            <button className="w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full">
                                Book Now
                            </button>
                        </Link>
                        {/* <Link to="/home" className="w-24 mr-8 rounded-xl h-12 text-center font-semibold mt-5 pt-2.5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full">
                            Cancel
                        </Link> */}
                    </div>
                </div>
            </div>

            <div className=" pt-10"  >

                {vehicles.length > 0 ? <>{!(vehicles.name === name) ? <><h1 className="text-2xl text-left ml-10 text-red-400 font-bold">Available Related vehicles </h1>
                    <div className="grid grid-cols-3 gap-4 mx-10"> {
                        vehicles.map((vehicle) => (
                            <div
                                key={vehicle._id}
                                className="mt-3 bg-stone-200 p-4 rounded-lg shadow-lg  "
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
                                    <button

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
                    }</div> </>
                    :
                    <h1 className="mt-20 text-3xl  text-red-600">No related data found !</h1>
                }
                </>
                    :
                    <h1 className="mt-20 text-3xl  text-red-600">No related data found !</h1>
                }
                :
            </div>
        </div>




    )
}

export default ViewVehicle;
