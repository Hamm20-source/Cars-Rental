import React from "react";
import Home from "../pages/Home";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import ProtectedRoute, {AdminRoute} from "../utils/ProtectedRoute";
import RentalDetails from "../pages/RentalDetails";
import MainDashboard from "../views/Dashboard/MainDashboard";
import RentalDashboard from "../views/Dashboard/RentalDashboard";
import UserDashboard from "../views/Dashboard/UserDashboard";
import CategoriesDashboard from "../views/Dashboard/CategoriesDashboard";

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
      <AdminRoute>
        <MainDashboard />
      </AdminRoute>
    )
  },
  {
    path: "/adminDashboard/rentals",
    element: (
      <AdminRoute>
        <RentalDashboard />
      </AdminRoute>
    )
  },
  {
    path: "/adminDashboard/users",
    element: (
      <AdminRoute>
        <UserDashboard />
      </AdminRoute>
    )
  },
  {
    path: "/adminDashboard/categories",
    element: (
      <AdminRoute>
        <CategoriesDashboard />
      </AdminRoute>
    )
  }
];
