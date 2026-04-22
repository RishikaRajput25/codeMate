// import React, { useEffect, useState } from 'react'
// import { api } from '../../services/api';
// import { useNavigate } from 'react-router-dom';
// const DashboardBody = () => {
//   const navigate = useNavigate();

//   const[search, setSearch]= useState("");
//   const[loading , setLoading]= useState(false);
//   const [Problems, setProblems] = useState([]);

//   useEffect(()=>{
    
//     const fetchProblems= async(req, res)=>{
//       const  prob= await api("/problems");
//       setProblems(prob.data.data);
//     }
//     fetchProblems();
//   },[])
//   return (
//     <div>
//       <h1  className=' text-white font-medium text-xl'>All Problems</h1>
      
//       <input placeholder='search Problem here' className=' border-2 mt-3'></input>
//        {
//     Problems.map(p=>(<div key={p._id}   className=" flex p-3 rounded-2xl  bg-[#2a2c2e]  shadow-xl shadow-[#141414] cursor-pointer my-2">
//         {/* <h1>{p._id}</h1> */}
//         <div className='flex gap-8 w-3/3'>
//         <p>{p.title}</p>
        
//         <p>{p.difficulty}</p>
//         </div>

//         <button className='h-10 w-20 rounded bg-[#36393b] hover:scale-101 shadow-xl hover:shadow-[#141414]' onClick={()=>navigate(`/problems/${p._id}`)}> solve</button>
//     </div>))
//    }
//     </div>
//   )
// }

// export default DashboardBody



import React, { useEffect, useState } from 'react'
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
const DashboardBody = () => {
  const navigate = useNavigate();

  const[search, setSearch]= useState("");
  const[loading , setLoading]= useState(false);
  const [Problems, setProblems] = useState([]);
    
    const fetchProblems= async()=>{
      try{
      setLoading(true);
      const  res= await api(`/problems/search?q=${search}`);
      setProblems(res.data.data);}
      catch(error){
        console.log("Error fetching problems", error);
      }
      finally{
        setLoading(false);
      }
    };
   
    useEffect(()=>{
      const timeout = setTimeout(()=>{
        fetchProblems();
      },500);

      return () => clearTimeout(timeout);
    },[search]);
 
  return (
     <div className="p-5">
      {/* Header */}
      <h1 className="text-white font-medium text-xl mb-3">
        All Problems
      </h1>

      {/* Search */}
      
      <input
       
        placeholder=" Search by title, topic ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded bg-[#101727] border border-[#3a3a3a] text-white outline-none focus:border-[#6b6b6b]"
      />

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 mt-4">Loading...</p>
      )}

      {/* Empty state */}
      {!loading && Problems.length === 0 && (
        <p className="text-gray-400 mt-4">
          No problems found 
        </p>
      )}

      {/* Problems list */}
      <div className="flex flex-col gap-3">
        {Problems.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#1e293b] shadow-xl shadow-[#141414] hover:bg-[#1f2d42] transition"
          >
            {/* Left */}
            <div className="flex  gap-3">
              <p className="text-white font-medium">
                {p.title}
              </p>

              <div className="flex gap-3 text-sm">
                {/* Difficulty */}
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

                {/* Topics */}
                {p.topics?.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-gray-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <button
              onClick={() => navigate(`/problems/${p._id}`)}
              className="h-10 w-20 rounded bg-[#2c3a51] text-white hover:scale-105 transition shadow-lg"
            >
              Solve
            </button>
             
          </div>
        ))}
      </div>


      
    </div>
  )
}

export default DashboardBody
