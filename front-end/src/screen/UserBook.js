import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const UserBook = () => {
    // const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const [allBookings, setAllBookings] = useState([]);
    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(auth).token}`,
                    }
                });
                const data = await response.json();
                // setBookingItems(data.bookingItems);
                // console.log(bookingItems);
                setAllBookings(data);
                // console.log(data);
            } catch (error) {
                console.error("Error fetching all bookings:", error);
            }
        }
        fetchAllBookings();
    }, [auth])
    // console.log(allBookings);
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    return (
        <div className='mt-24  inline-grid'>
            <div className='mt-5'>
                <h2 className='text-center font-extrabold text-2xl text-stone-600'>User Book List</h2>
            </div>
            <div className="inline-grid w-full">
                {allBookings.length > 0 ? <> {
                    allBookings.map((Booking) => (

                        <div
                            key={Booking._id}
                        >
                            <div className=" my-2 w-full mx-2 flex mt-8 bg-stone-300 rounded-lg shadow-lg ">

                                <div key={Booking._id} />

                                <img src={getImageUrl(Booking.bookingItems[0].image)} className="m-2 p-2 rounded-xl w-28 h-24" alt={Booking.name} />
                                <span className=" text-lg font-bold pt-10 px-2">{Booking.bookingItems[0].vname.toUpperCase()}</span>
                                {/* <span className="text-sm pt-11 px-1">Rent Price Per Day : {Booking.bookingItems[0].price}</span> */}
                                {/* <span className="text-sm pt-11 px-1">Qantity : {Booking.bookingItems[0].qty}</span>
                                <span className="text-sm pt-11 px-1">Rent Days : {Booking.rentDays}</span> */}
                                <span className="text-lg font-bold pt-11 px-1">From Date : {Booking.fromDate}</span>
                                <span className="text-lg font-bold pt-11 px-1">Until Date : {Booking.untilDate}</span>
                                {/* <span className="text-sm pt-11 px-1">Total Rent : {Booking.totalRent}</span> */}
                                <span className="text-lg  font-bold text-red-400 pt-11 px-1">Booking Cancel : {Booking.cancel ? 'Yes' : 'No'}</span>

                                <div className="inline-flex text-right">
                                    <Link to={`/veiwuserbookingdetails/${Booking._id}`}>
                                        <button
                                            className="bg-green-600 text-white p-2 mt-9 h-auto mx-2 rounded-md  hover:bg-green-700 hover:font-medium"
                                        >
                                            ViewDetails
                                        </button>
                                    </Link>
                                </div>

                            </div>

                        </div>

                    ))
                }</>
                    :
                    <h1 className="mt-20 text-5xl  text-red-600">No Booking available !</h1>
                }

            </div>
        </div>
    )
}


export default UserBook;