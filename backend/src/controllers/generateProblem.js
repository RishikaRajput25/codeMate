

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateProblem = async (req, res) => {
//   try {

//     console.log("problem generation ke ander aa gye !")
//     const { rawProblem } = req.body;
//     const user= req.user;
//     if(!user){
//          return res.status(400).json({ error: "User not found " });
//     }
//     if (!rawProblem) {
//       return res.status(400).json({ error: "Problem input required" });
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-3-flash-preview",
//     });

//     const prompt =  `
// You are an API that converts coding problems into structured JSON.

// Return ONLY valid JSON. No explanation.

// JSON format:

// {
//   "title": "",
//   "description": "",
//   "difficulty": "easy|medium|hard",
//   "topics": ["array","tree"],
//   "functionSignature": {
//     "name": "",
//     "params": [
//       { "name": "", "type": "number|string|array|matrix|linkedlist|tree" }
//     ],
//     "returnType": "number|string|array|matrix|linkedlist"
//   },
//   "testCases": [
//     {
//       "input": [],
//       "expectedOutput": null
//     }
//   ]
// }

// Rules:
// - Detect params automatically
// - Tree → array format with null
// - LinkedList → array
// - Always give at least 2 test cases
// - Keep function name clean (camelCase)
// - No markdown, no explanation

// Problem:
// ${rawProblem}
// `;

//     const result = await model.generateContent(prompt);
//     let text = result.response.text();

//     // response clean
//     text = text.replace(/```json|```/g, "").trim();

//     let parsed;

//     try {
//       parsed = JSON.parse(text);
//     } catch (err) {
//       return res.status(500).json({
//         error: "AI returned invalid JSON",
//         raw: text,
//       });
//     }

//     // ==== validation
//     if (!parsed.title || !parsed.functionSignature) {
//       return res.status(400).json({ error: "Incomplete AI response" });
//     }

//     return res.status(200).json(parsed);

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "AI generation failed" });
//   }
// };
// export default {generateProblem};



import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateProblem = async (req, res) => {
  try {
    console.log("AI problem generation triggered");

    const { rawProblem } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!rawProblem) {
      return res.status(400).json({ error: "Problem input required" });
    }

    //  Prompt for generating problem 
    const prompt = `
You are an API that converts coding problems into structured JSON.

Return ONLY valid JSON. No explanation.

JSON format:

{
  "title": "",
  "description": "",
  "difficulty": "easy|medium|hard",
  "topics": ["array","tree"],
  "functionSignature": {
    "name": "",
    "params": [
      { "name": "", "type": "number|string|array|matrix|linkedlist|tree" }
    ],
    "returnType": "number|string|array|matrix|linkedlist|boolean"
  },
  "testCases": [
    {
      "input": [],
      "extra": {},
      "expectedOutput": null
    }
  ]
}

STRICT RULES:

1. If problem contains cycle in linked list:
   - use type: "linkedlist"
   - include:
     "extra": { "pos": index }

2. If normal linked list:
   - use type: "linkedlist"
   - set:
     "extra": { "pos": -1 }
     
3. Trees:
   - use array with null values

4. Always give EXACTLY 2 test cases

5. input must match params order

6. returnType must be correct

7. function name must be camelCase

8. NO markdown, NO explanation

Problem:
${rawProblem}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // for cleaning responce
    text = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: text,
      });
    }

   // for extra param data structure
    if (parsed.functionSignature?.params) {
      const hasCycle = parsed.functionSignature.params.some(
        (p) => p.type === "linkedlist_cycle"
      );

      if (hasCycle) {
        parsed.testCases = parsed.testCases.map((tc) => ({
          ...tc,
          extra: {
            pos:
              tc.extra?.pos !== undefined
                ? tc.extra.pos
                : -1, // safe fallback
          },
        }));
      }
    }

   // parsing check
    if (
      rawProblem.toLowerCase().includes("cycle") &&
      parsed.functionSignature?.params?.some(
        (p) => p.type === "linkedlist"
      )
    ) {
      parsed.functionSignature.params =
        parsed.functionSignature.params.map((p) =>
          p.type === "linkedlist"
            ? { ...p, type: "linkedlist_cycle" }
            : p
        );
    }

   //checking validation
    if (
      parsed.functionSignature?.params?.some(
        (p) => p.type === "linkedlist_cycle"
      )
    ) {
      parsed.testCases.forEach((tc) => {
        if (typeof tc.extra?.pos !== "number") {
          throw new Error("Invalid cycle test case: missing pos");
        }
      });
    }

  //final responce
    if (
      !parsed.title ||
      !parsed.functionSignature ||
      !parsed.functionSignature.name ||
      !parsed.functionSignature.params ||
      !parsed.functionSignature.returnType
    ) {
      return res.status(400).json({
        error: "Incomplete AI response",
        data: parsed,
      });
    }

    if (!Array.isArray(parsed.testCases) || parsed.testCases.length < 2) {
      return res.status(400).json({
        error: "AI must return at least 2 test cases",
      });
    }

    
    return res.status(200).json(parsed);

  } catch (err) {
    console.error("AI generation error:", err);
    return res.status(500).json({
      error: "AI generation failed",
      details: err.message,
    });
  }
};

export default { generateProblem };