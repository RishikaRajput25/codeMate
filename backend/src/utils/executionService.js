/*
import axios from "axios";
import {BuildJsWrapper,BuildPythonWrapper} from "./wrappers.js"
// import { Problem } from "../models/problem.model.js";
export const executeAgainstTestCases = async ({
  language,
  code,
  problem,
   customTestCases 
}) => {

  const fnName = problem.functionSignature.name;
  // const testCases = problem.testCases;
const testCases = customTestCases || problem.testCases;
  let finalCode = "";
console.log("testcases:",testCases);
  if (language === "javascript") {
    finalCode = BuildJsWrapper(code, fnName, testCases);
  }

  if (language === "python") {
    finalCode = BuildPythonWrapper(code, fnName, testCases);
  }

  console.log("Wrapper ban gya :",finalCode);

  
  const pistonLang =
    language === "javascript" ? "javascript" : "python3";
console.log("piston api se pehle tak ka code sahi hai :");
  const pistonRes = await axios.post(
    "https://emkc.org/api/v2/piston/execute",
    {
      language: pistonLang,
      version: "*",
      files: [
        {
          name:
            language === "javascript"
              ? "solution.js"
              : "solution.py",
          content: finalCode
        }
      ]
    }
 
  );

  
// 
// const pistonLang =
//   language === "javascript" ? "javascript" : "python";
// console.log("piston api se pehle tak ka code sahi hai :");
// const pistonRes = await axios.post(
//   "https://piston.ayumilove.net/execute",
//   {
//     language: pistonLang,
//     version: language === "javascript" ? "18.15.0" : "3.10.0",
//     files: [
//       {
//         name: language === "javascript" ? "solution.js" : "solution.py",
//         content: finalCode
//       }
//     ]
//   },
//   {
//     headers: {
//       "Content-Type": "application/json",
//       "User-Agent": "axios"
//     },
//     timeout: 20000
//   }
// );


// 

console.log("piston responce :", pistonRes);
 
  const runData = pistonRes.data.run;
console.log("Piston se data aa gya :",runData);
  // compile error
  if (runData.code !== 0) {
    return {
      success: false,
      errorType: "compile_error",
      message: runData.stderr
    };
  }

  if (runData.stderr && runData.stderr.trim() !== "") {
    return {
      success: false,
      errorType: "runtime_error",
      message: runData.stderr
    };
  }

  const rawOutput = runData.stdout?.trim();

  if (!rawOutput) {
    return {
      success: false,
      errorType: "runtime_error",
      message: "No output returned"
    };
  }

  function safeParse(str) {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  const outputs = rawOutput.split("\n").map(l => l.trim());
  console.log("Outputs :",outputs);
  const results = testCases.map((tc, i) => {
    const parsedOutput = safeParse(outputs[i]);

    const passed =
      JSON.stringify(parsedOutput) ===
      JSON.stringify(tc.expectedOutput);

    return {
      input: tc.input,
      expected: tc.expectedOutput,
      output: parsedOutput,
      passed
    };
  });
console.log("Result bhi aa gya:",results);
  return {
    success: true,
    results
  };
};

export default {executeAgainstTestCases};
*/

import axios from "axios";
//import { BuildJsWrapper, BuildPythonWrapper } from "./wrappers.js";
import { BuildJsWrapper } from "./wrappers/javascripts.js";
import { BuildPythonWrapper } from "./wrappers/python.js";
import { BuildCppWrapper } from "./wrappers/cpp.js";
import { BuildJavaWrapper } from "./wrappers/java.js";
// Helper function to run code on Judge0

function getInputTypeFromTopics(topics) {
  const allowedStructures = ["array", "linked list", "tree", "graph"];

  const found = topics.find(t =>
    allowedStructures.includes(t.toLowerCase())
  );

  if (!found) return "array"; // default fallback

  const structureMap = {
    "array": "array",
    "linked list": "linkedlist",
    "tree": "tree",
    "graph": "graph"
  };

  return structureMap[found.toLowerCase()];
}

async function runCodeOnJudge0(code, languageId) {
  // Create submission
  const createResp = await axios.post(
    "https://ce.judge0.com/submissions/?base64_encoded=false&wait=false",
    {
      language_id: languageId,
      source_code: code,
      stdin: ""
    }
  );

  const token = createResp.data.token;

  // Polling for result
  let result;
  do {
    result = (
      await axios.get(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=false`
      )
    ).data;
    await new Promise((r) => setTimeout(r, 500)); // wait 0.5s
  } while (result.status.id <= 2); // 1=In Queue, 2=Processing

  return result;
}

// Main executor function
export const executeAgainstTestCases = async ({
  language,
  code,
  problem,
  customTestCases,
}) => {
  //const fnName = problem.functionSignature.name;
  //const returnType = problem.functionSignature.returnType;
  const {
  name: fnName,
  params,
  returnType
} = problem.functionSignature;
  const testCases = customTestCases || problem.testCases;
  const topics=problem.topics || [];
  const inputType=getInputTypeFromTopics(topics);
  let finalCode = "";

  console.log("testcases:", testCases);
console.log("PARAMS:", params);
  if (language === "javascript") {
   // finalCode = BuildJsWrapper(code, fnName, testCases,inputType);
    finalCode = BuildJsWrapper(code,fnName,testCases, inputType,params,returnType);
    
  }

  if (language === "python") {
    // finalCode = BuildPythonWrapper(code, fnName, testCases, inputType);
    finalCode = BuildPythonWrapper(code,fnName,testCases, inputType,params,returnType);
  }
  if(language === "cpp"){
    finalCode= BuildCppWrapper(code,fnName,testCases, inputType,params,returnType);
  }
 console.log("SENDING PARAMS:", params);
  if(language==="java"){
    // finalCode= BuildJavaWrapper(code,fnName,testCases,params,returnType);
    finalCode= BuildJavaWrapper(code,fnName,testCases, inputType,params,returnType);
  }
 // console.log("Wrapper ban gya :", finalCode);

  // Judge0 language IDs
  let languageId;
  if (language === "javascript") languageId = 63; // Node.js 18
  else if (language === "python") languageId = 71; // Python 3.10
  else if(language==="cpp") languageId=53;
  else if(language=="java") languageId=62;
  
console.log("Language:", language);
console.log("InputType:", inputType);
console.log("Generated Wrapper:", finalCode);
console.log("Language Id:",languageId);
  console.log("Executing on Judge0...");
  const judge0Res = await runCodeOnJudge0(finalCode, languageId);

  console.log("Judge0 response:", judge0Res);

  // Handle compile errors
  if (judge0Res.compile_output) {
    return {
      success: false,
      errorType: "compile_error",
      message: judge0Res.compile_output,
    };
  }

  // Handle runtime errors
  if (judge0Res.stderr) {
    return {
      success: false,
      errorType: "runtime_error",
      message: judge0Res.stderr,
    };
  }

  const rawOutput = judge0Res.stdout?.trim();
  if (!rawOutput) {
    return {
      success: false,
      errorType: "runtime_error",
      message: "No output returned",
    };
  }

  function safeParse(str) {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  const outputs = rawOutput.split("\n").map((l) => l.trim());
  console.log("Outputs:", outputs);

  const results = testCases.map((tc, i) => {
    const parsedOutput = safeParse(outputs[i]);
    const passed =
      JSON.stringify(parsedOutput) === JSON.stringify(tc.expectedOutput);
    return {
      input: tc.input,
      expected: tc.expectedOutput,
      output: parsedOutput,
      passed,
    };
  });

  console.log("Result bhi aa gya:", results);

  return {
    success: true,
    results,
  };
};

export default { executeAgainstTestCases };
