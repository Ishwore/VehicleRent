import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import profileImg from "../assets/images/userIcon.jpg";


const ViewUser = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const auth = localStorage.getItem('user');
    const params = useParams();
    useEffect(() => {
        const getUsers = async () => {

            const result = await fetch(`http://localhost:5000/api/users/${params.id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(auth).token}`,
                }
            });


            const data = await result.json();
            // console.log(data);
            setName(data.name);
            setImage(data.image);
            setEmail(data.email);

        };

        getUsers();
    }, [auth, params.id]);

    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    // console.log(name, image, email);
    return (
        <div className="inline-grid mt-20 w-full ">
            <div className=" mt-4">
                <h1 className='text-center font-extrabold text-2xl text-stone-600 '>View User Details</h1>

                <div className="mt-14 ">
                    <center><p> {image !== '' ? <img
                        className="rounded-full mt-2 w-56 h-56  " src={getImageUrl(image)} alt="" /> : <img
                        className="rounded-full mt-2 w-56 h-56  " src={profileImg} alt="" />} </p> </center>
                    <p className='mt-5'>Name: {name}</p>
                    <p className=' mt-3'>Email: {email}</p>
                </div>

            </div>
        </div>

    )


}

export default ViewUser;