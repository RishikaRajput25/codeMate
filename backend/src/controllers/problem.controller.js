import { Problem } from "../models/problem.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import mongoose from "mongoose";
import Submission from "../models/submission.model.js"
//perfectly working before cpp and java 
/*
export const generateBoilerPlate = (functionSignature) => {
  const { name, params } = functionSignature;

  if (!name || !params) {
    throw new ApiError(400, "Invalid function signature");
  }

  return [
    {
      language: "JAVASCRIPT",
      code: `function ${name}(${params.join(", ")}) {
  // write your code here
}`,
    },
    {
      language: "PYTHON",
      code: `def ${name}(${params.join(", ")}):
    # write your code here
    pass`,
    },
  ];
};
*/


// -----------------new start------------------------
// const typeMap = {
//   number: {
//     java: "int",
//     cpp: "int",
//     js: "number",
//   },
//   string: {
//     java: "String",
//     cpp: "string",
//     js: "string",
//   },
//   array: {
//     java: "int[]",
//     cpp: "vector<int>",
//     js: "number[]",
//   },
//   matrix: {
//     java: "int[][]",
//     cpp: "vector<vector<int>>",
//     js: "number[][]",
//   },
// };


// Return type ke liye (NO &)
// const cppReturnMap = {
//   array: "vector<int>",
//   number: "int",
//   string: "string",
//   matrix: "vector<vector<int>>",
//   linkedlist: "ListNode*",
//   tree: "TreeNode*",
//   graph: "vector<vector<int>>"
// };

//  Params ke liye (WITH & where needed)
// const cppParamMap = {
//   array: "vector<int>&",
//   number: "int",
//   string: "string",
//   matrix: "vector<vector<int>>&",
//   linkedlist: "ListNode*",
//   tree: "TreeNode*",
//   graph: "vector<vector<int>>&"
// };
// const javaMap = {
//   array: "int[]",
//   number: "int",
//   string: "String",
//   matrix: "int[][]",
//   linkedlist: "ListNode",
//   tree: "TreeNode",
//   graph: "int[][]"
// };

// function generateParams(params, map, lang) {
//   return params.map(p => {
//     if (lang === "js" || lang === "python") {
//       return p.name;
//     }
//     return `${map[p.type]} ${p.name}`;
//   }).join(", ");
// }





// export function generateCppBoilerplate(name, params, returnType) {

// const paramList = generateParams(params, cppParamMap, "cpp");
// const mappedReturnType = cppReturnMap[returnType] || "int";

//   let code = `#include <bits/stdc++.h>
// using namespace std;
// `;

//   // detect structures
// //perfectly working before cycle 
  
//   const types = params.map(p => p.type);

//   if (types.includes("linkedlist")) {
//     code += `
// struct ListNode {
//     int val;
//     ListNode* next;
//     ListNode(int x) { val = x; next = NULL; }
// };
// `;
//   }

//   if (types.includes("tree")) {
//     code += `
// struct TreeNode {
//     int val;
//     TreeNode* left;
//     TreeNode* right;
//     TreeNode(int x) { val = x; left = NULL; right = NULL; }
// };
// `;
//   }

//   code += `
// ${mappedReturnType || "int"} ${name}(${paramList}) {
//     // write your code here
// }
// `;

//   return { language: "CPP", code };
// }



// function generateJavaBoilerplate(name, params, returnType) {

//   const paramList = generateParams(params, javaMap, "java");


//   //  FIX
//   const mappedReturnType = javaMap[returnType] || "int";

//   let code = `import java.util.*;
// `;

//   const types = params.map(p => p.type);

//   if (types.includes("linkedlist")) {
//     code += `
// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; next = null; }
// }
// `;
//   }

//   if (types.includes("tree")) {
//     code += `
// class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode(int x) { val = x; left = null; right = null; }
// }
// `;
//   }

//   code += `
// class Solution {
//     public static ${mappedReturnType || "int"} ${name}(${paramList}) {
//         // write your code here
//     }
// }
// `;

//   return { language: "JAVA", code };
// }
// export const generateBoilerPlate = (functionSignature) => {
//   const { name, params, returnType } = functionSignature;

//   const paramNames = params.map(p => p.name).join(", ");

//   return [
//     {
//       language: "JAVASCRIPT",
//       code: `function ${name}(${paramNames}) {
//   // write your code here
// }`
//     },
//     {
//       language: "PYTHON",
//       code: `def ${name}(${paramNames}):
//     # write your code here
//     pass`
//     },
//     generateCppBoilerplate(name, params, returnType),
//     generateJavaBoilerplate(name, params, returnType)
//   ];
// };






// export  const createProblem= asyncHandler(async(req,res)=>{
    
//      const userId= req.user?._id;
//      if(!userId){
//         throw  new  ApiError(500,"User not exists")
//      }

//        const {
//         title, 
//         description,
//         difficulty,
//         topics,
//         functionSignature,
//         testCases,
//         visibility,
//     }  = req.body;

//     if(!title ||
//        !topics||
//        !description ||
//        !difficulty ||
//        !testCases||
//        !functionSignature ||
//        !functionSignature.name ||
//        !functionSignature.params ||
//        !functionSignature.returnType){
      
//         throw new ApiError(400,"Missing required fields");
//     }
//     if(!Array.isArray(testCases) || testCases.length==0){
//         throw  new ApiError(400,"At least one test case is required")
//     }
//     if(testCases.length>2){
//         throw new ApiError(400,"Maximum 2 test cases allowed")
//     }
//     // inside createProblem new  added

// if (functionSignature.params.some(p => p.type === "linkedlist_cycle")) {
//   testCases.forEach(tc => {
//     if (tc.extra?.pos === undefined) {
//       throw new ApiError(400, "Cycle problems require extra.pos");
//     }
//   });
// }
//   //  const boilerplate = generateBoilerPlate(functionSignature);
//   const boilerplate = generateBoilerPlate(functionSignature,topics);

//    const finalVisibility =
//   visibility === "PRIVATE" ? "PRIVATE" : "PRIVATE";

//    const problem = await Problem.create({
//     title,
//     topics,
//     description,
//     difficulty,
//     functionSignature,
//     testCases,
//     boilerplate,
//     visibility: finalVisibility,
//     createdBy:userId,
//    })
//     return res.status(201)
//     .json(new ApiResponce(201,problem, "Problem created successfully"))

    
   
// });









// ================= MAPS =================

const cppReturnMap = {
  array: "vector<int>",
  number: "int",
  string: "string",
  matrix: "vector<vector<int>>",
  linkedlist: "ListNode*",
  tree: "TreeNode*",
};

const cppParamMap = {
  array: "vector<int>&",
  number: "int",
  string: "string",
  matrix: "vector<vector<int>>&",
  linkedlist: "ListNode*",
  tree: "TreeNode*",
};

const javaMap = {
  array: "int[]",
  number: "int",
  string: "String",
  matrix: "int[][]",
  linkedlist: "ListNode",
  tree: "TreeNode",
};

// ================= PARAM GENERATOR =================

function generateParams(params, map, lang) {
  return params
    .map((p) => {
      if (lang === "js" || lang === "python") return p.name;
      return `${map[p.type]} ${p.name}`;
    })
    .join(", ");
}

// ================= CPP BOILERPLATE =================

export function generateCppBoilerplate(name, params, returnType) {
  const paramList = generateParams(params, cppParamMap, "cpp");
  const mappedReturnType = cppReturnMap[returnType] || "int";

  let code = `#include <bits/stdc++.h>
using namespace std;
`;

  const types = params.map((p) => p.type);

  if (types.includes("linkedlist")) {
    code += `
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) { val = x; next = NULL; }
};
`;
  }

  if (types.includes("tree")) {
    code += `
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) { val = x; left = NULL; right = NULL; }
};
`;
  }

  code += `
${mappedReturnType} ${name}(${paramList}) {
    // write your code here
}
`;

  return { language: "CPP", code };
}

// ================= JAVA =================

function generateJavaBoilerplate(name, params, returnType) {
  const paramList = generateParams(params, javaMap, "java");
  const mappedReturnType = javaMap[returnType] || "int";

  let code = `import java.util.*;
`;

  const types = params.map((p) => p.type);

  if (types.includes("linkedlist")) {
    code += `
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}
`;
  }

  if (types.includes("tree")) {
    code += `
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; left = null; right = null; }
}
`;
  }

  code += `
class Solution {
    public static ${mappedReturnType} ${name}(${paramList}) {
        // write your code here
    }
}
`;

  return { language: "JAVA", code };
}

// ================= BOILERPLATE =================

export const generateBoilerPlate = (functionSignature) => {
  const { name, params, returnType } = functionSignature;
  const paramNames = params.map((p) => p.name).join(", ");

  return [
    {
      language: "JAVASCRIPT",
      code: `function ${name}(${paramNames}) {
  // write your code here
}`,
    },
    {
      language: "PYTHON",
      code: `def ${name}(${paramNames}):
    pass`,
    },
    generateCppBoilerplate(name, params, returnType),
    generateJavaBoilerplate(name, params, returnType),
  ];
};

// ================= CREATE PROBLEM =================

export const createProblem = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(500, "User not exists");

  const {
    title,
    description,
    difficulty,
    topics,
    functionSignature,
    testCases,
    visibility,
  } = req.body;

  if (
    !title ||
    !topics ||
    !description ||
    !difficulty ||
    !testCases ||
    !functionSignature ||
    !functionSignature.name ||
    !functionSignature.params ||
    !functionSignature.returnType
  ) {
    throw new ApiError(400, "Missing required fields");
  }

  if (!Array.isArray(testCases) || testCases.length === 0) {
    throw new ApiError(400, "At least one test case is required");
  }

  if (testCases.length > 2) {
    throw new ApiError(400, "Maximum 2 test cases allowed");
  }

  // SAFE NORMALIZATION (IMPORTANT)
  const normalizedTestCases = testCases.map((tc) => ({
    ...tc,
    extra: {
      pos: tc.extra?.pos ?? -1,
    },
  }));

  const boilerplate = generateBoilerPlate(functionSignature);

  const problem = await Problem.create({
    title,
    topics,
    description,
    difficulty,
    functionSignature,
    testCases: normalizedTestCases,
    boilerplate,
    visibility: "PRIVATE",
    createdBy: userId,
  });

  return res
    .status(201)
    .json(new ApiResponce(201, problem, "Problem created successfully"));
});


export const getAllProblems= asyncHandler( async(req,res)=>{

  const problems= await Problem.find({
    visibility:"PUBLIC",
  }).select("title difficulty topics createdAt")
  .sort({createdAt :-1});
  return res.status(200).json(
    new ApiResponce(200, problems, "All problems fetched")
  );

})

export const getProblemsByTopics = asyncHandler(async(req,res)=>{
  
const {topic}= req.params;
 const problems= await Problem.find({
  visibility: "PUBLIC",
    topics: topic,
 }).select("title difficulty topics createdAt").sort({createdAt : -1});


 return res.status(200).json(
  new ApiResponce(200,problems,`Problems for topic ${topic}`)
 );
});

export const getMyProblems= asyncHandler(async(req,res)=>{
 const userId = req.user?._id;
 if(!userId){
  throw new ApiError(401, "Unauthoized,No Problem added");
 }
 const problems = await Problem.find({
  createdBy : userId,
  visibility:"PRIVATE"
 })
 .select("title difficulty topics createdAt")
 .sort({createdAt: -1})
 return res.status(200)
 .json(new ApiResponce(200, problems,"My private problems fetched"));

})
export const getPublicProblemById= asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const problem = await Problem.findById(id).select("-__v");
  if(!problem){
    throw new ApiError(404, "Problem not found");
  }
  return res.status(200).json(
    new ApiResponce(200,problem,"Problem fetched successfully")
  );

});
export const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const problem = await Problem.findById(id).select("-__v");

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  if (
    problem.visibility === "PRIVATE" &&
    problem.createdBy?.toString() !== userId?.toString()
  ) {
    throw new ApiError(403, "Access denied");
  }

  return res.status(200).json(
    new ApiResponce(200, problem, "Problem fetched successfully")
  );
});
export const getPublicTopics= asyncHandler(async(req,res)=>{
  const topics = await Problem.aggregate([
    {$match :{visibility : "PUBLIC"}},
    {$unwind: "$topics"},
    {
      $group :{
        _id:"$topics",
        count : {$sum : 1}
      }
    },
    {$sort:{_id :1}}
  ]);
  return res.status(200).json(
      new ApiResponce(200, topics, "Public topics fetched successfully")
  );
})
//For Search function

export const searchProblems = asyncHandler(async(req, res)=>{
  const {q= ""}= req.query;
// $regex= pattern matching= sum array, Array trversal
//$options : "i"  == case insentive (array,Array, ARRAY)

  const filter={
    visibility: "PUBLIC",
    $or:[
      {title:{$regex : q, $options : "i"}},
      {topics : {$regex:q, $options : "i"}},
    ],
  };

//allow direct problemId searchProblems
if(mongoose.Types.ObjectId.isValid(q)){
  filter.$or.push({_id:q});
}
const problems= await Problem.find(filter).select("title difficulty topics").sort({createdAt:-1})

res.status(200).json(new ApiResponce(200, problems,"Search results"));
});

export const deletePersonal= asyncHandler(async(req, res)=>{
 const userId = req.user?._id;
  const problemId = req.params.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Request");
  }

  if (!problemId) {
    throw new ApiError(400, "Problem ID is required");
  }

  // Check problem exists and belongs to user
  const problem = await Problem.findOne({
    _id: problemId,
    createdBy: userId,
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found or not authorized");
  }
  console.log("Problem Id :",problemId);
  const findSubmission=  await Submission.findOne({ problem: problemId });
  console.log("Find Submissions :", findSubmission);
 //delete related submission
 if(findSubmission){
  await Submission.deleteMany({problem:problemId});
 }
   //delete problem
  //  { problem: problemId }
   await Problem.findByIdAndDelete(problemId);
   return res.status(200).json(
    new ApiResponce(200,null,"Personal problem deleted successfully")
   );
})

export default {createProblem , getAllProblems,getProblemsByTopics,getMyProblems, getProblemById, getPublicProblemById,getPublicTopics,searchProblems,deletePersonal};
