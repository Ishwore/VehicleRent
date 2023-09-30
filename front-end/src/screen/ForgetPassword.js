import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [getOtp, setGetOtp] = useState("");
    const [message, showMessage] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const ForgetPasswordHadler = async () => {
        // console.log(email);
        showMessage("")
        if (email !== '') {
            if (otp === '') {
                const result = await fetch('http://localhost:5000/api/users/sendMail', {
                    method: 'post',
                    body: JSON.stringify({ email }),
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })
                const resultData = await result.json()
                // console.log(resultData);
                if (resultData.message) {
                    showMessage(resultData.message);
                } else {
                    setGetOtp(resultData.otp);
                    setUser({ "_id": resultData._id, "token": resultData.token });
                }

            }

            if (otp !== '') {
                // console.log(getOtp, otp);
                if (getOtp === otp) {
                    console.log("Change Password");
                    localStorage.setItem("ForgetPass", JSON.stringify(user));
                    navigate('/changepassword');

                }
                else {
                    showMessage(" Confirmation Code Not match ")
                }


            }
        } else {
            showMessage(" Fill your Email input field ")
        }

    }

    return (
        <div className="inline-grid mt-20 w-aut0 ">
            <div className=" mt-4 mb-20">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>Forget Password</h1>
                <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                <div className="mt-16">
                    <div >
                        <label> Verify Email</label>
                        <input type="email" className="mx-4 rounded-lg px-3 w-96 h-10" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email " required />
                    </div>
                    {getOtp !== '' && <> <div className="mt-6">
                        <p className="text-lg font-bold "><i className="bi bi-info-circle text-yellow-400 text-2xl mr-3"></i> Confirmation code send in your email</p>
                        <label> Confirmation Code</label>
                        <input type="text" className="mx-4 rounded-lg px-3 w-80 mt-4 h-10" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter confirmation Code " required />
                    </div></>}
                    <input type="submit" onClick={ForgetPasswordHadler} value='Forget Password' className="mx-3 my-5 px-3 py-2 rounded-2xl bg-red-500" />
                </div>


            </div>
        </div>
    )
}


export default ForgetPassword;