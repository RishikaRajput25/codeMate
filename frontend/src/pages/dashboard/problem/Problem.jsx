
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { api } from '../../../services/api'

// const Problem = () => {
//   const { problemId } = useParams()
//   const [problem, setProblem] = useState(null)

//   useEffect(() => {
//     const fetchProblem = async () => {
//       const res = await api.get(`/problems/${problemId}`)
//       setProblem(res.data.data)
//     }
//     fetchProblem()
//   }, [problemId])

//   return (

//     <>
//     <div className="min-h-full w-full bg-[#1f2124] text-white pt-20">
//   {problem ? (
//     <div className="bg-[#2a2c2e] rounded-2xl p-6 space-y-4 shadow-[#1f2124] w-1/2">
      
//       <h1 className="text-2xl font-bold">{problem.title}</h1>
//       <p className="text-gray-300">{problem.description}</p>

//       <p className="text-sm">
//         <span className="font-semibold">Difficulty:</span> {problem.difficulty}
//       </p>

//       <div>
//         <h2 className="text-lg font-semibold mb-2">Test Cases</h2>

//         {problem.testCases.map((tc, index) => (
//           <div
//             key={index}
//             className="bg-[#1f2124] p-3 rounded mb-2"
//           >
//             <p>
//               <span className="font-semibold">Input:</span>{' '}
//               <code className="text-green-400">
//                 {JSON.stringify(tc.input)}
//               </code>
//             </p>

//             <p>
//               <span className="font-semibold">Expected Output:</span>{' '}
//               <code className="text-blue-400">
//                 {JSON.stringify(tc.expectedOutput)}
//               </code>
//             </p>
//           </div>
//         ))}
//       </div>

//     </div>



//   ) : (
//     <p>Loading... {problemId}</p>
//   )}
// </div>

//     </>
//   )
// }

// export default Problem


//current code

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { api } from '../../../services/api'
// import ProblemDesc from './ProblemDesc'
// import MonacoIDE from './MonacoIDE'

// const Problem = () => {
//   const { problemId } = useParams()
//   const [problem, setProblem] = useState(null)

//   useEffect(() => {
//     const fetchProblem = async () => {
//       const res = await api.get(`/problems/${problemId}`)
//       setProblem(res.data.data)
//     }
//     fetchProblem()
//   }, [problemId])

//   return (

//     <>
//     <div className=" min-h-screen w-full bg-[#1f2124] text-white pt-20 flex px-2 py-1 gap-2">
//    <ProblemDesc problem={problem} setProblem={setProblem}/>
//    <MonacoIDE problem={problem} setProblem={setProblem}/>
// </div>

//     </>
//   )
// }

// export default Problem





//current working
/*
 import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../services/api'
import ProblemDesc from './ProblemDesc'
import MonacoIDE from './MonacoIDE'

const Problem = () => {
  const { problemId } = useParams()
  const [problem, setProblem] = useState(null)
  const[ language, setLanguage]= useState("javascript");
  const[code, setCode]= useState("")
  const [runResults, setRunResults] = useState([])
const[codeMap, setCodeMap]= useState({
  javascrip:"",
  python:""
})
  const getBoilerplate=(problem,lang)=>{
    if(!problem?.boilerplate){
      return "";
    }
    const found= problem.boilerplate.find((b)=>b.language===lang.toUpperCase())
    return found?.code || ""
  }

  useEffect(() => {
    const fetchProblem = async () => {
      const res = await api.get(`/problems/${problemId}`)
      const prob=res.data.data
      setProblem(prob)

      // setCode(getBoilerplate(prob,language))

      setCodeMap({
        javascript:getBoilerplate(prob,"javascript"),
        python: getBoilerplate(prob, "python")
      })
    }
    fetchProblem()
  }, [problemId])

  const handleLanguageChange=(lang)=>{
    setLanguage(lang)
    // setCode(getBoilerplate(problem,lang))
  }
const handleRun = async () => {
  const res = await api.post("/problems/run", {
    language,
    code: codeMap[language],
    problem
  })

  setRunResults(res.data.data)
}
  return (

    <>
    <div className=" min-h-screen w-full bg-[#1f2124] text-white pt-20 flex px-2 py-1 gap-2">
   <ProblemDesc problem={problem} 
   
   />
   <MonacoIDE 
   problem={problem} 
   language={language}
   onRun={handleRun}
   code={codeMap[language]}
    setCode={(val)=>
      setCodeMap((prev)=>({
        ...prev,
        [language]:val
      }))
    }
  
   onLanguageChange={handleLanguageChange}/>
</div>

    </>
  )
}

export default Problem
*/


//perfectly  running code 

import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../../services/api"
import MonacoIDE from "./MonacoIDE"
import ProblemDesc from "./ProblemDesc"
import { useAuth } from "../../../context/AuthContext"

const Problem = () => {
const {user}=useAuth();

  const { problemId } = useParams()

  const [problem, setProblem] = useState(null)
  const [language, setLanguage] = useState("javascript")
  const [runResults, setRunResults] = useState([])
  const [runError, setRunError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [aiMessage, setAiMessage] = useState(null);
const [aiLoading, setAiLoading] = useState(false);
const [showAiModal, setShowAiModal] = useState(false);
const [submitting, setSubmitting] = useState(false);
const [summary, setSummary] = useState(null);
const [passedTestCases, setPassedTestCases] = useState(null);
  const [codeMap, setCodeMap] = useState({
    javascript: "",
    python: "",
    cpp:"",
    java:"",
  })

  const getBoilerplate = (problem, lang) => {
    if (!problem?.boilerplate) return ""
    const found = problem.boilerplate.find(
      (b) => b.language === lang.toUpperCase()
    )
    return found?.code || ""
  }

  useEffect(() => {
   //old code start
    // const fetchProblem = async () => {
    //   const res = await api.get(`/problems/${problemId}`)
    //   const prob = res.data.data
    //   setProblem(prob)

    //   setCodeMap({
    //     javascript: getBoilerplate(prob, "javascript"),
    //     python: getBoilerplate(prob, "python")
    //   })
    // };
    //old code end

    //new start

  
   const fetchProblem = async () => {
    try{
      const res = await api.get(`/problems/${problemId}`)
      const prob = res.data.data
      setProblem(prob)

      setCodeMap({
        javascript: getBoilerplate(prob, "javascript"),
        python: getBoilerplate(prob, "python"),
        cpp: getBoilerplate(prob, "cpp"),
        java: getBoilerplate(prob, "java")
      });

    const subRes = await api.get(`/problems/submit/last/${problemId}`);
      const lastSubmission = subRes.data.data;

      if (lastSubmission) {
        setLanguage(lastSubmission.language);

        setCodeMap(prev => ({
          ...prev,
          [lastSubmission.language]: lastSubmission.code
        }));
      }

    }
    catch(error){
 console.log(error);
    }
    };
    




   //new end



    fetchProblem()

  }, [problemId])

  const handleRun = async () => {
    try{
     
    const res = await api.post("/problems/run", {
      language,
      code: codeMap[language],
      problemId
    })
    console.log("Run responce:", res.data);
     // 🔴 If backend sends error
      if (!res.data.data.success) {
        setRunError(res.data.data.message);
        setRunResults([]);
        return;
      }
    // ✅ Success case
      setRunError(null);
      setRunResults(res.data.data.results);
    
  }
    catch(err){
      if(!user){
 toast.error("please login to run code!")
}
 else{
  toast.error("Something went wrong while running code");
      
 }
setRunResults([]);
      setRunError(null);
   }}
  /*
const handleSubmit = async () => {
  try {
    if (!user) {
      toast.error("Please login to submit!");
      return;
    }
   

    const res = await api.post("/problems/submit", {
      problemId,
      language,
      code: codeMap[language],
    });

    const submission = res.data.submission;

    toast.success(`Submitted! Status: ${submission.status}`);

    // find first failed testcase
    const failed = submission.testResults.find(t => !t.passed);

    if (failed) {
      setRunResults([failed]);
    } else {
      setRunResults(submission.testResults);
    }

  } catch (err) {
    toast.error("Submission failed");
  }
};
*/

const handleSubmit = async () => {
  try {
    if (!user) {
      toast.error("Please login to submit!");
      return;
    }

    setSubmitting(true);
    setSummary(null);

    const res = await api.post("/problems/submit", {
      problemId,
      language,
      code: codeMap[language],
    });

    const { submission, failedTestCase, summary } = res.data;

    setSummary(summary);

    toast.success(`Submitted! Status: ${submission.status}`);

    // ✅ show only required testcases
    if (summary.status === "Accepted") {
      // show only first 2
      setRunResults(submission.testResults.slice(0, 2));
    } else {
      // show only failed
      setRunResults([failedTestCase]);
    }

  } catch (err) {
    toast.error("Submission failed");
  } finally {
    setSubmitting(false);
  }
};


const handleBookmarked = async () => {
  try {
    const res = await api.post(`/bookmarks/${problemId}`);
    
      setIsBookmarked(res.data.data.isBookmarked);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const check = async () => {
    try {
      const res = await api.get(`/bookmarks/check/${problemId}`);
      setIsBookmarked(res.data.data.isBookmarked);
    } catch (err) {
      console.log(err);
    }
  };

  check();
}, [problemId]);

const handleAIExplain = async () => {
  try {
    setShowAiModal(true);   // modal open
    setAiLoading(true);

    const res = await api.post("/problems/ai-review", {
      problemId,
      code: codeMap[language],
    });

    setAiMessage(res.data.data);

  } catch (err) {
    toast.error("AI explanation failed");
  } finally {
    setAiLoading(false);
  }
};



  return (
    //  <div className=" bg-[#1f2124] text-white flex pt-16 gap-2 px-2 min-h-screen">
    // bg-[#1f2124]
   <div className=" bg-[#0f172a] text-white flex  pt-16 gap-2 px-2 h-screen overflow-hidden"> 

      <ProblemDesc 
      problem={problem} 
      setAiMessage={setAiMessage}
      aiMessage={aiMessage}
      aiLoading={aiLoading}
      showAiModal={showAiModal}
       setShowAiModal={setShowAiModal}
       
      />

      <MonacoIDE
        problem={problem}
        language={language}
        onLanguageChange={setLanguage}
        code={codeMap[language]}
        setCode={(val) =>
          setCodeMap((prev) => ({
            ...prev,
            [language]: val
          }))
        }
        onRun={handleRun}
        onSubmit={handleSubmit}
        runResults={runResults}
        runError={runError}
       handleBookmarked={handleBookmarked}
       isBookmarked={isBookmarked}
       handleAIExplain={handleAIExplain}
       passedTestCases={passedTestCases}
       summary={summary}
       submitting={submitting}
      />
    </div>
  )
}
export default Problem




