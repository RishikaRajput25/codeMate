/*
import {z} from "zod";
export  const functionSignatureSchema = z.object({
    name: z.string()
    .min(1,"Function name is required")
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Invalid function name"),

    params:z
    .array(z.string().min(1))
    .min(1, "At least one parameter is required"),

    returnType: z.string().min(1, "Return type is required")

})



export const createProblemSchema = z.object({
title: z.string().min(2,"Tiltle too short"),
description: z.string().min(10,"description should be long"),
difficulty: z.enum(["easy", "medium", "hard"]),
visibility:z.enum(["PUBLIC", "PRIVATE"]).optional(),
topics:z.string().min(1),
functionSignature : functionSignatureSchema,
testCases: z
    .array(
      z.object({
        input: z.any(),
        expectedOutput: z.any()
      })
    )
    .min(1)
    .max(2)
// input:z.string().min(1),
// expectedOutput:z.string().min(1)
});
*/


/*
import { z } from "zod";

export const functionSignatureSchema = z.object({
  name: z
    .string()
    .min(1, "Function name is required")
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Invalid function name"),

 
  //  string (comma separated)
  params: z.string().min(1, "Params are required"),

  returnType: z.string().min(1, "Return type is required"),
});

export const testCaseSchema = z.object({
  input: z
    .string()
    .min(1, "Input is required")
    .transform((val) => JSON.parse(val)),

  expectedOutput: z
    .string()
    .min(1, "Expected output is required")
    .transform((val) => JSON.parse(val)),
});
export const createProblemSchema = z.object({
  title: z.string().min(2, "Title too short"),
  description: z.string().min(10, "Description too short"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topics: z.string().min(1, "Topics required"),

  functionSignature: functionSignatureSchema,
//testCases: z.array(testCaseSchema).min(1),
  // // ❌ testCases direct nahi lete
  // // ✅ input + expectedOutput lete hain
  input: z.string().min(1, "Input required"),
  expectedOutput: z.string().min(1, "Expected output required"),
});

export default {functionSignatureSchema,testCaseSchema,createProblemSchema};
*/




// perfectly working before cycle 
/*
import { z } from "zod";

export const functionSignatureSchema = z.object({
  name: z
    .string()
    .min(1, "Function name is required")
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Invalid function name"),

  // params: z.string().min(1, "Params are required"),
params: z.array(
  z.object({
    name: z.string().min(1),
    type: z.enum(["array", "number", "string", "matrix","tree","linkedlist"])
  })
).min(1),

  returnType: z.string().min(1, "Return type is required"),
});

export const testCaseSchema = z.object({
  input: z.string(),
  expectedOutput: z.string(),
});


export const createProblemSchema = z.object({
  title: z.string().min(2, "Title too short"),
  description: z.string().min(10, "Description too short"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topics: z.string().min(1, "Topics required"),

  functionSignature: functionSignatureSchema,

  testCases: z
    .array(testCaseSchema)
    .length(2)
    .refine((cases) => {
      const filled = cases.filter(
        (tc) =>
          tc.input.trim() !== "" &&
          tc.expectedOutput.trim() !== ""
      );
      return filled.length >= 1;
    }, "At least one complete test case required"),
});

*/


import { z } from "zod";

// =========================
// FUNCTION SIGNATURE
// =========================
export const functionSignatureSchema = z.object({
  name: z
    .string()
    .min(1, "Function name is required")
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Invalid function name"),

  params: z
    .array(
      z.object({
        name: z.string().min(1),
        // ❌ removed linkedlist_cycle
        type: z.enum([
          "array",
          "number",
          "string",
          "matrix",
          "tree",
          "linkedlist",
        ]),
      })
    )
    .min(1),

  returnType: z.string().min(1, "Return type is required"),
});

// =========================
// TEST CASE
// =========================
export const testCaseSchema = z.object({
  input: z.string(),
  expectedOutput: z.string(),

  // 🔥 optional extra (only used for linkedlist cycle)
  extra: z
    .object({
      pos: z.coerce.number().optional(),
    })
    .optional(),
});

// =========================
// MAIN SCHEMA
// =========================
export const createProblemSchema = z.object({
  title: z.string().min(2, "Title too short"),
  description: z.string().min(10, "Description too short"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topics: z.string().min(1, "Topics required"),

  functionSignature: functionSignatureSchema,

  testCases: z
    .array(testCaseSchema)
    .length(2)
    .refine((cases) => {
      const filled = cases.filter(
        (tc) =>
          tc.input.trim() !== "" &&
          tc.expectedOutput.trim() !== ""
      );
      return filled.length >= 1;
    }, "At least one complete test case required"),
});