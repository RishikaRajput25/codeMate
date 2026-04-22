
// import React, { useEffect, useState } from 'react'
// import { api } from '../../services/api'
// import { useNavigate } from 'react-router-dom'

// const DashboardHeader = () => {
//   const [topics, setTopics] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await api.get('/problems/topics')
//         setTopics(res.data.data)
//       } catch (err) {
//         console.log('Topics not fetched', err)
//       }
//     }

//     fetchTopics()
//   }, [])
// // bg-[#1f2124] 
//   return (
//     <div className="flex justify-between p-4 w-full ">
//       {topics.map(t => (
//         <div
//           key={t._id}
//           onClick={() => navigate(`/topics/${t._id}`)}
//           className="px-4 py-10 rounded-2xl  bg-[#2a2c2e] hover:bg-[#36393b] hover:scale-103 shadow-xl shadow-[#141414] text-white cursor-pointer h-36 w-52  items-center flex justify-center"
//         >
//          <h1 className='text-3xl'> {t._id}</h1> <br />
//          <p>({t.count})</p> 
//         </div>
//       ))}
//     </div>
//   )
// }

// export default DashboardHeader


import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const [topics, setTopics] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get("/problems/topics");
        setTopics(res.data.data);
      } catch (err) {
        console.log("Topics not fetched", err);
      }
    };

    fetchTopics();
  }, []);

  // Show only 8 topics when collapsed (2 rows)
  const visibleTopics = expanded ? topics : topics.slice(0, 8);

  return (
    <div className="w-full mb-6">
      
      {/* Topics Grid */}
      <div className="grid grid-cols-4 gap-4 transition-all duration-300">
        {visibleTopics.map((t) => (
          <div
            key={t._id}
            onClick={() => navigate(`/topics/${t._id}`)}
            className="px-4 py-6 rounded-xl bg-[#1e293b] hover:bg-[#1f2d42] hover:scale-105 shadow-lg shadow-[#141414] text-white cursor-pointer flex flex-col items-center justify-center h-24 gap-2 transition"
          >
            <h1 className="text-lg font-semibold">{t._id}</h1>
            <p className="text-sm opacity-70">({t.count})</p>
          </div>
        ))}
      </div>

      {/* View More / Less Button */}
      {topics.length > 8 && (
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm px-4 py-1 rounded-full bg-[#1e293b] hover:bg-[#2c3a51] text-gray-300 hover:text-white transition"
          >
            {expanded ? <>View Less<i class="fa-solid fa-arrow-up"></i>  </>: <>View More <i class="fa-solid fa-arrow-down"></i></>}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;