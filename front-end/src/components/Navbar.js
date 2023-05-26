import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import logoImg from '../assets/images/logo.png';
import SearchBox from "./SearchBox";
 import {useNavigate} from 'react-router-dom';
// import { Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../actions/userActions";

const Navbar = () => {
   
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    if(auth){
        navigate('/');
    }
    // const logout = () => {
    //     localStorage.clear();
    //     navigate('/');
    // }
//    const admin= JSON.parse(auth).isadmin
    // const logout = () => {
    //     localStorage.clear();
    //     navigate('/login');
    // }
    //     const dispatch = useDispatch();

    //   const userLogin = useSelector((state) => state.userLogin);
    //   const { userInfo } = userLogin;

    //   const logoutHandler = () => {
    //     dispatch(logout());
    //   };

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
                <div className="pt-2 font-semibold text-white  ">
                    <ul className="flex" >
                        <li className="mx-2 rounded-2xl w-24 h-10 pt-2 hover:font-bold hover:bg-slate-600 "> <Link to="/aboutus"><button className="px-3">AboutUs</button> </Link> </li>
                        <li className="mx-2 rounded-2xl w-28 h-10 pt-2 hover:font-bold hover:bg-slate-600 "><Link to="/contactus"><button className="px-4">ContactUs</button> </Link></li>
                    </ul>
                </div>
               
                {auth ?
                    <>
                    <ProfileMenu />
                    {/* <button className="mx-2 mt-2 rounded-2xl w-18 h-10 hover:font-bold hover:bg-slate-600 text-white "><Link onClick={logout} to="/signup" class="mx-3">Logout </Link></button> */}
                    </>
                    
                    :
                    <><div className="pt-2 font-semibold text-white  ">
                        <ul className="flex" >
                            <li className="mx-2 rounded-2xl w-18 h-10 pt-2 hover:font-bold hover:bg-slate-600 "><Link to="/login"><button className="px-3">Login</button> </Link></li>
                            <li className="mx-3 rounded-2xl w-20 h-10 pt-2 hover:font-bold hover:bg-slate-600 "><Link to="/signup"><button className="px-3">SignUp</button> </Link></li>
                        </ul>
                    </div>
                    </> 
                }
                 {auth && (JSON.parse(auth).isadmin === true) && (
                    <><div className="pt-2 font-semibold text-white  ">
                        <ul className="flex" >
                            <li className="mx-2 rounded-2xl w-28 h-10 pt-2 hover:font-bold hover:bg-slate-600 "> <Link to="/addvehicle"><button className="px-3">AddVehicle</button> </Link></li>
                            <li className="mx-2 rounded-2xl w-32 h-10 pt-2 hover:font-bold hover:bg-slate-600 "><Link to="/addcategory"><button className="px-4">AddCategory</button> </Link></li>
                        </ul>
                    </div>
                        <ProfileMenu /> </>
                )}
                

            </div>
        </nav>

    );
};

export default Navbar;