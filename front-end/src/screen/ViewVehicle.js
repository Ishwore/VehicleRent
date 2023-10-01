import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from "../components/Rating";

const ViewVehicle = () => {
    const auth = localStorage.getItem('user');
    const [category, setcatName] = useState("");
    const [name, setName] = useState("");
    const [countInStock, setQty] = useState("");
    const [registrationNo, setRegNo] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDes] = useState("");
    const [Image, setImage] = useState("");
    const [ratingG, setRatingG] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [numReviews, setNumReviews] = useState(0);
    const [comment, setComment] = useState("");
    const [message, showMessage] = useState("");
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
            setRatingG(resultData.rating);
            setNumReviews(resultData.numReviews);
            setReviews(resultData.reviews);
            // console.log(resultData.rating);

        }
        getVehicleDetails();
        //related vehicle fetch
        const getRelatedDetails = async () => {
            const key = category;
            try {
                // console.log(key);
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

    const sendReviews = async () => {
        if (!(rating === '' || comment === '')) {
            console.log(rating, comment, params.id, (JSON.parse(auth).token));
            const result = await fetch(`http://localhost:5000/api/product/${params.id}/reviews`, {
                method: 'post',
                body: JSON.stringify({ rating, comment }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${(JSON.parse(auth).token)}`,
                },
            });
            const resultData = await result.json();
            showMessage(resultData.message);

        } else {
            showMessage("Enter your reviews ")
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    }

    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    return (
        <div className="inline-grid mt-20 ">
            <button onClick={handleGoBack} className="rounded text-white text-left w-20 px-2 ml-10 bg-red-400 hover:bg-red-600 hover:font-semibold">Go Back</button>
            <span className="bg-yellow-600 text-white rounded py-2 px-3 mt-3 font-bold">Information : Stock is Available on Your Rent Date! </span>
            <div className="grid grid-cols-2 gap-3  mt-5">
                <div className="col-span-1 ml-5 w-auto justify-center ">
                    <img
                        src={getImageUrl(Image)}
                        alt={name}
                        className="w-max h-96 rounded-xl object-cover px-5 py-4 bg-stone-200"
                    />
                </div>

                <div className="col-span-1 grid grid-cols-2 ">

                    <div className=" col-span-1 text-left mt-5 w-auto">
                        <div className=" mt-5 border-b  border-gray-300">
                            <span className="text-lg font-normal text-gray-500 ">{name.toUpperCase()}</span>
                            <p className=" my-4"></p>
                        </div>
                        <div className=" mt-5 border-b border-gray-300 text-gray-500">

                            <div className="my-3 text-gray-500"><Rating
                                value={ratingG}
                                text={`${numReviews} reviews`}
                            /></div>
                        </div>
                        <div className="mt-4 border-b border-gray-300">
                            <p className="my-3 text-gray-500">Rent Price : NRs {price} per day</p>
                        </div>
                        <div >
                            <p className="my-3 text-gray-500">Description : <span>{description}</span></p>
                        </div>


                    </div>

                    <div className=" col-span-1 ml-3 mt-5 w-auto">
                        <table className="border-collapse border text-gray-500 border-gray-300">
                            <tbody>
                                <tr className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">Rent Price : NRs {price} per day</td>
                                </tr>
                                <tr className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">RegistrationNo : {registrationNo}</td>
                                </tr>
                                <tr className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">Stock: {countInStock > 0 ? "In Stock" : "Out Stock"}</td>
                                </tr>
                            </tbody>
                        </table>


                        <div className="flex text-white mb-3 mt-4 ml-4 justify-between">
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
            </div >
            <div className=" grid grid-cols-2 mt-5 mx-5 ">
                <div className="col-span-1 mx-4 text-gray-500">
                    <h2 className=" font-semibold text-3xl text-left"> REVIEWS</h2>
                    <div className=" my-5 h-auto px-3 py-2 rounded ">
                        {reviews.length === 0 && <p className=" py-3 bg-red-300 rounded px-3 text-white">No Reviews</p>}
                        {reviews.map((review) => (
                            <div key={review._id}>
                                <div className=" bg-stone-200 py-3 mt-3 rounded">
                                    <strong className="pt-2">{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p className="p-2">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="  mx-4 mt-4">
                        <h2 className=" font-semibold text-2xl text-left"> WRITE A CUSTOMER REVIEW</h2>
                        <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                        {auth ? <div>
                            <div className=" text-left mt-3">
                                <label className="text-left ml-2 mt-5">Rating  </label><br />
                                <select className="mt-5 mb-5 h-10 w-72" value={rating} onChange={(e) => setRating(e.target.value)} required>
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                                <br />
                                <label className=" mt-5 text-left ml-2">Comment  </label><br />
                                <textarea className="mt-5 w-72 h-24" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter  your comment ..">

                                </textarea>
                                <br />

                                <input type="submit" onClick={sendReviews} className="mt-5 bg-yellow-600 px-3 py-3 text-white rounded" value="Submit" />
                            </div>
                        </div> : (
                            <p className=" mt-4 bg-green-200 py-3 px-3 rounded">
                                Please <Link to="/login" className=" underline text-green-400 hover:text-lg mx-2"> Login </Link> to write a review{" "}
                            </p>
                        )}
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
