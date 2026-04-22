/*
export const BuildPythonWrapper = (userCode, fnName, testCases, inputType) => {

  let wrapper = `${userCode}\n\n`;

  // ===== ARRAY =====
  if (inputType === "array") {

  const formattedTests = testCases
    .map(test => `[${test.input.map(a => JSON.stringify(a)).join(",")}]`)
    .join(",");

  wrapper += `
test_cases = [${formattedTests}]

for test in test_cases:
    try:
        result = ${fnName}(*test)
        print(result)
    except Exception as e:
        import sys
        print(str(e), file=sys.stderr)
        sys.exit(1)
`;

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


const formattedTests = testCases
  .map(test => `[${test.input.map(a => JSON.stringify(a)).join(",")}]`)
  .join(",");

wrapper += `
import json

test_cases = [${formattedTests}]

for test in test_cases:
    try:
        converted_args = [arrayToList(arg) for arg in test]
        result = ${fnName}(*converted_args)
        output = listToArray(result) if result else []
        print(json.dumps(output))
    except Exception as e:
        import sys
        print(str(e), file=sys.stderr)
        sys.exit(1)
`;




    return wrapper;
  }

if (inputType === "tree") {

    wrapper += `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def arrayToTree(arr):
    if not arr:
        return None

    root = TreeNode(arr[0])
    queue = [root]
    i = 1

    while i < len(arr):
        node = queue.pop(0)

        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1

        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1

    return root

def treeToArray(root):
    if not root:
        return []

    result = []
    queue = [root]

    while queue:
        node = queue.pop(0)

        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)

    # remove trailing None values
    while result and result[-1] is None:
        result.pop()

    return result
`;
const formattedTests = testCases
  .map(test => `[${test.input.map(a => JSON.stringify(a)).join(",")}]`)
  .join(",");

wrapper += `
import json

test_cases = [${formattedTests}]

for test in test_cases:
    try:
        converted_args = [arrayToTree(arg) for arg in test]
        result = ${fnName}(*converted_args)

        if isinstance(result, TreeNode):
            output = treeToArray(result)
        else:
            output = result

        print(json.dumps(output))

    except Exception as e:
        import sys
        print(str(e), file=sys.stderr)
        sys.exit(1)
`;



    return wrapper;
  }

};
export default {BuildPythonWrapper};
*/

export const BuildPythonWrapper = (
  userCode,
  fnName,
  testCases,
  inputType,
  params,
  returnType
) => {

  // 🔥 FORMAT TEST CASES
  const formattedTests = testCases
    .map(tc => `[${tc.input.map(inp => JSON.stringify(inp)).join(",")}]`)
    .join(",");

  // 🔥 POS LIST (cycle problems)
  const posList = testCases.map(tc => tc.extra?.pos ?? -1);

  let wrapper = `${userCode}\n\n`;

  // ----------- DATA STRUCTURES -----------

  wrapper += `
# ----------- DATA STRUCTURES -----------

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
`;

  // ----------- HELPERS -----------

  wrapper += `
# ----------- HELPERS -----------

def parseArray(arr):
    return arr

def parseMatrix(arr):
    return arr

def buildList(arr):
    dummy = ListNode()
    curr = dummy
    for val in arr:
        curr.next = ListNode(val)
        curr = curr.next
    return dummy.next

# 🔥 CYCLIC LIST
def buildCyclicList(arr, pos):
    dummy = ListNode()
    curr = dummy
    cycleNode = None

    for i in range(len(arr)):
        curr.next = ListNode(arr[i])
        curr = curr.next

        if i == pos:
            cycleNode = curr

    if pos != -1 and curr:
        curr.next = cycleNode

    return dummy.next

def printList(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    print(res)

def buildTree(arr):
    if not arr:
        return None

    root = TreeNode(arr[0])
    queue = [root]
    i = 1

    while i < len(arr):
        node = queue.pop(0)

        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1

        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1

    return root
`;

  // ----------- MAIN -----------

  wrapper += `
# ----------- MAIN -----------

test_cases = [${formattedTests}]
pos_list = [${posList.join(",")}]

for i in range(len(test_cases)):
    test = test_cases[i]
`;

  // 🔥 PARAM PARSING

  params.forEach((param, index) => {

    if (param.type === "array") {
      wrapper += `    ${param.name} = parseArray(test[${index}])\n`;
    }

    else if (param.type === "number") {
      wrapper += `    ${param.name} = int(test[${index}])\n`;
    }

    else if (param.type === "string") {
      wrapper += `    ${param.name} = test[${index}]\n`;
    }

    else if (param.type === "matrix") {
      wrapper += `    ${param.name} = parseMatrix(test[${index}])\n`;
    }

    else if (param.type === "linkedlist") {
      wrapper += `
    ${param.name} = buildList(test[${index}]) if pos_list[i] == -1 else buildCyclicList(test[${index}], pos_list[i])
`;
    }

    else if (param.type === "tree") {
      wrapper += `    ${param.name} = buildTree(test[${index}])\n`;
    }

  });

  const paramNames = params.map(p => p.name).join(",");

  wrapper += `
    try:
        result = ${fnName}(${paramNames})
`;

  // 🔥 OUTPUT HANDLING

  if (returnType === "number" || returnType === "string") {
    wrapper += `        print(result)\n`;
  }

  else if (returnType === "boolean") {
    wrapper += `        print("true" if result else "false")\n`;
  }

  else if (returnType === "array" || returnType === "matrix") {
    wrapper += `        import json\n        print(json.dumps(result))\n`;
  }

  else if (returnType === "linkedlist") {
    wrapper += `
        if result:
            print(result.val)
        else:
            print(-1)
`;
  }

  wrapper += `
    except Exception as e:
        import sys
        print(str(e), file=sys.stderr)
        sys.exit(1)
`;

  return wrapper;
};

export default { BuildPythonWrapper };