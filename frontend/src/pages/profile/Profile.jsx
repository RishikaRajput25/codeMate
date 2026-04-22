import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LeaderBoard from './leaderboard/LeaderBoard'
import SolvedProblemStatus from './SolvedProblemStatus'
import HistorySubmission from './HistorySubmission'
import { api } from '../../services/api'
import MyProblems from './MyProblems'
import ProfileCard from './ProfileCard'

const Profile = () => {
  const navigate= useNavigate();
const {user,setUser}=useAuth();
const [submissions, setSubmissions]= useState([]);
const [data, setData] = useState(null);
 

useEffect(() => {
  const fetchSubmissions = async () => {
    const res = await api.get("/problems/submit/mysubmitted");
    setSubmissions(res.data.data.submissions);
    console.log(res.data.data.submissions);
  };

  fetchSubmissions();
}, []);



  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const res = await api("/problems/getAnalytics");
      setData(res.data.data);
      console.log(res.data.data);
    };
    fetchAnalyticsData();
  }, []);


  if (!data) {
  return (
    <div className="text-white mt-20 text-center">
      Loading analytics...
    </div>
  );
}

const personalPercent = data?.totalPersonalProblem
  ? Math.round(
      (data.personalSolved / data.totalPersonalProblem) * 100
    )
  : 0;
  // body= bg-[#1f2124]
  //  divs=bg-[#2a2c2e]
  return (
    <div className=' flex mt-16 bg-[#0f172a] h-full w-full  text-white'>
      
      <div className='w-1/4    '>
{/* bg-[#2a2c2e] */}
{/* hover:bg-[#2f3132] */}


      <div className="h-96 m-3 rounded-2xl 
 backdrop-blur-lg  bg-[#1e293b]  shadow-[#141414]
 text-white 
flex items-center justify-center">

  {/* <div className="flex flex-col items-center gap-4">

  
    <div className="text-7xl text-gray-50">
      <i className="fa-solid fa-circle-user"></i>
    </div>

   
    <div className="flex items-center gap-2">
      <h1 className="text-2xl font-semibold text-gray-200">
        {user?.username}
      </h1>

      <button className="text-gray-400 hover:text-blue-400 transition">
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
    </div>

  
    <p className="text-gray-400 text-sm">
      {user?.email}
    </p>

  </div> */}

  <ProfileCard user={user} setUser={setUser}/>
</div>






       {/* bg-[#2a2c2e] hover:bg-[#2f3132]  */}
      <div  onClick={()=>navigate('/myProblems')} className='h-96 m-3  rounded-2xl bg-[#1e293b]  shadow-xl shadow-[#141414] text-white  items-center flex justify-center'>
       

          <div className=" rounded-2xl p-6   ">

  <h2 className="text-xl font-bold mb-4 text-blue-400">
     My Personal voulet
  </h2>

  <div className="space-y-3">
    
    <div className="flex justify-between">
      <span className="text-gray-400">Total Created</span>
      <span className="font-semibold text-white">{data.totalPersonalProblem }</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Solved</span>
      <span className="font-semibold text-green-400">{data.personalSolved}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Completion</span>
      <span className="font-semibold text-purple-400">{personalPercent} %</span>
    </div>

  </div>

  <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
    <div
      className="bg-blue-500 h-2 rounded-full"
      style={{ width: "0%" }}
    />
  </div>

</div>
      </div>


      </div>
      
      {/* bg-[#36393b] hover:bg-[#36393b]*/}

      {/* Right Section */}
      <div className=' w-3/4 mt-4      text-white'>
  
        <div className=' h-18 w-full flex items-center  justify-between rounded-2xl   shadow-[#141414]'>
          <div className=' flex justify-center w-3/4'>
         <h1 className=' font-bold  text-2xl items-center text-gray-200'>"One problem a day keeps the bugs away."</h1>
         </div>
         {/* bg-[#2c3a51] */}
         <div className=' flex justify-end bg-[#1e2941] rounded-2xl'> 
          {/* bg-amber-600 */}
      <button className='h-14 w-28                 
        hover:rounded-2xl
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#2c3a51] mr-2
          '>
      <Link to="/addProblem">Add Problem</Link>
      </button>
      {/* bg-[#36393b] hover:bg-[#36393b] */}
      <button className='h-14 w-16                 
          hover:rounded-2xl hover:bg-[#2a3649]
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          mr-2 text-2xl
          '>
      <Link to="/profile/bookMarked"> <i class="fa-solid fa-star"></i></Link>
      </button>
   </div>


</div>
{/* middle block below add  problem */}
<div className=' h-96 flex justify-between gap-3'>
<LeaderBoard/>
<SolvedProblemStatus data={data}/>
</div>

<div className='mt-3'>
<HistorySubmission submissions={submissions}/>
</div>

{/* <div className='h-56 bg-amber-600'>
 hii
</div> */}
      </div>


     
    </div>
  )
}
 
export default Profile

