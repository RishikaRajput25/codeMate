 /*------Old Ui  ------------*/
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../../services/api";
// import toast from "react-hot-toast";
// import { UserCogIcon, UserPlus2} from "lucide-react"
// import {
// BarChart,
// Bar,
// XAxis,
// YAxis,
// Tooltip,
// ResponsiveContainer,
// CartesianGrid,
// Cell
// } from "recharts";

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;

//     return (
//       <div className="bg-[#1f2123] border border-gray-600 p-3 rounded-lg shadow-lg">
//         <p className="text-blue-400 font-semibold">
//           {data.username}
//         </p>
//         <p className="text-green-400">
//           Solved : {data.solved}
//         </p>
//       </div>
//     );
//   }

//   return null;
// };


// const Details = () => {
//   const navigate = useNavigate();
//    const [creatorId, setCreatorId] = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [groupName, setGroupName] = useState("");
// const [groupId, setGroupId]= useState(null); 
//   // ✅ ADDED : modal open/close state
//   const [showModal, setShowModal] = useState(false);
//   // ✅ ADDED : email input state
//   const [email, setEmail] = useState("");
//   // ✅ EDIT GROUP MODAL STATE
// const [showEditModal, setShowEditModal] = useState(false);
// const [newGroupName, setNewGroupName] = useState("");


//   const fetchGroup = async()=>{
//         try{
//         const res= await api.get('groups/my-group')
//         setGroupId(res.data.data._id)
//         //yaha se creator id le rahe
//         setCreatorId(res.data.data.creator._id);
//       console.log("group info :",res.data);
//       }
//         catch(err){
//         console.log("Error : ",err);
//         }
      
//     }
//     useEffect(()=>{
//       fetchGroup();
//     },[])
//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const res = await api.get("/groups/leaderboard");

//         const data = res.data.data.leaderboard || [];
//         console.log(res.data.data.leaderboard)
//         setLeaderboard(data);
//         setGroupName(data[0]?.groupName || "");

//       } catch (err) {
//         console.log("Error :", err);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);
 

//   const handleMemberDelete = async (groupId, userId) => {
//     try {

//       const confirmDelete = window.confirm(
//       "Are you sure you want to delete this member?"
//     );

//     if (!confirmDelete) return;
//       await api.delete(`/groups/${groupId}/remove/${userId}`);

//       // UI update after delete
//       setLeaderboard((prev) =>
//         prev.filter((user) => user._id !== userId)
//       );
//       toast.success("member deleted Successfully")
//     } catch (err) {
//       toast.error("Only creator can remove members")
//       console.log(err);
//     }
//   };

//  const handleLeaveGroup = async () => {
//   try {

//     const confirmLeave = window.confirm(
//       "Are you sure you want to leave this group?"
//     );

//     if (!confirmLeave) return;

//     console.log("User confirmed leave");

//     await api.post(`/groups/leave`);

//   } catch (err) {
//     console.log("Error:", err);
//   }
// };

// // ✅ ADDED : ADD MEMBER FUNCTION
//   const handleAddMember = async () => {

//     try {

//       if (!email) {
//         toast.error("Email is required");
//         return;
//       }

//       await api.post(`/groups/${groupId}/add`, {
//         email: email
//       });

//       toast.success("Member added successfully");

//       setEmail("");

//       setShowModal(false);

      
      
//      // fetchLeaderboardData();

//     } catch (err) {

//       console.log(err);

//       toast.error("Only Creators can add");

//     }

//   };
//  const handleDeleteGroup = async()=>{

//   try{
//  const confirmDelete= window.confirm("you really want to delete this Group ?");
//  if(!confirmDelete) return;

//  await api.delete(`/groups/${groupId}`);
//  toast.success("Group Successfully deleted");
//   } catch(err){
//     toast.error("only creater can delete !");
//     console.log("Error :", err);
//   }
//  }

// // ✅ UPDATE GROUP NAME
// const handleUpdateGroupName = async () => {
//   try {

//     if (!newGroupName) {
//       toast.error("Group name required");
//       return;
//     }

//     await api.patch(`/groups/${groupId}`, {
//       name: newGroupName
//     });

//     toast.success("Group name updated");

//     setGroupName(newGroupName);

//     setShowEditModal(false);

//   } catch (err) {

//     console.log(err);

//     toast.error("Failed to update name");

//   }
// };

// // ✅ graph data
// const sortedLeaderboard = [...leaderboard].sort((a, b) => {

//   // first priority → todaySolved
//   if (b.todaySolved !== a.todaySolved) {
//     return b.todaySolved - a.todaySolved;
//   }

//   // second priority → totalSolved
//   return b.totalSolved - a.totalSolved;
// });

// const graphData = sortedLeaderboard.map((user) => ({
//   username: user.username,
//   solved: user.todaySolved,
//   total: user.totalSolved
// }));
// const colors = [
// "#3b82f6",
// "#22c55e",
// "#f59e0b",
// "#ef4444",
// "#a855f7",
// "#06b6d4",
// "#f43f5e",
// "#84cc16",
// "#eab308",
// "#6366f1"
// ];

//   return (
//     <div className="w-full h-screen text-white flex">

//       {/* LEFT SIDE */}
//       <div className="w-2/3  h-full overflow-y-auto">

//         {leaderboard.length === 0 && (
//           <div className="items-center mt-22 text-center">
//             <h1 className="text-xl font-bold mb-4 text-blue-400">
//               Collaborative Leaderboard
//             </h1>

//             <p className="text-gray-400 mb-4">
//               You are not in any group yet.
//             </p>

//             <button
//               onClick={() => navigate("/profile/createGroup")}
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
//             >
//               Create Group
//             </button>
//           </div>
//         )}

//         {leaderboard.length > 0 && (
//           <div className="text-white p-6">

//             {/* <h1 className="text-xl font-semibold mb-6 text-center text-blue-400">
//               Group : {groupName}
//             </h1> */}
//            <div className="flex justify-between">
//               <div className="w-3/4 flex justify-center gap-0.5 ">
//              <h1 className="text-xl font-semibold mb-6 text-center text-blue-400">
//               Group : {groupName}
//             </h1> 
//             {/* <h1 className=" text-gray-400 text-center hover:text-blue-400"> edit <i class="fa-regular fa-pen-to-square"></i></h1> */}
//            <h1
//   onClick={() => {
//     setShowEditModal(true);   // ✅ modal open
//     setNewGroupName(groupName); // ✅ current name input me show
//   }}
//   className="text-gray-400 cursor-pointer text-center hover:text-blue-400"
// >
//  <i className="fa-regular fa-pen-to-square"></i>
// </h1>

//             </div>
//             <div className=" w-1/4 flex justify-end gap-1">
// {/* bg-[#2a2c2e] */}
//              <button
//                   onClick={() => setShowModal(true)}
//                   className="h-10 w-10 text-green-400 font-bold  flex items-center justify-center rounded bg-[#2a2c2e] hover:bg-[#303235] text-2xl"
//                 >
//                    <UserPlus2/>
//                 </button>

//          <button  onClick={()=> handleLeaveGroup()} className="h-10 w-32 bg-[#2a2c2e] text-gray-300 shadow-2xl shadow-[#181818] hover:bg-[#303235] rounded">
//           leave group <i className="fa-solid fa-right-long"></i>
//          </button>
//          </div>
//          </div>

           
//             {/* HEADER */}

//             <div className="grid grid-cols-5 text-gray-400 text-sm pb-3 border-b border-gray-700 m-4">
//               <span>Rank</span>
//               <span>Username</span>
//               <span className="text-center">Today</span>
//               <span className="text-center">Total</span>
//               <span className="text-right">Action</span>
//             </div>

//             {/* DATA */}

//             <div className="mt-4 space-y-2 max-h-[70vh] overflow-y-auto pr-2">

//               {leaderboard.map((user) => (
//                 <div
//                   key={user.rank}
//                   className="grid grid-cols-5 items-center p-4 rounded-xl  bg-[#2a2c2e] hover:bg-[#303235]  transition shadow-lg"
//                 >

//                   {/* Rank */}
//                   <span className="font-semibold text-orange-500">
//                     {user.rank}
//                   </span>

//                   {/* Username */}
//                   {/* <span className="font-medium">
//                     {user.username}
//                   </span> */}

//                   <span className="font-medium flex items-center gap-2">

//   {user.username}

//   {user.userId === creatorId && (
//     //  <i className="fa-solid fa-crown text-yellow-400"></i>
//     <UserCogIcon/>
//   )}

// </span>

//                   {/* Today */}
//                   <span className="text-center text-green-400 font-semibold">
//                     {user.todaySolved}
//                   </span>

//                   {/* Total */}
//                   <span className="text-center font-semibold text-blue-400">
//                     {user.totalSolved}
//                   </span>

//                   {/* Delete Button */}
//                   <div className="flex justify-end">
//                     <button
//                       onClick={() => handleMemberDelete(groupId,user.userId)}
//                       className="text-red-500 hover:text-gray-300  px-3 py-1 rounded-lg text-sm "
//                     >
//                       Delete
//                     </button>
//                   </div>

//                 </div>
//               ))}

//             </div>

//           </div>
//         )}

//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-1/3 h-full border-l border-gray-700 p-4">

//       {/* ✅ GROUP PERFORMANCE GRAPH */}

// <div className="bg-[#1f2123] p-4 rounded-xl shadow-lg">

//   <h2 className="text-blue-400 mb-4 font-semibold">
//     Group Performance
//   </h2>
// <ResponsiveContainer width="100%" height={320}>

//   <BarChart
//     data={graphData}
//     margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
//   >

//     <CartesianGrid strokeDasharray="3 3" stroke="#444" />

//     <XAxis
//       dataKey="username"
//       stroke="#aaa"
//     />

//     <YAxis stroke="#aaa" />

//     <Tooltip content={<CustomTooltip />} />

//     <Bar
//       dataKey="solved"
//       radius={[10, 10, 0, 0]}
//       isAnimationActive={true}
//       animationDuration={1200}
//     >
//       {graphData.map((entry, index) => (
//         <Cell
//           key={index}
//           fill={colors[index % colors.length]}
//         />
//       ))}
//     </Bar>

//   </BarChart>

// </ResponsiveContainer>

// </div>


//        <button onClick={()=>handleDeleteGroup()} className="h-10 w-32 bg-[#2a2c2e] text-gray-300 shadow-2xl shadow-[#181818] hover:bg-[#303235]   end-0 bottom-0 mt-2 rounded">Delete Group</button>
//       </div>



//  {/* ✅ ADDED : MODAL WITH BLUR BACKGROUND */}

//       {showModal && (

//         <div
//           onClick={() => setShowModal(false)} // outside click close
//           className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
//         >

//           <div
//             onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
//             className="bg-[#1f2123] p-6 rounded-xl w-96 shadow-xl border border-gray-700"
//           >

//             <h2 className="text-lg font-semibold text-blue-400 mb-4">
//               Add Member
//             </h2>

//             <input
//               type="email"
//               placeholder="Enter user email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 rounded-lg bg-[#2a2c2e] text-white mb-4 focus:outline focus:outline-blue-500"
//             />

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-600 rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleAddMember}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
//               >
//                 Add
//               </button>

//             </div>

//           </div>

//         </div>

//       )}


//     {/* ✅ EDIT GROUP NAME MODAL */}

// {showEditModal && (

//   <div
//     onClick={() => setShowEditModal(false)}
//     className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
//   >

//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="bg-[#1f2123] p-6 rounded-xl w-96 shadow-xl border border-gray-700"
//     >

//       <h2 className="text-lg font-semibold text-blue-400 mb-4">
//         Edit Group Name
//       </h2>

//       <input
//         type="text"
//         value={newGroupName}
//         onChange={(e) => setNewGroupName(e.target.value)}
//         className="w-full p-2 rounded-lg bg-[#2a2c2e] text-white border border-gray-700 outline-none mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//       />

//       <div className="flex justify-end gap-2">

//         <button
//           onClick={() => setShowEditModal(false)}
//           className="px-4 py-2 bg-gray-600 rounded-lg"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={handleUpdateGroupName}
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
//         >
//           Save
//         </button>

//       </div>

//     </div>

//   </div>

// )}


//     </div>
//   );
// };

// export default Details;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import toast from "react-hot-toast";
import { UserCogIcon, UserPlus2 } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-[#1e293b] border border-white/10 p-3 rounded-lg shadow-lg">
        <p className="text-blue-400 font-semibold">{data.username}</p>
        <p className="text-green-400">Solved : {data.solved}</p>
      </div>
    );
  }
  return null;
};

const Details = () => {
  const navigate = useNavigate();

  const [creatorId, setCreatorId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  // FETCH GROUP
  const fetchGroup = async () => {
    try {
      const res = await api.get("groups/my-group");
      setGroupId(res.data.data._id);
      setCreatorId(res.data.data.creator._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  // FETCH LEADERBOARD
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const res = await api.get("/groups/leaderboard");
        const data = res.data.data.leaderboard || [];
        setLeaderboard(data);
        setGroupName(data[0]?.groupName || "");
      } catch (err) {
        console.log(err);
      }
    };
    fetchLeaderboardData();
  }, []);

  // DELETE MEMBER
  const handleMemberDelete = async (groupId, userId) => {
    const confirmDelete = window.confirm("Delete this member?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/groups/${groupId}/remove/${userId}`);
      setLeaderboard((prev) => prev.filter((u) => u._id !== userId));
      toast.success("Member removed");
    } catch {
      toast.error("Only creator can remove");
    }
  };

  // LEAVE GROUP
  const handleLeaveGroup = async () => {
    const confirmLeave = window.confirm("Leave this group?");
    if (!confirmLeave) return;

    try {
      await api.post(`/groups/leave`);
      toast.success("Left group");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // ADD MEMBER
  const handleAddMember = async () => {
    if (!email) return toast.error("Email required");

    try {
      await api.post(`/groups/${groupId}/add`, { email });
      toast.success("Member added");
      setEmail("");
      setShowModal(false);
    } catch {
      toast.error("Only creator can add");
    }
  };

  // DELETE GROUP
  const handleDeleteGroup = async () => {
    const confirmDelete = window.confirm("Delete group?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/groups/${groupId}`);
      toast.success("Group deleted");
      navigate("/");
    } catch {
      toast.error("Only creator can delete");
    }
  };

  // UPDATE NAME
  const handleUpdateGroupName = async () => {
    if (!newGroupName) return toast.error("Name required");

    try {
      await api.patch(`/groups/${groupId}`, {
        name: newGroupName
      });
      setGroupName(newGroupName);
      setShowEditModal(false);
      toast.success("Updated");
    } catch {
      toast.error("Failed");
    }
  };

  // GRAPH DATA
  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (b.todaySolved !== a.todaySolved)
      return b.todaySolved - a.todaySolved;
    return b.totalSolved - a.totalSolved;
  });

  const graphData = sortedLeaderboard.map((u) => ({
    username: u.username,
    solved: u.todaySolved
  }));

  const colors = [
    "#3b82f6", "#22c55e", "#f59e0b",
    "#ef4444", "#a855f7", "#06b6d4"
  ];

  return (
    <div className="w-full h-screen flex bg-[#0f172a] text-white">

      {/* LEFT */}
      <div className="w-2/3 p-6 overflow-y-auto">

        {leaderboard.length === 0 ? (
          <div className="text-center mt-20">
            <h1 className="text-xl text-blue-400 mb-3">
              No Group Found
            </h1>
            <button
              onClick={() => navigate("/profile/createGroup")}
              className="px-4 py-2 bg-blue-500 rounded-lg"
            >
              Create Group
            </button>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

              <div className="flex items-center gap-2">
                <h1 className="text-xl text-blue-400 font-semibold">
                  Group : {groupName}
                </h1>

                <button
                  onClick={() => {
                    setShowEditModal(true);
                    setNewGroupName(groupName);
                  }}
                  className="text-gray-400 hover:text-blue-400"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="h-10 w-10 flex items-center justify-center rounded-lg 
                  bg-[#1e293b] border border-white/10 text-green-400"
                >
                  <UserPlus2 />
                </button>

                <button
                  onClick={handleLeaveGroup}
                  className="px-4 py-2 rounded-lg bg-[#1e293b] border border-white/10"
                >
                  Leave
                </button>
              </div>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-5 text-gray-400 text-sm border-b border-white/10 pb-2">
              <span>Rank</span>
              <span>User</span>
              <span className="text-center">Today</span>
              <span className="text-center">Total</span>
              <span className="text-right">Action</span>
            </div>

            {/* USERS */}
            <div className="mt-4 space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className="grid grid-cols-5 items-center p-4 rounded-xl 
                  bg-white/5 backdrop-blur border border-white/10"
                >
                  <span className="text-orange-400 font-semibold">
                    #{user.rank}
                  </span>

                  <span className="flex items-center gap-2">
                    {user.username}
                    {user.userId === creatorId && (
                      <UserCogIcon size={18} className="text-yellow-400" />
                    )}
                  </span>

                  <span className="text-center text-green-400">
                    {user.todaySolved}
                  </span>

                  <span className="text-center text-blue-400">
                    {user.totalSolved}
                  </span>

                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        handleMemberDelete(groupId, user.userId)
                      }
                      className="text-red-400 px-3 py-1 rounded bg-red-500/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className="w-1/3 p-4 border-l border-white/10">

        <div className="bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
          <h2 className="text-blue-400 mb-3">Performance</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="username" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="solved">
                {graphData.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button
          onClick={handleDeleteGroup}
          className="mt-4 w-full py-2 bg-red-500/10 text-red-400 rounded-lg"
        >
          Delete Group
        </button>
      </div>

      {/* ADD MEMBER MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur">

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-96">
            <h2 className="text-blue-400 mb-3">Add Member</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 rounded bg-[#1e293b] mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur">

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-96">
            <h2 className="text-blue-400 mb-3">Edit Name</h2>

            <input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-2 rounded bg-[#1e293b] mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button
                onClick={handleUpdateGroupName}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Details;