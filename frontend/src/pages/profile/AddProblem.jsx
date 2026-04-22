/*
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProblemSchema } from "../../schema/problem.schema";
import { createProblem } from "../../services/api";
import { useNavigate } from "react-router-dom";
const AddProblem = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProblemSchema),
     defaultValues: {
    testCases: [
      { input: "", expectedOutput: "" },
      { input: "", expectedOutput: "" },
    ],
  },

  });


  const onSubmit = async (data) => {
    try {
      console.log("onsubmit ke ander tak aa raha hai ")

     
const cleanedTestCases = data.testCases
  .filter(
    (tc) =>
      tc.input.trim() !== "" &&
      tc.expectedOutput.trim() !== ""
  )
  .map((tc) => ({
    input: JSON.parse(tc.input),
    expectedOutput: JSON.parse(tc.expectedOutput),
  }));

      const payload = {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,

        topics: data.topics.split(",").map((t) => t.trim()),

        functionSignature: {
          name: data.functionSignature.name,

          
          params: data.functionSignature.params
            .split(",")
            .map((p) => p.trim()),

          returnType: data.functionSignature.returnType,
        },

      
        
        // testCases: data.testCases,
         testCases: cleanedTestCases,
      };

      console.log("FINAL PAYLOAD 👉", payload);

      await createProblem(payload);
      navigate('/myProblems')
      alert("Problem created successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
<div className=" bg-white p-28 ">
<div className="max-w-3xl mx-auto p-8 bg-gray-50 shadow-lg rounded-xl ">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New Problem
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        
       

        <div>
          <label className="label">Title</label>
          <input className="input" placeholder=" Array Sum" {...register("title")} />
          <p className="error">{errors.title?.message}</p>
        </div>

        <div>
          <label className="label">Description</label>
          <textarea className="input h-28" {...register("description")} />
          <p className="error">{errors.description?.message}</p>
        </div>

      
        <div>
          <label className="label">Difficulty</label>
          <select className="input" {...register("difficulty")}>
            <option value="">Select</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <p className="error">{errors.difficulty?.message}</p>
        </div>

    
        <div>
          <label className="label">Topics (comma separated)</label>
          <input className="input" placeholder="array" {...register("topics")} />
          <p className="error">{errors.topics?.message}</p>
        </div>

        <div className="border p-4 rounded-lg bg-gray-50">
          <p className="font-medium mb-3">Function Signature</p>

          <input
            className="input mb-2"
            placeholder="Function name, eg: Sum"
            {...register("functionSignature.name")}
          />
          <p className="error">
            {errors.functionSignature?.name?.message}
          </p>

          <input
            className="input mb-2"
            placeholder="Params (s,target)"
            {...register("functionSignature.params")}
          />
          <p className="error">
            {errors.functionSignature?.params?.message}
          </p>

          <input
            className="input"
            placeholder="Return type"
            {...register("functionSignature.returnType")}
          />
          <p className="error">
            {errors.functionSignature?.returnType?.message}
          </p>
        </div>

       
        <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <label className="label">Input (JSON)</label>
          <textarea className="input" placeholder="[[1,2,3,4,5]]
" {...register("testCases.0.input")} />
          
         <p className="error">{errors.testCases?.[0]?.input?.message}</p>

        </div>

        <div className="w-1/2">
          <label className="label">Input (JSON)</label>
          <textarea className="input" placeholder="[[1,2,3,4,5]]
" {...register("testCases.1.input")} />
          
          <p className="error">{errors.testCases?.[1]?.input?.message}</p>

        </div>
</div>
 

 <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <label className="label">Expected Output (JSON)</label>
          <textarea className="input" placeholder="[15]" {...register("testCases.0.expectedOutput")} />
          <p className="error">{errors.expectedOutput?.message}</p>
        </div>
         <div className="w-1/2">

          <label className="label">Expected Output (JSON)</label>
          <textarea className="input" placeholder="[15]" {...register("testCases.1.expectedOutput")} />
          <p className="error">{errors.expectedOutput?.message}</p>
        </div>
</div>


       
        <button
          disabled={isSubmitting}
         onClick={()=>console.log("CLicked")}
          className="w-full bg-[#2a2c2e]   hover:bg-[#36393b] text-white py-2 rounded-lg  transition"
        >
          {isSubmitting ? "Creating..." : "Create Problem"}
        </button>
      </form>
    </div></div>
  );
};

export default AddProblem;
*/




























/*
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProblemSchema } from "../../schema/problem.schema";
import { createProblem } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AddProblem = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProblemSchema),
    defaultValues: {
      functionSignature: {
        params: [{ name: "", type: "number" }], // ✅ at least one param
      },
      testCases: [
        { input: "", expectedOutput: "" },
        { input: "", expectedOutput: "" },
      ],
    },
  });

  // ✅ dynamic params
  const { fields, append, remove } = useFieldArray({
    control,
    name: "functionSignature.params",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data 👉", data);

      const cleanedTestCases = data.testCases
        .filter(
          (tc) =>
            tc.input.trim() !== "" &&
            tc.expectedOutput.trim() !== ""
        )
        .map((tc) => ({
          input: JSON.parse(tc.input),
          expectedOutput: JSON.parse(tc.expectedOutput),
        }));

      const payload = {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        topics: data.topics.split(",").map((t) => t.trim()),

        functionSignature: {
          name: data.functionSignature.name,
          params: data.functionSignature.params, // ✅ already correct format
          returnType: data.functionSignature.returnType,
        },

        testCases: cleanedTestCases,
      };

      console.log("FINAL PAYLOAD 👉", payload);

      await createProblem(payload);
      navigate("/myProblems");
      alert("Problem created successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white p-28">
      <div className="max-w-3xl mx-auto p-8 bg-gray-50 shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create New Problem
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

       
          <div>
            <label className="label">Title</label>
            <input className="input" {...register("title")} />
            <p className="error">{errors.title?.message}</p>
          </div>

      
          <div>
            <label className="label">Description</label>
            <textarea className="input h-28" {...register("description")} />
            <p className="error">{errors.description?.message}</p>
          </div>

       
          <div>
            <label className="label">Difficulty</label>
            <select className="input" {...register("difficulty")}>
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <p className="error">{errors.difficulty?.message}</p>
          </div>

          
          <div>
            <label className="label">Topics</label>
            <input className="input" {...register("topics")} />
            <p className="error">{errors.topics?.message}</p>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <p className="font-medium mb-3">Function Signature</p>

            <input
              className="input mb-2"
              placeholder="Function name"
              {...register("functionSignature.name")}
            />
            <p className="error">
              {errors.functionSignature?.name?.message}
            </p>

          
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">

       
                  <input
                    placeholder="name"
                    className="input w-1/2"
                    {...register(`functionSignature.params.${index}.name`)}
                  />

       
                  <select
                    className="input w-1/2"
                    {...register(`functionSignature.params.${index}.type`)}
                  >
                    <option value="number">number</option>
                    <option value="array">array</option>
                    <option value="string">string</option>
                    <option value="matrix">matrix</option>
                    <option value="tree">tree</option>
                    <option value="linkedlist">linkedlist</option>

                  </select>

               
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-black"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>

          
            <button
              type="button"
              onClick={() => append({ name: "", type: "number" })}
              className="mt-2 text-blue-500"
            >
              + Add Param
            </button>

            <input
              className="input mt-3"
              placeholder="Return type"
              {...register("functionSignature.returnType")}
            />
            <p className="error">
              {errors.functionSignature?.returnType?.message}
            </p>
          </div>

        
          <div className="flex gap-4">
            <textarea
              className="input w-1/2"
              placeholder='[[1,2,3],2]'
              {...register("testCases.0.input")}
            />
            <textarea
              className="input w-1/2"
              placeholder='[[4,5,6],5]'
              {...register("testCases.1.input")}
            />
          </div>

          <div className="flex gap-4">
            <textarea
              className="input w-1/2"
              placeholder='3'
              {...register("testCases.0.expectedOutput")}
            />
            <textarea
              className="input w-1/2"
              placeholder='1'
              {...register("testCases.1.expectedOutput")}
            />
          </div>

      
          <button
            disabled={isSubmitting}
            className="w-full bg-[#2a2c2e] text-white py-2 rounded-lg"
          >
            {isSubmitting ? "Creating..." : "Create Problem"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
*/



//UI changes
/*
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProblemSchema } from "../../schema/problem.schema";
import { createProblem } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const AddProblem = () => {
  const navigate = useNavigate();

  const [aiMode, setAiMode] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProblemSchema),
    defaultValues: {
      functionSignature: {
        params: [{ name: "", type: "number" }],
      },
      testCases: [
        { input: "", expectedOutput: "" },
        { input: "", expectedOutput: "" },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "functionSignature.params",
  });

  // 🔥 VALIDATE AI RESPONSE USING ZOD
  const validateAIResponse = (data) => {
    try {
      const formatted = {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        topics: Array.isArray(data.topics)
          ? data.topics.join(",")
          : data.topics,

        functionSignature: {
          name: data.functionSignature?.name,
          params: data.functionSignature?.params || [],
          returnType: data.functionSignature?.returnType,
        },

        // testCases: data.testCases?.map((tc) => ({
        //   input: JSON.stringify(tc.input),
        //   expectedOutput: JSON.stringify(tc.expectedOutput),
        // })),

          testCases: data.testCases
        ?.slice(0, 2)
        .map((tc) => ({
          input: JSON.stringify(tc.input),
          expectedOutput: JSON.stringify(tc.expectedOutput),
        })),

      };

      const parsed = createProblemSchema.parse(formatted);
      return parsed;
    } catch (err) {
      console.error(err);
      alert("AI generated invalid data. Please edit manually.");
      return null;
    }
  };

  // 🤖 GENERATE FROM AI
  const handleGenerateAI = async () => {
    try {
      if (!aiInput.trim()) return alert("Enter problem first");

      setLoadingAI(true);

      const res = await api.post("/problems/generate-ai", {
        rawProblem: aiInput,
      });

      const safeData = validateAIResponse(res.data);
      if (!safeData) return;

      // 🔥 reset form
      reset(safeData);

      // 🔥 replace params
      replace(safeData.functionSignature.params);

    } catch (err) {
      console.error(err);
      alert("AI generation failed");
    } finally {
      setLoadingAI(false);
    }
  };

  // ✅ SUBMIT
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        topics: data.topics.split(",").map((t) => t.trim()),
        testCases: data.testCases.map((tc) => ({
          input: JSON.parse(tc.input),
          expectedOutput: JSON.parse(tc.expectedOutput),
        })),
      };

      await createProblem(payload);
      alert("Problem created successfully");
      navigate("/myProblems");

    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1f22] p-10 text-white">

      <div className="max-w-3xl mx-auto bg-[#2a2c2e] p-8 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">Create Problem</h2>

       
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setAiMode(false)}
            className={`px-4 py-2 rounded ${!aiMode ? "bg-blue-500" : "bg-gray-700"}`}
          >
            Manual
          </button>

          <button
            onClick={() => setAiMode(true)}
            className={`px-4 py-2 rounded ${aiMode ? "bg-blue-500" : "bg-gray-700"}`}
          >
            AI Generate
          </button>
        </div>

       
        {aiMode && (
          <div className="mb-6">
            <textarea
              className="w-full p-3 rounded bg-[#1e1f22]"
              placeholder="Paste full problem OR just description..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
            />
            <button
              onClick={handleGenerateAI}
              className="mt-3 bg-green-500 px-4 py-2 rounded w-full"
            >
              {loadingAI ? "Generating..." : "✨ Generate with AI"}
            </button>
          </div>
        )}

       
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input {...register("title")} placeholder="Title" className="input" />
          <p className="error">{errors.title?.message}</p>

          <textarea {...register("description")} placeholder="Description" className="input" />
          <p className="error">{errors.description?.message}</p>

          <select {...register("difficulty")} className="input">
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input {...register("topics")} placeholder="Topics (comma separated)" className="input" />

          <input {...register("functionSignature.name")} placeholder="Function Name" className="input" />

          
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`functionSignature.params.${index}.name`)}
                placeholder="param name"
                className="input w-1/2"
              />

              <select
                {...register(`functionSignature.params.${index}.type`)}
                className="input w-1/2"
              >
                <option value="number">number</option>
                <option value="array">array</option>
                <option value="string">string</option>
                <option value="matrix">matrix</option>
                <option value="tree">tree</option>
                <option value="linkedlist">linkedlist</option>
              </select>

              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)}>
                  ❌
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", type: "number" })}
            className="text-blue-400"
          >
            + Add Param
          </button>

          <input {...register("functionSignature.returnType")} placeholder="Return Type" className="input" />

         


          <div className="flex gap-4">
            <textarea {...register("testCases.0.input")} className="input w-1/2" placeholder='[1,2,3]' />
            <textarea {...register("testCases.1.input")} className="input w-1/2" placeholder='[4,5,6]' />
          </div>

          <div className="flex gap-4">
            <textarea {...register("testCases.0.expectedOutput")} className="input w-1/2" placeholder='3' />
            <textarea {...register("testCases.1.expectedOutput")} className="input w-1/2" placeholder='1' />
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 py-2 rounded"
          >
            {isSubmitting ? "Creating..." : "Create Problem"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProblem;
*/



























// sab badhiya hai before cycle 


// import React, { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createProblemSchema } from "../../schema/problem.schema";
// import { createProblem } from "../../services/api";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../services/api";

// const AddProblem = () => {
//   const navigate = useNavigate();

//   const [aiMode, setAiMode] = useState(false);
//   const [aiInput, setAiInput] = useState("");
//   const [loadingAI, setLoadingAI] = useState(false);

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(createProblemSchema),
//     defaultValues: {
//       functionSignature: {
//         params: [{ name: "", type: "number" }],
//       },
//       testCases: [
//         { input: "", expectedOutput: "" },
//         { input: "", expectedOutput: "" },
//       ],
//     },
//   });

//   const { fields, append, remove, replace } = useFieldArray({
//     control,
//     name: "functionSignature.params",
//   });

//   const validateAIResponse = (data) => {
//     try {
//       const formatted = {
//         title: data.title,
//         description: data.description,
//         difficulty: data.difficulty,
//         topics: Array.isArray(data.topics)
//           ? data.topics.join(",")
//           : data.topics,
//         functionSignature: {
//           name: data.functionSignature?.name,
//           params: data.functionSignature?.params || [],
//           returnType: data.functionSignature?.returnType,
//         },
//         testCases: data.testCases
//           ?.slice(0, 2)
//           .map((tc) => ({
//             input: JSON.stringify(tc.input),
//             expectedOutput: JSON.stringify(tc.expectedOutput),
//           })),
//       };

//       return createProblemSchema.parse(formatted);
//     } catch (err) {
//       alert("AI generated invalid data. Please edit manually.");
//       return null;
//     }
//   };

//   const handleGenerateAI = async () => {
//     try {
//       if (!aiInput.trim()) return alert("Enter problem first");

//       setLoadingAI(true);

//       const res = await api.post("/problems/generate-ai", {
//         rawProblem: aiInput,
//       });

//       const safeData = validateAIResponse(res.data);
//       if (!safeData) return;

//       reset(safeData);
//       replace(safeData.functionSignature.params);

//     } catch (err) {
//       alert("AI generation failed");
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         ...data,
//         topics: data.topics.split(",").map((t) => t.trim()),
//         testCases: data.testCases.map((tc) => ({
//           input: JSON.parse(tc.input),
//           expectedOutput: JSON.parse(tc.expectedOutput),
//         })),
//       };

//       await createProblem(payload);
//       alert("Problem created successfully");
//       navigate("/myProblems");
//     } catch (err) {
//       alert("Submit failed");
//     }
//   };

//   return (


// <div className="min-h-screen bg-[#0f172a] px-6 py-10 text-white">

//   <div className="max-w-4xl mx-auto 
//   bg-white/5 backdrop-blur-lg border border-white/10
//   rounded-2xl shadow-xl p-8">

//     <h2 className="text-3xl font-semibold mb-8 text-blue-400 text-center">
//       Create Problem
//     </h2>

//     {/* MODE TOGGLE */}
//     <div className="flex gap-3 mb-6">
//       <button
//         onClick={() => setAiMode(false)}
//         className={`px-4 py-2 rounded-lg text-sm font-medium transition
//         ${!aiMode ? "bg-blue-400 text-black" : "bg-[#1e293b] text-gray-300"}`}
//       >
//         Manual
//       </button>

//       <button
//         onClick={() => setAiMode(true)}
//         className={`px-4 py-2 rounded-lg text-sm font-medium transition
//         ${aiMode ? "bg-blue-400 text-black" : "bg-[#1e293b] text-gray-300"}`}
//       >
//         AI Generate
//       </button>
//     </div>

//     {/* AI INPUT */}
//     {aiMode && (
//       <div className="mb-6 space-y-3">
//         <label className="label">AI Input</label>
//         <textarea
//           className="w-full p-3 rounded-lg bg-[#1e293b] border border-white/10 text-white placeholder-gray-400"
//           placeholder="Paste problem or description..."
//           value={aiInput}
//           onChange={(e) => setAiInput(e.target.value)}
//         />

//         <button
//           onClick={handleGenerateAI}
//           className="w-full py-2 rounded-lg bg-blue-400 hover:opacity-90 flex items-center justify-center gap-2"
//         >
//           {loadingAI ? (
//             "Generating..."
//           ) : (
//             <>
//               <i className="fa-solid fa-robot"></i>
//               Generate with AI
//             </>
//           )}
//         </button>
//       </div>
//     )}

//     {/* FORM */}
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//       {/* TITLE */}
//       <div>
//         <label className="label mb-1">Title</label>
//         <input {...register("title")} placeholder="Title" className="input" />
//       </div>

//       {/* DESCRIPTION */}
//       <div>
//         <label className="label mb-1">Description</label>
//         <textarea {...register("description")} placeholder="Description" className="input h-28" />
//       </div>

//       {/* DIFFICULTY + TOPICS */}
//       <div className="grid md:grid-cols-2 gap-4">

//         <div className="relative w-full">
//           <label className="label mb-1">Difficulty</label>

//           <select
//             {...register("difficulty")}
//             className="input appearance-none pr-10"
//           >
//             <option value="" className="bg-[#0f172a]">Select Difficulty</option>
//             <option value="easy" className="bg-[#0f172a]">Easy</option>
//             <option value="medium" className="bg-[#0f172a]">Medium</option>
//             <option value="hard" className="bg-[#0f172a]">Hard</option>
//           </select>

//           <div className="absolute right-3 top-[38px] pointer-events-none text-gray-400">
//             <i className="fa-solid fa-chevron-down"></i>
//           </div>
//         </div>

//         <div>
//           <label className="label mb-1">Topics</label>
//           <input {...register("topics")} placeholder="Topics (comma separated)" className="input" />
//         </div>
//       </div>

//       {/* FUNCTION SIGNATURE */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="label mb-1">Function Name</label>
//           <input {...register("functionSignature.name")} placeholder="Function Name" className="input" />
//         </div>

//         <div>
//           <label className="label mb-1">Return Type</label>
//           <input {...register("functionSignature.returnType")} placeholder="Return Type" className="input" />
//         </div>
//       </div>

//       {/* PARAMS */}
//       <div className="space-y-3">
//         <label className="label">Parameters</label>

//         {fields.map((field, index) => (
//           <div key={field.id} className="flex gap-2">

//             <input
//               {...register(`functionSignature.params.${index}.name`)}
//               placeholder="param name"
//               className="input w-1/2"
//             />

//             <div className="relative w-1/2">
//               <select
//                 {...register(`functionSignature.params.${index}.type`)}
//                 className="input appearance-none pr-10"
//               >
//                 <option value="number" className="bg-[#0f172a]">number</option>
//                 <option value="array" className="bg-[#0f172a]">array</option>
//                 <option value="string" className="bg-[#0f172a]">string</option>
//                 <option value="matrix" className="bg-[#0f172a]">matrix</option>
//                 <option value="linkedlist">linkedlist</option>
//                 <option value="linkedlist_cycle">linkedlist_cycle</option>
//                 <option value="tree">tree</option>
//               </select>

//               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                 <i className="fa-solid fa-chevron-down"></i>
//               </div>
//             </div>

//             {fields.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => remove(index)}
//                 className="text-red-400"
//               >
//                 <i class="fa-solid fa-xmark"></i>
//               </button>
//             )}
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={() => append({ name: "", type: "number" })}
//           className="text-blue-400 text-sm"
//         >
//           + Add Param
//         </button>
//       </div>

//       {/* TEST CASES */}
//       <div>
//         <label className="label mb-2">Test Cases</label>

//         <div className="grid md:grid-cols-2 gap-4">
//           <textarea {...register("testCases.0.input")} className="input" placeholder="Input 1" />
//           <textarea {...register("testCases.1.input")} className="input" placeholder="Input 2" />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4 mt-2">
//           <textarea {...register("testCases.0.expectedOutput")} className="input" placeholder="Output 1" />
//           <textarea {...register("testCases.1.expectedOutput")} className="input" placeholder="Output 2" />
//         </div>
//       </div>

//       {/* SUBMIT */}
//       <button
//         disabled={isSubmitting}
//         className="w-full py-2 rounded-lg font-medium bg-blue-400 hover:opacity-90"
//       >
//         {isSubmitting ? "Creating..." : "Create Problem"}
//       </button>

//     </form>
//   </div>
// </div>
//   );
// };

// export default AddProblem;
















import React, { useState, useMemo } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProblemSchema } from "../../schema/problem.schema";
import { createProblem } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const AddProblem = () => {
  const navigate = useNavigate();

  const [aiMode, setAiMode] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(createProblemSchema),
    defaultValues: {
      functionSignature: {
        params: [{ name: "", type: "number" }],
      },
      testCases: [
        { input: "", expectedOutput: "", extra: { pos: -1 } },
        { input: "", expectedOutput: "", extra: { pos: -1 } },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "functionSignature.params",
  });

  const params = useWatch({
    control,
    name: "functionSignature.params",
  });

  const hasLinkedList = useMemo(() => {
    return params?.some((p) => p.type === "linkedlist");
  }, [params]);

  // ================= AI FIX =================
  const validateAIResponse = (data) => {
    try {
      const formatted = {
        title: data.title || "",
        description: data.description || "",
        difficulty: data.difficulty || "easy",

        topics: Array.isArray(data.topics)
          ? data.topics.join(",")
          : data.topics || "",

        functionSignature: {
          name: data.functionSignature?.name || "",
          params: (data.functionSignature?.params || []).map((p) => ({
            name: p.name || "param",
            type: p.type === "linkedlist_cycle" ? "linkedlist" : p.type,
          })),
          returnType: data.functionSignature?.returnType || "number",
        },

        testCases: (data.testCases || []).slice(0, 2).map((tc) => ({
          input: JSON.stringify(tc.input ?? []),
          expectedOutput: JSON.stringify(tc.expectedOutput ?? null),
          extra: {
            pos: typeof tc.extra?.pos === "number" ? tc.extra.pos : -1,
          },
        })),
      };

      return createProblemSchema.parse(formatted);
    } catch (err) {
      alert("AI generated invalid data. Please edit manually.");
      return null;
    }
  };

  const handleGenerateAI = async () => {
    try {
      if (!aiInput.trim()) return alert("Enter problem first");

      setLoadingAI(true);

      const res = await api.post("/problems/generate-ai", {
        rawProblem: aiInput,
      });

      const safeData = validateAIResponse(res.data);
      if (!safeData) return;

      reset(safeData);
      replace(safeData.functionSignature.params);

    } catch (err) {
      alert("AI generation failed");
    } finally {
      setLoadingAI(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        topics: data.topics.split(",").map((t) => t.trim()),

        testCases: data.testCases.map((tc) => ({
          input: JSON.parse(tc.input),
          expectedOutput: JSON.parse(tc.expectedOutput),
          extra: hasLinkedList
            ? { pos: Number(tc.extra?.pos ?? -1) }
            : undefined,
        })),
      };

      await createProblem(payload);
      alert("Problem created successfully");
      navigate("/myProblems");

    } catch (err) {
      alert("Submit failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] px-6 py-10 text-white">

      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-semibold mb-8 text-blue-400 text-center ">
          Create Problem
        </h2>

        {/* MODE TOGGLE */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setAiMode(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${!aiMode ? "bg-blue-400 text-black" : "bg-[#1e293b] text-gray-300"}`}
          >
            Manual
          </button>

          <button
            onClick={() => setAiMode(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${aiMode ? "bg-blue-400 text-black" : "bg-[#1e293b] text-gray-300"}`}
          >
            AI Generate
          </button>
        </div>

        {/* AI INPUT */}
        {aiMode && (
          <div className="mb-6 space-y-3">
            <label className="text-sm text-gray-300">AI Input</label>

            <textarea
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-white/10 text-white placeholder-gray-400"
              placeholder="Paste problem or description..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
            />

            <button
              onClick={handleGenerateAI}
              className="w-full py-2 rounded-lg bg-blue-400 hover:opacity-90 font-medium"
            >
              {loadingAI ? "Generating..." : "Generate with AI"}
            </button>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Title</label>
            <input {...register("title")} className="input" />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Description</label>
            <textarea {...register("description")} className="input h-28" />
          </div>

          {/* DIFFICULTY + TOPICS */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Difficulty</label>
              <select {...register("difficulty")} className="input bg-[#1e293b]">
                <option value="">Select</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Topics</label>
              <input {...register("topics")} className="input" />
            </div>
          </div>

          {/* FUNCTION */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Function Name</label>
              <input {...register("functionSignature.name")} className="input" />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Return Type</label>
              <input {...register("functionSignature.returnType")} className="input" />
            </div>
          </div>

          {/* PARAMS */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Parameters</label>

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input
                  {...register(`functionSignature.params.${index}.name`)}
                  placeholder="param name"
                  className="input w-1/2"
                />

                <select
                  {...register(`functionSignature.params.${index}.type`)}
                  className="input w-1/2 bg-[#1e293b]"
                >
                  <option value="number">number</option>
                  <option value="array">array</option>
                  <option value="string">string</option>
                  <option value="matrix">matrix</option>
                  <option value="linkedlist">linkedlist</option>
                  <option value="tree">tree</option>
                </select>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-400"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ name: "", type: "number" })}
              className="text-blue-400 text-sm"
            >
              + Add Param
            </button>
          </div>

          {/* TEST CASES */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Test Cases</label>

            {[0, 1].map((i) => (
              <div key={i} className="grid md:grid-cols-2 gap-4 mb-3">

                <textarea
                  {...register(`testCases.${i}.input`)}
                  placeholder={`Input ${i + 1}`}
                  className="input"
                />

                <textarea
                  {...register(`testCases.${i}.expectedOutput`)}
                  placeholder={`Output ${i + 1}`}
                  className="input"
                />

                {hasLinkedList && (
                  <>
                  <label className="text-sm text-gray-300 mb-2 block">Extra params</label>
                  <input
                    type="number"
                    {...register(`testCases.${i}.extra.pos`)}
                    placeholder="Cycle pos (-1 if none)"
                    className="input col-span-2"
                  />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* SUBMIT */}
          <button
            disabled={isSubmitting}
            className="w-full py-2 rounded-lg bg-blue-400 hover:opacity-90 font-medium"
          >
            {isSubmitting ? "Creating..." : "Create Problem"}
          </button>

        </form>
      </div>
    </div>
  );
};
export default AddProblem;

