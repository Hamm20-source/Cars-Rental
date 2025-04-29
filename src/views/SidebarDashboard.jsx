import React from 'react';
import { Bars3Icon, XMarkIcon, HomeIcon, UserIcon, TruckIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

export default function SidebarDashboard({ open, setOpen }) {
    return (
        <div className={`fixed top-0 left-0 h-full bg-white shadow-xl p-5 transition-all duration-300 ease-in-out z-50
            ${open ? 'w-64' : 'w-16'}`}>

            <div className="flex justify-between items-center mb-10">
                <h1 className={`text-2xl font-semibold transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 hidden"}`}>
                    Ren<span className="text-orange-500">Cars</span>
                </h1>

                <button 
                    className=""
                    onClick={() => setOpen(!open)}
                >
                    {open ? <XMarkIcon className="w-6 h-6"/> : <Bars3Icon className="w-6 h-6"/>}
                </button>
            </div>


            {/* Menu Sidebar */}
            <ul className="space-y-5 font-medium">
                <SidebarItem icon={<HomeIcon className="w-6 h-6"/>} text="Dashboard" open={open} />
                <SidebarItem icon={<ViewColumnsIcon className="w-6 h-6"/>} text="Banner" open={open} />
                <SidebarItem icon={<TruckIcon className="w-6 h-6"/>} text="Rental" open={open} link="/adminDashboard/rentals" />
                <SidebarItem icon={<UserIcon className="w-6 h-6"/>} text="Users" open={open} link="/adminDashboard/users"/>
            </ul>
        </div>
    );
}

// 🔹 Sidebar Item Component
function SidebarItem({ icon, text, open, link }) {
    return (
        <li className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-300">
            <Link to={link} className="flex items-center gap-3">
                {icon}
                {open && <span>{text}</span>}
            </Link>   
        </li>
    );
}
