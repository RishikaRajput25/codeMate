import React from 'react'
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const MyProblems = () => {

  const navigate= useNavigate();

const[loading , setLoading]= useState(false);
  const [Problems, setProblems] = useState([]);

    useEffect(()=>{    
    const fetchProblems= async()=>{
      try{
      setLoading(true);
      const  res= await api(`/problems/my`);
      setProblems(res.data.data);}
      catch(error){
        console.log("Error fetching problems", error);
      }
      finally{
        setLoading(false);
      }
    };
   fetchProblems();
},[])


const handleDelete = async(id)=>{
  try{
  await  api.delete(`problems/personal/${id}`);
  
  setProblems((prev) => prev.filter((p) => p._id !== id));
  toast.success("Problem Succesfully deleted");
   
}
  catch(err){
    console.log("Problem deletion :",err);
  }
}

  return (


  //   <div className='h-screen px-20 bg-[#1f2124] pt-4'>
  //   <h1 className='font-bold text-2xl text-white'>My Problems</h1>



  // {/* Loading */}
  //     {loading && (
  //       <p className="text-gray-400 mt-4">Loading...</p>
  //     )}

  //     {/* Empty state */}
  //     {!loading && Problems?.length === 0 && (
  //       <p className="text-gray-400 mt-4">
  //         No problems found 😶
  //       </p>
  //     )}

  //     {/* Problems list */}
  //     <div className="flex flex-col gap-3 mt-3">
  //       {Problems?.map((p) => (
  //         <div
  //           key={p._id}
  //           className="flex items-center justify-between p-4 rounded-2xl bg-[#2a2c2e] shadow-xl shadow-[#141414] hover:bg-[#303235] transition"
  //         >
  //           {/* Left */}
  //           <div className="flex  gap-3 w-3/4">
  //             <p className="text-white font-medium">
  //               {p.title}
  //             </p>

  //             <div className="flex gap-3 text-sm">
  //               {/* Difficulty */}
  //               <span
  //                 className={`px-2 py-0.5 rounded ${
  //                   p.difficulty === "easy"
  //                     ? "text-green-400"
  //                     : p.difficulty === "medium"
  //                     ? "text-yellow-400"
  //                     : "text-red-400"
  //                 }`}
  //               >
  //                 {p.difficulty}
  //               </span>

  //               {/* Topics */}
  //               {p.topics?.slice(0, 3).map((t) => (
  //                 <span
  //                   key={t}
  //                   className="text-gray-400"
  //                 >
  //                   #{t}
  //                 </span>
  //               ))}
  //             </div>
  //           </div>

  //           {/* Right */}
  //           <button
  //             onClick={() => navigate(`/problems/${p._id}`)}
  //             className="h-10 w-20 rounded bg-[#36393b] text-white hover:scale-105 transition shadow-lg"
  //           >
  //             Solve
  //           </button>
  //           <button
             
  //             onClick={() =>handleDelete(p._id)}
  //             className="h-10 w-20 rounded bg-[#36393b] text-white hover:scale-105 transition shadow-md shadow-red-600"
  //           >
  //             delete
  //           </button>
  //         </div>
  //       ))}
  //     </div>



  //   </div>


  <div className='min-h-screen px-10 py-10 bg-[#0f172a]'>

  <h1 className='text-3xl font-semibold text-white mb-8'>
    My Problems
  </h1>

  {/* Loading */}
  {loading && (
    <p className="text-gray-400">Loading...</p>
  )}

  {/* Empty */}
  {!loading && Problems?.length === 0 && (
    <p className="text-gray-400">
      No problems found 
    </p>
  )}

  {/* List */}
  <div className="flex flex-col gap-4 mt-4">
    {Problems?.map((p) => (
      <div
        key={p._id}
        className="flex items-center justify-between p-4 rounded-2xl 
        bg-[#1e293b] hover:bg-[#1f2d42] transition shadow-lg"
      >

        {/* LEFT */}
        <div className="flex gap-3 w-3/4">
          <p className="text-white font-medium">
            {p.title}
          </p>

          <div className="flex gap-3 text-sm">
            <span
              className={`px-2 py-0.5 rounded ${
                p.difficulty === "easy"
                  ? "text-green-400"
                  : p.difficulty === "medium"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {p.difficulty}
            </span>

            {p.topics?.slice(0, 3).map((t) => (
              <span key={t} className="text-gray-400">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-3">

          
           <button
              onClick={() => navigate(`/problems/${p._id}`)}
              className=" h-10 w-20 rounded bg-[#2c3a51] text-white hover:scale-105 transition shadow-lg"
            >
              Solve
            </button>

          <button
            onClick={() => handleDelete(p._id)}
            className="px-4 py-2 h-10 w-20 rounded bg-[#2c3a51] text-red-600 hover:scale-105 transition shadow-lg hover:shadow-red-800
             "
          >
            Delete
          </button>

        </div>

      </div>
    ))}
  </div>

</div>
  )
}

export default MyProblems

