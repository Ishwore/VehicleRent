import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const BookingHistory = () => {
    const auth = localStorage.getItem('user');
    const [myBookings, setMyBookings] = useState([]);
    // const [bookingItems, setBookingItems] = useState([]);
    // const [bookingItems, setBookingItems] = useState([]);
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
                console.log(data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchMyBookings();


    }, [auth, navigate])

    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };




    return (
        <form className="inline-grid mt-6 ">
            <div >
                <h1 className="text-red-400 font-bold text-2xl">My Booking History List</h1>
                <div className="inline-grid">
                    {myBookings.length > 0 ? <> {
                        myBookings.map((myBooking) => (
                            <div
                                key={myBooking._id}
                                className="mt-8 bg-stone-300 rounded-lg shadow-lg  "
                            >
                                <div className=" my-2 w-fit rounded-lg mx-2 flex ">
                                    <div key={myBooking._id} />
                                    <img src={getImageUrl(myBooking.bookingItems[0].image)} className="m-2 p-2 rounded-xl w-28 h-24" alt={myBooking.name} />
                                    <span className=" text-xl font-bold pt-10 px-2">{myBooking.bookingItems[0].vname.toUpperCase()}</span>
                                    <span className="text-sm pt-11 px-1">Rent Price Per Day : {myBooking.bookingItems[0].price}</span>
                                    <span className="text-sm pt-11 px-1">Qantity : {myBooking.bookingItems[0].qty}</span>
                                    <span className="text-sm pt-11 px-1">Rent Days : {myBooking.rentDays}</span>
                                    <span className="text-sm pt-11 px-1">Book Date : {myBooking.rentDate}</span>
                                    <span className="text-sm pt-11 px-1">Total Rent : {myBooking.totalRent}</span>
                                    <div className="ml-3 justify-end ">
                                        <Link to={`/view/${myBooking.vehicleId}`}>
                                            <button
                                                className="bg-green-600 text-white p-2 mt-9 h-auto mx-2 rounded-md  hover:bg-green-700 hover:font-medium"
                                            >
                                                BookAgain
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }</>
                        :
                        <h1 className="mt-20 text-5xl  text-red-600">No Booking History available !</h1>
                    }

                </div>
            </div>
        </form>
    )
}


export default BookingHistory;