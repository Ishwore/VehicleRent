import React, { useState, useEffect, useRef } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const resultData = useRef([]);

    useEffect(() => {
        const getUsers = async () => {
            const result = await fetch('http://localhost:5000/api/users', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await result.json();
            resultData.current = data;
            setUsers(data);
        };

        getUsers();
    }, []);

    console.warn("users", users);

    return (
        <form className="inline-grid mt-28 rounded-3xl justify-center bg-stone-200">
            <div className="mt-2">
                <h1 className='text-center font-bold text-2xl text-stone-600'>User Details</h1>
            </div>
            <div>
                <table className='border border-collapse my-5'>
                    <thead>
                        <tr>
                            <th className='px-4 border border-slate-700'>User ID</th>
                            <th className='px-4 border border-slate-700'>User Name</th>
                            <th className='px-4 border border-slate-700'>Email</th>
                            <th className='px-4 border border-slate-700'>isAdmin</th>
                            <th className='px-4 border border-slate-700'>Password</th>
                            <th className='px-4 border border-slate-700'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {resultData.current.map((result) => (
                            <tr key={result._id}>
                                <td className='px-4 border border-slate-700'>{result._id}</td>
                                <td className='px-4 border border-slate-700'>{result.name}</td>
                                <td className='px-4 border border-slate-700'>{result.email}</td>
                                <td className='px-4 border border-slate-700'>{result.isAdmin ? "Yes" : "No"}</td>
                                <td className='px-4 border border-slate-700'>{result.password}</td>
                                <td className='px-4 border border-slate-700 text-white'>
                                    <button className='mx-2 bg-stone-600 rounded-xl px-4 font-medium hover:bg-stone-700 hover:font-bold'>Edit</button>
                                    <button className='mx-2 bg-red-600 rounded-xl px-4 font-medium hover:bg-red-700'>Delete</button>
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
