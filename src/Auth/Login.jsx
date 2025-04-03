import React, { useState } from 'react'
import { loginWithDatabase } from '../services/AuthService';
import { Link, useNavigate } from 'react-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import '../style/Loading.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const usersData = await loginWithDatabase(email, password)
            const userRole = localStorage.getItem("role")
            userRole === "admin" ? navigate("/adminDashboard") : navigate("/")

            alert("Login Berhasil")
            setLoading(false)  
            return usersData
        } catch (error) {
            console.log(error.message, "error saat login")
            setLoading(false)
        }
    };

    const toggleVisibility = () => {
        setShowPassword(!showPassword)
    }

    if (loading) {
        return (
            <div className='Loading'>Loading...</div>
        )
    }

  return (
    <div className='relative flex flex-col justify-center items-center h-screen space-y-10'>
        <div className='absolute top-5 left-5'>
            <h1 className='text-3xl font-semibold'>
                Ren<span className='text-orange-500'>Cars</span>
            </h1>

        </div>

        <h2 className='text-2xl font-bold'>Login</h2>
        <form onSubmit={handleLogin} className='w-80 flex flex-col'>

            <label htmlFor='email' className='mb-1'>Email*</label>
            <input 
                type="email" 
                id='email' 
                placeholder="Email" 
                className='mb-5 p-2 shadow-xs border-1 border-gray-300 rounded-md outline-none' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />

            <label htmlFor='password' className='mb-1'>Password*</label>
            <div className='relative'>
                <input 
                    type={showPassword ? "text" : "password"}  
                    id='password' placeholder="Password" 
                    className='w-80 mb-5 p-2 shadow-xs border-1 border-gray-300 rounded-md outline-none' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} required 
                    />
                    <div className='absolute right-2 bottom-1/2'>
                        {showPassword ? 
                            <EyeIcon className='w-5' onClick={toggleVisibility}/>
                            :
                            <EyeSlashIcon className='w-5' onClick={toggleVisibility}/>
                        }
                    </div>
            </div>

            <button type="submit" className='text-white font-semibold bg-black p-2 mb-2 rounded-md'>
                Masuk
            </button>
            <p className='text-center'>
                Belum Punya Akun?
                {" "}
                <Link to="/signup">
                    <span className='text-blue-500 hover:underline'>Sign Up</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default Login