import React from 'react';
import Ishwore from '../assets/images/ishwore.jpg'
import Aryan from '../assets/images/aryan.jpg'

const aboutUs = () => {
    return (
        <div className="inline-grid mt-20 w-full ">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>AboutUs</h1>
                <div className='flex mt-20'>
                    <div className='w-6/12'>
                        <center>
                            <img src={Ishwore} alt='Ishwore Chaudhary' className='w-72 rounded-xl h-72' />
                            <h1 className='text-red-500 mt-4 text-xl font-bold'>Ishwore Chaudhary</h1>
                            <p >I'm Full Stack Web Developer,</p>
                        </center>
                    </div>
                    <div className='w-6/12'>
                        <center>
                            <img src={Aryan} alt='Aryan Dhakal' className='w-72 rounded-xl h-72' />
                            <h1 className='text-red-500 mt-4 text-xl font-bold'>Aryan Dhakal</h1>
                            <p >I'm Frontend Web Developer</p>
                        </center>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default aboutUs;