
/*
import React from "react";
import { motion } from "framer-motion";

// bg-[#8235b5]
const  Explorer =()=>{
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-2">

    <div className="border-2 border-white h-[450px] flex w-full px-2 rounded-2xl">
      <div className=" w-1/2">
        Content
      </div>
      <div className="1/2">
<img className="bg-cover" src="hero.png"/>
</div>
    </div>

    




      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-20"
      >
        <h1 className="text-5xl font-bold mb-6  bg-purple-500 bg-clip-text text-transparent">
          About CodeMate 
        </h1>
        <p className="text-lg text-gray-300">
          A modern coding platform built for learning, practicing and competing — all in one place.
        </p>
      </motion.div>

     
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Solve Problems",
            desc: "Practice coding with real test cases and instant feedback",
          },
          {
            title: "Create Problems",
            desc: "Add your own coding problems manually or using AI",
          },
          {
            title: "Leaderboard",
            desc: "Compete with others and track your progress",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

     
      <div className="max-w-5xl mx-auto mt-24">
        <h2 className="text-3xl font-bold mb-10 text-center">
          How It Works 
        </h2>

        <div className="space-y-6">
          {["Choose Problem", "Write Code", "Run & Submit", "Get Results"].map(
            (step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-6 bg-[#1e293b] p-5 rounded-xl"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500">
                  {i + 1}
                </div>
                <p className="text-lg">{step}</p>
              </motion.div>
            )
          )}
        </div>
      </div>

    
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-center mt-24"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Coding?
        </h2>
        <button className="px-8 py-3  bg-purple-700 rounded-full text-lg font-semibold hover:scale-105 transition">
          Explore Problems
        </button>
      </motion.div>
    </div>
  );
}
export default Explorer
*/

import React from "react";
import { motion } from "framer-motion";
import {User, UserPen} from "lucide-react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate= useNavigate();
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10 space-y-32">

      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-bold leading-tight mb-6">
            One Platform for <span className="bg-blue-400 bg-clip-text text-transparent">All Coding Needs</span>
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            No more switching between platforms. Solve, create and compete — all in one place.
          </p>

          <div className="space-y-3 text-gray-400">
            <p>• Add your own problems if not available</p>
            <p>• Create private groups with friends (At max 10 members)</p>
            <p>• Track progress & boost competition</p>
            <p>• AI detects mistakes in your code</p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.img
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          src="hero.png"
          className="w-full rounded-2xl shadow-2xl"
        />
      </div>


      {/* ADD PROBLEM FLOW */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center ">Add Your Own Problems <i class="fa-solid fa-pen  text-blue-400"></i></h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fill Details",
              desc: "Enter title, description, inputs & outputs",
            },
            {
              title: "Add Test Cases",
              desc: "Provide multiple test cases for validation",
            },
            {
              title: "Manual or AI",
              desc: "Generate using AI or write manually",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.01 }}
              className="bg-[#1e293b] p-6 rounded-2xl shadow-xl"
            >
              <div className="text-3xl mb-4">0{i + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>


      {/* GROUP FEATURE */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Collaborative Groups <i class="fa-solid fa-trophy text-yellow-400"></i></h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* USER SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#1e293b] hover:bg-blue-400/60 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4">User Access</h3>
            <ol className="space-y-2 text-gray-400">
              <li>• Join only one group</li>
              <li>• Solve problems inside group</li>
              <li>• Track leaderboard position</li>
              <li>• Compete with friends</li>
            </ol>
          </motion.div>

          {/* ADMIN SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#1e293b] hover:bg-blue-400/60 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4">Admin (Creator) Access</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Create & manage group</li>
              <li>• Add/remove members</li>
              <li>• Control competition</li>
              <li>• Monitor leaderboard</li>
            </ul>
          </motion.div>
        </div>

        {/* LEADERBOARD FLOW */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-[#1e293b] hover:bg-blue-400/60 p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold mb-4">Dynamic Leaderboard</h3>
          <p className="text-gray-400">
            Leaderboard updates automatically based on problems solved. More problems = higher rank.
            Compete daily and stay ahead of your friends.
          </p>
        </motion.div>
      </div>


      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Start Your Journey <i class="fa-solid fa-hourglass-start"></i></h2>
        <button onClick={()=> navigate('/dashboard')} className="px-8 py-3 bg-blue-500  rounded-full text-lg font-semibold hover:scale-105 transition">
          Explore Problems
        </button>
      </motion.div>

    </div>
  );
};

export default About;