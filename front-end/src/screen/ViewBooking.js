import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";


const ViewBooking = () => {

    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const params = useParams();
    const [bookingDetail, setbookingDetail] = useState([]);
    // const [bookingItems, setbookingItems] = useState([]);
    const [qty, setQty] = useState("");
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("")
    const [v_id, setV_id] = useState('');
    const [vname, setVname] = useState("");
    const [quantity, setQuantity] = useState("");
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
                setAddress(data.shippingAddress.address);
                // setbookingItems(data.bookingItems);
                setName(data.shippingAddress.name)
                setPhone(data.shippingAddress.phone)
                setQty(data.bookingItems[0].qty)
                setQuantity(data.bookingItems[0].qty)
                setPrice(data.bookingItems[0].price)
                setImage(data.bookingItems[0].image)
                setV_id(data.bookingItems[0].vehicleId)
                setVname(data.bookingItems[0].vname)
                // console.log(data);

            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchMyBookingDetails();
    }, [navigate, auth, params.id])
    // console.log(bookingDetail);
    // console.warn(bookingItems);
    // console.log(address, name, phone, qty);
    // console.log(bookingItems[0].image);
    // console.warn(params.id);


    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };
    const handleQtyChange = (e) => {
        const value = e.target.value;
        // If the user entered '0', set the input value to an empty string
        if (value === '0') {
            setQuantity('');
        } else {
            // Otherwise, update the quantity as usual
            setQuantity(value);
        }
    };


    const updateHandle = () => {

        if (!(quantity === '' || address === '' || name === '' || phone === '')) {
            console.log(quantity, address, name, phone);
        } else {
            showMessage("FullFill All  Form Field !")
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
                <div className="w-4/12 bg-yellow-300 rounded ">
                    <div className="font-bold inline-grid col-span-1 mx-5  px-3 py-3">
                        <h4 className=" text-center text-red-400">Billing Details</h4>

                        <p className=' font-light text-left text-base text-blue-600 mt-2'>Vehicle Id  :  # {v_id}</p>
                        <p className=' font-light text-left text-base text-blue-600 mt-2'><span className='mr-4'>Rent Date  :  {bookingDetail.rentDate}</span>Rent Day(s) :{bookingDetail.rentDays}  </p>
                        <p className=' font-light text-left text-base text-blue-600 mt-2'><span > Payment Method  : {bookingDetail.paymentMethod}</span> {bookingDetail && bookingDetail.createdAt && (
                            <span className='ml-4'>Booking Date: {bookingDetail.createdAt.split('T')[0]}</span>)} </p>
                        <table className='border-collapse border border-slate-950 mt-5 mb-5 '>
                            <tbody className=" text-center my-2 text-slate-600">
                                <tr className=" mt-3">
                                    <td>Rent Price (per day) :</td>
                                    <td><span className='font-extralight text-base mx-2'> NRs. </span>{price}</td>
                                </tr>
                                <tr>
                                    <td>Rent Day(s) : </td>
                                    <td><span className='font-extralight text-lg mr-2'>x</span> {bookingDetail.rentDays}  </td>
                                </tr>
                                <tr>
                                    <td>Vehicle Quntity : </td>
                                    <td><span className='font-extralight text-lg mr-3'>x</span> {qty}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td>Total Rent Price  </td>
                                    <td> <span className='font-extralight text-base mx-2'> NRs. </span>{bookingDetail.totalRent} </td>
                                </tr>

                                <tr>
                                    <td>Paid Amount:</td>
                                    <td> -<span className='font-extralight text-base mx-2'> NRs. </span> {bookingDetail.isPaid ? <>{bookingDetail.totalRent}</> : <> 0</>} </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ borderBottom: "1px solid black" }}></td>
                                </tr>
                                <tr>
                                    <td>Total Bill Amount </td>
                                    <td> <span className='font-extralight text-base mx-2'> NRs. </span> {bookingDetail.totalRent} </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>


                </div>
                <div className="w-4/12 bg-slate-300  ">
                    <h4 className=" text-center text-white mt-6 bg-red-400 px-2 py-2 mx-2 rounded"> shipping Address & vehicle Quntity is updateable !</h4>
                    <div className="font-bold inline-grid mx-5 ">
                        <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                        <form>
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
                                <input className=" outline outline-offset-2 outline-2 text-center rounded-md ml-14 " type="number" value={quantity} onChange={handleQtyChange} placeholder="Enter your address.." min="1" required />
                            </div>

                            <div className="flex mt-6 ml-40 text-lg mb-8">

                                <input type='submit' value="Update" onClick={updateHandle} className='px-5 py-3 text-white bg-green-600 rounded-xl hover:bg-green-700 hover:text-xl hover:rounded-2xl' />

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div >

    )
}



export default ViewBooking;