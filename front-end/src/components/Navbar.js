import React from "react";
import { Link } from "react-router-dom";
//import ProfileMenu from "./ProfileMenu";
import profileImg from "../assets/images/ishwore.jpg";
import logoImg from '../assets/images/logo.png';
import SearchBox from "./SearchBox";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <nav className="fixed flex justify-between mt-1 mb-1 bg-slate-950 h-16 w-full">
            <div>
                <Link to="/"> <div className=" w-14 h-14 text-end mx-5 mt-2">
                    <img className="rounded-full" src={logoImg} alt="Logo" />
                </div>
                </Link>
            </div>
            <div>
                <SearchBox />
            </div>
            <div className="flex">
                < div className="pt-2 font-semibold text-white  ">
                    <ul className="flex" >
                        <button className="px-3 mx-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-slate-600 "><li><Link to="/aboutus">AboutUs</Link></li></button>
                        <button className="px-3 mx-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-slate-600 "><li><Link to="/contactus">ContactUs</Link></li></button>
                    </ul>
                </div>
                {auth && !(JSON.parse(auth).isAdmin) && (<>
                    <img
                        className="rounded-full mx-0 mt-2 w-12 h-12 object-cover  cursor-pointer" src={profileImg} alt="" />
                    <div className="pt-2 font-semibold text-white  ">
                        <ul className="flex" >
                            <button className="px-3 mx-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-red-600 "><li><Link onClick={logout} to="/">Logout</Link></li></button>
                        </ul>
                    </div>

                </>)} {!auth && (
                    <div className="pt-2 font-semibold text-white  ">
                        <ul className="flex" >
                            <button className="px-3 mx-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-slate-600 "><li><Link to="/login">Login</Link></li></button>
                            <button className="px-3 mx-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-slate-600 "><li><Link to="/signup">SignUp</Link></li></button>
                        </ul>
                    </div>
                )}

                {auth && (JSON.parse(auth).isAdmin) && (
                    <>
                        <div className="pt-2 font-semibold text-white  ">
                            <ul className="flex" >
                                <button className="px-3 mx-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-slate-600 "><li><Link to="/addvehicle">AddVehicle</Link></li></button>
                            </ul>
                        </div>
                        <img
                            className="rounded-full mx-0 mt-2 w-12 h-12 object-cover  cursor-pointer" src={profileImg} alt="" />
                        <div className="pt-2 font-semibold text-white  ">
                            <ul className="flex" >
                                <button className="px-3 mx-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-red-600 "><li><Link onClick={logout} to="/">Logout</Link></li></button>
                            </ul>
                        </div>
                    </>
                )
                }

            </div>
        </nav >

    );
};

export default Navbar;