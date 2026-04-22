
//this is working well before linked list, tree......

/*
export const BuildCppWrapper = (
  userCode,
  fnName,
  testCases,
  inputType,
  params,
  returnType
) => {

const formattedTests = testCases
  .map(tc => `{${tc.input.map(inp => `"${JSON.stringify(inp)}"`).join(",")}}`)
  .join(",");

let wrapper = `
#include <bits/stdc++.h>
using namespace std;

${userCode}

// ---------- HELPERS ----------

vector<int> parseArray(string arr){
    vector<int> nums;
    string temp="";
    for(char c : arr){
        if(isdigit(c) || c=='-') temp+=c;
        else if(c==',' || c==']'){
            if(temp!=""){
                nums.push_back(stoi(temp));
                temp="";
            }
        }
    }
    return nums;
}

// ---------- MAIN ----------

int main(){

vector<vector<string>> testCases = {${formattedTests}};

for(auto test : testCases){

`;


// 🔥 DYNAMIC PARAM PARSING
params.forEach((param, index) => {

if(param.type === "array"){
wrapper += `
    vector<int> ${param.name} = parseArray(test[${index}]);
`;
}

else if(param.type === "number"){
wrapper += `
    int ${param.name} = stoi(test[${index}]);
`;
}

else if(param.type === "string"){
wrapper += `
    string ${param.name} = test[${index}];
`;
}

});


// 🔥 FUNCTION CALL
const paramNames = params.map(p => p.name).join(",");

wrapper += `
    auto result = ${fnName}(${paramNames});
`;


// 🔥 PRINTING (based on returnType)

if(returnType === "number"){
wrapper += `
    cout << result << endl;
`;
}

else if(returnType === "string"){
wrapper += `
    cout << result << endl;
`;
}

else if(returnType === "array"){
wrapper += `
    cout << "[";
    for(int i=0;i<result.size();i++){
        cout<<result[i];
        if(i<result.size()-1) cout<<",";
    }
    cout << "]" << endl;
`;
}

else if(returnType === "matrix"){
wrapper += `
    cout << "[";
    for(int i=0;i<result.size();i++){
        cout<<"[";
        for(int j=0;j<result[i].size();j++){
            cout<<result[i][j];
            if(j<result[i].size()-1) cout<<",";
        }
        cout<<"]";
        if(i<result.size()-1) cout<<",";
    }
    cout << "]" << endl;
`;
}

wrapper += `
}

return 0;
}
`;

return wrapper;
};
*/


// #include <bits/stdc++.h>
// using namespace std;

// // ----------- DATA STRUCTURES -----------

// struct ListNode {
//     int val;
//     ListNode* next;
//     ListNode(int x){ val = x; next = NULL; }
// };

// struct TreeNode {
//     int val;
//     TreeNode *left, *right;
//     TreeNode(int x){ val = x; left = right = NULL; }
// };


// listen it is working  before  valid paranthesis and  linked lists cycle



// export const BuildCppWrapper = (
//   userCode,
//   fnName,
//   testCases,
//   inputType,
//   params,
//   returnType
// ) => {



// const formattedTests = testCases
//   .map(tc => `{${tc.input.map(inp => `"${JSON.stringify(inp)}"`).join(",")}}`)
//   .join(",");


  
// //  COMMENT HEADER FILE
// userCode = userCode.replace(
//   /#include\s*<bits\/stdc\+\+\.h>/g,
//   "// #include <bits/stdc++.h>"
// );

// //  COMMENT NAMESPACE
// userCode = userCode.replace(
//   /using\s+namespace\s+std;/g,
//   "// using namespace std;"
// );

// //  COMMENT TreeNode STRUCT
// userCode = userCode.replace(
//   /struct\s+TreeNode\s*\{[\s\S]*?\};/g,
//   (match) => `/*\n${match}\n*/`
// );

// //  COMMENT ListNode STRUCT
// userCode = userCode.replace(
//   /struct\s+ListNode\s*\{[\s\S]*?\};/g,
//   (match) => `/*\n${match}\n*/`
// );
// let wrapper = `




// // ----------- USER CODE -----------


// #include <bits/stdc++.h>
// using namespace std;

// // ----------- DATA STRUCTURES -----------

// struct TreeNode {
//     int val;
//     TreeNode *left, *right;
//     TreeNode(int x){ val = x; left = right = NULL; }
// };
// struct ListNode {   
//     int val;
//     ListNode* next;
//     ListNode(int x){
//         val = x;
//         next = NULL;
//     }
// };
//  ${userCode}


// // ----------- HELPERS -----------

// vector<int> parseArray(string arr){
//     vector<int> nums;
//     string temp="";
//     for(char c : arr){
//         if(isdigit(c) || c=='-') temp+=c;
//         else if(c==',' || c==']'){
//             if(temp!=""){
//                 nums.push_back(stoi(temp));
//                 temp="";
//             }
//         }
//     }
//     return nums;
// }

// vector<vector<int>> parseMatrix(string arr){
//     vector<vector<int>> matrix;
//     vector<int> row;
//     string temp="";
    
//     for(char c : arr){
//         if(isdigit(c) || c=='-') temp+=c;
//         else if(c==',' || c==']'){
//             if(temp!=""){
//                 row.push_back(stoi(temp));
//                 temp="";
//             }
//             if(c==']' && !row.empty()){
//                 matrix.push_back(row);
//                 row.clear();
//             }
//         }
//     }
//     return matrix;
// }

// ListNode* buildList(string arr){
//     vector<int> nums = parseArray(arr);
//     ListNode* head = NULL;
//     ListNode* tail = NULL;

//     for(int x : nums){
//         ListNode* node = new ListNode(x);
//         if(!head){
//             head = tail = node;
//         } else {
//             tail->next = node;
//             tail = node;
//         }
//     }
//     return head;
// }

// void printList(ListNode* head){
//     cout << "[";
//     while(head){
//         cout << head->val;
//         head = head->next;
//         if(head) cout << ",";
//     }
//     cout << "]" << endl;
// }

// TreeNode* buildTree(string arr){
//     vector<string> nodes;
//     string temp="";

//     for(char c : arr){
//         if(c!=',' && c!='[' && c!=']') temp+=c;
//         else if(c==',' || c==']'){
//             if(temp!=""){
//                 nodes.push_back(temp);
//                 temp="";
//             }
//         }
//     }

//     if(nodes.size()==0 || nodes[0]=="null") return NULL;

//     TreeNode* root = new TreeNode(stoi(nodes[0]));
//     queue<TreeNode*> q;
//     q.push(root);

//     int i=1;

//     while(!q.empty() && i<nodes.size()){
//         TreeNode* curr = q.front(); q.pop();

//         if(nodes[i]!="null"){
//             curr->left = new TreeNode(stoi(nodes[i]));
//             q.push(curr->left);
//         }
//         i++;

//         if(i<nodes.size() && nodes[i]!="null"){
//             curr->right = new TreeNode(stoi(nodes[i]));
//             q.push(curr->right);
//         }
//         i++;
//     }

//     return root;
// }

// stack<int> buildStack(string arr){
//     vector<int> nums = parseArray(arr);
//     stack<int> st;
//     for(int x : nums) st.push(x);
//     return st;
// }

// queue<int> buildQueue(string arr){
//     vector<int> nums = parseArray(arr);
//     queue<int> q;
//     for(int x : nums) q.push(x);
//     return q;
// }

// vector<vector<int>> buildGraph(string arr){
//     return parseMatrix(arr);
// }

// // ----------- MAIN -----------

// int main(){

// vector<vector<string>> testCases = {${formattedTests}};

// for(auto test : testCases){
// `;


// // 🔥 PARAM PARSING
// params.forEach((param, index) => {

// if(param.type === "array"){
// wrapper += `vector<int> ${param.name} = parseArray(test[${index}]);\n`;
// }

// else if(param.type === "number"){
// wrapper += `int ${param.name} = stoi(test[${index}]);\n`;
// }

// else if(param.type === "string"){
// wrapper += `string ${param.name} = test[${index}];\n`;
// }

// else if(param.type === "matrix"){
// wrapper += `vector<vector<int>> ${param.name} = parseMatrix(test[${index}]);\n`;
// }

// else if(param.type === "linkedlist"){
// wrapper += `ListNode* ${param.name} = buildList(test[${index}]);\n`;
// }

// else if(param.type === "tree"){
// wrapper += `TreeNode* ${param.name} = buildTree(test[${index}]);\n`;
// }

// else if(param.type === "stack"){
// wrapper += `stack<int> ${param.name} = buildStack(test[${index}]);\n`;
// }

// else if(param.type === "queue"){
// wrapper += `queue<int> ${param.name} = buildQueue(test[${index}]);\n`;
// }

// else if(param.type === "graph"){
// wrapper += `vector<vector<int>> ${param.name} = buildGraph(test[${index}]);\n`;
// }

// });

// const paramNames = params.map(p => p.name).join(",");

// // 🔥 FUNCTION CALL
// wrapper += `
// auto result = ${fnName}(${paramNames});
// `;


// // 🔥 OUTPUT

// if(returnType === "number" || returnType === "string"){
// wrapper += `cout << result << endl;\n`;
// }

// else if(returnType === "array"){
// wrapper += `
// cout << "[";
// for(int i=0;i<result.size();i++){
//     cout<<result[i];
//     if(i<result.size()-1) cout<<",";
// }
// cout << "]" << endl;
// `;
// }

// else if(returnType === "matrix"){
// wrapper += `
// cout << "[";
// for(int i=0;i<result.size();i++){
//     cout<<"[";
//     for(int j=0;j<result[i].size();j++){
//         cout<<result[i][j];
//         if(j<result[i].size()-1) cout<<",";
//     }
//     cout<<"]";
//     if(i<result.size()-1) cout<<",";
// }
// cout << "]" << endl;
// `;
// }

// else if(returnType === "linkedlist"){
// wrapper += `printList(result);\n`;
// }

// wrapper += `
// }

// return 0;
// }
// `;

// return wrapper;
// };







































//completely working before linked lists cycle



// export const BuildCppWrapper = (
//   userCode,
//   fnName,
//   testCases,
//   inputType,
//   params,
//   returnType
// ) => {

//   // 🔥 UNIVERSAL FORMATTER
//   const formatValue = (val, type) => {
//     if (type === "string") {
//       return `"${val}"`;
//     }

//     if (type === "number") {
//       return val;
//     }

//     if (type === "boolean") {
//       return val ? "true" : "false";
//     }

//     // array, matrix, etc → string format
//     return `"${val}"`;
//   };

//   // 🔥 FORMAT TEST CASES (FIXED)
//   const formattedTests = testCases
//     .map(tc => {
//       return `{${tc.input.map((inp, i) => {
//         const type = params[i].type;
//         return formatValue(inp, type);
//       }).join(",")}}`;
//     })
//     .join(",");

//   // 🔥 CLEAN USER CODE
//   userCode = userCode.replace(
//     /#include\s*<bits\/stdc\+\+\.h>/g,
//     "// #include <bits/stdc++.h>"
//   );

//   userCode = userCode.replace(
//     /using\s+namespace\s+std;/g,
//     "// using namespace std;"
//   );

//   userCode = userCode.replace(
//     /struct\s+TreeNode\s*\{[\s\S]*?\};/g,
//     (match) => `/*\n${match}\n*/`
//   );

//   userCode = userCode.replace(
//     /struct\s+ListNode\s*\{[\s\S]*?\};/g,
//     (match) => `/*\n${match}\n*/`
//   );

//   // 🔥 WRAPPER START
//   let wrapper = `

// // ----------- USER CODE -----------

// #include <bits/stdc++.h>
// using namespace std;

// // ----------- DATA STRUCTURES -----------

// struct TreeNode {
//     int val;
//     TreeNode *left, *right;
//     TreeNode(int x){ val = x; left = right = NULL; }
// };

// struct ListNode {   
//     int val;
//     ListNode* next;
//     ListNode(int x){
//         val = x;
//         next = NULL;
//     }
// };

// ${userCode}

// // ----------- HELPERS -----------

// vector<int> parseArray(string arr){
//     vector<int> nums;
//     string temp="";
//     for(char c : arr){
//         if(isdigit(c) || c=='-') temp+=c;
//         else if(c==',' || c==']'){
//             if(temp!=""){
//                 nums.push_back(stoi(temp));
//                 temp="";
//             }
//         }
//     }
//     return nums;
// }

// vector<vector<int>> parseMatrix(string arr){
//     vector<vector<int>> matrix;
//     vector<int> row;
//     string temp="";
    
//     for(char c : arr){
//         if(isdigit(c) || c=='-') temp+=c;
//         else if(c==',' || c==']'){
//             if(temp!=""){
//                 row.push_back(stoi(temp));
//                 temp="";
//             }
//             if(c==']' && !row.empty()){
//                 matrix.push_back(row);
//                 row.clear();
//             }
//         }
//     }
//     return matrix;
// }

// ListNode* buildList(string arr){
//     vector<int> nums = parseArray(arr);
//     ListNode* head = NULL;
//     ListNode* tail = NULL;

//     for(int x : nums){
//         ListNode* node = new ListNode(x);
//         if(!head){
//             head = tail = node;
//         } else {
//             tail->next = node;
//             tail = node;
//         }
//     }
//     return head;
// }

// void printList(ListNode* head){
//     cout << "[";
//     while(head){
//         cout << head->val;
//         head = head->next;
//         if(head) cout << ",";
//     }
//     cout << "]" << endl;
// }

// TreeNode* buildTree(string arr){
//     vector<string> nodes;
//     string temp="";

//     for(char c : arr){
//         if(c!=',' && c!='[' && c!=']') temp+=c;
//         else if(c==',' || c==']'){
//             if(temp!=""){
//                 nodes.push_back(temp);
//                 temp="";
//             }
//         }
//     }

//     if(nodes.size()==0 || nodes[0]=="null") return NULL;

//     TreeNode* root = new TreeNode(stoi(nodes[0]));
//     queue<TreeNode*> q;
//     q.push(root);

//     int i=1;

//     while(!q.empty() && i<nodes.size()){
//         TreeNode* curr = q.front(); q.pop();

//         if(nodes[i]!="null"){
//             curr->left = new TreeNode(stoi(nodes[i]));
//             q.push(curr->left);
//         }
//         i++;

//         if(i<nodes.size() && nodes[i]!="null"){
//             curr->right = new TreeNode(stoi(nodes[i]));
//             q.push(curr->right);
//         }
//         i++;
//     }

//     return root;
// }

// // ----------- MAIN -----------

// int main(){

// vector<vector<string>> testCases = {${formattedTests}};

// for(auto test : testCases){
// `;

//   // 🔥 PARAM PARSING
//   params.forEach((param, index) => {

//     if(param.type === "array"){
//       wrapper += `vector<int> ${param.name} = parseArray(test[${index}]);\n`;
//     }

//     else if(param.type === "number"){
//       wrapper += `int ${param.name} = stoi(test[${index}]);\n`;
//     }

//     else if(param.type === "string"){
//       wrapper += `string ${param.name} = test[${index}];\n`;
//     }

//     else if(param.type === "matrix"){
//       wrapper += `vector<vector<int>> ${param.name} = parseMatrix(test[${index}]);\n`;
//     }

//     else if(param.type === "linkedlist"){
//       wrapper += `ListNode* ${param.name} = buildList(test[${index}]);\n`;
//     }

//     else if(param.type === "tree"){
//       wrapper += `TreeNode* ${param.name} = buildTree(test[${index}]);\n`;
//     }
//   });

//   const paramNames = params.map(p => p.name).join(",");

//   // 🔥 FUNCTION CALL
//   wrapper += `
// auto result = ${fnName}(${paramNames});
// `;

//   // 🔥 OUTPUT HANDLING
//   if(returnType === "number" || returnType === "string"){
//     wrapper += `cout << result << endl;\n`;
//   }

//   else if(returnType === "boolean"){
//     wrapper += `cout << (result ? "true" : "false") << endl;\n`;
//   }

//   else if(returnType === "array"){
//     wrapper += `
// cout << "[";
// for(int i=0;i<result.size();i++){
//     cout<<result[i];
//     if(i<result.size()-1) cout<<",";
// }
// cout << "]" << endl;
// `;
//   }

//   else if(returnType === "matrix"){
//     wrapper += `
// cout << "[";
// for(int i=0;i<result.size();i++){
//     cout<<"[";
//     for(int j=0;j<result[i].size();j++){
//         cout<<result[i][j];
//         if(j<result[i].size()-1) cout<<",";
//     }
//     cout<<"]";
//     if(i<result.size()-1) cout<<",";
// }
// cout << "]" << endl;
// `;
//   }

//   else if(returnType === "linkedlist"){
//     wrapper += `printList(result);\n`;
//   }

//   wrapper += `
// }

// return 0;
// }
// `;

//   return wrapper;
// };








































export const BuildCppWrapper = (
  userCode,
  fnName,
  testCases,
  inputType,
  params,
  returnType
) => {

  //  UNIVERSAL FORMATTER
//   const formatValue = (val, type) => {
//     if (type === "string") return `"${val}"`;
//     if (type === "number") return val;
//     if (type === "boolean") return val ? "true" : "false";
//     return `"${val}"`;
//   };

const formatValue = (val, type) => {

  //  COMPLEX TYPES → ALWAYS STRING
  if (["array", "matrix", "linkedlist", "tree"].includes(type)) {
    return JSON.stringify(JSON.stringify(val));
    // double stringify → safe string for C++
  }

  //  STRING
  if (type === "string") {
    return JSON.stringify(val);
  }

  //  BOOLEAN
  if (type === "boolean") {
    return val ? "true" : "false";
  }

  //  NUMBER
  if (type === "number") {
    // return val;
    return `"${val}"`;;
  }

  // fallback
  return JSON.stringify(val);
};
  //  FORMAT TEST CASES

  const formattedTests = testCases
  .map(tc => {
    return `{${tc.input.map((inp, i) => {
      const type = params[i].type;
      return formatValue(inp, type);
    }).join(",")}}`;
  })
  .join(",");


//correct before valid paranthesis
 /*
const formattedTests = testCases
  .map(tc => {
    return `{${tc.input.map(inp => {
      
      //  ALWAYS serialize properly
      let val = JSON.stringify(inp);

      return `"${val}"`;
      
    }).join(",")}}`;
  })
  .join(",");

*/

  //  NEW: POS LIST (for cycle)
  const posList = testCases.map(tc => tc.extra?.pos ?? -1);

  // CLEAN USER CODE
  userCode = userCode.replace(
    /#include\s*<bits\/stdc\+\+\.h>/g,
    "// #include <bits/stdc++.h>"
  );

  userCode = userCode.replace(
    /using\s+namespace\s+std;/g,
    "// using namespace std;"
  );

  userCode = userCode.replace(
    /struct\s+TreeNode\s*\{[\s\S]*?\};/g,
    (match) => `/*\n${match}\n*/`
  );

  userCode = userCode.replace(
    /struct\s+ListNode\s*\{[\s\S]*?\};/g,
    (match) => `/*\n${match}\n*/`
  );

  //  WRAPPER START
  let wrapper = `

// ----------- USER CODE -----------

#include <bits/stdc++.h>
using namespace std;

// ----------- DATA STRUCTURES -----------

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x){ val = x; left = right = NULL; }
};

struct ListNode {   
    int val;
    ListNode* next;
    ListNode(int x){
        val = x;
        next = NULL;
    }
};

${userCode}

// ----------- HELPERS -----------

vector<int> parseArray(string arr){
    vector<int> nums;
    string temp="";
    for(char c : arr){
        if(isdigit(c) || c=='-') temp+=c;
        else if(c==',' || c==']'){
            if(temp!=""){
                nums.push_back(stoi(temp));
                temp="";
            }
        }
    }
    return nums;
}

vector<vector<int>> parseMatrix(string arr){
    vector<vector<int>> matrix;
    vector<int> row;
    string temp="";
    
    for(char c : arr){
        if(isdigit(c) || c=='-') temp+=c;
        else if(c==',' || c==']'){
            if(temp!=""){
                row.push_back(stoi(temp));
                temp="";
            }
            if(c==']' && !row.empty()){
                matrix.push_back(row);
                row.clear();
            }
        }
    }
    return matrix;
}

ListNode* buildList(string arr){
    vector<int> nums = parseArray(arr);
    ListNode* head = NULL;
    ListNode* tail = NULL;

    for(int x : nums){
        ListNode* node = new ListNode(x);
        if(!head){
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }
    return head;
}

//  NEW: CYCLIC LIST BUILDER
ListNode* buildCyclicList(string arr, int pos){
    vector<int> nums = parseArray(arr);
    ListNode* head = NULL;
    ListNode* tail = NULL;
    ListNode* cycleNode = NULL;

    for(int i = 0; i < nums.size(); i++){
        ListNode* node = new ListNode(nums[i]);

        if(!head) head = tail = node;
        else { tail->next = node; tail = node; }

        if(i == pos) cycleNode = node;
    }

    if(pos != -1 && tail) tail->next = cycleNode;

    return head;
}

void printList(ListNode* head){
    cout << "[";
    while(head){
        cout << head->val;
        head = head->next;
        if(head) cout << ",";
    }
    cout << "]" << endl;
}

TreeNode* buildTree(string arr){
    vector<string> nodes;
    string temp="";

    for(char c : arr){
        if(c!=',' && c!='[' && c!=']') temp+=c;
        else if(c==',' || c==']'){
            if(temp!=""){
                nodes.push_back(temp);
                temp="";
            }
        }
    }

    if(nodes.size()==0 || nodes[0]=="null") return NULL;

    TreeNode* root = new TreeNode(stoi(nodes[0]));
    queue<TreeNode*> q;
    q.push(root);

    int i=1;

    while(!q.empty() && i<nodes.size()){
        TreeNode* curr = q.front(); q.pop();

        if(nodes[i]!="null"){
            curr->left = new TreeNode(stoi(nodes[i]));
            q.push(curr->left);
        }
        i++;

        if(i<nodes.size() && nodes[i]!="null"){
            curr->right = new TreeNode(stoi(nodes[i]));
            q.push(curr->right);
        }
        i++;
    }

    return root;
}

// ----------- MAIN -----------

int main(){

vector<vector<string>> testCases = {${formattedTests}};
vector<int> posList = {${posList.join(",")}};

for(int i = 0; i < testCases.size(); i++){
    auto test = testCases[i];
`;

  //  PARAM PARSING (FIXED)
  params.forEach((param, index) => {

    if(param.type === "array"){
      wrapper += `vector<int> ${param.name} = parseArray(test[${index}]);\n`;
    }

    else if(param.type === "number"){
      wrapper += `int ${param.name} = stoi(test[${index}]);\n`;
    }

    else if(param.type === "string"){
      wrapper += `string ${param.name} = test[${index}];\n`;
    }

    else if(param.type === "matrix"){
      wrapper += `vector<vector<int>> ${param.name} = parseMatrix(test[${index}]);\n`;
    }

    else if(param.type === "linkedlist"){
      //  MAIN FIX (AUTO CYCLE DETECT)
      wrapper += `
ListNode* ${param.name} = (posList[i] == -1)
  ? buildList(test[${index}])
  : buildCyclicList(test[${index}], posList[i]);
`;
    }

    else if(param.type === "tree"){
      wrapper += `TreeNode* ${param.name} = buildTree(test[${index}]);\n`;
    }
  });

  const paramNames = params.map(p => p.name).join(",");

  wrapper += `
auto result = ${fnName}(${paramNames});
`;

  //  OUTPUT HANDLING (FIXED)
  if(returnType === "number" || returnType === "string"){
    wrapper += `cout << result << endl;\n`;
  }

  else if(returnType === "boolean"){
    wrapper += `cout << (result ? "true" : "false") << endl;\n`;
  }

  else if(returnType === "array"){
    wrapper += `
cout << "[";
for(int i=0;i<result.size();i++){
    cout<<result[i];
    if(i<result.size()-1) cout<<",";
}
cout << "]" << endl;
`;
  }

  else if(returnType === "matrix"){
    wrapper += `
cout << "[";
for(int i=0;i<result.size();i++){
    cout<<"[";
    for(int j=0;j<result[i].size();j++){
        cout<<result[i][j];
        if(j<result[i].size()-1) cout<<",";
    }
    cout<<"]";
    if(i<result.size()-1) cout<<",";
}
cout << "]" << endl;
`;
  }

  else if(returnType === "linkedlist"){
    // FIX (cycle problems output)
    wrapper += `
if(result) cout << result->val << endl;
else cout << -1 << endl;
`;
  }

  wrapper += `
}

return 0;
}
`;

  return wrapper;
};




