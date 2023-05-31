import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const collectData = async (e) => {
        //console.warn(name, email, password);
        e.preventDefault()
        if (password !== confirmpassword) {
            alert('Password & ConfirmPassword do not match !')
        } else {
            const result = await fetch('http://localhost:5000/api/users', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },

            })
            const resultData = await result.json()
            //  console.warn(resultData);
            localStorage.setItem("user", JSON.stringify(resultData));
            navigate('/');
        }

    }
    return (

        <form onSubmit={collectData} className="inline-grid mt-28 rounded-3xl w-96  justify-center bg-stone-200">
            <div className=" mt-4">
                <h1 class='text-center font-extrabold text-2xl text-stone-600 '>Register</h1>
            </div>
            <div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500 mt-6">*Username*</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2  " type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />
            </div>
            <div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500 ">*Email*</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 " type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required />
            </div>
            <div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500">*Password*</label>
                <input class=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />
            </div>
            < div className=" inline-grid mt-2">
                <label class="text-left font-bold text-stone-500">*Confirm Password*</label>
                <input class=" w-72 outline outline-offset-2 outline-2  text-center  rounded-md mt-2" type="password" value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder="Enter your Password" required />
            </div>
            <input type="submit" class=' w-72 rounded-xl h-12 text-center text-white font-semibold mt-8 mb-3 bg-green-700 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' value="Sign Up" />
            <div className="mt-2 mb-6">
                <div className="flex">
                    <p className="ml-6">I have allready account ?</p>
                    <Link className="underline ml-1  " to="/login" >Login</Link>
                </div>
            </div>
        </form>

    )
}

export default SignUp;