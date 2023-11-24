import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, showMessage] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    // const [Image, setImage] = useState("");
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
        const image = '';
        const validateEmail = () => {
            // Define a regular expression pattern for the desired format
            const pattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

            // Use the test() method to check if the email matches the pattern
            if (pattern.test(email) && !email.startsWith('-')) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        };
        validateEmail();
        const validateName = () => {
            // Define a regular expression pattern for alphabetic characters
            const pattern = /^[A-Za-z]+$/;

            // Use the test() method to check if the name matches the pattern
            if (pattern.test(name)) {
                setIsValidName(true);
            } else {
                setIsValidName(false);
            }
        };
        validateName();
        if (isValidName === true || isValid === true) {

            if (!(name === '' || email === '' || password === '' || confirmpassword === ' ')) {
                if (password !== confirmpassword) {
                    showMessage('Passwords are not match')
                } else {
                    const result = await fetch('http://localhost:5000/api/users', {
                        method: 'post',
                        body: JSON.stringify({ name, email, password, image }),
                        headers: {
                            'Content-Type': 'application/json'
                        },

                    })
                    const resultData = await result.json()
                    //  console.warn(resultData);
                    if (resultData.message) {
                        showMessage(resultData.message);
                        // console.log(message);
                    } else {
                        localStorage.setItem('user', JSON.stringify(resultData));
                        // window.location.reload();
                        navigate('/');
                    }


                    // localStorage.setItem("user", JSON.stringify(resultData));
                    // navigate('/');

                }
            } else {
                showMessage("Please fill form input ")
            }

        } else {
            showMessage("Name is only Character and Email only like aryan@gmail.com")
        }


    }


    return (

        <form onSubmit={collectData} className="inline-grid mt-28 rounded-3xl w-96  justify-center bg-stone-200">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>Register</h1>

                <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
            </div>

            <div className=" inline-grid mt-2">
                <label className="text-left font-bold text-stone-500 mt-6">*Username*</label>
                <input className=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2  " type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />
            </div>
            <div className=" inline-grid mt-2">
                <label className="text-left font-bold text-stone-500 ">*Email*</label>
                <input className=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2 " type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required />
            </div>
            <div className=" inline-grid mt-2">
                <label className="text-left font-bold text-stone-500">*Password*</label>
                <input className=" w-72 outline outline-offset-2 outline-2 text-center rounded-md mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />
            </div>
            < div className=" inline-grid mt-2">
                <label className="text-left font-bold text-stone-500">*Confirm Password*</label>
                <input className=" w-72 outline outline-offset-2 outline-2  text-center  rounded-md mt-2" type="password" value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder="Enter your Password" required />
            </div>

            <input type="submit" className=' w-72 rounded-xl h-12 text-center text-white font-semibold mt-8 mb-3 bg-green-700 hover:bg-green-800 hover:text-lg hover:font-bold hover:rounded-full' value="Sign Up" />
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