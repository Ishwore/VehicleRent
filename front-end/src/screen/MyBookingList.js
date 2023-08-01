import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const MyBookingList = () => {
    const auth = localStorage.getItem('user');
    const [myBookings, setMyBookings] = useState([]);
    const [message, showMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (!(auth)) {
            navigate('/login');
        }

        const fetchMyBookings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking/mybookings`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(auth).token}`,
                    }
                });
                const data = await response.json();
                // setBookingItems(data.bookingItems);
                // console.log(bookingItems);
                setMyBookings(data);
                // console.log(data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchMyBookings();


    }, [auth, navigate])
    const cancelBooking = async (id) => {

        const answer = window.confirm("You want to Cancel Booking !");
        if (answer === true) {
            const userMessage = window.prompt("Please enter a message for your cancellation:");
            if (userMessage !== null) {
                const cancel = true;
                const cancelMessage = userMessage;
                // console.log(cancel, cancelMessage, id);
                // showMessage(cancel, cancelMessage, id);
                // localStorage.setItem("message", JSON.stringify({ "cancel": cancel, "cancelMessage": cancelMessage }));

                const result = await fetch(`http://localhost:5000/api/booking/cancel/${id}`, {
                    method: 'POST',
                    body: JSON.stringify({ cancel, cancelMessage }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(auth).token}`,
                    },
                });

                const data = await result.json();
                // console.log(data);
                // localStorage.setItem("test", JSON.stringify(data));
                if (data.message) {
                    showMessage(data.message);
                } else {
                    showMessage("Booking Cancellation Successful");
                }

            } else {

                showMessage(" Enter cancellation message !");

            }
            // navigate(`/cancelbooking/${id}`);
            // const result = await fetch(`http://localhost:5000/api/product/${id}`, {
            //     method: 'Delete',
            //     headers: {
            //         Authorization: `Bearer ${JSON.parse(auth).token}`,
            //     },
            // });

            // if (result) {
            //     alert("Data Delete Successfully")
            // }

        }

    }

    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };




    return (
        <form className="inline-grid mt-6 ">
            <div >
                <h1 className="text-red-400 font-bold text-2xl">My Booking List</h1>
                <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                <div className="inline-grid">
                    {myBookings.length > 0 ? <> {
                        myBookings.map((myBooking) => (

                            <div
                                key={myBooking._id}
                            >
                                {!(myBooking.cancel) && <>
                                    <div className=" my-2 w-fit mx-2 flex mt-8 bg-stone-300 rounded-lg shadow-lg ">
                                        <div key={myBooking._id} />

                                        <img src={getImageUrl(myBooking.bookingItems[0].image)} className="m-2 p-2 rounded-xl w-28 h-24" alt={myBooking.name} />
                                        <span className=" text-xl font-bold pt-10 px-2">{myBooking.bookingItems[0].vname.toUpperCase()}</span>
                                        <span className="text-sm pt-11 px-1">Rent Price Per Day : {myBooking.bookingItems[0].price}</span>
                                        <span className="text-sm pt-11 px-1">Qantity : {myBooking.bookingItems[0].qty}</span>
                                        <span className="text-sm pt-11 px-1">Rent Days : {myBooking.rentDays}</span>
                                        <span className="text-sm pt-11 px-1">Book Date : {myBooking.rentDate}</span>
                                        <span className="text-sm pt-11 px-1">Total Rent : {myBooking.totalRent}</span>
                                        <div className="inline-flex justify-end ">
                                            <button onClick={() => cancelBooking(myBooking._id)}

                                                className="bg-red-500 text-white p-2 h-10 mt-9 mx-1 rounded-md hover:bg-red-700 hover:font-medium"
                                            >
                                                CancelBook
                                            </button>
                                            <Link to={`/veiwbookingdetails/${myBooking._id}`}>
                                                <button
                                                    className="bg-green-600 text-white p-2 mt-9 h-auto mx-2 rounded-md  hover:bg-green-700 hover:font-medium"
                                                >
                                                    ViewDetails
                                                </button>
                                            </Link>
                                        </div>

                                    </div>
                                </>}
                            </div>

                        ))
                    }</>
                        :
                        <h1 className="mt-20 text-5xl  text-red-600">No Booking available !</h1>
                    }

                </div>
            </div>
        </form>
    )
}


export default MyBookingList;