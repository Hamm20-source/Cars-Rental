import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("token_expiration");

    // Cek apakah token ada & belum expired
    if (!token || Date.now() > tokenExpiration) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiration");
       

        return <Navigate to="/login" />;
    }

    return children;
}
