import React, { useState, useEffect } from "react";
import CardList from './CardList'
import MyBookingList from './MyBookingList'
import BookingHistory from "./BookingHistory";
import { useNavigate } from 'react-router-dom';
import profileImg from "../assets/images/userIcon.jpg";
const Profile = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(() => {
        if (!(auth)) {
            navigate('/login');
        }
    }, [auth, navigate]);




    const [showChangeProfile, setShowChangeProfile] = useState(true);
    const [showProfileUpdate, setShowProfileUpdate] = useState(false);
    const [showChangeMyCard, setShowChangeMyCard] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeMyBooking, setShowChangeMyBooking] = useState(false);
    const [showChangeBookingHistory, setShowChangeBookingHistory] = useState(false);
    const [message, showMessage] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [Image, setImage] = useState("");
    const [profileMessage, setprofileMessage] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault()
        const id = JSON.parse(auth)._id;
        console.log(password, oldpassword, confirmpassword);
        if (!(oldpassword === '' || password === '' || confirmpassword === ' ')) {
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
                    localStorage.setItem("user", JSON.stringify(resultData));
                    showMessage("Succsessful Change Password !");
                }
            }
        } else {
            showMessage("Fullfill Form Input")
        }
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    const handleShowProfile = () => {
        setShowChangeProfile(true);
        setShowChangePassword(false);
        setShowProfileUpdate(false);
        setShowChangeBookingHistory(false);
        setShowChangeMyBooking(false);
        setShowChangeMyCard(false);

    };
    const logout = () => {
        localStorage.clear();
        // window.location.reload();
        navigate('/');

    }
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    const handleShowChangePassword = () => {
        setShowChangeProfile(false);
        setShowChangePassword(true);
        setShowProfileUpdate(false);
        setShowChangeBookingHistory(false);
        setShowChangeMyBooking(false);
        setShowChangeMyCard(false);
    };

    const handleShowProfileUpdate = () => {
        setShowChangeProfile(false);
        setShowChangePassword(false);
        setShowProfileUpdate(true);
        setShowChangeBookingHistory(false);
        setShowChangeMyBooking(false);
        setShowChangeMyCard(false);
    };
    const handleShowChangeMyCard = () => {
        setShowChangeProfile(false);
        setShowChangePassword(false);
        setShowProfileUpdate(false);
        setShowChangeBookingHistory(false);
        setShowChangeMyBooking(false);
        setShowChangeMyCard(true);
    };
    const handleShowChangeMyBooking = () => {
        setShowChangeProfile(false);
        setShowChangePassword(false);
        setShowProfileUpdate(false);
        setShowChangeBookingHistory(false);
        setShowChangeMyBooking(true);
        setShowChangeMyCard(false);
    };
    const handleShowChangeBookingHistory = () => {
        setShowChangeProfile(false);
        setShowChangePassword(false);
        setShowProfileUpdate(false);
        setShowChangeBookingHistory(true);
        setShowChangeMyBooking(false);
        setShowChangeMyCard(false);
    };
    const imageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const result = await fetch("http://localhost:5000/api/upload", {
            method: 'post',
            body: formData

        });
        const data = await result.json();
        const imagePath = data.path; // Assuming the server returns the image path in the "path" property
        // console.log(imagePath);
        setImage(imagePath);




    }


    const changeProfilePicture = async () => {
        const image = Image;
        // console.log(image);
        const id = JSON.parse(auth)._id;
        // console.log(id);
        if (image !== '') {
            const result = await fetch(`http://localhost:5000/api/users/profile/${id}`, {
                method: 'post',
                body: JSON.stringify({ image }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(auth).token}`,
                },
            });
            const resultData = await result.json();
            if (resultData.message) {
                setprofileMessage(resultData.message)
            } else {
                // console.log(resultData);
                localStorage.setItem("user", JSON.stringify(resultData));
                setprofileMessage("successfully Profile Picture change ")
            }

        } else {
            setprofileMessage("Choose Profile Picture ")
        }

        setTimeout(() => {
            window.location.reload();
        }, 2000);


    }

    return (
        <div className='mt-16 inline-grid'>
            <div className="flex w-screen">


                <div className="w-2/12 bg-slate-700 ">
                    <div className="h-auto inline-grid">

                        <button
                            className={`bg-blue-500 text-white py-2 mt-5 px-4 rounded-md mb-2 ${showChangeProfile ? 'text-xl bg-green-500' : ''
                                }`}
                            onClick={handleShowProfile}
                        >
                            Profile

                        </button>
                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showProfileUpdate ? 'text-lg bg-green-500' : ''
                                }`}
                            onClick={handleShowProfileUpdate}
                        >
                            Profile Pic Update
                        </button>

                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showChangePassword ? 'text-xl bg-green-500' : ''
                                }`}
                            onClick={handleShowChangePassword}
                        >
                            Change Password
                        </button>



                        {auth && !(JSON.parse(auth).isAdmin) && <>

                            <button
                                className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showChangeMyCard ? 'text-xl bg-green-500' : ''
                                    }`}
                                onClick={handleShowChangeMyCard}
                            >
                                <i className="bi bi-cart"></i>  My Card
                            </button>
                            <button
                                className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showChangeMyBooking ? 'text-xl bg-green-500' : ''
                                    }`}
                                onClick={handleShowChangeMyBooking}
                            >
                                My Booking
                            </button>

                            <button
                                className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showChangeBookingHistory ? 'text-xl bg-green-500' : ''
                                    }`}
                                onClick={handleShowChangeBookingHistory}
                            >
                                Booking History
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-red-600 "
                                onClick={logout}
                            >
                                Logout
                            </button> </>}

                    </div>
                </div >


                <div div className="w-10/12 bg-white p-4" >
                    {showChangeProfile && (
                        <>

                            <div className='inline-grid'>
                                <div>
                                    <p> {auth && (JSON.parse(auth).image) !== '' ? <img
                                        className="rounded-full mx-0 mt-2 w-60 h-56 object-cover  cursor-pointer" src={getImageUrl((JSON.parse(auth).image))} alt="" /> : <img
                                        className="rounded-full mx-0 mt-2 w-60 h-56 object-cover  cursor-pointer" src={profileImg} alt="" />} </p>
                                    <p className='mt-2'>{auth && (JSON.parse(auth).name)}</p>
                                    <p className=' mt-3'>Email : {auth && (JSON.parse(auth).email)}</p>

                                </div>

                            </div>

                        </>
                    )}

                    {
                        showProfileUpdate && (
                            <>

                                <h2 className="text-2xl text-red-500 font-bold mb-10 mt-5">Profile Picture Update</h2>
                                <span >{profileMessage !== '' && <p className="mt-3 text-slate-200 bg-red-400 rounded mx-20 py-2 "> <span className=" font-semibold">Message</span> : {profileMessage} !</p>}</span>
                                <div className="mb-20">
                                    <div className=' mt-14'>
                                        <label> Profile Picture : </label>
                                        <input type='file' className=' ml-6 px-3' onChange={(e) => imageUpload(e)} required />
                                    </div>
                                    <div className='mt-5 text-white justify-center'>
                                        <button className=' bg-green-500 text-lg rounded-lg  py-3 px-3 hover:text-xl hover:bg-green-600 ' onClick={changeProfilePicture} >
                                            Change Profile Picture
                                        </button>
                                    </div>
                                </div>



                            </>
                        )
                    }

                    {
                        showChangeMyCard && (
                            <>
                                <CardList />
                            </>
                        )
                    }

                    {
                        showChangeMyBooking && (
                            <>
                                <MyBookingList />
                            </>
                        )
                    }

                    {
                        showChangeBookingHistory && (
                            <>
                                <BookingHistory />
                            </>
                        )
                    }
                    {
                        showChangePassword && (
                            <>
                                <h2 className="text-2xl font-bold text-red-500 mb-6 mt-5">Change Password</h2>
                                <span >{message !== '' && <p className="mt-3 text-slate-200 bg-red-400 rounded mx-20 py-2 "> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                                <form className="mb-10">
                                    <div className=' mt-10'>
                                        <label> Old Password : </label>
                                        <input type='password' className=' ml-11 px-3' value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} placeholder=' Enter your old password ' required />
                                    </div>
                                    <div className=' mt-3'>
                                        <label> New Password : </label>
                                        <input type='password' className='ml-10 px-3' value={password} onChange={(e) => setPassword(e.target.value)} placeholder=' Enter your new password ' required />
                                    </div>
                                    <div className='mt-3'>
                                        <label> Confirm Password : </label>
                                        <input type='password' className='ml-3 px-3' value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder=' Enter  confirm password ' required />
                                    </div>
                                    <div className='mt-5 text-white justify-center'>
                                        <button className=' bg-green-500 text-lg rounded-lg  py-3 px-3 hover:text-xl hover:bg-green-600 ' onClick={handleChangePassword}>
                                            Change Password
                                        </button>
                                    </div>
                                </form>

                            </>
                        )
                    }
                </div>
            </div >
        </div >
    );
};

export default Profile;
