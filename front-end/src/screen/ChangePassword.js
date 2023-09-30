import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const auth = localStorage.getItem('ForgetPass');
    const navigate = useNavigate();
    useEffect(() => {
        if (!(auth)) {
            navigate('/forgetpassword');
        }
    }, [auth, navigate]);
    const [message, showMessage] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const handleChangePassword = async (e) => {
        const id = JSON.parse(auth)._id;
        console.log(password, confirmpassword);
        if (!(password === '' || confirmpassword === ' ')) {
            if (password !== confirmpassword) {
                showMessage('Password and Confirm Password are not match')
            } else {
                const result = await fetch(`http://localhost:5000/api/users/profile/${id}`, {
                    method: 'put',
                    body: JSON.stringify({ password }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(auth).token}`,
                    },
                });
                const resultData = await result.json();
                if (resultData.message) {
                    showMessage(resultData.message)
                } else {
                    // console.log(resultData);
                    navigate('/login');
                    localStorage.removeItem('ForgetPass');
                    alert("Succsessfully Forget Password Change ");

                }
            }
        } else {
            showMessage("Fullfill Form Input")
        }
    }


    return (
        <div className="inline-grid mt-20 w-aut0 " >
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>Change Password</h1>
                <span>{message !== '' && <p className="mt-4 text-slate-200 bg-red-400 rounded"> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                <div className="mt-14">
                    <div className=' mt-6'>
                        <label> New Password : </label>
                        <input type='password' className='ml-10 px-3 rounded w-72 h-10' value={password} onChange={(e) => setPassword(e.target.value)} placeholder=' Enter your new password ' required />
                    </div>
                    <div className='mt-4'>
                        <label> Confirm Password : </label>
                        <input type='password' className='ml-3 px-3 rounded w-72 h-10' value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder=' Enter  confirm password ' required />
                    </div>

                    <input type="submit" onClick={handleChangePassword} value='Forget Password' className="mx-6 my-10 px-5 py-3 rounded-2xl bg-red-500" />
                </div>


            </div>
        </div >
    )
}

export default ChangePassword;