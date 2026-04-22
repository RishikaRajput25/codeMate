/*
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
const TopicwiseProblem = () => {
    const navigate= useNavigate();
    const  {topicId} = useParams();
    const[problems, setProblems]= useState([]);
    useEffect(()=>{
    const fetchProblems= async()=>{
     const res= await api(`/problems/topic/${topicId}`);
     setProblems(res.data.data);
    }
    fetchProblems();
    },[topicId])
  return (
    <div className='min-h-screen w-full bg-[#1f2124]  text-white px-10'>
  
    <h1 className=' flex justify-center text-4xl font-medium'>{topicId} </h1>


{problems.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#2a2c2e] shadow-xl shadow-[#141414] hover:bg-[#303235] transition mt-2"
          >
           
            <div className="flex  gap-3">
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
                  <span
                    key={t}
                    className="text-gray-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

      
            <button
              onClick={() => navigate(`/problems/${p._id}`)}
              className="h-10 w-20 rounded bg-[#36393b] text-white hover:scale-105 transition shadow-lg"
            >
              Solve
            </button>
             
          </div>
        ))}



    </div>
  )
}

export default TopicwiseProblem
*/

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api';

const TopicwiseProblem = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await api(`/problems/topic/${topicId}`);
      setProblems(res.data.data);
    };
    fetchProblems();
  }, [topicId]);

  return (
    <div className='min-h-screen w-full bg-[#0f172a] text-white px-10 py-10'>

      <h1 className='text-center text-4xl font-semibold mb-10'>
        {topicId}
      </h1>

      <div className="flex flex-col gap-4">
        {problems.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between p-4 rounded-2xl 
            bg-[#1e293b] backdrop-blur-md  
           hover:bg-[#1f2d42] transition shadow-lg"
          >
            {/* LEFT */}
            <div className="flex gap-3">
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
            <button
              onClick={() => navigate(`/problems/${p._id}`)}
              className=" h-10 w-20 rounded bg-[#2c3a51] text-white hover:scale-105 transition shadow-lg"
            >
              Solve
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default TopicwiseProblem;
