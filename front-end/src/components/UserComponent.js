import React from "react";
import { Navigate, Outlet } from 'react-router-dom';


const UserComponent = () => {
    const auth = localStorage.getItem('user')
    const admin = JSON.parse(auth).isAdmin
    return (auth && !admin) || !auth ? <Outlet /> : <Navigate to="/login" />
}
export default UserComponent;