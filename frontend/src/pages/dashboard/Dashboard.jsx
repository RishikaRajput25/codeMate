import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import DashboardHeader from './DashboardHeader.jsx';
import DashboardBody from './DashboardBody.jsx';
const Dashboard = () => {
  const {user}= useAuth();
  return (
  //  brownBody-bg-[#1f2124]
    <div className=' flex justify-between  bg-[#0f172a] px-10 text-white w-full h-auto pt-4 '> 
  
<div className=' w-full'>
   <DashboardHeader/>
   <DashboardBody/>
   </div>
    </div>
  )
}
export default Dashboard


