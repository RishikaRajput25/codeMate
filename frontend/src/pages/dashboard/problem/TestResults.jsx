
import React from "react";

const TestResults = ({ results, error, summary, submitting }) => {

  if (error) {
    return (
      <div className="bg-[#2a2c2e] text-red-400 p-4 rounded-xl mt-4">
        <h2 className="font-semibold mb-2"> Error</h2>
        <pre className="whitespace-pre-wrap text-sm">
          {error}
        </pre>
      </div>
    );
  }

  return (
    <div className="bg-[#1f2d42] p-4 rounded-xl mt-4 space-y-3">

      {/* 🟡 Submitting State */}
      {submitting && (
        <div className="text-yellow-400 font-semibold animate-pulse">
          Submitting... 
        </div>
      )}

      {summary && (
        <div
          className={`font-bold text-lg ${
            summary.status === "Accepted"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {summary.passed}/{summary.total} Testcases Passed

          {summary.status !== "Accepted" && (
            <span className="ml-2 text-sm text-red-300">
              (Failed at testcase #{summary.failedIndex})
            </span>
          )}
        </div>
      )}

      
      {results && results.length > 0 && (
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
        
          {results.map((r, i) => (
            <div
              key={i}
              className="p-2 bg-[#101727]  rounded"
            >
              <div>
                <b>Input:</b> {JSON.stringify(r.input)}
              </div>

              <div>
                <b>Expected:</b> {JSON.stringify(r.expected)}
              </div>

              <div
                className={`${
                  r.passed ? "text-green-400" : "text-red-400"
                }`}
              >
                <b>Output:</b> {JSON.stringify(r.output)}
              </div>
            </div>
          ))}
        </div>
      )}
      {!submitting && !summary && (!results || results.length === 0) && (
        <div className="text-gray-400 text-sm">
          Run or Submit your code to see results
        </div>
      )}
    </div>
  );
};

export default TestResults;




//Demo judge 0 check
/*
import axios from "axios";

async function runCode(code, languageId) {
  const createResp = await axios.post(
    'https://ce.judge0.com/submissions/?base64_encoded=false&wait=false',
    {
      language_id: languageId,
      source_code: code,
      stdin: ""
    }
  );

  const token = createResp.data.token;

  let result;
  do {
    result = (await axios.get(`https://ce.judge0.com/submissions/${token}?base64_encoded=false`)).data;
    await new Promise(r => setTimeout(r, 500));
  } while (result.status.id <= 2);

  return result;
}

// Correct C++ language_id
runCode('#include <iostream>\nint main(){std::cout << "Hi"; return 0;}', 54)
  .then(res => {
    console.log("stdout:", res.stdout);
    console.log("stderr:", res.stderr);
    console.log("compile_output:", res.compile_output);
    console.log("message:", res.message);
  });
  */