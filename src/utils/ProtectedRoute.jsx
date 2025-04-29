import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("token_expiration");

    // Cek apakah token ada & belum expired
    if (!token || Date.now() > tokenExpiration) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiration");  
        return <Navigate to="/login" />;
    }

    return children;
};

const AdminRoute = ({children}) => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token")
    const tokenExpiration = localStorage.getItem("token_expiration")

    if (role !== "admin") {
        return <Navigate to="/" replace/>
    } 

    if (!token || Date.now() > tokenExpiration) {
        localStorage.removeItem("token")
        localStorage.removeItem("token_expiration")
        return <Navigate to="/login"/>
    }

    return children;
};

export default ProtectedRoute;
export {AdminRoute};