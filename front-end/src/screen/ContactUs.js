import React from "react";

const contactUs = () => {
    return (
        <form className="inline-grid mt-24 rounded-3xl justify-center bg-stone-200">
            <div>
                <h1 className='text-center font-extrabold text-2xl text-stone-600 pt-3 '>ContactUs Pages</h1>
            </div>
            <div>
                <h1 className="my-3 ">Our Location</h1>
                <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d146670.31925418624!2d84.5072031441852!3d27.6455382414857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1660914082168!5m2!1sen!2snp" className="w-screen h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </form>
    )
}

export default contactUs;