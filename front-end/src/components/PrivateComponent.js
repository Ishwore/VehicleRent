import React from "react";
import { Navigate, Outlet } from 'react-router-dom';


const PrivateComponent = () => {
    const auth = localStorage.getItem('user');

    return auth ? ((JSON.parse(auth).isAdmin) ? <Outlet /> : <Navigate to="/login" />) : < Navigate to="/signup" />
}
export default PrivateComponent 