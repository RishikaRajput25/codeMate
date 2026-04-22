import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Bookmarked = () => {
  const [bookmarked, setBookmarked] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Bookmarks
  useEffect(() => {
    const getBookmarked = async () => {
      try {
        const res = await api.get("/bookmarks");
        setBookmarked(res.data.data);
        console.log(res);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookmarked();
  }, []);

  // Delete Bookmark (Optimistic Update)
  const handleDelete = async (problemId) => {
    try {
      await api.delete(`/bookmarks/${problemId}`);

      // UI se remove karo instantly
      setBookmarked((prev) =>
        prev.filter((item) => item._id !== problemId)
      );
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (

//     <div className="min-h-screen px-20 bg-[#1f2124] py-10">
//       <h1 className="font-bold text-2xl text-white mb-6">
//         Bookmarked Problems
//       </h1>

//       {/* Loading */}
//       {loading && (
//         <p className="text-gray-400">Loading...</p>
//       )}

//       {/* Empty State */}
//       {!loading && bookmarked.length === 0 && (
//         <p className="text-gray-400">
//           No bookmarked problems 😶
//         </p>
//       )}

     
//       <div className="flex flex-col gap-4">


// {bookmarked?.map((bookmark) => {
//   const p = bookmark.problem;

//   if (!p) return null;

//   return (
//     <div
//       key={bookmark._id}
//       className="flex items-center justify-between p-4 rounded-2xl bg-[#2a2c2e] shadow-xl hover:bg-[#303235] transition"
//     >
//       {/* Left */}
//       <div className="flex gap-3 w-3/4">
//         <p className="text-white font-medium">
//           {p.title}
//         </p>

//         <div className="flex gap-3 text-sm">
//           <span
//             className={`${
//               p.difficulty === "easy"
//                 ? "text-green-400"
//                 : p.difficulty === "medium"
//                 ? "text-yellow-400"
//                 : "text-red-400"
//             }`}
//           >
//             {p.difficulty}
//           </span>

//           {p.topics?.map((t) => (
//             <span key={t} className="text-gray-400">
//               #{t}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Right */}
//       <div className="flex gap-3">
//         <button
//           onClick={() => navigate(`/problems/${p._id}`)}
//           className="h-10 w-20 rounded bg-[#36393b] text-white hover:scale-105 transition"
//         >
//           Solve
//         </button>

//         {/* <button
//           onClick={() => handleDelete(bookmark._id)}
//           className="h-10 w-20 rounded bg-red-600 text-white hover:scale-105 transition"
//         >
//           Delete
//         </button> */}
//       </div>
//     </div>
//   );
// })}


//       </div>
//     </div>





<div className="min-h-screen px-10 py-10 bg-[#0f172a]">

  <h1 className="text-3xl font-semibold text-white mb-8">
    Bookmarked Problems
  </h1>

  {/* Loading */}
  {loading && (
    <p className="text-gray-400">Loading...</p>
  )}

  {/* Empty */}
  {!loading && bookmarked.length === 0 && (
    <p className="text-gray-400">
      No bookmarked problems 
    </p>
  )}

  {/* List */}
  <div className="flex flex-col gap-4">

    {bookmarked?.map((bookmark) => {
      const p = bookmark.problem;
      if (!p) return null;

      return (
        <div
          key={bookmark._id}
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

            {/* Optional Remove */}
            {/* 
            <button
              onClick={() => handleDelete(bookmark._id)}
              className="px-4 py-2 rounded-xl 
              bg-red-500/20 text-red-400 border border-red-500/30
              hover:bg-red-500/30 transition"
            >
              Remove
            </button> 
            */}

          </div>
        </div>
      );
    })}

  </div>
</div>
    
  );
};

export default Bookmarked;

