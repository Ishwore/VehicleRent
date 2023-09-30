import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import KhaltiPaymentComponent from "./Khalti";

const Billing = () => {
    const auth = localStorage.getItem('user');
    const vehicleData = localStorage.getItem('vehicleDetails');
    const book = localStorage.getItem('bookingData');
    const vehicle = JSON.parse(vehicleData);
    const bookingData = JSON.parse(book);
    // const [b_amt, setB_amt] = useState('');
    // const [paid, setPaid] = useState('');
    const [message, showMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth) {
            navigate('/login');
            // alert("You are not Login !");
        }
        if (!(vehicle || bookingData)) {
            navigate('/')
        }
        // if (bookingData && bookingData.payment === 'cash') {
        //     setB_amt(bookingData && bookingData.totalRent);
        //     setPaid(0);
        // }
    }, [bookingData, navigate, auth, vehicle]);
    const bookHandle = async () => {
        // console.log(vehicle._id, bookingData.name, bookingData.address, bookingData.phone, bookingData.days, bookingData.v_quantity, bookingData.date, paid, bookingData.payment, bookingData.totalRent, b_amt);
        // const address = bookingData.address
        // const name = bookingData.name
        // const phone = bookingData.phone
        // const shippingAddress = [address, name, phone,];
        const shippingAddress = { name: bookingData.name, address: bookingData.address, phone: bookingData.phone };

        const paymentMethod = bookingData.payment
        const vehicleId = vehicle._id
        const fromDate = bookingData.fromDate
        const untilDate = bookingData.untilDate
        const rentDays = bookingData.days
        const totalRent = bookingData.totalRent
        const cancelMessage = " ";
        // const image = vehicle.image
        // const price = vehicle.price
        // const qty = bookingData.v_quantity
        // const vehicleId = vehicle._id
        // const vname = vehicle.name
        const bookingItems = { vname: vehicle.name, qty: bookingData.v_quantity, image: vehicle.image, price: vehicle.price, category: vehicle.category };
        console.log(shippingAddress, paymentMethod, fromDate, untilDate, rentDays, totalRent, bookingItems, cancelMessage, vehicleId);

        const result = await fetch('http://localhost:5000/api/booking', {
            method: 'post',
            body: JSON.stringify({ shippingAddress, paymentMethod, fromDate, untilDate, vehicleId, totalRent, bookingItems, cancelMessage }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(auth).token}`,
            },

        })
        const resultData = await result.json()
        if (resultData.message) {
            showMessage(resultData.message);
        } else {
            localStorage.removeItem('vehicleDetails');
            localStorage.removeItem('bookingData');
            alert("Vehicle is Successfully Booking !")
            navigate('/')
        }
        console.log(resultData);
    }

    const bookCancel = () => {
        localStorage.removeItem('vehicleDetails');
        localStorage.removeItem('bookingData');
        navigate('/home');
    }


    return (
        <div>
            <div className="mt-20 inline-grid mb-10">
                <h1 className="font-extrabold text-red-500 text-xl"> Your Booking Information</h1>
                <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                <div className="grid grid-cols-3 gap-3 w-screen  mt-5 ">
                    <div className="col-span-1 ">
                        <h2 className="text-start ml-2 text-xl">Mr/Mrs <span className="font-semibold">{auth && JSON.parse(auth).name}</span>, </h2>
                        <p className="text-lg text-justify mx-2 mt-4"> Hello,<span className=" font-bold"> Mr/Mrs {auth && JSON.parse(auth).name}</span> thank you choosing our organization for Rental. {(vehicle && vehicle.category) === 'Bus' ? <> We will be give  <span className=" font-bold">free Deriver</span> for <span className=" font-bold">{vehicle && vehicle.category}</span> but you will be <span className=" font-bold">pay food expenditure of Deriver </span> </> : <>You have your own driver and <span className=" font-bold">give driver license photocopy</span> when you come to get {(vehicle && vehicle.category)}  </>} . If you want to book {vehicle && vehicle.category} click on <samp className=" font-bold"> Continue </samp> otherwise click on <samp className=" font-bold"> Cancel </samp> </p>
                    </div>
                    <div className="font-bold inline-grid col-span-1 mx-5 ">
                        <h4 className=" text-center text-red-500">shipping Address & Booking Details</h4>
                        <table className='border-collapse border border-slate-950  mt-5'>
                            <tbody className=" text-center my-2">
                                <tr className="">
                                    <td>Name :</td>
                                    <td>{bookingData && bookingData.name}</td>
                                </tr>
                                <tr>
                                    <td>Address : </td>
                                    <td>{bookingData && bookingData.address}</td>
                                </tr>
                                <tr>
                                    <td>Contact Number : </td>
                                    <td>{bookingData && bookingData.phone}</td>
                                </tr>
                                <tr>
                                    <td>Payment Method : </td>
                                    <td>{bookingData && bookingData.payment}</td>
                                </tr>
                                <tr>
                                    <td>vehicle Id : </td>
                                    <td>{vehicle && vehicle._id}</td>
                                </tr>
                                <tr>
                                    <td>From Date : </td>
                                    <td>{bookingData && bookingData.fromDate}</td>
                                </tr>
                                <tr>
                                    <td>Until Date : </td>
                                    <td>{bookingData && bookingData.untilDate}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className=" flex justify-between mt-8 text-white">
                            <button onClick={bookHandle} className='px-2 h-12 ml-4 rounded-xl text-center font-semibold  bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold ' >Continue</button>
                            <button onClick={bookCancel} className='px-2 h-12 mr-4 rounded-xl text-center font-semibold bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold '>Cancel</button>
                        </div>
                    </div>

                    <div className="font-bold inline-grid col-span-1 mx-5 ">
                        <h4 className=" text-center text-red-500">Billing Details</h4>
                        <table className='border-collapse border border-slate-950  '>
                            <tbody className=" text-center my-2">
                                <tr className=" mt-3">
                                    <td>Rent Price (per day) :</td>
                                    <td><span className='font-extralight text-base mx-2'> NRs. </span>{vehicle && vehicle.price}</td>
                                </tr>
                                <tr>
                                    <td>Rent Day(s) : </td>
                                    <td><span className='font-extralight text-lg mr-2'>x</span> {bookingData && bookingData.days}</td>
                                </tr>
                                <tr>
                                    <td>Vehicle Quntity : </td>
                                    <td> <span className='font-extralight text-lg mr-2'>x</span> {bookingData && bookingData.v_quantity}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td>Total Rent Price  </td>
                                    <td> <span className='font-extralight text-base mx-2'> NRs. </span>{bookingData && bookingData.totalRent}</td>
                                </tr>

                                {/* <tr>
                                    <td>Paid Amount:</td>
                                    <td> - <span className='font-extralight text-base mx-2'> NRs. </span>{paid}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td>Total Bill Amount </td>
                                    <td><span className='font-extralight text-base mx-2'> NRs. </span>{b_amt}</td>
                                </tr> */}
                            </tbody>
                        </table>
                        {/* <span className="mt-3"></span> */}
                        {/* {bookingData && bookingData.payment === 'khalti' && <KhaltiPaymentComponent />} */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing;