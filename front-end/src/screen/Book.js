import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Book = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const params = useParams();
    const [date, setDate] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [days, setDays] = useState('1');
    const [payment, setPayment] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [stock, setStock] = useState('');
    const [rent, setRent] = useState('');
    useEffect(() => {
        if (!auth) {
            navigate('/login');
            // alert("You are not Login !");
        }

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
            setStock(resultData.countInStock);
            setRent(resultData.price);
            localStorage.setItem("vehicleDetails", JSON.stringify(resultData));


        }
        getVehicleDetails();
        // console.log(rent);


        // const getVehicleDetails = async () => {
        //     // console.log(params);
        //     const result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
        //         method: 'get',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     const resultData = await result.json();
        //     console.log(resultData);
        //     localStorage.setItem("bookingData", JSON.stringify(resultData));
        //     getVehicleDetails();

        // }
    })


    const handleDateChange = (event) => {
        const inputDate = event.target.value;
        const currentDate = new Date();
        const selectedDate = new Date(inputDate);

        if (selectedDate < currentDate) {
            setIsValid(false);
        } else {
            setIsValid(true);
            setDate(inputDate);
        }
    };
    const handleFormReset = () => {
        setName("");
        setPhone("");
        setDays("1");
        setDate("");
        setPayment("");
        setQuantity("");
    };
    const handleGoBack = () => {
        navigate(`/view/${params.id}`);
    };
    const bookHandle = async (e) => {
        console.log(name, date, phone, days, payment, quantity, rent, address);
        // const address = [
        //     "name": name,
        //     "date": date,
        //     "phone": phone,
        //     "days": days
        // ];
        try {
            if (!(name === '' || date === '' || phone === '' || days === '' || payment === '' || quantity === '' || address === '')) {
                // const getVehicleDetails = async () => {
                //     // console.log(params);
                //     const result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
                //         method: 'get',
                //         headers: {
                //             'Content-Type': 'application/json'
                //         }
                //     });
                //     const resultData = await result.json();
                //     console.log(resultData);
                //     localStorage.setItem("bookingData", JSON.stringify(resultData));


                // }
                // getVehicleDetails();

                const TotalRent = days * rent;
                localStorage.setItem("bookingData", JSON.stringify({ "name": name, "date": date, "phone": phone, "address": address, "days": days, "payment": payment, "v_quantity": quantity, "totalRent": TotalRent }));
                if (payment === 'cash') {
                    navigate(`/billing/${params.id}`);
                }

            } else {
                alert("Fill all Form Input ! ")
            }

        } catch (Error) {

        }


    }

    return (
        <form className="inline-grid mt-28 rounded-3xl justify-center bg-stone-200 mb-16">
            <button onClick={handleGoBack} className="rounded text-white text-left w-20 px-2 ml-10 mt-4 bg-red-400 hover:bg-red-600 hover:font-semibold">Go Back</button>
            <div className="mt-2">
                <h1 className='text-center font-bold text-2xl text-stone-600'>Book Vehicle</h1>
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 mt-2 ml-3">*Name* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-20 mr-3" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name.." required />
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 ml-3 mt-2">*Phone Number* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-3 mr-3" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter contact number.." required />
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 mt-2 ml-3">*Address* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-16 mr-3" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address.." required />
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 mt-2 ml-3">*From Date* :</label>
                <div className="flex-auto">
                    <input className={`w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-11 mr-3 ${isValid ? '' : 'border-red-500'}`}
                        type="date"
                        placeholder="Enter need date.."
                        required
                        value={date}
                        onChange={handleDateChange}
                    />
                    <><span>{!isValid && <p className="mt-3 text-red-500">Error: Selected date must be in the future.</p>}</span></></div>

            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 ml-2 mt-2">*Day(s)*:</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-20 mr-3" type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="Enter need days.." min="1" required />
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 mt-2 ml-2">*Payment* :</label>
                <select className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-16 mr-3" value={payment} onChange={(e) => setPayment(e.target.value)} required >
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="online">OnlinePay</option>
                </select>

                {/* <p>Selected Option: {payment}</p> */}
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 mt-2 ml-2">*Quantity* :</label>
                <select
                    className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-16 mr-3"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                >
                    {[...Array(stock).keys()].map((item) => (
                        <option key={item + 1} value={item + 1}>
                            {item + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex text-white mb-3 mt-4 justify-between">
                <input type="submit" onClick={bookHandle} className='w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' value="Book Now" />
                {/* <Link to="/home" className='w-24 mr-3 rounded-xl h-12 text-center font-semibold mt-5 pt-2.5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full'>Cancel</Link> */}
                <button onClick={handleFormReset} className='w-24 mr-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full' >Clear </button>
            </div>
        </form >
    )
}


export default Book;