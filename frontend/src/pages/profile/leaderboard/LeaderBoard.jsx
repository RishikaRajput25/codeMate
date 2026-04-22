
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";


const LeaderBoard = () => {
  const navigate= useNavigate();
  const [leaderboard, setLeaderboard] = useState(null);
   const [groupName, setGroupName] = useState("");
   const [groupId, setGroupId]= useState(null);


   const [showCreateModal, setShowCreateModal] = useState(false);
const [newGroupName, setNewGroupName] = useState("");


  const fetchGroup = async()=>{
        try{
        const res= await api.get('groups/my-group')
        setGroupId(res.data.data._id)
      // console.log("group info :",res.data.data._id);
      }
        catch(err){
        console.log("Error : ",err);
        }
      
    }
    useEffect(()=>{
      fetchGroup();
    },[])
  useEffect(()=>{
  
    const fetchLeaderboardData= async()=>{
  try{
 const res=  await api.get("/groups/leaderboard");
 setLeaderboard(res.data.data.leaderboard || []);
 //console.log(res.data.data.leaderboard[0].groupName);
 setGroupName(res.data.data.leaderboard[0].groupName || " ")
 console.log("  group data :", leaderboard);
    } catch(err){
   console.log("Error :", err);
  }
  }
 fetchLeaderboardData();
  },[])


//Modal function
  const handleCreateGroup = async () => {
  try {
    await api.post("/groups/create", {
      name: newGroupName,
    });

    setShowCreateModal(false);
    fetchGroup(); // refresh group
  } catch (err) {
    console.log("Create group error", err);
  }
};
  return ( 
    <>
    {/* bg-[#262829]  */}
    <div className="w-1/2 rounded-2xl  shadow-xl bg-[#1e293b] shadow-[#141414] text-white p-6 transition-all duration-300 text-center   ">
    

      {/* ❌ No Group Case */}
      {!leaderboard && (

        <>
          <div className="items-center pt-22 h-19/20">
            <h1 className="text-xl font-bold  mb-4  text-blue-400 ">
             Collaborative Leaderboard
      </h1>

          <p className="text-gray-400 mb-4">
            You are not in any group yet.
          </p>
          <button
             
             onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Create Group
          </button>
         </div>
      
        </>
      )}
       {/* ✅ Group Exists Case */}
      {leaderboard && (
<>

<div className=" text-white p-6 h-19/20">

      <h1 className="text-xl font-semibold mb-6 text-center  text-blue-400">
      {groupName}
      </h1>

      {/* HEADER */}

      <div className="grid grid-cols-4 text-gray-400 text-sm pb-3 border-b shadow-xl shadow-[#1b1a1a] border-gray-700">

        <span>Rank</span>
        <span>Username</span>
        <span className="text-center">Today</span>
        <span className="text-right">Total</span>

      </div>

      {/* DATA */}

      <div className="mt-3 space-y-2">

        {leaderboard.slice(0,3).map((user) => (
//  bg-[#303235] hover:bg-[#48494b]
           <div
            key={user.rank}
            className={`grid grid-cols-4 items-center p-4 rounded-2xl  shadow-xl shadow-[#1b1a1a] bg-[#222e41] hover:bg-[#2a3952] transition gap-1 
            `}
          >

            {/* Rank */}

            <span className="font-semibold text-orange-600">
              {user.rank}
            </span>

            {/* Username */}

            <span className="font-medium">
              {user.username}
            </span>

            {/* Today */}

            <span className="text-center text-green-400 font-semibold">
              {user.todaySolved}
            </span>

            {/* Total */}

            <span className="text-right font-semibold text-blue-400">
              {user.totalSolved}
            </span>
            
          
          </div>

        ))}

      </div>

    </div>

</>

      )}
       <div className="flex justify-end bottom-0">
  <Link
     to="/group/details"
   
    className="flex items-center gap-2 text-white hover:text-blue-500"
  >
    Details <i className="fa-solid fa-right-long"></i>
    
  </Link>
</div>
{/* modal */}
{showCreateModal && (

  <div
    onClick={() => setShowCreateModal(false)}
    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
  >

    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-[#1f2123] p-6 rounded-xl w-96 shadow-xl border border-gray-700"
    >

      <h2 className="text-lg font-semibold text-blue-400 mb-4">
        Create Group
      </h2>

      <input
        type="text"
        placeholder="Enter group name"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        className="w-full p-2 rounded-lg bg-[#2a2c2e] text-white border border-gray-700 outline-none mb-4 focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setShowCreateModal(false)}
          className="px-4 py-2 bg-gray-600 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateGroup}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Create
        </button>

      </div>

    </div>

  </div>
)}

    </div>
 
    
    </>
  );
};

export default LeaderBoard;
