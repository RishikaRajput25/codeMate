 /*
 export const BuildJsWrapper=(userCode, fnName, testCases)=>{

let wrapper = userCode + "\n\n"

  testCases.forEach((test, index) => {
    const args = test.input.map(arg => JSON.stringify(arg)).join(",")

    wrapper += `
try {
  const result${index} = ${fnName}(${args});
  console.log(JSON.stringify(result${index}));
} catch (e) {
  console.log("ERROR");
}
`
  })

  return wrapper

}
 export const BuildPythonWrapper=(userCode, fnName, testCases)=>{

 let wrapper = userCode + "\n\n"

  testCases.forEach((test) => {
    const args = test.input.map(arg => JSON.stringify(arg)).join(",")

    wrapper += `
try:
    result = ${fnName}(${args})
    print(result)
except Exception as e:
    print("ERROR")
`
  })

  return wrapper

}*/






/*
export const BuildJsWrapper = (userCode, fnName, testCases, inputType) => {
  if(inputType=="array"){
  let wrapper = `${userCode}\n\n`

  testCases.forEach((test, index) => {
    const args = test.input.map((a) => JSON.stringify(a)).join(",")

    wrapper += `
try {
  const result${index} = ${fnName}(${args});
  console.log(JSON.stringify(result${index}));
} catch (e) {
  // console.log("ERROR");
  console.error(e.message);
  process.exit(1);
}
`
  }


)

  return wrapper
}
else if(inputType=="linkedlist"){
wrapper += `
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(arr) {
  let dummy = new ListNode();
  let curr = dummy;
  for (let val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

function listToArray(head) {
  let arr = [];
  let curr = head;
  while (curr) {
    arr.push(curr.val);
    curr = curr.next;
  }
  return arr;
}
`
  

  testCases.forEach((test, index) => {
    let args

    if (problemType === "linkedlist") {
      // convert input array to linked list
      args = test.input
        .map((a) => `arrayToList(${JSON.stringify(a)})`)
        .join(",")
    } else {
      // normal problems
      args = test.input
        .map((a) => JSON.stringify(a))
        .join(",")
    }

    wrapper += `
try {
  const result${index} = ${fnName}(${args});
  ${
    problemType === "linkedlist"
      ? `console.log(JSON.stringify(listToArray(result${index})));`
      : `console.log(JSON.stringify(result${index}));`
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
`
  })

 return wrapper;
}
}
*/
export const BuildJsWrapper = (userCode, fnName, testCases, inputType) => {

  let wrapper = `${userCode}\n\n`;

  // ===== ARRAY =====
  if (inputType === "array") {

    testCases.forEach((test, index) => {
      const args = test.input.map(a => JSON.stringify(a)).join(",");

      wrapper += `
try {
  const result${index} = ${fnName}(${args});
  console.log(JSON.stringify(result${index}));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
`;
    });

    return wrapper;
  }

  // ===== LINKED LIST =====
  if (inputType === "linkedlist") {

    wrapper += `
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(arr) {
  let dummy = new ListNode();
  let curr = dummy;
  for (let val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

function listToArray(head) {
  let arr = [];
  let curr = head;
  while (curr) {
    arr.push(curr.val);
    curr = curr.next;
  }
  return arr;
}
`;

    testCases.forEach((test, index) => {

      const args = test.input
        .map(a => `arrayToList(${JSON.stringify(a)})`)
        .join(",");

      wrapper += `
try {
  const result${index} = ${fnName}(${args});
  console.log(JSON.stringify(listToArray(result${index})));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
`;
    });

    return wrapper;
  }
};

export const BuildPythonWrapper = (userCode, fnName, testCases, inputType) => {

  let wrapper = `${userCode}\n\n`;

  // ===== ARRAY =====
  if (inputType === "array") {

    testCases.forEach((test) => {
      const args = test.input.map((a) => JSON.stringify(a)).join(",");

      wrapper += `
try:
    result = ${fnName}(${args})
    print(result)
except Exception as e:
    import sys
    print(str(e), file=sys.stderr)
    sys.exit(1)
`;
    });

    return wrapper;
  }

  // ===== LINKED LIST =====
  if (inputType === "linkedlist") {

    wrapper += `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arrayToList(arr):
    dummy = ListNode()
    curr = dummy
    for val in arr:
        curr.next = ListNode(val)
        curr = curr.next
    return dummy.next

def listToArray(head):
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    return arr
`;

    testCases.forEach((test) => {
      const args = test.input
        .map((a) => `arrayToList(${JSON.stringify(a)})`)
        .join(",");

      wrapper += `
try:
    result = ${fnName}(${args})
    print(listToArray(result))
except Exception as e:
    import sys
    print(str(e), file=sys.stderr)
    sys.exit(1)
`;
    });

    return wrapper;
  }
};
/*
export const BuildPythonWrapper = (userCode, fnName, testCases,inputType) => {
  if(inputType=="array"){
  let wrapper = `${userCode}\n\n`

  testCases.forEach((test) => {
    const args = test.input.map((a) => JSON.stringify(a)).join(",")

    wrapper += `
try:
    result = ${fnName}(${args})
    print(result)
// except Exception:
//     print("ERROR")

except Exception as e:
    import sys
    print(str(e), file=sys.stderr)
    sys.exit(1)
`;
  });

  return wrapper
}
}*/

export default {BuildJsWrapper,BuildPythonWrapper}