import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import KhaltiPaymentComponent from './Khalti';


const ViewBooking = () => {

    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const params = useParams();
    const [bookingDetail, setbookingDetail] = useState([]);
    const [allBookingDetails, setAllBookingDetails] = useState([])
    const [totalBookingQty, setTotalBookingQty] = useState('')
    const [totalVehicleQty, setTotalVehicleQty] = useState('')
    const [day, setDay] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    // const [bookingItems, setbookingItems] = useState([]);
    const [qty, setQty] = useState("");
    const [currentDate, setCurrentDate] = useState('');
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("")
    const [v_id, setV_id] = useState('');
    const [vname, setVname] = useState("");
    const [quantity, setQuantity] = useState("");
    const [maxQty, setMaxQty] = useState("");
    const [message, showMessage] = useState("");

    // const [message, showMessage] = useState("");
    useEffect(() => {
        if (!(auth)) {
            navigate('/login');
        }

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
                setStartDate(new Date(data.fromDate));
                setEndDate(new Date(data.untilDate));
                setAddress(data.shippingAddress.address);
                // setbookingItems(data.bookingItems);
                setName(data.shippingAddress.name)
                setPhone(data.shippingAddress.phone)
                setQty(data.bookingItems[0].qty)
                setQuantity(data.bookingItems[0].qty)
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
        const getBookingsDetails = async () => {

            const result = await fetch(`http://localhost:5000/api/booking/bookings/${v_id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(auth).token}`,
                }
            });
            const resultData = await result.json();
            setAllBookingDetails(resultData)
            // console.warn(resultData);
        }



        const getVehicleDetails = async () => {
            const id = v_id;
            const result = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resultData = await result.json();
            setTotalVehicleQty(resultData.countInStock)
            // console.log(resultData);
        }

        if (v_id) {
            getBookingsDetails();
            getVehicleDetails();
        }


    }, [navigate, auth, params.id, v_id])



    useEffect(() => {
        const formatDate = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setCurrentDate(`${year}-${month}-${day}`);
            const timeDifference = endDate - startDate;
            const days = timeDifference / (1000 * 60 * 60 * 24) + 1;
            setDay(days);
        };
        formatDate();


        // const calculateTotalQuantity = () => {
        //     let totalQty = 0;
        //     let rentDate1start = new Date(bookingDetail.rentDate);
        //     let rentDate1end = '';
        //     let rentDate2start = '';
        //     let rentDate2end = '';
        //     let rentDays1 = parseInt(bookingDetail.rentDays); // Ensure it's a number

        //     let qty1 = 0;
        //     let qty2 = 0;
        //     let qty3 = 0;
        //     let rentDays2 = '';

        //     if (rentDays1 !== 1) { // Make sure it's not a string comparison
        //         rentDate1start.setDate(rentDate1start.getDate() + rentDays1);
        //         rentDate1end = new Date(rentDate1start); // Create a new Date object for end date
        //     }

        //     for (let i = 0; i < allBookingDetails.length; i++) {
        //         rentDays2 = parseInt(allBookingDetails[i].rentDays); // Ensure it's a number
        //         rentDate2start = new Date(allBookingDetails[i].rentDate);

        //         if (rentDays1 === 1 && rentDays2 === 1) {
        //             if (rentDate1start.getTime() === rentDate2start.getTime()) { // Compare using getTime() method
        //                 qty1 += allBookingDetails[i].bookingItems[0].qty;
        //             }
        //         } else if (rentDays1 === 1) {
        //             rentDate2end = new Date(rentDate2start); // Create a new Date object for end date
        //             rentDate2end.setDate(rentDate2start.getDate() + rentDays2);

        //             if (rentDate1start >= rentDate2start && rentDate1start <= rentDate2end) {
        //                 qty2 += allBookingDetails[i].bookingItems[0].qty;
        //             }
        //         } else {
        //             rentDate2end = new Date(rentDate2start); // Create a new Date object for end date
        //             rentDate2end.setDate(rentDate2start.getDate() + rentDays2);

        //             if (rentDate1start >= rentDate2start && rentDate1end <= rentDate2end) {
        //                 qty3 += allBookingDetails[i].bookingItems[0].qty;
        //             }
        //         }

        //         totalQty = qty1 + qty2 + qty3;
        //     }
        //     setTotalBookingQty(totalQty);
        //     setMaxQty(totalVehicleQty - totalQty)
        //     // setMaxQty(totalVehicleQty-totalQty);
        // };
        const calculateTotalQuantity = () => {
            let totalQty = 0;
            let rentDate1start = startDate;
            let rentDate1end = endDate;
            let rentDate2start = '';
            let rentDate2end = '';
            let qty1 = 0;
            let qty2 = 0;
            let qty3 = 0;
            let qty4 = 0;

            for (let i = 0; i < allBookingDetails.length; i++) {
                rentDate2start = new Date(allBookingDetails[i].fromDate);
                rentDate2end = new Date(allBookingDetails[i].untilDate);
                if (allBookingDetails[i].cancel === false) {
                    if (rentDate1start >= rentDate2start || rentDate1end <= rentDate2end) {
                        qty1 += allBookingDetails[i].bookingItems[0].qty;
                    }
                    if ((rentDate1start >= rentDate2start && rentDate1start <= rentDate2end) || rentDate1end >= rentDate2end) {
                        qty2 += allBookingDetails[i].bookingItems[0].qty;
                    }
                    if (rentDate1start <= rentDate2start || (rentDate1end <= rentDate2end && rentDate1end >= rentDate2start)) {
                        qty3 += allBookingDetails[i].bookingItems[0].qty;
                    }
                    if (rentDate1start <= rentDate2start || rentDate1end >= rentDate2end) {
                        qty4 += allBookingDetails[i].bookingItems[0].qty;
                    }
                }


            }
            totalQty = qty1 + qty2 + qty3 + qty4;
            setTotalBookingQty(totalQty);
            setMaxQty(totalVehicleQty - totalQty)
            // setMaxQty(totalVehicleQty-totalQty);
        };

        calculateTotalQuantity();

        calculateTotalQuantity();

    }, [allBookingDetails, endDate, startDate, totalVehicleQty]);


    // console.log(totalBookingQty, currentDate);
    // console.log(totalBookingQty);
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };




    // const date = new Date();
    // const formattedDate = formatDate(date);
    // setCurrentDate(formattedDate);

    const handleQtyChange = (e) => {
        const value = e.target.value;
        // If the user entered '0', set the input value to an empty string
        if (value === '0') {
            setQuantity('')
        }
        else {
            setQuantity(value);
        }
    };



    const updateHandleAddress = async () => {
        const fromDate = new Date(bookingDetail.fromDate);
        // formatDate();
        // console.log(rentDate, currentDate);

        if (fromDate > currentDate) {
            if (!(address === '' || name === '' || phone === '')) {
                // console.log(quantity, address, name, phone);
                const shippingAddress = { name: name, address: address, phone: phone };
                // console.log(shippingAddress);
                const qty = '';
                const totalRent = '';
                // console.log(params.id);
                const response = await fetch(`http://localhost:5000/api/booking/update/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ shippingAddress, qty, totalRent }),

                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(auth).token}`,
                    }
                });

                const data = await response.json();
                if (data.message) {
                    showMessage(data.message)
                } else {
                    // navigate(`/veiwbookingdetails/${params.id}`)
                    alert("Shipping Address Update Successfully ");
                    // setAddress(data.shippingAddress.address);
                    // setName(data.shippingAddress.name)
                    // setPhone(data.shippingAddress.phone)
                }

                // console.log(data);

            } else {
                showMessage("FullFill All Shipping Address Form Field ")
            }
        } else {
            showMessage("Rent Date is Expired ")
        }

    }
    const updateHandleQty = async () => {
        // calculateTotalQuantity();
        // formatDate();
        // const startDate = new Date(bookingDetail.fromDate);
        // const endDate = new Date(bookingDetail.untilDate)
        // console.log(rentDate, currentDate);
        // console.log(totalVehicleQty, totalBookingQty);
        if (startDate > currentDate) {
            if (!(quantity === '')) {
                // console.log(totalVehicleQty, totalBookingQty);
                if (totalVehicleQty > totalBookingQty) {
                    // console.log(quantity);
                    const upQty = qty + maxQty;
                    console.log(upQty);
                    if (quantity <= upQty) {
                        // console.log("quantity is verified");
                        const shippingAddress = '';
                        // console.log(shippingAddress);
                        const qty = quantity;
                        const totalRent = day * qty * price;
                        console.log(shippingAddress, qty, totalRent);
                        // console.log(params.id);
                        const response = await fetch(`http://localhost:5000/api/booking/update/${params.id}`, {
                            method: 'PUT',
                            body: JSON.stringify({ shippingAddress, qty, totalRent }),

                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${JSON.parse(auth).token}`,
                            }
                        });

                        const data = await response.json();
                        if (data.message) {
                            showMessage(data.message)
                        } else {
                            // navigate(`/veiwbookingdetails/${params.id}`)
                            alert("Booking Quantity Update Successfully ");
                            // setAddress(data.shippingAddress.address);
                            // setName(data.shippingAddress.name)
                            // setPhone(data.shippingAddress.phone)
                        }

                    } else {
                        showMessage('Your input Quantity is : ' + quantity + ' which is out of Max :' + upQty);
                    }

                } else {
                    showMessage(" Vehicle Quantity Not available  ");
                }

            } else {
                showMessage("FullFill Quantity  Form Field ")
            }
        } else {
            showMessage("Rent Date is Expired ")
        }

    }
    return (
        <div className="inline-grid mt-20 w-full h-auto">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>View Booking Details</h1>
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
                        <h4 className=" text-center text-red-400">Billing Details</h4>

                        <p className=' font-light text-left text-base text-blue-600 mt-2'>Vehicle Id  :  # {v_id}</p>
                        <p className=' font-light text-left text-base text-blue-600 mt-2'><span className='mr-4'>From Date  :  {bookingDetail.fromDate}</span>Until Date :{bookingDetail.untilDate}  </p>
                        <p className=' font-light text-left text-base text-blue-600 mt-2'><span > Payment Method  : {bookingDetail.paymentMethod}</span> {bookingDetail && bookingDetail.createdAt && (
                            <span className='ml-4'>Booking Date: {bookingDetail.createdAt.split('T')[0]}</span>)} </p>
                        <table className='border-collapse border  border-slate-950 mt-5 mb-5 '>
                            <tbody className=" text-center my-2 text-slate-600">
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
                                    <td >Total Bill Amount  </td>
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
                                    <td >Total Paidable Amount </td>
                                    <td> <span className='font-extralight text-base mx-2'> NRs. </span>{bookingDetail.isPaid ? <>0</> : <> {bookingDetail.totalRent}</>} </td>
                                </tr>
                            </tbody>
                        </table>

                        <KhaltiPaymentComponent id={params.id} name={vname} vid={v_id} />

                    </div>


                </div>
                <div className="w-4/12 bg-slate-300  ">
                    <h4 className=" text-center text-white mt-6 bg-red-400 px-2 py-2 mx-2 rounded"> shipping Address & vehicle Quntity is updateable !</h4>
                    <div className="font-bold inline-grid mx-5 ">
                        <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                        <div>
                            <div className="flex mt-6 text-base">
                                <label className="text-left  text-stone-500 mt-2">*Name* :</label>
                                <input className=" outline outline-offset-2 outline-2 text-center rounded-md ml-20 " type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name.." required />
                            </div>
                            <div className="flex mt-6 text-base">
                                <label className="text-left  text-stone-500 mt-2  ">*Phone Number* :</label>
                                <input className=" outline outline-offset-2 outline-2 text-center rounded-md ml-2 " type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter contact number.." required />
                            </div>
                            <div className="flex mt-6 text-base">
                                <label className="text-left text-stone-500 mt-2">*Address* :</label>
                                <input className=" outline outline-offset-2 outline-2 text-center rounded-md ml-16 " type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address.." required />
                            </div>
                            <div className="flex mt-6 text-base">
                                <label className="text-left text-stone-500 mt-2">*Quantity* :</label>
                                <input className=" outline outline-offset-2 outline-2 text-center rounded-md ml-14 w-20 " type="number" value={quantity} onChange={handleQtyChange} placeholder="Enter your address.." min="1" max={qty + maxQty} required />
                            </div>

                            <div className="flex mt-6 mb-8">
                                <input type='submit' value="UpdateShippingAddress" onClick={updateHandleAddress} className={` px-5 py-3 text-white rounded-2xl ${(startDate >= currentDate) ? ' bg-slate-400' : 'bg-green-600 '} `} />
                                <input type='submit' value="UpdateBookingQty" onClick={updateHandleQty} className={`px-5 ml-2 py-3 text-white rounded-2xl ${(startDate >= currentDate) ? 'bg-slate-400' : 'bg-green-600 '} `} />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >

    )
}



export default ViewBooking;