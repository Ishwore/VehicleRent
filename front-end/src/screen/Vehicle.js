import React from "react";


const AddVehicle = () =>{


    return(
        <form  className="inline-grid mt-32 rounded-3xl w-96  justify-center bg-stone-200">
            <div className=" mt-4">
                <h1 class='text-center font-extrabold text-2xl text-stone-600 '>Add Vehicle</h1>
            </div>
            <div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500 mt-8">*Username*</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2  " type="text"  placeholder="Enter your Name" required/>
            </div>
            <div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500 ">*Email*</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 " type="email"   placeholder="Enter your Email" required/>
            </div>
            <div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500">*Password*</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2" type="password" placeholder="Enter your Password" required/>
            </div>
           < div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500">*Confirm Password*</label>
                <input class=" w-72 outline outline-offset-2 outline-2  text-center  rounded-md mt-2" type="password"  placeholder="Enter your Password" required/>
            </div>
            <input type="submit" class=' w-72 rounded-full h-12 text-center font-semibold mt-8 mb-3 bg-stone-400 hover:bg-stone-500 hover:text-lg hover:font-bold' value="Sign Up" />
        </form>
    )
}

export default AddVehicle;