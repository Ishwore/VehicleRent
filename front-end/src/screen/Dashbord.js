import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const Dashbord = () => {
    const auth = localStorage.getItem('user');
    const [carQty, setCarQty] = useState('')
    const [busQty, setBusQty] = useState('')
    const [jeepQty, setJeepQty] = useState('')
    const [vanQty, setVanQty] = useState('')
    const [userQty, setUserQty] = useState('')
    const [bookingQty, setBookingQty] = useState('')
    const [toataVehicleQty, setTotalVehicleQty] = useState('')
    const [allBookings, setAllBookings] = useState([]);
    const [users, setUsers] = useState([])
    const [bus, setBus] = useState([])
    const [vans, setVans] = useState([])
    const [cars, setCars] = useState([])
    const [jeeps, setJeeps] = useState([])
    const [Vehicles, setVehicles] = useState([])
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

        const getVehicles = async () => {

            const result = await fetch('http://localhost:5000/api/product', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await result.json();
            setVehicles(data);

        }

        getVehicles();

        const getUsers = async () => {
            const result = await fetch('http://localhost:5000/api/users', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(auth).token}`,
                }
            });


            const data = await result.json();
            setUsers(data);
        };

        getUsers();

        const getCarDetails = async () => {
            const key = 'car';
            try {
                // console.log(key);
                const relatedResult = await fetch(`http://localhost:5000/api/product/search/${key}`);
                const relatedResultData = await relatedResult.json();
                setCars(relatedResultData);
                // console.log('Related details fetched:', relatedResultData);
            } catch (error) {
                console.error('Error fetching related details:', error);
            }
        }
        getCarDetails()

        const getBusDetails = async () => {
            const key = 'bus';
            try {
                // console.log(key);
                const relatedResult = await fetch(`http://localhost:5000/api/product/search/${key}`);
                const relatedResultData = await relatedResult.json();
                setBus(relatedResultData);
                // console.log('Related details fetched:', relatedResultData);
            } catch (error) {
                console.error('Error fetching related details:', error);
            }
        }
        getBusDetails();

        const getJeepDetails = async () => {
            const key = 'jeep';
            try {
                // console.log(key);
                const relatedResult = await fetch(`http://localhost:5000/api/product/search/${key}`);
                const relatedResultData = await relatedResult.json();
                setJeeps(relatedResultData);
                // console.log('Related details fetched:', relatedResultData);
            } catch (error) {
                console.error('Error fetching related details:', error);
            }
        }
        getJeepDetails();

        const getVanDetails = async () => {
            const key = 'van';
            try {
                // console.log(key);
                const relatedResult = await fetch(`http://localhost:5000/api/product/search/${key}`);
                const relatedResultData = await relatedResult.json();
                setVans(relatedResultData);
                // console.log('Related details fetched:', relatedResultData);
            } catch (error) {
                console.error('Error fetching related details:', error);
            }
        }
        getVanDetails();

    }, [auth])

    // console.log(users);
    useEffect(() => {
        const totalBooking = () => {
            let total = 0;
            for (let i = 0; i < allBookings.length; i++) {
                total += allBookings[i].bookingItems[0].qty;

            }
            setBookingQty(total)
        }
        totalBooking();
        const totalVanVehicle = () => {
            let total = 0;
            for (let i = 0; i < vans.length; i++) {
                total += vans[i].countInStock;;
            }
            setVanQty(total)
        }
        totalVanVehicle();
        const totalCarVehicle = () => {
            let total = 0;
            for (let i = 0; i < cars.length; i++) {
                total += cars[i].countInStock;;

            }
            setCarQty(total)
        }
        totalCarVehicle();
        const totalJeepVehicle = () => {
            let total = 0;
            for (let i = 0; i < jeeps.length; i++) {
                total += jeeps[i].countInStock;

            }
            setJeepQty(total)
        }
        totalJeepVehicle();

        const totalBusVehicle = () => {
            let total = 0;
            for (let i = 0; i < bus.length; i++) {
                total += bus[i].countInStock;

            }
            setBusQty(total)
        }
        totalBusVehicle();
        const totalUsers = () => {
            let total = 0;
            for (let i = 0; i < users.length; i++) {
                total++;
            }
            setUserQty(total)
        }
        totalUsers();

        const totalVehicle = () => {
            let total = 0;
            for (let i = 0; i < Vehicles.length; i++) {
                total += Vehicles[i].countInStock;

            }
            setTotalVehicleQty(total)
        }
        totalVehicle();


    }, [Vehicles, allBookings, bus, jeeps, users, vans, cars])


    console.log(carQty, busQty, vanQty, jeepQty);
    const carqty = 6;
    const busqty = 10;
    const vanqty = 5;
    const jeepqty = 9;

    const [state] = useState({
        options: {
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['Car', 'Bus', 'Van', 'Jeep']
            }
        },
        series: [
            {
                data: [carqty, busqty, vanqty, jeepqty]
            }
        ]
    }
    )

    const [bookingState] = useState({
        options: {
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        },
        series: [
            {
                name: "Booking",
                data: [25, 20, 27, 29, 24, 17, 30]

            },
            {
                name: 'Cancel',
                data: [0, 1, 3, 0, 3, 1, 0]
            }
        ]
    }
    )

    // console.log(state.series);
    console.log(bookingQty);
    const [Rating] = useState({
        options: {},
        series: [5, 95],
        labels: ['A', 'B']
    }
    )


    return (
        <div className="inline-grid mt-16 bg-slate-300 w-full">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 pt-4  mb-6'>Dashbord</h1>
            </div>
            <div className='w-full flex'>
                <div className='w-4/12'>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Vehicles Statics</h1> <br />
                        <div className="mixed-chart">
                            <Chart
                                options={state.options}
                                series={state.series}
                                type="bar"
                                width="400"
                            />
                        </div>

                    </div>
                </div>
                <div className='w-4/12'>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Booking Statics</h1> <br />
                        <div className="mixed-chart">
                            <Chart
                                options={bookingState.options}
                                series={bookingState.series}
                                type="line"
                                width="400"
                            />
                        </div>

                    </div>
                </div>
                <div className='w-4/12'>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Positive Review</h1> <br />
                        <div className="mixed-chart">
                            <Chart
                                options={Rating.options}
                                series={Rating.series}
                                type="donut"
                                width="400"
                            />
                        </div>

                    </div>
                </div>

            </div>

            {/* <div className='w-3/12'>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Car</h1> <br />
                        <h1 h1 className='text-red-600 '>
                            <i className="bi bi-car-front-fill text-6xl"> </i> </h1>
                        <h1 className='text-lg mt-6 text-red-500'>Total : {carQty} </h1>

                    </div>
                </div> */}
            {/* <div className='w-3/12 '>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Bus</h1> <br />
                        <h1 h1 className='text-red-600'>
                            <i className="bi bi-bus-front-fill text-6xl"></i> </h1>
                        <h1 className='text-lg mt-6 text-red-500'>Total : {busQty}</h1>

                    </div>
                </div> */}
            {/* <div className='w-3/12'>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Jeep</h1> <br />
                        <h1 h1 className='text-red-600'>
                            <i className="bi bi-truck-front-fill text-6xl"></i>
                        </h1>

                        <h1 className='text-lg mt-6 text-red-500'>Total : {jeepQty} </h1>

                    </div>
                </div> */}
            {/* <div className='w-3/12 '>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Van</h1> <br />

                        <h1 className='ml-28'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='text-6xl' height="1em" viewBox="0 0 640 512" fill="red">
                                <path d="M64 104v88h96V96H72c-4.4 0-8 3.6-8 8zm482 88L465.1 96H384v96H546zm-226 0V96H224v96h96zM592 384H576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H48c-26.5 0-48-21.5-48-48V104C0 64.2 32.2 32 72 32H192 352 465.1c18.9 0 36.8 8.3 49 22.8L625 186.5c9.7 11.5 15 26.1 15 41.2V336c0 26.5-21.5 48-48 48zm-64 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM160 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                            </svg>

                        </h1>
                        <h1 className=' text-red-500 text-lg mt-6'>Total : {vanQty}</h1>
                    </div>
                </div>

*/}
            <div className=' flex w-full mt-10 py-10'>
                <div className='w-4/12'>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Anually Users</h1> <br />
                        <h1 h1 className='text-red-600 '>
                            <i className="bi bi-person-circle text-6xl"> </i> </h1>
                        <h1 className='text-lg mt-6 text-red-500'> {userQty}K+</h1>

                    </div>
                </div>
                {/* <div className='w-4/12 '>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Positive Rating</h1> <br />
                        <h1 h1 className='text-red-600'>
                            <i className="bi bi-bookmarks text-6xl"></i> </h1>
                        <h1 className='text-lg mt-6 text-red-500'>Total : {bookingQty} </h1>

                    </div>
                </div> */}
                <div className='w-4/12'>
                    <div className='mx-4 py-4 bg-slate-100 rounded-2xl'>
                        <h1 className='text-red-500 text-3xl font-bold'>Total Vehicle</h1> <br />
                        <h1 h1 className='text-red-600'>
                            <i className="bi bi-truck-front-fill text-6xl"></i>
                        </h1>

                        <h1 className='text-lg mt-6 text-red-500'>Total : {toataVehicleQty} </h1>

                    </div>
                </div>


            </div>
        </div>

    )
}



export default Dashbord;