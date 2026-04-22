
/*
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

const SolvedProblemStatus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const res = await api("/problems/getAnalytics");
      setData(res.data.data);
    };
    fetchAnalyticsData();
  }, []);

  if (!data) return null;

  const topicData = data.ds.topics.map((t) => ({
    name: t.topic,
    value: t.total,
    solved: t.solved,
    total: t.total,
    percent: Math.round((t.solved / t.total) * 100),
  }));

  const summary = data.ds.summary;
  const percentage = summary.total
    ? Math.round((summary.solved / summary.total) * 100)
    : 0;

  return (
    <div className="w-1/2 rounded-2xl bg-[#2a2c2e] hover:bg-[#2f3132] shadow-xl shadow-[#141414] text-white flex p-6">

      <div className="w-3/4 flex items-center justify-center relative">

        <div className="w-full h-[320px]">

          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={topicData}
                dataKey="value"
                nameKey="name"
                innerRadius={85}
                outerRadius={115}
                paddingAngle={4}
              >
                {topicData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-700">
                        <p className="capitalize font-semibold text-gray-700">
                          {d.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {d.solved} / {d.total} solved
                        </p>
                        <p className="text-green-400 text-sm font-medium">
                          {d.percent}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

       
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-3xl font-bold">
              {summary.solved} / {summary.total}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {percentage}% Solved
            </p>
          </div>

        </div>
      </div>

     
      <div className="w-1/4 flex flex-col justify-center gap-4 pl-4">

        <div className="bg-[#1f2124] p-3 rounded-lg">
          <p className="text-green-400 font-semibold">Easy</p>
          <p className="text-sm text-gray-400">
            {data.difficultyStats.easy.solved} / {data.difficultyStats.easy.total}
          </p>
        </div>

        <div className="bg-[#1f2124] p-3 rounded-lg">
          <p className="text-yellow-400 font-semibold">Medium</p>
          <p className="text-sm text-gray-400">
            {data.difficultyStats.medium.solved} / {data.difficultyStats.medium.total}
          </p>
        </div>

        <div className="bg-[#1f2124] p-3 rounded-lg">
          <p className="text-red-400 font-semibold">Hard</p>
          <p className="text-sm text-gray-400">
            {data.difficultyStats.hard.solved} / {data.difficultyStats.hard.total}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SolvedProblemStatus;
*/


import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const SolvedProblemStatus = ({data}) => {
  
   const [activeIndex, setActiveIndex] = useState(null);


  if (!data) return null;

  // Transform topic data for chart
  const topicData = data.ds.topics.map((t) => ({
    name: t.topic,
    value: t.total,
    solved: t.solved,
    total: t.total,
    percent: t.total
      ? Math.round((t.solved / t.total) * 100)
      : 0,
  }));

  // Global percentage
  const globalPercent = data.totalPublicProblem
    ? Math.round(
        (data.totalSolvedProblem / data.totalPublicProblem) * 100
      )
    : 0;

  return (
    // bg-[#2a2c2e] hover:bg-[#2f3132]
    <div className="w-1/2 rounded-2xl  shadow-xl bg-[#1e293b] shadow-[#141414] text-white flex p-6">
{/* <h2 className="text-xl font-bold tracking-wide text-white">
  Personal Performance
</h2> */}
      {/* LEFT SIDE - DONUT */}
      <div className="w-3/4 flex items-center justify-center relative">
        
        <div className="w-full h-[320px]">

          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={topicData}
                dataKey="value"
                nameKey="name"
                innerRadius={90}
                outerRadius={120}
                paddingAngle={4}
                activeIndex={activeIndex}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {topicData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      transition: "all 0.3s ease",
                      opacity:
                        activeIndex === null ||
                        activeIndex === index
                          ? 1
                          : 0.4,
                    }}
                  />
                ))}
              </Pie>

              {/* Custom Tooltip */}
              
              {/* <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-[#1f2124] p-3 rounded-lg shadow-lg border border-gray-700">
                        <p className="capitalize font-semibold text-white">
                          {d.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {d.solved} / {d.total} solved
                        </p>
                        <p className="text-green-400 text-sm font-medium">
                          {d.percent}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              /> */}

            </PieChart>
          </ResponsiveContainer>
 {/* LEGEND */}
<div className="flex flex-wrap justify-center gap-4 ">
  {topicData.map((item, index) => (
    <div key={index} className="flex items-center gap-2 text-sm">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: COLORS[index % COLORS.length] }}
      />
      <span className="capitalize text-gray-300">
        {item.name}
      </span>
    </div>
  ))}
</div>
          {/* CENTER CONTENT (Dynamic) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300">

            {activeIndex !== null ? (
              <>
                <p className="text-3xl font-bold transition-all duration-300">
                  {topicData[activeIndex].solved} /{" "}
                  {topicData[activeIndex].total}
                </p>
                <p className="text-sm text-gray-400 mt-1 capitalize">
                  {topicData[activeIndex].name}
                </p>
                <p className="text-xs text-gray-500">
                  {topicData[activeIndex].percent}% Solved
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold transition-all duration-300">
                  {data.totalSolvedProblem} /{" "}
                  {data.totalPublicProblem}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  All Problems
                </p>
                <p className="text-xs text-gray-500">
                  {globalPercent}% Solved
                </p>
              </>
            )}

          </div>
        </div>


        
      </div>

      {/* RIGHT SIDE - DIFFICULTY */}
      <div className="w-1/4 flex flex-col justify-center gap-4 pl-6">
{/* bg-[#1f2124] */}
        <div className=" p-3 bg-[#101727] rounded-lg">
          <p className="text-green-400  font-semibold">Easy</p>
          <p className="text-sm text-gray-400">
            {data.difficultyStats.easy.solved} /{" "}
            {data.difficultyStats.easy.total}
          </p>
        </div>

        <div className="bg-[#101727] p-3 rounded-lg">
          <p className="text-yellow-400 font-semibold">Medium</p>
          <p className="text-sm text-gray-400">
            {data.difficultyStats.medium.solved} /{" "}
            {data.difficultyStats.medium.total}
          </p>
        </div>

        <div className="bg-[#101727] p-3 rounded-lg">
          <p className="text-red-400 font-semibold">Hard</p>
          <p className="text-sm text-gray-400">
            {data.difficultyStats.hard.solved} /{" "}
            {data.difficultyStats.hard.total}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SolvedProblemStatus;