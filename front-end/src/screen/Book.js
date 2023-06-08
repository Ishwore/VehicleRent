import React from "react";


const Book = () => {


    return (
        <form className="inline-grid mt-28 rounded-3xl justify-center bg-stone-200">
            <div className="mt-2">
                <h1 className='text-center font-bold text-2xl text-stone-600'>Book Vehicle</h1>
            </div>
            <div className="flex mt-2">
                <label htmlFor="catname" className="text-left font-medium text-stone-500 mt-2 ml-3">*Name* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-20 mr-3" type="text" placeholder="Enter your name.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle name" className="text-left font-medium text-stone-500 ml-3 mt-2">*Phone Number* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-3 mr-3" type="text" placeholder="Enter contact number.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle qty" className="text-left font-medium text-stone-500 mt-2 ml-3">*From Date* :</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-11 mr-3" type="datetime-local" placeholder="Enter need date.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle reg" className="text-left font-medium text-stone-500 ml-2 mt-2">*Days*:</label>
                <input className="w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 ml-24 mr-3" type="number" placeholder="Enter need days.." required />
            </div>
            <div className="flex mt-2">
                <label htmlFor="vehicle des" className="text-left font-medium text-stone-500 mt-2 ml-2">*Message* :</label>
                <textarea className="w-72 outline outline-offset-2 outline-2 rounded-md mt-2 ml-16 mr-3" placeholder="Write something.." required />
            </div>
            <div className="flex text-white mb-3 mt-4 justify-between">
                <input type="submit" className='w-36 ml-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-green-600 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' value="Book Now" />
                <input type="reset" className='w-24 mr-3 rounded-xl h-12 text-center font-semibold mt-5 mb-3 bg-red-600 hover:bg-red-800 hover:text-lg hover:font-bold hover:rounded-full' value="Clear" />
            </div>
        </form>
    )
}


export default Book;