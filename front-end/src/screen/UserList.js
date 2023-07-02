import React, { useState, useEffect, useRef } from "react";
// import { Navigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const resultData = useRef([]);
    const auth = localStorage.getItem('user');
    // if (!auth) {
    //     <Navigate to="/login" />
    // }

    useEffect(() => {
        const getUsers = async () => {
            const result = await fetch('http://localhost:5000/api/users', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(auth).token}`,
                }
            });


            const data = await result.json();
            resultData.current = data;
            setUsers(data);
        };

        getUsers();
    }, [auth]);

    console.warn(users);
    const deleteProduct = async (id) => {
        const answer = window.confirm("You want to delete User !");
        if (answer === true) {
            const result = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'Delete',
                headers: {
                    Authorization: `Bearer ${JSON.parse(auth).token}`,
                },
            });
            if (result) {
                alert("User delete Successfully");
            }
        }
    }

    return (
        <form className="inline-grid mt-28 rounded-3xl justify-center bg-stone-200">
            <div className="mt-2">
                <h1 className='text-center font-bold text-2xl text-stone-600'>User Lists</h1>
            </div>
            <div className="px-3 py-4">
                <table className='border border-collapse my-5'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 border border-slate-700'>S.No</th>
                            <th className='px-4 py-2 border border-slate-700'>User Name</th>
                            <th className='px-4 py-2 border border-slate-700'>Email</th>
                            <th className='px-4 py-2 border border-slate-700'>isAdmin</th>
                            <th className='px-4 py-2 border border-slate-700'>Password</th>
                            <th className='px-4 py-2 border border-slate-700'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {resultData.current.map((result, index) => (
                            <tr key={result._id}>
                                <td className='px-4 py-2 border border-slate-700'>{index + 1}</td>
                                <td className='px-4 py-2 border border-slate-700'>{result.name}</td>
                                <td className='px-4 py-2 border border-slate-700'>{result.email}</td>
                                <td className='px-4 py-2 border border-slate-700'>{result.isAdmin ? "Yes" : "No"}</td>
                                <td className='px-4 py-2 border border-slate-700'>{result.password}</td>
                                <td className='px-4 py-2 border border-slate-700 text-white'>
                                    <button className='mx-2 bg-stone-600 rounded-xl px-4 py-1 font-medium hover:bg-stone-700 hover:font-bold'>View</button>
                                    <button onClick={() => deleteProduct(result._id)} className='mx-2 bg-red-600 rounded-xl py-1 px-4 font-medium hover:bg-red-700 hover:font-bold'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
};

export default UserList;
