import React from "react";
// , { useState, useEffect }
const UserList = () => {
    // const [users, setUsers] = useState([]);


    // useEffect(() => {
    //     getUsers();
    // })
    // const getUsers = async () => {
    //     const result = await fetch('http://localhost:5000/api/users', {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }

    //     });
    //     const resultData = result.json();
    //     setUsers(resultData);
    // }
    // console.warn("users", users);

    return (
        <form className="inline-grid mt-28 rounded-3xl  justify-center bg-stone-200">
            <div className=" mt-2">
                <h1 className='text-center font-bold text-2xl text-stone-600 '>Add Vehicle</h1>
            </div>
            <div>
                <table className='border'>
                    <tr>
                        <td className='px-4'>User ID</td>
                        <td className='px-4'>User Name</td>
                        <td className='px-4'> Email</td>
                        <td className='px-4'>isAdmin</td>
                        <td className='px-4'>Password</td>
                        <td className='px-4'>Actions</td>
                    </tr>
                    <tr>
                        {/* <td className='px-4'>{resultData.name}</td> */}
                        {/* while ({result.length}) {
                            <>
                                <td className='px-4'>{(result)._id}</td>
                                <td className='px-4'>I{(result).name}</td>
                                <td className='px-4'>{(result).email}</td>
                                <td className='px-4'>{(result).isAdmin}</td>
                                <td className='px-4'>{(result).password}</td>
                                <td className='px-4 text-white'>
                                    <button className='mx-2 bg-stone-600 rounded-xl px-4 font-medium hover:bg-stone-700 hover:font-bold'> Edit</button>
                                    <button className='mx-2 bg-red-600 rounded-xl px-4 font-medium hover:bg-red-700' > Delete</button>
                                </td>
                            </>
                        } */}

                    </tr>

                </table>
            </div>

        </form>
    )

}

export default UserList;