/*
import { Problem } from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
//import { User } from "../models/user.model.js";
 export const getAnalyticsData= asyncHandler(async(req,res)=>{
try{
    const userId= req.user?._id;
    if(!userId){
       throw new ApiError(400,"User is not present");
    }

    const publicProblems= Problem.find({
        visibility:"PUBLIC",
        createdBy:null
    });
    const totalPublicProblem=  publicProblems.length;

    const solvedProblem= Submission.find({
        status:"Accepted",    
    })
    const totalSolvedProblem= (await solvedProblem).length;

    return res.status(200).json(new ApiResponce(200,{totalSolvedProblem,totalPublicProblem}));
}
catch(error){
    throw new ApiError(500,"server Error");
}
})
export default {getAnalyticsData};
*/
// controllers/profileAnalytics.controller.js
import { Problem } from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";

export const getAnalyticsData = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(400, "User is not present");
// Total public problem
  const publicProblems = await Problem.find({
    visibility: "PUBLIC",
  });
//console.log("publicProblem",publicProblems)
  const totalPublicProblem = publicProblems.length;
console.log("totalPublicProblem : ",totalPublicProblem)
 
//total public solutions
  const publicProblemIds = publicProblems.map(p => p._id);
const solvedProblem = await Submission.find({
  user: userId,
  status: "Accepted",
  problem: { $in: publicProblemIds }, // only submissions for public problems
});
//total personal Problem

const personalProblems = await Problem.find({
  createdBy: userId
}).select("_id");
const totalPersonalProblem= personalProblems.length;
//total personal submissions

const personalProblemIds = personalProblems.map(p => p._id);

let personalSolved = 0;

if (personalProblemIds.length > 0) {
  personalSolved = await Submission.countDocuments({
    user: userId,
    status: "Accepted",
    problem: { $in: personalProblemIds }
  });
}
//console.log("solvedProblem :",solvedProblem)
const totalSolvedProblem= solvedProblem.length;
console.log("total Submissions: ",totalSolvedProblem);

console.log("personal Problem:",totalPersonalProblem);
console.log("Total Personal Solved :", personalSolved)
// Get Total Problem By difficulty

const totalBydifficulty= await Problem.aggregate([
  {
    $match:{visibility:"PUBLIC"}
  },
  {
    $group:{
      _id: "$difficulty",
      count: {$sum:1}
    }
  }
]);

const solvedByDifficulty= await Submission.aggregate([
{
  $match :{
    user:userId,
    status:"Accepted"
  } 
},
{
  $lookup:{
    from:"problems",
    localField:"problem",
    foreignField:"_id",
    as:"problemData"
  }
},
{$unwind: "$problemData"},
{
  $match:{
    "problemData.visibility": "PUBLIC"
  }
},
{
  $group: {
      _id: "$problemData.difficulty",
      count: { $addToSet: "$problem" }  // prevents duplicate problem count
    }
},
{
    $project: {
      solved: { $size: "$count" }
    }
  }
]);
const difficulties=["easy","medium","hard"];
const result={};
difficulties.forEach(level=>{
  const total= totalBydifficulty.find(t=>t._id===level)?.count ||0;
  const solved=solvedByDifficulty.find(s=>s._id===level)?.solved || 0;
  result[level]={total,solved};
})
console.log("Total by dificulty : ",result)
// Total problem Topic  wise 

const DATA_STRUCTURES = [
  "array",
  "linked list",
  "stack",
  "queue",
  "tree",
  "graph",
  "dp",
  "string",
  // "heap",
  // "hashmap"
];

const totalByDS = await Problem.aggregate([
  { $match: { visibility: "PUBLIC" } },

  { $unwind: "$topics" },

  {
    $match: {
      topics: { $in: DATA_STRUCTURES }
    }
  },

  {
    $group: {
      _id: "$topics",
      total: { $sum: 1 }
    }
  }
]);
const solvedByDS = await Submission.aggregate([
  {
    $match: {
      user: userId,
      status: "Accepted"
    }
  },
  {
    $lookup: {
      from: "problems",
      localField: "problem",
      foreignField: "_id",
      as: "problemData"
    }
  },
  { $unwind: "$problemData" },

  { $unwind: "$problemData.topics" },

  {
    $match: {
      "problemData.visibility": "PUBLIC",
      "problemData.topics": { $in: DATA_STRUCTURES }
    }
  },

  {
    $group: {
      _id: "$problemData.topics",
      solved: { $addToSet: "$problem" }
    }
  },

  {
    $project: {
      solved: { $size: "$solved" }
    }
  }
]);
const totalMap = Object.fromEntries(
  totalByDS.map(item => [item._id, item.total])
);

const solvedMap = Object.fromEntries(
  solvedByDS.map(item => [item._id, item.solved])
);

const dsStats = DATA_STRUCTURES.map(ds => ({
  topic: ds,
  total: totalMap[ds] || 0,
  solved: solvedMap[ds] || 0
}));

const dsSummary = {
  total: dsStats.reduce((acc, curr) => acc + curr.total, 0),
  solved: dsStats.reduce((acc, curr) => acc + curr.solved, 0)
};
const filteredDsStats = dsStats.filter(topic => topic.total > 0);
//console.log("Topic wise Data :", dsStats);
  // return res
  //   .status(200)
  //   .json(new ApiResponce(200, { totalSolvedProblem, totalPublicProblem ,result,dsStats}));
return res.status(200).json(
  new ApiResponce(200, {
    totalSolvedProblem,
    totalPublicProblem,
    difficultyStats: result,
    ds: {
      summary: dsSummary,
      topics: filteredDsStats
    },
    totalPersonalProblem,
    personalSolved
    
  })
);
});
export default {getAnalyticsData};