
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Problem } from "../models/problem.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiReview = asyncHandler(async (req, res) => {

  const user = req.user;
  const { code, problemId } = req.body;

  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (!code || !problemId) {
    throw new ApiError(400, "Code and ProblemId are required");
  }

  const problem = await Problem.findById(problemId).select("description");

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

 const prompt = `
You are a senior software engineer performing a professional code review for a coding platform.

Your task is to evaluate the user's solution to a programming problem.

Problem Statement:
${problem.description}

User Code:
${code}

Return the analysis in the EXACT format below:

1. Time Complexity
Write the time complexity in ONE line only.

2. Space Complexity
Write the space complexity in ONE line only.

3. Bug Check
- If the code contains a bug, logical mistake, or edge case issue, explain:
  - where the issue is
  - why it is wrong
  - how to fix it
  - show the corrected code snippet.

- If there are no bugs, simply write:
  "No bugs detected."

4. Optimality Check
Evaluate whether the approach is optimal.

Possible cases:

Case 1: If the solution is optimal  
Write:
"Approach is optimal. Good solution."

Case 2: If the solution works but is NOT optimal  
Write:
"Solution works but is not optimal."  
Explain briefly why it is not optimal and provide the correct optimal approach with code.

Case 3: If the solution is incorrect  
Explain why the approach is wrong and provide a correct working solution.

Important Instructions:
- Be concise and professional.
- Do NOT provide long explanations.
- Do NOT explain the entire code.
- Focus only on complexity, bugs, and optimality.
- Keep responses short and structured.
`;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    // model: "gemini-1.5-flash",
     model: "gemini-3-flash-preview",

  });

  const result = await model.generateContent(prompt);

  const aiResponse = result.response.text();

  return res
    .status(200)
    .json(new ApiResponce(200, aiResponse, "AI explanation generated successfully"));
});
export default {aiReview}
