import React from 'react';
// import { Link } from "react-router-dom";
import logoImg from '../assets/images/logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Footer = () => {
  return (
    <div className='relative mt-6 bottom-0  bg-slate-950 w-full'>

      <div className="flex w-screen h-32">
        {/* First Column - 10% */}

        <div className="w-4/12  ">
          <center>
            <a href='/' ><img src={logoImg} className='h-32 w-32 mt-4' alt='Logo' /></a>
          </center>
        </div>
        <div className="w-4/12  inline-grid ">
          <h2 className='text-yellow-400 mt-3'>Customer Support</h2>
          <ul className="inline-grid  my-1 " >
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-6 h-6 text-yellow-500">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg> */}

            <a href='/aboutus'>  <button> <li className='text-yellow-400 font-medium'>AboutUs</li></button> </a>
            <a href='/contactus'>  <button> <li className='text-yellow-400 font-medium'>Contact Us </li></button> </a>

            {/* <li className='text-yellow-400 font-medium'><Link to="">ContactUs</Link></li> */}

          </ul>

        </div>
        <div className="w-4/12  ">
          <h2 className='text-yellow-400 mt-3'>Customer Support</h2>
          <ul className='inline-grid my-1'>
            <li className=' text-yellow-400 font-medium'><i class="bi bi-geo-alt-fill"></i> Address : Khairahani-10, Kathar, Chitwan</li>
            <li className=' text-yellow-400 font-medium'><i class="bi bi-telephone-fill"></i> Contact No : 9811264300</li>
            <li className=' text-yellow-400 font-medium'><i class="bi bi-envelope-fill"></i> Email : info@vrent.com</li>
          </ul>

        </div>
      </div>
      <div className=''>
        <h3 className=' text-yellow-400 text-xl font-bold py-4'> Copyright © 2022 - {new Date().getFullYear()} vRent.com. All rights reserved </h3>
      </div>
    </div >

  )
}
export default Footer;