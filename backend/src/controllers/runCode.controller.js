

//sahi salamat chal raha code  but uper wala baad tak chal raha code hai
/*

import { Problem } from "../models/problem.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import mongoose from "mongoose";
import { BuildJsWrapper ,BuildPythonWrapper} from "../utils/wrappers.js";
import axios from "axios";


export const runCode= asyncHandler(async(req, res)=>{
    const user= req.user;
    if(!user){
       throw new ApiError(401,"Login required")
    }
    console.log("User aa gya",user )
    const { language, code, problem}= req.body;
    
    console.log("data frontend se aa raha", language)
    console.log("data frontend se aa raha", code)
    console.log("data frontend se aa raha", problem)
//debugging

  if (!language || !code || !problem) {
    throw new ApiError(400, "Missing fields")
  }

  if (!problem.functionSignature?.name) {
    throw new ApiError(400, "Function signature missing")
  }

  if (!problem.testCases?.length) {
    throw new ApiError(400, "Test cases missing")
  }



    const fnName=problem.functionSignature.name;
    const testCases= problem.testCases

    let finalCode=""
    if(language==="javascript"){
        finalCode= BuildJsWrapper(code, fnName, testCases);
        console.log("javascript wrapper ban gya", finalCode)
    }
    if(language==="python"){
        finalCode= BuildPythonWrapper(code,fnName,testCases);
        console.log("python wrapper ban gya ", finalCode)
    }

    const pistonLang= language==="javascript"?"javascript":"python3"

    // const pistonRes= await axios.post(
    //     "https://emkc.org/api/v2/piston/execute",
    //     {
    //         language:pistonLang,



    //         source:finalCode
    //     }
    // )
console.log("piston request se pehle tak code chal raha ");
const pistonRes = await axios.post(
  "https://emkc.org/api/v2/piston/execute",
  {
    language: pistonLang,
    version: "*",
    files: [
      {
        name: language === "javascript" ? "solution.js" : "solution.py",
        content: finalCode
      }
    ]
  }
)

console.log("Piston request ke baad tak code chal raha")
console.log("response piston ka :", pistonRes);

//For errors messages

    




   const outputs= pistonRes.data.run.stdout
   .trim()
   .split("\n")
   .map(line=>line.trim())
    
   console.log("Output :",outputs)
   const results = testCases.map((tc,i)=>({
    input: tc.input,
    expected: tc.expectedOutput,
    output:outputs[i] ? JSON.parse(outputs[i]) : null,
    passed: JSON.stringify(outputs[i]) === JSON.stringify(tc.expectedOutput)
   }))



   
    res.json(
    new ApiResponce(200, results, "Run successful")
  )
})
export default {runCode}
*/

//correctly  working  controller before hidden test case
/*
import { Problem } from "../models/problem.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import mongoose from "mongoose";
import { executeAgainstTestCases } from "../utils/executionService.js"

export const runCode = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Login required");

  const { language, code, problem } = req.body;

  const execution = await executeAgainstTestCases({
    language,
    code,
    problem
  });

  return res.json(
    new ApiResponce(200, execution, "Execution result")
  );
});

export default {runCode};
*/

import { Problem } from "../models/problem.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import mongoose from "mongoose";
import { executeAgainstTestCases } from "../utils/executionService.js";
export const runCode = asyncHandler(async (req, res) => {

  const user = req.user;
  if (!user) throw new ApiError(401, "Login required");

  const { language, code, problemId } = req.body;

   console.log("Code aaya run se :", code );
  if (!problemId) {
    throw new ApiError(400, "Problem ID is required");
  }

  if (!code) {
    throw new ApiError(400, "Code is required");
  }

  if (!language) {
    throw new ApiError(400, "Language is required");
  }

  //  Always fetch from DB (never trust frontend)
  const problem = await Problem.findById(problemId);

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }


  //  RUN  ONLY PUBLIC TEST CASES
  const publicTestCases = problem.testCases || [];

  if (!publicTestCases.length) {
    throw new ApiError(400, "No public test cases available");
  }

  const execution = await executeAgainstTestCases({
    language,
    code,
    problem: {
      ...problem.toObject(),
      testCases: publicTestCases// hidden not included
      
    }
  });

  return res.json(
    new ApiResponce(200, execution, "Execution result")
  );
});






























// export const runCode = asyncHandler(async (req, res) => {
//   const user = req.user
//   if (!user) throw new ApiError(401, "Login required")

//   const { language, code, problem } = req.body

//   if (!language || !code || !problem)
//     throw new ApiError(400, "Missing fields")

//   if (!problem.functionSignature?.name)
//     throw new ApiError(400, "Function signature missing")

//   if (!problem.testCases?.length)
//     throw new ApiError(400, "Test cases missing")

//   const fnName = problem.functionSignature.name
//   const testCases = problem.testCases

//   let finalCode = ""

//   if (language === "javascript") {
//     finalCode = BuildJsWrapper(code, fnName, testCases)
//   } else if (language === "python") {
//     finalCode = BuildPythonWrapper(code, fnName, testCases)
//   } else {
//     throw new ApiError(400, "Unsupported language")
//   }

//   const pistonLang = language === "javascript" ? "javascript" : "python3"

//   const pistonRes = await axios.post(
//     "https://emkc.org/api/v2/piston/execute",
//     {
//       language: pistonLang,
//       source: finalCode
//     }
//   )

//   const outputs = pistonRes.data.run.stdout
//     .trim()
//     .split("\n")
//     .map((line) => line.trim())

//   const results = testCases.map((tc, i) => {
//     let parsedOutput = outputs[i]

//     try {
//       parsedOutput = JSON.parse(outputs[i])
//     } catch {}

//     return {
//       input: tc.input,
//       expected: tc.expectedOutput,
//       output: parsedOutput,
//       passed:
//         JSON.stringify(parsedOutput) ===
//         JSON.stringify(tc.expectedOutput)
//     }
//   })

//   res.json(new ApiResponce(200, results, "Run successful"))
// })