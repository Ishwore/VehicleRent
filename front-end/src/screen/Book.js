import React, { useState } from "react";


const Book = () => {
    const [date, setDate] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [days, setDays] = useState('');
    const [message, setMessage] = useState('');
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

    const bookHandle = async (e) => {
        console.log(name, date, phone, days, message);
    }

    return (
        <div className="inline-grid mt-28 rounded-3xl justify-center bg-stone-200">
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
                <label className="text-left font-medium text-stone-500 mt-2 ml-3">*From Date* :</label>
                <input
                    className={`w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-11 mr-3 ${isValid ? '' : 'border-red-500'}`}
                    type="datetime-local"
                    placeholder="Enter need date.."
                    required
                    value={date}
                    onChange={handleDateChange}
                />
                <span>{!isValid && <p className="mt-3 text-red-500">Error: Selected date must be in the future.</p>}</span>
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 ml-2 mt-2">*Days*:</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-24 mr-3" type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="Enter need days.." required />
            </div>
            <div className="flex mt-2">
                <label className="text-left font-medium text-stone-500 mt-2 ml-2">*Message* :</label>
                <textarea className="w-72 outline outline-offset-2 outline-2 rounded-md mt-2 ml-16 mr-3" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write something.." required />
            </div>
            <div className="flex text-white mb-3 mt-4 justify-between">
                <input type="submit" onClick={bookHandle} className='w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' value="Book Now" />
                <input type="reset" className='w-24 mr-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full' value="Clear" />
            </div>
        </div>
    )
}


export default Book;