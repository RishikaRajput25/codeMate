
/*
import React from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import toast from 'react-hot-toast'
const Signup = () => {
    const {register,handleSubmit,formState :{errors}}=useForm();
    const navigate= useNavigate();
    const onSubmit= async(data)=>{
        await api.post('/users/register',data);
        toast.success("User registered Successfully");
        console.log("Form submitted : ",data);
        navigate('/login')
    }
  return (
    // bg-[#1f2124] 
    <>
    <div className='flex justify-center items-center bg-gray-50  min-h-screen  '>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover: shadow-2xl hover:scale-101' >
          <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
           <label htmlFor='username' className='block text-gray-700 font-medium mb-1'>Enter username</label>
           <input  
           type='text'
           placeholder='Username'
           {...register("username",{required:"Username is required"})}
           className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
           />
           {errors.username && <p className='text-red'>{errors.username.message}</p>}
           <label htmlFor='email' className='block text-gray-700 font-medium mb-1'> Enter Email</label>
           <input
           type='email'
           placeholder='Email'
           {...register("email",{required:"Email is reuired"})}
           className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
         />
         {errors.email && <p className=' text-red-500'> {errors.email.message}</p>}
         <label htmlFor='password' className='block text-gray-700 font-medium mb-1'/>
         <input 
         type='password'
         placeholder='Password'
         {...register("password",{required:"Password is required"})}
         className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
         />
         {errors.password && <p className=' text-red'>{errors.password.message}</p>}
         <button type='submit' className=' w-full bg-[#2a2c2e] text-white py-2 rounded-lg hover:bg-[#37042c] transition mb-2'>Submit</button>
        </form>

    </div>
    </>
  )
}

export default Signup
*/
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../../services/api'
import toast from 'react-hot-toast'

export const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('/users/register', data);
    toast.success("User registered Successfully");
    navigate('/login');
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#0f172a]'>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md p-8 rounded-2xl 
        bg-white/5 backdrop-blur-lg border border-white/10
        shadow-2xl hover:shadow-purple-500/10 transition-all duration-300'
      >

        <h2 className="text-3xl font-bold text-center mb-6 
        bg-blue-400 bg-clip-text text-transparent">
          Signup
        </h2>

        {/* USERNAME */}
        <label className='block text-gray-300 mb-1'>Username</label>
        <input
          type='text'
          placeholder='Enter username'
          {...register("username", { required: "Username is required" })}
          className="w-full mb-4 px-4 py-2 rounded-lg 
          bg-[#1e293b] border border-white/10
          text-white placeholder-gray-400
          focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        {errors.username && <p className='text-red-400 text-sm'>{errors.username.message}</p>}

        {/* EMAIL */}
        <label className='block text-gray-300 mb-1'>Email</label>
        <input
          type='email'
          placeholder='Enter your email'
          {...register("email", { required: "Email is required" })}
          className="w-full mb-4 px-4 py-2 rounded-lg 
          bg-[#1e293b] border border-white/10
          text-white placeholder-gray-400
          focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        {errors.email && <p className='text-red-400 text-sm'>{errors.email.message}</p>}

        {/* PASSWORD */}
        <label className='block text-gray-300 mb-1'>Password</label>
        <input
          type='password'
          placeholder='Enter password'
          {...register("password", { required: "Password is required" })}
          className="w-full mb-4 px-4 py-2 rounded-lg 
          bg-[#1e293b] border border-white/10
          text-white placeholder-gray-400
          focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        {errors.password && <p className='text-red-400 text-sm'>{errors.password.message}</p>}

        {/* BUTTON */}
        <button
          type='submit'
          className='w-full py-2 rounded-xl font-semibold
          bg-blue-400
          hover:scale-105 hover:opacity-90 transition-all'
        >
          Create Account
        </button>

        <p className='text-center text-gray-400 mt-4 text-sm'>
          Already have an account? 
          <Link to="/login" className='text-blue-400 hover:underline ml-1'>Login</Link>
        </p>

      </form>
    </div>
  )
}

export default Signup
