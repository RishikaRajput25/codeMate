
/*
import React from 'react'
import Editor from '@monaco-editor/react';
import { api } from '../../../services/api';
const MonacoIDE = ({problem,code,setCode,onLanguageChange,language,onRun}) => {

const handleRun = async () => {
  onRun()
}



  return (
    <>
    <div className='bg-[#2a2c2e] rounded-2xl p-6 space-y-4 shadow-[#1f2124] w-1/2 '>
    

    <select
    value={language}
    onChange={(e)=>onLanguageChange(e.target.value)}
    className='h-10 w-24 bg-[#3e4142] rounded
          flex items-center justify-center
          cursor-pointer  hover:scale-103
          hover:bg-[#36393b] 
          hover:shadow-md '>


     


      <option value="javascript">javascript</option>
      <option value="python">python</option>
    </select>

    <button className=' border-2 h-10 w-16 rounded' onClick={handleRun}>Run</button>

    <div className='h-3/4'>
      <Editor
  height="100%"
  language={language}
  value={code}
  onChange={(value)=>setCode(value)}
  theme="vs-dark"
/>

</div>


  </div>
  
    </>
  )
}

export default MonacoIDE
*/

// <div className="bg-[#1f2124] mt-2 rounded p-4 space-y-3">
//   {runResults.map((r, i) => (
//     <div
//       key={i}
//       className={`p-3 rounded border ${
//         r.passed ? "border-green-500" : "border-red-500"
//       }`}
//     >
//       <p className="text-sm">Testcase {i + 1}</p>
//       <p>Input: {JSON.stringify(r.input)}</p>
//       <p>Expected: {JSON.stringify(r.expected)}</p>
//       <p>Output: {JSON.stringify(r.output)}</p>
//     </div>
//   ))}
// </div> 

import Editor from "@monaco-editor/react"
import TestResults from "./TestResults"
import { useState } from "react"
const MonacoIDE = ({
  language,
  onLanguageChange,
  code,
  setCode,
  onRun,
  onSubmit,
  runResults,
   runError,
   handleBookmarked,
   isBookmarked,
   handleAIExplain,
   passedTestCases,
   summary,
   submitting  
}) => {
  const [Prcode, setPrCode]= useState(true);
  


  
  return (
    // bg-[#2a2c2e] 
  <div className="bg-[#182032] rounded-2xl p-4 w-1/2 flex flex-col gap-4 h-full">
      <div className="flex items-center gap-4">

{/* bg-[#2a2c2e] */}
{/* hover:bg-[#3e4142] */}
        <div className="w-1/2 flex gap-3 ">
          {/* <button className=" border border-gray-500 bg-[#101727] rounded h-10 w-28  ">Code</button>
          <button onClick={()=>handleAIExplain()}  className=" border rounded h-10 w-28 bg-[#101727] ">Explain with Ai</button> */}
              <button
          onClick={onRun}
          className="border  rounded h-10 w-16 hover:bg-blue-500  "
        >
          Run
        </button>
        <button
  onClick={onSubmit}
  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded ml-2"
>
  Submit
</button>
          
        </div>
        <div className="w-1/2  flex justify-end gap-2 p-2  ">
          {/* <button
          onClick={onRun}
          className="border  rounded h-10 w-16  "
        >
          Run
        </button>
        <button
  onClick={onSubmit}
  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded ml-2"
>
  Submit
</button> */}
<button onClick={()=>handleAIExplain()}  className=" border rounded h-10 w-28 bg-[#101727] ">Explain with Ai</button> 
<select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="border border-gray-500 bg-[#101727] px-3 py-2 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
           <option value="java">Java</option>
        </select>

        <button onClick={()=>handleBookmarked()}   className=" text-2xl w-16 hover:scale-105 ">

  {isBookmarked ? <i class="fa-solid fa-bookmark "></i>:<i class="fa-regular fa-bookmark"></i> }
</button>
        </div>



      </div>
      { Prcode ?(
        <>
        <div onClick={()=>{setPrCode(true)}}>
      <div className="h-100">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="bg-[#101727]"
          onChange={(value) => setCode(value)}
        />
      </div>
      <div className="space-y-2 max-h-50 overflow-y-auto min-h-0">
 <TestResults results={runResults} error={runError} passedTestCases={passedTestCases} summary={summary} submitting={submitting} /></div>
 </div>
 </>
 ):(
     
     <div onClick={()=>{setPrCode(false)}}>
       Submission Page
     </div>)
}

    </div>
  )
}

export default MonacoIDE
