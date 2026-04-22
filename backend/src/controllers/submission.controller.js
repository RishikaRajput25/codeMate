/*

import { executeAgainstTestCases } from "../utils/executionService.js";
import { Problem } from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
export const submitSolution = asyncHandler(async (req, res) => {

  const { problemId, language, code } = req.body;

  const problem = await Problem.findById(problemId);

  const execution = await executeAgainstTestCases({
    language,
    code,
    problem
  });

  let status = "Accepted";

  if (!execution.success) {
    status = "Runtime Error";
  } else if (execution.results.some(r => !r.passed)) {
    status = "Wrong Answer";
  }

  const submission = await Submission.create({
    user: req.user._id,
    problem: problemId,
    language,
    code,
    status,
    testResults: execution.results || []
  });

  res.json({
    success: true,
    submission
  });
});
export default {submitSolution};
*/


//Hidden se pehle tak chal raha code 
/*
import { executeAgainstTestCases } from "../utils/executionService.js";
import { Problem } from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";

export const submitSolution= asyncHandler(async(req,res)=>{
  const {problemId, language, code}= req.body;
  const problem= await Problem.findById(problemId);
  const execution = await executeAgainstTestCases({
    language,
    code,
    problem,
  });

  let status = "Accepted";
  if(!execution.success){
    status="Runtime Error";
  }else if (execution.results.some((r) => !r.passed)) {
    status = "Wrong Answer";
  }
console.log("code yaha tak aa gya",status)
  const submission= await Submission.findOneAndUpdate(
    {
      user : req.user._id,
      problem:problemId,
  },
  {
    language,
    code,
    status,
    testResults:execution.results || []
  },
  {
    new:true,
    upsert: true,
  }
);
console.log("code submit bhi ho gya",submission)
res.json({
  success:true,
  submission,
});

// res.json(new ApiResponce(200,submission,true));
})

export const getLastSubmission= asyncHandler(async(req, res)=>{
try{
const {problemId}= req.params;
const submission= await Submission.findOne({
  user:req.user._id,
  problem :problemId
});
console.log("data backend se fetch hoke aa gya:")
res.status(200).json(
  new ApiResponce(200, submission, "Submission fetched successfully")
);


}
catch(error){
 throw new ApiError(500,"Server Error");
}
})

export const getMyAcceptedSubmissions= async(req,res)=>{

  try{
    const submission= await Submission.find({
      user:req.user._id,
      status:"Accepted"
    })
    .populate("problem","title difficulty topics")

    console.log("submission:",submission);
    const solvedCount = await Submission.countDocuments({
  user: req.user.id,
  status: "Accepted"
});

 res.status(200).json(
  new ApiResponce(200, {
    submissions: submission,
    solvedCount
  }, "Submitted Solutions Fetched")
);



  }catch(error){
    throw new ApiError(500,"Server Error");
  }
}
export default {submitSolution, getLastSubmission,getMyAcceptedSubmissions}
*/


import { executeAgainstTestCases } from "../utils/executionService.js";
import { Problem } from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { GroupScore} from "../models/groupScore.model.js";
import { Group } from "../models/group.model.js";
export const submitSolution= asyncHandler(async(req,res)=>{
  console.log("Code submission me ander aa gya ")
  const user = req.user;
  if (!user) throw new ApiError(401, "Login required");

  const {problemId, language, code}= req.body;
   if (!problemId || !language || !code) {
    throw new ApiError(400, "All fields are required");
  }
  const problem= await Problem.findById(problemId);
   if (!problem) throw new ApiError(404, "Problem not found");

   console.log("executeAgainstTestCases se pehle tak")
  const execution = await executeAgainstTestCases({
    language,
    code,
    problem,
    customTestCases: [
  ...(problem.testCases || []),
  ...(problem.hiddenTestCases || [])
]

  });

console.log("Exectuion ke baad")
// new added start
  const existingSubmission = await Submission.findOne({
  user: user._id,
  problem: problemId,
});
//new added end

  let status = "Accepted";
  if(!execution.success){
    status="Runtime Error";
  }else if (execution.results.some((r) => !r.passed)) {
    status = "Wrong Answer";
  }

  // const failedTestCase = execution.results.find((r) => !r.passed);

  const total = execution.results.length;
const passed = execution.results.filter(r => r.passed).length;

const failedTestCase = execution.results.find((r) => !r.passed);
const failedIndex = execution.results.findIndex((r) => !r.passed);
console.log("Failed TestCase : ", failedTestCase)
console.log("code yaha tak aa gya",status)
  const submission= await Submission.findOneAndUpdate(
    {
      user : req.user._id,
      problem:problemId,
  },
  {
    language,
    code,
    status,
    testResults:execution.results || []
  },
  {
    new:true,
    upsert: true,
  }
);
console.log("code submit bhi ho gya",submission)
//console.log("groupId:", user.groupId);
//console.log("existing:", existingSubmission?.status);
//new Added start
const wasAcceptedBefore = existingSubmission?.status === "Accepted";
if (
  user.groupId &&
  status === "Accepted" &&
   !wasAcceptedBefore
) {
  
  await GroupScore.findOneAndUpdate(
    {
      groupId: user.groupId,
      userId: user._id,
    },
    {
      $inc: { totalSolved: 1 },
    }
  );
}
//new added end
// res.json({
//   success:true,
//   submission,
//   failedTestCase: failedTestCase || null
// });


res.json({
  success: true,
  submission,
  summary: {
    total,
    passed,
    failed: total - passed,
    status,
    failedIndex: failedIndex !== -1 ? failedIndex + 1 : null
  },
  failedTestCase: failedTestCase || null
});
})

export const getLastSubmission= asyncHandler(async(req, res)=>{
try{
const {problemId}= req.params;
const submission= await Submission.findOne({
  user:req.user._id,
  problem :problemId
})
console.log("data backend se fetch hoke aa gya:")
res.status(200).json(
  new ApiResponce(200, submission, "Submission fetched successfully")
);


}
catch(error){
 throw new ApiError(500,"Server Error");
}
})

export const getMyAcceptedSubmissions= async(req,res)=>{

  try{
    const submission= await Submission.find({
      user:req.user._id,
      status:"Accepted"
    })
    .populate("problem","title difficulty topics")

    console.log("submission:",submission);
    const solvedCount = await Submission.countDocuments({
  user: req.user.id,
  status: "Accepted"
});

 res.status(200).json(
  new ApiResponce(200, {
    submissions: submission,
    solvedCount
  }, "Submitted Solutions Fetched")
);



  }catch(error){
    throw new ApiError(500,"Server Error");
  }
}
export default {submitSolution, getLastSubmission,getMyAcceptedSubmissions}