// export const BuildJsWrapper = (userCode, fnName, testCases, inputType) => {

//   let wrapper = `${userCode}\n\n`;

//   // ===== ARRAY =====
// //   if (inputType === "array") {

// //     testCases.forEach((test, index) => {
// //       const args = test.input.map(a => JSON.stringify(a)).join(",");

// //       wrapper += `
// // try {
// //   const result${index} = ${fnName}(${args});
// //   console.log(JSON.stringify(result${index}));
// // } catch (e) {
// //   console.error(e.message);
// //   process.exit(1);
// // }
// // `;
// //     });

// //     return wrapper;
// //   }



// if (inputType === "array") {

//   const formattedTests = testCases
//     .map(test => `[${test.input.map(a => JSON.stringify(a)).join(",")}]`)
//     .join(",");

//   wrapper += `
// const testCases = [${formattedTests}];

// for (const test of testCases) {
//   try {
//     const result = ${fnName}(...test);
//     console.log(JSON.stringify(result));
//   } catch (e) {
//     console.error(e.message);
//     process.exit(1);
//   }
// }
// `;

//   return wrapper;
// }

//   // ===== LINKED LIST =====
//   if (inputType === "linkedlist") {

//     wrapper += `
// class ListNode {
//   constructor(val = 0, next = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

// function arrayToList(arr) {
//   let dummy = new ListNode();
//   let curr = dummy;
//   for (let val of arr) {
//     curr.next = new ListNode(val);
//     curr = curr.next;
//   }
//   return dummy.next;
// }

// function listToArray(head) {
//   let arr = [];
//   let curr = head;
//   while (curr) {
//     arr.push(curr.val);
//     curr = curr.next;
//   }
//   return arr;
// }
// `;


// const formattedTests = testCases
//   .map(test => `[${test.input.map(a => JSON.stringify(a)).join(",")}]`)
//   .join(",");



// // wrapper += `
// // const testCases = [${formattedTests}];

// // for (const test of testCases) {
// //   try {
// //     const convertedArgs = test.map(arg => arrayToList(arg));
// //     const result = ${fnName}(...convertedArgs);
// //     console.log(JSON.stringify(listToArray(result)));
// //   } catch (e) {
// //     console.error(e.message);
// //     process.exit(1);
// //   }
// // }
// // `;



// wrapper += `
// const testCases = [${formattedTests}];

// for (const test of testCases) {
//   try {
//     const convertedArgs = [
//   arrayToList(test[0]),
//   ...test.slice(1)
// ];
//     const result = ${fnName}(...convertedArgs);
//     console.log(JSON.stringify(listToArray(result)));
//   } catch (e) {
//     console.error(e.message);
//     process.exit(1);
//   }
// }
// `;



//     return wrapper;
//   }

//   // ===== TREE =====
//   if (inputType === "tree") {

//     wrapper += `
// class TreeNode {
//   constructor(val, left = null, right = null) {
//     this.val = val;
//     this.left = left;
//     this.right = right;
//   }
// }

// function arrayToTree(arr) {
//   if (!arr || !arr.length) return null;

//   let root = new TreeNode(arr[0]);
//   let queue = [root];
//   let i = 1;

//   while (i < arr.length) {
//     let node = queue.shift();

//     if (arr[i] !== null && arr[i] !== undefined) {
//       node.left = new TreeNode(arr[i]);
//       queue.push(node.left);
//     }
//     i++;

//     if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
//       node.right = new TreeNode(arr[i]);
//       queue.push(node.right);
//     }
//     i++;
//   }

//   return root;
// }

// function treeToArray(root) {
//   if (!root) return [];

//   let result = [];
//   let queue = [root];

//   while (queue.length) {
//     let node = queue.shift();

//     if (node) {
//       result.push(node.val);
//       queue.push(node.left);
//       queue.push(node.right);
//     } else {
//       result.push(null);
//     }
//   }

//   // remove trailing nulls
//   while (result[result.length - 1] === null) {
//     result.pop();
//   }

//   return result;
// }
// `;


//    const formattedTests = testCases
//   .map(test => `[${test.input.map(a => JSON.stringify(a)).join(",")}]`)
//   .join(",");

// wrapper += `
// const testCases = [${formattedTests}];

// for (const test of testCases) {
//   try {
//     const convertedArgs = test.map(arg => arrayToTree(arg));
//     const result = ${fnName}(...convertedArgs);

//     if (result instanceof TreeNode) {
//       console.log(JSON.stringify(treeToArray(result)));
//     } else {
//       console.log(JSON.stringify(result));
//     }

//   } catch (e) {
//     console.error(e.message);
//     process.exit(1);
//   }
// }
// `;



//     return wrapper;
//   }


// };
// export default {BuildJsWrapper};




export const BuildJsWrapper = (
  userCode,
  fnName,
  testCases,
  inputType,
  params,
  returnType
) => {

  // 🔥 FORMAT TEST CASES
  const formattedTests = testCases
    .map(tc => {
      return `[${tc.input.map(inp => JSON.stringify(inp)).join(",")}]`;
    })
    .join(",");

  // 🔥 POS LIST (for cycle problems)
  const posList = testCases.map(tc => tc.extra?.pos ?? -1);

  let wrapper = `

// ----------- USER CODE -----------

${userCode}

// ----------- DATA STRUCTURES -----------

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// ----------- HELPERS -----------

// 🔥 ARRAY
function parseArray(arr) {
  return arr;
}

// 🔥 MATRIX
function parseMatrix(arr) {
  return arr;
}

// 🔥 NORMAL LIST
function buildList(arr) {
  let dummy = new ListNode();
  let curr = dummy;

  for (let val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }

  return dummy.next;
}

// 🔥 CYCLIC LIST
function buildCyclicList(arr, pos) {
  let dummy = new ListNode();
  let curr = dummy;
  let cycleNode = null;

  for (let i = 0; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;

    if (i === pos) cycleNode = curr;
  }

  if (pos !== -1 && curr) {
    curr.next = cycleNode;
  }

  return dummy.next;
}

// 🔥 PRINT LIST
function printList(head) {
  let res = [];
  let curr = head;

  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }

  console.log(JSON.stringify(res));
}

// 🔥 TREE BUILDER
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;

  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;

  while (i < arr.length) {
    let node = queue.shift();

    if (arr[i] !== null && arr[i] !== undefined) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

// ----------- MAIN -----------

const testCases = [${formattedTests}];
const posList = [${posList.join(",")}];

for (let i = 0; i < testCases.length; i++) {
  const test = testCases[i];
`;

  // 🔥 PARAM PARSING (LIKE C++)
  params.forEach((param, index) => {

    if (param.type === "array") {
      wrapper += `const ${param.name} = parseArray(test[${index}]);\n`;
    }

    else if (param.type === "number") {
      wrapper += `const ${param.name} = Number(test[${index}]);\n`;
    }

    else if (param.type === "string") {
      wrapper += `const ${param.name} = test[${index}];\n`;
    }

    else if (param.type === "matrix") {
      wrapper += `const ${param.name} = parseMatrix(test[${index}]);\n`;
    }

    else if (param.type === "linkedlist") {
      wrapper += `
const ${param.name} = (posList[i] === -1)
  ? buildList(test[${index}])
  : buildCyclicList(test[${index}], posList[i]);
`;
    }

    else if (param.type === "tree") {
      wrapper += `const ${param.name} = buildTree(test[${index}]);\n`;
    }

  });

  const paramNames = params.map(p => p.name).join(",");

  wrapper += `
const result = ${fnName}(${paramNames});
`;

  // 🔥 OUTPUT HANDLING (MATCH C++)
  if (returnType === "number" || returnType === "string") {
    wrapper += `console.log(result);\n`;
  }

  else if (returnType === "boolean") {
    wrapper += `console.log(result ? "true" : "false");\n`;
  }

  else if (returnType === "array") {
    wrapper += `console.log(JSON.stringify(result));\n`;
  }

  else if (returnType === "matrix") {
    wrapper += `console.log(JSON.stringify(result));\n`;
  }

  else if (returnType === "linkedlist") {
    wrapper += `
if (result) console.log(result.val);
else console.log(-1);
`;
  }

  wrapper += `
}

`;

  return wrapper;
};

export default { BuildJsWrapper };