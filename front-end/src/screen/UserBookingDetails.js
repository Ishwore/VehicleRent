import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";


const ViewUserBookingDetails = () => {

    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const params = useParams();
    const [bookingDetail, setbookingDetail] = useState([]);
    const [qty, setQty] = useState("");
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("")
    const [v_id, setV_id] = useState('');
    const [vname, setVname] = useState("");
    const [day, setDay] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        const fetchMyBookingDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking/${params.id}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(auth).token}`,
                    }
                });
                const data = await response.json();
                setbookingDetail(data);
                setAddress(data.shippingAddress.address);
                setName(data.shippingAddress.name)
                setPhone(data.shippingAddress.phone)
                setQty(data.bookingItems[0].qty)
                setStartDate(new Date(data.fromDate));
                setEndDate(new Date(data.untilDate));
                setPrice(data.bookingItems[0].price)
                setImage(data.bookingItems[0].image)
                setV_id(data.vehicleId)
                setVname(data.bookingItems[0].vname)
                // console.log(data);

            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchMyBookingDetails();


    }, [navigate, auth, params.id])


    useEffect(() => {
        const formatDate = () => {
            const timeDifference = endDate - startDate;
            const days = timeDifference / (1000 * 60 * 60 * 24) + 1;
            setDay(days);
        };
        formatDate();

    }, [endDate, startDate]);
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    return (
        <div className="inline-grid mt-20 w-full h-auto">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>View User Booking Details</h1>
            </div>
            <div className="flex mt-6 ">


                <div className="w-4/12 bg-slate-300 ml-2 ">
                    <center>
                        <img className='w-96 h-60 pt-4  rounded' src={getImageUrl(image)} alt={vname} />
                    </center>
                    <p className=' font-medium  text-base text-blue-600 mt-4 text-center'>{vname.toUpperCase()}</p>
                </div>
                <div className="w-4/12 bg-slate-300 rounded ">
                    <div className="font-bold inline-grid col-span-1 mx-5  px-3 py-3">
                        <h4 className=" text-center text-red-500">Billing Details</h4>

                        <p className=' font-light text-left text-base text-blue-600 mt-2'>Vehicle Id  :  # {v_id}</p>
                        <p className=' font-light text-left text-base text-blue-600 mt-2'><span className='mr-4'>From Date  :  {bookingDetail.fromDate}</span>Until Date :{bookingDetail.untilDate}    </p>
                        <p className=' font-light text-left text-base text-blue-600 mt-2'><span > Payment Method  : {bookingDetail.paymentMethod}</span> {bookingDetail && bookingDetail.createdAt && (
                            <span className='ml-4'>Booking Date: {bookingDetail.createdAt.split('T')[0]}</span>)} </p>
                        <table className='border-collapse border  border-slate-950 mt-5 mb-5 '>
                            <tbody className=" text-center my-2">
                                <tr className=" mt-3">
                                    <td>Rent Price (per day) :</td>
                                    <td><span className='font-extralight text-base mx-2'> NRs. </span>{price}</td>
                                </tr>
                                <tr>
                                    <td>Rent Day(s) : </td>
                                    <td><span className='font-extralight text-lg mr-2'>x</span> {day}  </td>
                                </tr>
                                <tr>
                                    <td>Booked Quntity : </td>
                                    <td><span className='font-extralight text-lg mr-3'>x</span> {qty}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td >Total Rent Price  </td>
                                    <td> <span className='font-extralight text-base mx-2'> NRs. </span>{bookingDetail.totalRent} </td>
                                </tr>

                                <tr>
                                    <td > Paid Amount:</td>
                                    <td> -<span className='font-extralight text-base mx-2'> NRs. </span> {bookingDetail.isPaid ? <>{bookingDetail.totalRent}</> : <> 0</>} </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td >Total Bill Amount </td>
                                    <td> <span className='font-extralight text-base mx-2'> NRs. </span>{bookingDetail.isPaid ? <>0</> : <> {bookingDetail.totalRent}</>} </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>


                </div>
                <div className="w-4/12 bg-slate-300  ">
                    <h4 className=" text-center font-bold text-lg text-red-500 mt-3">Shipping Address</h4>
                    <div className="font-bold inline-grid mx-5  mt-5">
                        <div className=''>
                            <div className="flex mt-2 text-base">
                                <span className="text-left">Name : </span>
                                <span className='ml-4'>{name}</span>
                            </div>
                            <div className="flex mt-2 text-base">
                                <span className="text-left   ">Phone Number : </span>
                                <span className='ml-4'> {phone}</span>
                            </div>
                            <div className="flex mt-2 text-base">
                                <span className="text-left ">Address: </span>
                                <span className='ml-4'>{address}</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div >

    )
}



export default ViewUserBookingDetails;