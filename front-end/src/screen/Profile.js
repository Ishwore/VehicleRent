import React, { useState } from 'react';
import CardList from './CardList'
import { useNavigate } from 'react-router-dom';
import profileImg from "../assets/images/userIcon.jpg";
const ProfileComponent = () => {
    const auth = localStorage.getItem('user');
    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };
    // useEffect(() => {
    // })
    const navigate = useNavigate();
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

    const handleChangePassword = (e) => {
        e.preventDefault()
        console.log(password, oldpassword, confirmpassword);
        if (!(oldpassword === '' || password === '' || confirmpassword === ' ')) {
            if (password !== confirmpassword) {
                showMessage('Password and Confirm Password are not match')
            } else {

            }
        } else {
            showMessage("Fullfill Form Input")
        }
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
        navigate('/');
    }

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

    return (
        <div className='mt-16 inline-grid'>
            <div className="flex w-screen">
                {/* First Column - 10% */}

                <div className="w-2/12 bg-gray-700 ">
                    <div className='h-96  inline-grid'>

                        <button
                            className={`bg-blue-500 text-white py-2 mt-5 px-4 rounded-md mb-2 ${showChangeProfile ? 'text-xl bg-green-500' : ''
                                }`}
                            onClick={handleShowProfile}
                        >
                            Profile

                        </button>
                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showProfileUpdate ? 'text-xl bg-green-500' : ''
                                }`}
                            onClick={handleShowProfileUpdate}
                        >
                            Profile Update
                        </button>
                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showChangeMyCard ? 'text-xl bg-green-500' : ''
                                }`}
                            onClick={handleShowChangeMyCard}
                        >
                            My Card
                        </button>
                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showChangeMyBooking ? 'text-xl bg-green-500' : ''
                                }`}
                            onClick={handleShowChangeMyBooking}
                        >
                            My Booking
                        </button>
                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md mb-2 ${showChangePassword ? 'text-xl bg-green-500' : ''
                                }`}
                            onClick={handleShowChangePassword}
                        >
                            Change Password
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
                        </button>

                    </div>
                </div>

                {/* Second Column - 90% */}
                <div className="w-10/12 bg-white p-4">
                    {showChangeProfile && (
                        <div>
                            {/* Interface for Change Password */}
                            <div className='inline-grid'>
                                <div>
                                    <p> {(JSON.parse(auth).image) === '' ? <img
                                        className="rounded-full mx-0 mt-2 w-60 h-56 object-cover  cursor-pointer" src={profileImg} alt="" /> : <img
                                        className="rounded-full mx-0 mt-2 w-60 h-56 object-cover  cursor-pointer" src={getImageUrl((JSON.parse(auth).image))} alt="" />} </p>
                                    <p className='mt-2'>{(JSON.parse(auth).name)}</p>
                                    <p className=' mt-3'>Email : {(JSON.parse(auth).email)}</p>

                                </div>

                            </div>
                            {/* Add your change password interface here */}
                        </div>
                    )}

                    {showProfileUpdate && (
                        <div>
                            {/* Interface for Profile Update */}
                            <h2 className="text-xl font-bold mb-4">Profile Update</h2>
                            {/* Add your profile update interface here */}
                        </div>
                    )}

                    {showChangeMyCard && (
                        <div>
                            <CardList />
                        </div>
                    )}

                    {showChangeMyBooking && (
                        <div>
                            {/* Interface for Profile Update */}
                            <h2 className="text-xl font-bold mb-4">My Booking</h2>
                            {/* Add your profile update interface here */}
                        </div>
                    )}

                    {showChangeBookingHistory && (
                        <div>
                            {/* Interface for Profile Update */}
                            <h2 className="text-xl font-bold mb-4">Booking History</h2>
                            {/* Add your profile update interface here */}
                        </div>
                    )}
                    {showChangePassword && (
                        <div>
                            <h2 className="text-2xl font-bold text-red-500 mb-4">Change Password</h2>
                            <span >{message !== '' && <p className="mt-3 text-slate-200 bg-red-400 rounded mx-20 py-2 "> <span className=" font-semibold">Message</span> : {message} !</p>}</span>
                            <div className=' mt-10'>
                                <label> Old Password : </label>
                                <input type='password' className=' ml-6 px-3' value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} placeholder=' Enter your old password ' required />
                            </div>
                            <div className=' mt-3'>
                                <label> New Password : </label>
                                <input type='password' className='ml-6 px-3' value={password} onChange={(e) => setPassword(e.target.value)} placeholder=' Enter your new password ' required />
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

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
