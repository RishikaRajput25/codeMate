/*
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { logoutUser,api } from '../services/api'
import { useAuth } from '../context/AuthContext'
 import { useState } from 'react'
const Navbar = () => {
    const {user}= useAuth();
    const navigate= useNavigate();
    const {logout}= useAuth();
    const handleLogout= async()=>{
      await logout();
      navigate("/");
      // toast.success("User Logged Out");
    }

  return (


     <>
    
    <nav className='bg-[#2a2c2e] text-white  fixed w-full top-0 z-50 shadow-lg shadow-[#141414]'>
       <div className=' w-full flex justify-between items-center h-16 px-4  '>
        <div className=' flex items-center gap-6 '>
  

      <h className="h-11 w-24  text-orange-500 bg-[#2a2c2e] 
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          
          hover:shadow-md transition-all duration-300 ease-out font-serif text-2xl pl-1">CodeMate</h>

      <Link to='/explorer'  className="h-9 w-20 bg-[#36393b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#36393b] 
          hover:shadow-md transition-all duration-300 ease-out"     >About</Link>
      <Link to='/' className="h-9 w-20 bg-[#36393b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#36393b] 
          hover:shadow-md transition-all duration-300 ease-out"  > Problem</Link>
      </div>
      <div className='flex  justify-end items-center gap-4 '>
        {
          user ? (
       <>
      
       <button onClick={handleLogout}  className="h-9 w-20 bg-[#36393b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#36393b] 
          hover:shadow-md transition-all duration-300 ease-out" >Logout</button> 
          <Link to="/profile" className='h-9 w-20 bg-[#36393b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#36393b]
          hover:shadow-md transition-all duration-300 ease-out'>Profile<i class="fa-solid fa-circle-user"></i></Link>       
      </>
      ):(
        <>
        
      <Link to="/signup" className="h-9 w-20 bg-[#36393b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#36393b]
          hover:shadow-md transition-all duration-300 ease-out"  >Signup</Link>
      <Link to= "/login" className="h-9 w-20 bg-[#36393b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#36393b] 
          hover:shadow-md transition-all duration-300 ease-out"  >Login</Link>
        </> 



      )}
      
      </div>
       </div>

    </nav>
    </>
     


   

  )
}

export default Navbar
*/


import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // puple=bg-[#791ba5] 
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-[#0f172a]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-blue-400 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate('/')}
        >
          CodeMate
        </motion.h1>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { name: 'About', path: '/' },
            { name: 'Problems', path: '/dashboard' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <Link to={item.path} className="text-gray-300 hover:text-white transition">
                {item.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] transition"
              >
                Logout
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl  bg-blue-400 hover:opacity-90 transition"
                >
                  Profile
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl  bg-blue-400 hover:opacity-90 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




{/* bg-#3C3C3B */}
    
    {/* grey light- bg-[#36393b] */}
    {/* grey dark bg-[#2a2c2e] */}
    {/* dark pink- bg-[#37042c] */}
    {/* ligh pink [#4d093e]  */}


     {/*
     <>
    
    <nav className='bg-[#37042c] text-white shadow-md fixed w-full top-0'>
       <div className='container flex justify-between items-center h-16 mx-4  '>
        <div className='flex items-center gap-6'>
     
      <h className="h-9 w-20 bg-[#48083b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#4d093e] 
          hover:shadow-md transition-all duration-300 ease-out">Navbara</h>
      <Link to='/explorer'  className="h-9 w-20 bg-[#48083b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#4d093e] 
          hover:shadow-md transition-all duration-300 ease-out"     >Explorer</Link>
      <Link to='/' className="h-9 w-20 bg-[#48083b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#4d093e] 
          hover:shadow-md transition-all duration-300 ease-out"  > Problem</Link>
      </div>
      <div className='flex items-center gap-4 '>
        {
          user ? (
       <>
      
       <button onClick={handleLogout}  className="h-9 w-20 bg-[#48083b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#4d093e] 
          hover:shadow-md transition-all duration-300 ease-out" >Logout</button> 
          <Link to="/profile" className='h-9 w-20 bg-[#48083b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#4d093e] 
          hover:shadow-md transition-all duration-300 ease-out'>Profile<i class="fa-solid fa-circle-user"></i></Link>       
      </>
      ):(
        <>
        
      <Link to="/signup" className="h-9 w-20 bg-[#48083b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#4d093e] 
          hover:shadow-md transition-all duration-300 ease-out"  >Signup</Link>
      <Link to= "/login" className="h-9 w-20 bg-[#48083b] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#4d093e] 
          hover:shadow-md transition-all duration-300 ease-out"  >Login</Link>
        </> 



      )}
      
      </div>
       </div>

    </nav>
    </>
     */}
