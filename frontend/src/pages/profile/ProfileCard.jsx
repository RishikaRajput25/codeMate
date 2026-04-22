import React, { useState } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const ProfileCard = ({ user, setUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  // 🔥 OPEN MODAL + PREFILL
  const handleOpenModal = () => {
    setUsername(user?.username);
    setShowModal(true);
  };

  // 🔥 UPDATE USERNAME
  const handleUpdate = async () => {
    if (!username.trim()) {
      return toast.error("Username required");
    }

    if (username === user.username) {
      return toast.error("No changes made");
    }

    try {
      setLoading(true);

      const res = await api.post("/users/update-username", {
        username,
      });

      toast.success("Username updated");

      // ✅ instant UI update
      setUser(res.data.data);

      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* PROFILE CARD */}
      <div className="h-96 m-3 rounded-2xl 
      backdrop-blur-lg bg-[#1e293b] shadow-[#141414]
      text-white flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          {/* Avatar */}
          <div className="text-7xl text-gray-50">
            <i className="fa-solid fa-circle-user"></i>
          </div>

          {/* Username + Edit */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-200">
              {user?.username}
            </h1>

            <button
              onClick={handleOpenModal}
              className="text-gray-400 hover:text-blue-400 transition"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>

          {/* Email */}
          <p className="text-gray-400 text-sm">
            {user?.email}
          </p>

        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 flex items-center justify-center 
          bg-black/40 backdrop-blur-sm z-50"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="w-96 p-6 rounded-2xl 
            bg-[#1e293b] border border-white/10
            shadow-xl"
          >

            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Edit Username
            </h2>

            {/* INPUT */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg 
              bg-[#0f172a] border border-white/10
              text-white placeholder-gray-400
              focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-400 text-black text-sm hover:opacity-90"
              >
                {loading ? "Updating..." : "Update"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
