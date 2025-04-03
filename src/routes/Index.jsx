import React from "react";
import Home from "../pages/Home";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import ProtectedRoute from "../utils/ProtectedRoute";
import RentalDetails from "../pages/RentalDetails";
import MainDashboard from "../views/Dashboard/MainDashboard";
import RentalDashboard from "../views/Dashboard/RentalDashboard";

export const Authetication = [
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> }
];

export const routeList = [
  { path: "/", element: <Home /> }, 
  {
    path: "/rentaldetails",
    element: (
      <ProtectedRoute>
        <RentalDetails />
      </ProtectedRoute>
    )
  }
];

export const Dashboard = [
  {
    path: "/adminDashboard",
    element: (
      <ProtectedRoute>
        <MainDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/adminDashboard/rentals",
    element: (
      <ProtectedRoute>
        <RentalDashboard />
      </ProtectedRoute>
    )
  }
];
