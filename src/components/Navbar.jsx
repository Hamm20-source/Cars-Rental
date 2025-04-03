import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'
import { logout } from '../services/AuthService';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const username = localStorage.getItem("name")
            const profileImage = localStorage.getItem("profileImage")
            const role = localStorage.getItem("role")

            setUser({
                name : username,
                roles: role,
                image : profileImage || "https://img.icons8.com/material-outlined/user--v1.png"
            })
        }
    }, []);

    const toggleMenu = () => setOpen(!open)
  
    const handleButtonSignUp = () => {
        setTimeout(() => {    
            navigate('/signup')
        }, 1000);
    };

    const handleButtonLogin = () => {
        setTimeout(() => {    
            navigate('/login')
        }, 1000);
    };


    const handleButtonLogout = async () => {
        try {
            await logout()
            localStorage.clear()
            setUser(null);
        } catch (error) {
            console.log(error.message || "Logout Berhasil")
        }
    };


  return (
    <nav className='fixed w-full top-0 py-5 px-10 z-50 h-20 bg-black/50 backdrop-blur-sm'>
        <div className='flex justify-between items-center'>
            <h1 className='text-4xl font-semibold text-white'>
                Ren<span className='text-orange-500'>Cars</span>
            </h1>
            
            <button
                type='button'
                onClick={toggleMenu}
                aria-expanded={open}
                className='w-5 text-white md:hidden'
            >
                {open ? <XMarkIcon/> : <Bars3Icon/>}
            </button>

            <div className={`absolute md:static top-20 left-0 p-8 md:p-0 w-full md:w-auto gap-10 space-y-4 md:space-y-0 transition-all duration-300 ease-in-out
                ${open ? 'bg-black/50 translate-y-0 opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5 pointer-events-none"'
                } md:flex md:items-center md:opacity-100 md:translate-y-0`}
            >
                <ul className='flex flex-col md:flex-row md:items-center gap-5 text-white font-medium'>
                    <li>About</li>
                    <li>Rental</li>
                    <li>Reviews</li>
                    <li>Contact</li>
                </ul>

                { user ? 
                    <div className='flex flex-col md:flex-row items-start md:items-center space-x-5 gap-5'>
                        <p className='text-white font-bold underline'>Hi,{user.name}</p>
                        <img src={user.image} alt={user.name} className='w-10 p-2 bg-white rounded-full'/>
                        <div className=''>         
                            <button 
                                className='px-2 py-1 bg-white text-orange-500 font-semibold'
                                onClick={handleButtonLogout}
                                >
                                    Logout
                                </button>
                        </div>
                    </div>
                    :
                    <div className='space-x-5'>
                        <button onClick={handleButtonLogin} className='bg-white px-4 py-1 cursor-pointer'>
                            Login
                        </button>
                        <button onClick={handleButtonSignUp} className='text-white cursor-pointer'>
                            SignUp
                        </button>
                    </div>
                }   
            </div>
        </div>
    </nav>
  )
}

export default Navbar