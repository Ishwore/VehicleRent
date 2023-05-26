import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileMenu from "./ProfileMenu";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (

        <nav class=" bg-sky-500 h-10">
            <div> 
                <img className='rounded-full mx-2 h-10 w-10 float-left' src='https://th.bing.com/th/id/R.2eddad8188f7537a1b3de6deb7438a82?rik=pMrDPqgVIZSUGA&pid=ImgRaw&r=0' alt='logo' />
                </div>
            <div >
               
                {auth ? <ul class='inline-flex space-x-6 mt-2  '>
                    <button class="rounded-lg w-20 text-black hover:bg-slate-200" >  <li><Link to="/">Products </Link></li></button>
                    <button class="rounded-lg w-28 text-black hover:bg-slate-200" >  <li><Link to="/add">Add Product </Link></li></button>
                    <button class="rounded-lg w-28 text-black hover:bg-slate-200" ><li><Link to="/update">Update Product </Link></li></button>
                    <ProfileMenu/>
                    <button class="rounded-lg w-20 text-black hover:bg-slate-200" ><li> <Link onClick={logout} to="/signup" class="mx-3">Logout </Link></li> </button>
                </ul>
                    :
                    <div class="text-right pr-10 pt-2  " >
                        <ul class='inline-flex space-x-8 '>
                            <button class="rounded-lg w-16 text-black hover:bg-slate-200" > <li ><Link to="/signup">SignUp</Link> </li> </button>
                            <button class="rounded-lg w-16 text-black hover:bg-slate-200"> <li> <Link to="/login">Login</Link> </li> </button>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    )
}
export default Nav;