import React from 'react'
import { useNavigate } from 'react-router-dom'
const HistorySubmission = ({submissions}) => {
  const navigate= useNavigate();
  return (
    <div className="flex flex-col gap-3">
        {submissions.map((sub) => (
          // bg-[#2a2c2e] hover:bg-[#303235]
          <div
            key={sub._id}
            className="flex items-center justify-between p-4 rounded-2xl  shadow-xl bg-[#1e293b] shadow-[#141414]  transition  hover:bg-[#1f2d42]"
          >
            {/* Left */}
            <div className="flex  gap-3">
              <p className="text-white font-medium">
                 {sub.problem?.title}
              </p>

              <div className="flex gap-3 text-sm">
                {/* Difficulty */}
                <span
                  className={`px-2 py-0.5 rounded ${
                    sub.problem?.difficulty === "easy"
                      ? "text-green-400"
                      : sub.problem?.difficulty === "medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {sub.problem?.difficulty}
                </span>

                {/* Topics */}
                {sub.problem?.topics?.slice(0, 3).map((t) => (
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
            <p className="text-sm text-gray-400">
        Last Updated: {new Date(sub.updatedAt).toLocaleString()}
      </p>
            <button
              onClick={() => navigate(`/problems/${sub.problem?._id}`)}
              className="h-10 w-20 rounded bg-[#2c3a51] text-white hover:scale-105 transition shadow-lg"
            >
              Solve
            </button>
          </div>
        ))}
      </div>

  )
}

export default HistorySubmission
