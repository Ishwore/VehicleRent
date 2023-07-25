import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Billing = () => {
    const auth = localStorage.getItem('user');
    const vehicleData = localStorage.getItem('vehicleDetails');
    const book = localStorage.getItem('bookingData');
    const vehicle = JSON.parse(vehicleData);
    const bookingData = JSON.parse(book);
    const [b_amt, setB_amt] = useState('');
    const [paid, setPaid] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth) {
            navigate('/login');
            // alert("You are not Login !");
        }

        if (bookingData.payment === 'cash') {
            setB_amt(bookingData.totalRent);
            setPaid(0);
        }
    }, [bookingData, navigate, auth]);
    const bookHandle = () => {
        console.log(vehicle._id, bookingData.name, bookingData.address, bookingData.phone, bookingData.days, bookingData.v_quantity, bookingData.date, paid, bookingData.payment, bookingData.totalRent, b_amt);
    }

    const bookCancel = () => {
        localStorage.removeItem('vehicleDetails');
        localStorage.removeItem('bookingData');
        navigate('/home');
    }


    return (
        <div>
            <div className="mt-20 inline-grid">
                <h1 className="font-extrabold"> Your Booking Information</h1>

                <div className="grid grid-cols-3 gap-6 w-screen  mt-5 ">
                    <div className="col-span-1 ">
                        <h2 className="text-start ml-2 text-xl">Mr/Mrs <span className="font-semibold">{JSON.parse(auth).name}</span>, </h2>
                        <p className="text-lg text-justify mx-2 mt-4"> Hello,<span className=" font-bold"> Mr/Mrs {JSON.parse(auth).name}</span> thank you choosing our organization for Rental. We will give free <span className=" font-bold">Deriver</span> for <span className=" font-bold">{vehicle.category}</span> . If you want to book {vehicle.category} click on <samp className=" font-bold"> Continue </samp> otherwise click on <samp className=" font-bold"> Cancel </samp> </p>
                    </div>
                    <div className="font-bold inline-grid col-span-1 mx-5 ">
                        <h4 className=" text-center">Booking Details</h4>
                        <table className='border-collapse border border-slate-950  mt-5'>
                            <tbody className=" text-center my-2">
                                <tr className="">
                                    <td>Name :</td>
                                    <td>{bookingData.name}</td>
                                </tr>
                                <tr>
                                    <td>Address : </td>
                                    <td>{bookingData.address}</td>
                                </tr>
                                <tr>
                                    <td>Contact Number : </td>
                                    <td>{bookingData.phone}</td>
                                </tr>
                                <tr>
                                    <td>Payment Method : </td>
                                    <td>{bookingData.payment}</td>
                                </tr>
                                <tr>
                                    <td>Vehicle Need Date : </td>
                                    <td>{bookingData.date}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className=" flex justify-between mt-8 text-white">
                            <button onClick={bookHandle} className='px-2 h-12 ml-4 rounded-xl text-center font-semibold  bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold ' >Continue</button>
                            <button onClick={bookCancel} className='px-2 h-12 mr-4 rounded-xl text-center font-semibold bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold '>Cancel</button>
                        </div>
                    </div>

                    <div className="font-bold inline-grid col-span-1 mx-5 ">
                        <h4 className=" text-center">Billing Details</h4>
                        <table className='border-collapse border border-slate-950 mt-5 '>
                            <tbody className=" text-center my-2">
                                <tr className=" mt-3">
                                    <td>Rent Price (per day) :</td>
                                    <td>NRs. {vehicle.price}</td>
                                </tr>
                                <tr>
                                    <td>Rent Day(s) : </td>
                                    <td> x {bookingData.days}</td>
                                </tr>
                                <tr>
                                    <td>Vehicle Quntity : </td>
                                    <td> x {bookingData.v_quantity}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td>Total Rent Price  </td>
                                    <td> = NRs. {bookingData.totalRent}</td>
                                </tr>

                                <tr>
                                    <td>Paid :</td>
                                    <td> - NRs. {paid}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td>Bill Amount </td>
                                    <td> = NRs. {b_amt}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing;