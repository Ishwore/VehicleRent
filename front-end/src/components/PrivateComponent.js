import React from "react";
import { Navigate, Outlet } from 'react-router-dom';


const PrivateComponent = () => {
    const auth = localStorage.getItem('user');
    const admin = JSON.parse(auth).isAdmin
    return admin ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateComponent 