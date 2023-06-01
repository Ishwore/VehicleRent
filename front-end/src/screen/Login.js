import React, { useState, useEffect } from "react";
//import Message from '../components/Message'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const collectData = async () => {
        // console.warn("email,password", email, password);
        const result = await fetch("http://localhost:5000/api/users/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const resultData = await result.json();
        // console.warn(resultData);
        if (resultData.name) {
            localStorage.setItem("user", JSON.stringify(resultData));
            navigate("/");
        } else {
            alert("Invalid Email and Password")
        }


    }
    return (
        <div className="inline-grid mt-32 rounded-3xl w-96  justify-center bg-stone-200">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>Login</h1>
            </div>
            <div className=" inline-grid mt-2">
                <label htmlFor='email' className="text-left font-bold text-stone-500 ">*Email*</label>
                <input className=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 " type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required />
            </div>
            <div className=" inline-grid mt-2">
                <label htmlFor="password" className="text-left font-bold text-stone-500">*Password*</label>
                <input className=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />
            </div>
            <button onClick={collectData} className=' w-72 rounded-xl bg-green-700 h-12 text-white text-center font-semibold mt-8 mb-3 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full'  >Login</button>
            <div className="mt-2 mb-6">
                <div className="flex">
                    <p className="ml-6">I have allready account ?</p>
                    <Link className="underline ml-1 " to="/signup" >SignUp</Link>
                </div>
            </div>
        </div>

    )
}

export default Login;