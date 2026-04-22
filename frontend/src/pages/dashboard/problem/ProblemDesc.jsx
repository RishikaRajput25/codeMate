import React from 'react'
import {Delete, User} from "lucide-react"
const ProblemDesc = ({problem,aiMessage,aiLoading,showAiModal,setShowAiModal,setAiMessage}) => {
  return (
    <>
    {/* h-screen  */}
    {/* bg-[#2a2c2e] */}
    {problem ? (
    <div className=" relative bg-[#182032] rounded-2xl p-6 space-y-4 w-1/2 shadow-[#1f2124] h-full overflow-y-auto">
      
      <h1 className="text-2xl font-bold">{problem.title}</h1>
      <p className="text-gray-300">{problem.description}</p>

      <p className="text-sm">
        <span className="font-semibold">Difficulty:</span> {problem.difficulty}
      </p>

      <div>
        <h2 className="text-lg font-semibold mb-2">Test Cases</h2>
{/* bg-[#1f2124]  */}
        {problem.testCases.map((tc, index) => (
          <div
            key={index}
            className="p-3 rounded mb-2 bg-[#101727]"
          >
            <p>
              <span className="font-semibold">Input:</span>{' '}
              <code className="text-green-400">
                {JSON.stringify(tc.input)}
              </code>
            </p>

            <p>
              <span className="font-semibold">Expected Output:</span>{' '}
              <code className="text-blue-400">
                {JSON.stringify(tc.expectedOutput)}
              </code>
            </p>
          </div>
        ))}
      </div>


{/* AI MODAL */}
      {showAiModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
         
          <div className="bg-[#1f2124] w-175 max-h-[50vh] rounded-xl p-6 pt-1 overflow-y-auto">


               <div className="flex justify-between ">
                <h2 className="text-xl font-semibold mb-4 mt-3 text-white">
              AI Code Review
            </h2>
              <button
                onClick={() => {
                  setShowAiModal(false)
                  setAiMessage("")
                  
                }
                }
                
                className="px-4 py-2 text-2xl text-white rounded "
              >
               {/* <Delete/> */}
               <i class="fa-solid fa-x"></i>
              </button>
           
            
 </div>
            {aiLoading ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-300">
                  AI is analyzing your code...
                </p>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-gray-200">
                {aiMessage}
              </pre>
            )}

            {/* CANCEL BUTTON */}
            {/* <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowAiModal(false)
                  setAiMessage("")
                }
                }
                
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Cancel
              </button>
            </div> */}

          </div>

        </div>
      )}


    </div>



  ) : (
    <p>Loading... </p>
  )}

{/* fixed  */}
  

    </>
    
  )
}

export default ProblemDesc
