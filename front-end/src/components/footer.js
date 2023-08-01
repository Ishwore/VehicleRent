import React from 'react';
// import { Link } from "react-router-dom";
import logoImg from '../assets/images/logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Footer = () => {
  return (
    <div className='relative mt-6 bottom-0   w-full'>

      <div className="flex bg-slate-800 ">
        <div className="w-4/12  ">
          <a href='/' ><img src={logoImg} className='h-32 w-32 mt-8 ml-10' alt='Logo' /></a>
        </div>

        <div className="w-4/12  ">
          <h2 className='text-yellow-400 mt-3 font-bold text-2xl'>Usefull Links</h2>
          <ul className='inline-grid my-2'>
            <a href='/aboutus'>  <button> <li className='text-yellow-400 font-medium py-1'>AboutUs</li></button> </a>
            <a href='/contactus'>  <button> <li className='text-yellow-400 font-medium py-1'>ContactUs </li></button> </a>
            <a href='/whywithus'>  <button> <li className='text-yellow-400 font-medium py-1'>WhyWithUs </li></button> </a>
          </ul>
        </div>

        <div className="w-4/12  ">
          <h2 className='text-yellow-400 mt-3 font-bold text-2xl'>Contact Us</h2>
          <ul className='inline-grid my-2'>
            <li className=' text-yellow-400 font-medium py-1'><i className="bi bi-geo-alt-fill"></i> Khairahani-10, Kathar, Chitwan</li>
            <li className=' text-yellow-400 font-medium py-1'><i className="bi bi-telephone-fill"></i> 9811264300</li>
            <li className=' text-yellow-400 font-medium py-1'><i className="bi bi-envelope-fill"></i> info@vrent.com</li>
          </ul>

        </div>
      </div>
      <div className='  bg-slate-900 flex '>
        <div className='w-6/12'>
          <h3 className=' text-gray-500 text-xl ml-3  py-4'> Copyright © 2022 - {new Date().getFullYear()} vRent.com. All rights reserved </h3>
        </div>
        <div className='w-4/12 '>
          <h4 className=' text-base  py-4 '> <span className='text-gray-500'>  Designed By : </span> <span className='text-slate-300' >Ishwore Chaudhary & Aryan Dhakal </span></h4>
        </div>
      </div>
    </div >

  )
}
export default Footer;