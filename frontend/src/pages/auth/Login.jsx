/*
import React from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate= useNavigate();
    const {register, handleSubmit,formState:{errors}}=useForm();
    const onSubmit= async(data)=>{
        try{
        await api.post('/users/login',data)
       
        navigate('/');
         window.location.reload();
        toast.success("User Logged in Successfully")
        console.log("Form submitted:", data);}
        catch(err){
            toast.error("login failed");
            console.log("Error : ", err)
        }
    }

    
  return (
    <>
    

     <div className='flex justify-center items-center  min-h-screen bg-gray-50 '>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md  p-8 rounded-xl bg-white shadow-lg shadow-[#0a0c0e] border border-gray-200 hover:shadow-xl hover:scale-101' >
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Login</h2>
        
           <label htmlFor='email' className='block text-gray-700 font-medium mb-1'> Enter Email</label>
           <input
           type='email'
           placeholder='Email'
           {...register("email",{required:"Email is reuired"})}
           className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
           focus:ring-gray-500
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
         <button type='submit' className=' w-full bg-[#36393b] text-white py-2 rounded-lg hover:bg-[#2a2c2e] transition mb-2'>Login</button>
        </form>

    </div>
    </>
  )
}

export default Login
*/
import React from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/users/login', data)
      navigate('/');
      window.location.reload();
      toast.success("User Logged in Successfully")
    } catch (err) {
      toast.error("login failed");
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#0f172a]'>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md p-8 rounded-2xl 
        bg-white/5 backdrop-blur-lg border border-white/10
        shadow-2xl hover:shadow-blue-500/10 transition-all duration-300'
      >

        <h2 className="text-3xl font-bold text-center mb-5 pb-1
        bg-blue-400 bg-clip-text text-transparent">
          Login
        </h2>

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
          placeholder='Enter your password'
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
          Login
        </button>
        <p className='text-center text-gray-400 mt-4 text-sm'>
          Dont't have an account? 
          <Link to="/signup" className='text-blue-400 hover:underline ml-1'>Singup</Link>
        </p>
      </form>
    </div>
  )
}

export default Login;