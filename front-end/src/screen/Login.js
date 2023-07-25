import React, { useState, useEffect } from "react";
// import { useCookies } from 'react-cookie';
//import Message from '../components/Message'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, showMessage] = useState("");
    const navigate = useNavigate();
    // const [cookies, setCookie] = useCookies(['user']);
    useEffect(() => {
        // const userData = cookies.user;
        // console.log(userData);
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
        if (resultData.message) {
            showMessage(resultData.message);
        } else {
            localStorage.setItem("user", JSON.stringify(resultData));
            // setCookie('user', JSON.stringify(resultData));
            navigate("/");
        }


    }
    return (
        <div className="inline-grid mt-32 rounded-3xl w-auto mb-20 justify-center bg-stone-200">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>Login</h1>
                <span>{message !== '' && <p className="mt-4 w-72 ml-12 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>

            </div>
            <div className=" inline-grid mt-2 px-14">
                <label className="text-left font-bold text-stone-500 ">*Email*</label>
                <input className=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 " type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required />
            </div>
            <div className=" inline-grid mt-2 px-14">
                <label className="text-left font-bold text-stone-500">*Password*</label>
                <input className=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />
            </div>
            <div className=" px-14">
                <button onClick={collectData} className=' w-72 rounded-xl bg-green-700 h-12 text-white text-center font-semibold mt-8 mb-3 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full'  >Login</button>
            </div>
            <div className="my-6 px-4">
                <div className="flex text-base py-3">
                    <p className="ml-1">Create new account ?</p>
                    <Link className="underline ml-1 " to="/signup" >SignUp</Link>
                    <Link className="underline ml-4 " to="/forgetpassword" >ForgetPassword?</Link>
                </div>
            </div>

        </div>

    )
}

export default Login;