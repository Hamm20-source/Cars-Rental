import React, {  useState } from 'react';
import { signUpWithDatabase } from '../services/AuthService';
import { Link, useNavigate } from 'react-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import '../style/Loading.css'

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const user = await signUpWithDatabase(name, email, password, role)
            navigate('/login')
            alert(`Akun ${user.email} berhasil dibuat`)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    };

    const toggleVisibility = () => {
        setShowPassword(!showPassword)
    };

    if (loading) {
        return (
            <div className='Loading'>
                Loading...
            </div>
        )
    };

  return (
    <div className='relative flex flex-col justify-center items-center h-screen space-y-10'>
        <div className='absolute top-5 left-5'>
            <h1 className='text-3xl font-semibold'>
                Ren<span className='text-orange-500'>Cars</span>
            </h1>

        </div>

        <h2 className='text-2xl font-bold'>Signup</h2>
        <form onSubmit={handleSignUp} className='w-80 flex flex-col'>

            <label htmlFor='nama' className='mb-1'>Nama*</label>
            <input 
                type="text" 
                id='nama' 
                placeholder="Nama" 
                className='mb-5 p-2 shadow-xs border-1 border-gray-300 rounded-md outline-none' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />

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

            <label htmlFor="role" className='mb-1'>Pilih Role*</label>
            <select value={role} id='role' className='mb-5 p-2 shadow-xs border-1 border-gray-300 rounded-md outline-none' onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
            </select>

            <button type="submit" className='text-white font-semibold bg-black p-2 mb-2 rounded-md'>
                Create account
            </button>
            <p className='text-center'>
                Sudah Punya Akun?
                {" "}
                <Link to="/login">
                    <span className='text-blue-500 hover:underline'>Log in</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default SignUp