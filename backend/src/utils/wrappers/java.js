
// export const BuildJavaWrapper = (
//   userCode,
//   fnName,
//   testCases,
//   params,
//   returnType
// ) => {

//   // 🔥 STEP 1: CLEAN USER CODE
//   const cleanUserCode = userCode
//     .replace(/import\s+java\.util\.\*;/g, "") // remove imports
//     .replace(/class\s+TreeNode[\s\S]*?\}/g, "") // remove TreeNode
//     .replace(/class\s+ListNode[\s\S]*?\}/g, "") // remove ListNode
//     .trim();

//   if (typeof params === "string") {
//     params = JSON.parse(params);
//   }

//   const formattedTests = testCases
//     .map(tc => `{${tc.input.map(inp => `"${JSON.stringify(inp)}"`).join(",")}}`)
//     .join(",");

//   let wrapper = `
// import java.util.*;

// // ----------- DATA STRUCTURES -----------

// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x){ val = x; }
// }

// class TreeNode {
//     int val;
//     TreeNode left, right;
//     TreeNode(int x){ val = x; }
// }

// // ----------- USER CODE -----------

// ${cleanUserCode}

// public class Main {

// // ----------- HELPERS -----------

// static int[] parseArray(String arr){
//     arr = arr.replaceAll("[\\\\[\\\\]\\\\s]", "");
//     if(arr.isEmpty()) return new int[0];

//     String[] parts = arr.split(",");
//     int[] nums = new int[parts.length];

//     for(int i=0;i<parts.length;i++){
//         nums[i] = Integer.parseInt(parts[i]);
//     }

//     return nums;
// }

// static int[][] parseMatrix(String arr){

//     arr = arr.replaceAll("\\\\[\\\\[", "");
//     arr = arr.replaceAll("\\\\]\\\\]", "");

//     String[] rows = arr.split("\\\\],\\\\[");

//     int[][] matrix = new int[rows.length][];

//     for(int i=0;i<rows.length;i++){
//         String[] nums = rows[i].split(",");
//         matrix[i] = new int[nums.length];

//         for(int j=0;j<nums.length;j++){
//             matrix[i][j] = Integer.parseInt(nums[j]);
//         }
//     }

//     return matrix;
// }

// static ListNode buildList(String arr){
//     arr = arr.replaceAll("[\\\\[\\\\]\\\\s]", "");
//     if(arr.isEmpty()) return null;

//     String[] parts = arr.split(",");

//     ListNode head = null, tail = null;

//     for(String p : parts){
//         ListNode node = new ListNode(Integer.parseInt(p));

//         if(head == null){
//             head = node;
//             tail = node;
//         } else {
//             tail.next = node;
//             tail = node;
//         }
//     }

//     return head;
// }

// static void printList(ListNode head){
//     System.out.print("[");
//     while(head != null){
//         System.out.print(head.val);
//         head = head.next;
//         if(head != null) System.out.print(",");
//     }
//     System.out.println("]");
// }

// static TreeNode buildTree(String arr){

//     arr = arr.replaceAll("[\\\\[\\\\]\\\\s]", "");
//     if(arr.isEmpty()) return null;

//     String[] nodes = arr.split(",");

//     if(nodes[0].equals("null")) return null;

//     TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));
//     Queue<TreeNode> q = new LinkedList<>();
//     q.add(root);

//     int i = 1;

//     while(!q.isEmpty() && i < nodes.length){

//         TreeNode curr = q.poll();

//         if(!nodes[i].equals("null")){
//             curr.left = new TreeNode(Integer.parseInt(nodes[i]));
//             q.add(curr.left);
//         }
//         i++;

//         if(i < nodes.length && !nodes[i].equals("null")){
//             curr.right = new TreeNode(Integer.parseInt(nodes[i]));
//             q.add(curr.right);
//         }
//         i++;
//     }

//     return root;
// }

// // ----------- MAIN -----------

// public static void main(String[] args){

// String[][] testCases = {${formattedTests}};

// for(String[] test : testCases){
// `;

//   // 🔥 PARAM PARSING
//   params.forEach((param, index) => {

//     if(param.type === "array"){
//       wrapper += `int[] ${param.name} = parseArray(test[${index}]);\n`;
//     }

//     else if(param.type === "number"){
//       wrapper += `int ${param.name} = Integer.parseInt(test[${index}]);\n`;
//     }

//     else if(param.type === "string"){
//       wrapper += `String ${param.name} = test[${index}];\n`;
//     }

//     else if(param.type === "matrix"){
//       wrapper += `int[][] ${param.name} = parseMatrix(test[${index}]);\n`;
//     }

//     else if(param.type === "linkedlist"){
//       wrapper += `ListNode ${param.name} = buildList(test[${index}]);\n`;
//     }

//     else if(param.type === "tree"){
//       wrapper += `TreeNode ${param.name} = buildTree(test[${index}]);\n`;
//     }

//     else if(param.type === "graph"){
//       wrapper += `List<List<Integer>> ${param.name} = buildGraph(test[${index}]);\n`;
//     }

//     else if(param.type === "stack"){
//       wrapper += `Stack<Integer> ${param.name} = buildStack(test[${index}]);\n`;
//     }

//     else if(param.type === "queue"){
//       wrapper += `Queue<Integer> ${param.name} = buildQueue(test[${index}]);\n`;
//     }

//   });

//   const paramNames = params.map(p => p.name).join(",");

//   wrapper += `
// var result = Solution.${fnName}(${paramNames});
// `;

//   // OUTPUT
//   if(returnType === "number" || returnType === "string"){
//     wrapper += `System.out.println(result);\n`;
//   }

//   else if(returnType === "array"){
//     wrapper += `
// System.out.print("[");
// for(int i=0;i<result.length;i++){
//     System.out.print(result[i]);
//     if(i<result.length-1) System.out.print(",");
// }
// System.out.println("]");
// `;
//   }

//   else if(returnType === "matrix"){
//     wrapper += `System.out.println(Arrays.deepToString(result));\n`;
//   }

//   else if(returnType === "linkedlist"){
//     wrapper += `printList(result);\n`;
//   }

//   wrapper += `
// }

// }
// }
// `;

//   return wrapper;
// };








// before cycle in linked lists

// export const BuildJavaWrapper = (
//   userCode,
//   fnName,
//   testCases,
//   params,
//   returnType
// ) => {

//   // 🔥 SAFE CLASS REMOVAL (NO REGEX BUG)
//   function removeClass(code, className) {
//     const start = code.indexOf(`class ${className}`);
//     if (start === -1) return code;

//     let braceCount = 0;
//     let i = start;

//     while (i < code.length) {
//       if (code[i] === "{") braceCount++;
//       if (code[i] === "}") braceCount--;

//       if (braceCount === 0 && i > start) {
//         return code.slice(0, start) + code.slice(i + 1);
//       }
//       i++;
//     }
//     return code;
//   }

//   // 🔥 KEEP ONLY SOLUTION CLASS
//   function enforceSolutionClass(code) {
//     const match = code.match(/class\s+Solution[\s\S]*/);
//     return match ? match[0] : code;
//   }

//   // 🔥 STEP 1: CLEAN USER CODE (FIXED)
//   let cleanUserCode = userCode
//     .replace(/import\s+java\.[^;]+;/g, "") // remove all imports
//     .trim();

//   cleanUserCode = removeClass(cleanUserCode, "TreeNode");
//   cleanUserCode = removeClass(cleanUserCode, "ListNode");

//   cleanUserCode = enforceSolutionClass(cleanUserCode);

//   // 🔥 REMOVE STRAY BRACES (MAIN FIX)
//   cleanUserCode = cleanUserCode.replace(/^\s*\}+/g, "").trim();

//   // ------------------------------

//   if (typeof params === "string") {
//     params = JSON.parse(params);
//   }

//   const formattedTests = testCases
//     .map(tc => `{${tc.input.map(inp => `"${JSON.stringify(inp)}"`).join(",")}}`)
//     .join(",");

//   let wrapper = `
// import java.util.*;

// // ----------- DATA STRUCTURES -----------

// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x){ val = x; }
// }

// class TreeNode {
//     int val;
//     TreeNode left, right;
//     TreeNode(int x){ val = x; }
// }

// // ----------- USER CODE -----------

// ${cleanUserCode}

// public class Main {

// // ----------- HELPERS -----------

// static int[] parseArray(String arr){
//     arr = arr.replaceAll("[\\\\[\\\\]\\\\s]", "");
//     if(arr.isEmpty()) return new int[0];

//     String[] parts = arr.split(",");
//     int[] nums = new int[parts.length];

//     for(int i=0;i<parts.length;i++){
//         nums[i] = Integer.parseInt(parts[i]);
//     }

//     return nums;
// }

// static int[][] parseMatrix(String arr){

//     arr = arr.replaceAll("\\\\[\\\\[", "");
//     arr = arr.replaceAll("\\\\]\\\\]", "");

//     String[] rows = arr.split("\\\\],\\\\[");

//     int[][] matrix = new int[rows.length][];

//     for(int i=0;i<rows.length;i++){
//         String[] nums = rows[i].split(",");
//         matrix[i] = new int[nums.length];

//         for(int j=0;j<nums.length;j++){
//             matrix[i][j] = Integer.parseInt(nums[j]);
//         }
//     }

//     return matrix;
// }

// static ListNode buildList(String arr){
//     arr = arr.replaceAll("[\\\\[\\\\]\\\\s]", "");
//     if(arr.isEmpty()) return null;

//     String[] parts = arr.split(",");

//     ListNode head = null, tail = null;

//     for(String p : parts){
//         ListNode node = new ListNode(Integer.parseInt(p));

//         if(head == null){
//             head = node;
//             tail = node;
//         } else {
//             tail.next = node;
//             tail = node;
//         }
//     }

//     return head;
// }

// static void printList(ListNode head){
//     System.out.print("[");
//     while(head != null){
//         System.out.print(head.val);
//         head = head.next;
//         if(head != null) System.out.print(",");
//     }
//     System.out.println("]");
// }

// static TreeNode buildTree(String arr){

//     arr = arr.replaceAll("[\\\\[\\\\]\\\\s]", "");
//     if(arr.isEmpty()) return null;

//     String[] nodes = arr.split(",");

//     if(nodes[0].equals("null")) return null;

//     TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));
//     Queue<TreeNode> q = new LinkedList<>();
//     q.add(root);

//     int i = 1;

//     while(!q.isEmpty() && i < nodes.length){

//         TreeNode curr = q.poll();

//         if(!nodes[i].equals("null")){
//             curr.left = new TreeNode(Integer.parseInt(nodes[i]));
//             q.add(curr.left);
//         }
//         i++;

//         if(i < nodes.length && !nodes[i].equals("null")){
//             curr.right = new TreeNode(Integer.parseInt(nodes[i]));
//             q.add(curr.right);
//         }
//         i++;
//     }

//     return root;
// }

// // ----------- MAIN -----------

// public static void main(String[] args){

// String[][] testCases = {${formattedTests}};

// for(String[] test : testCases){
// `;

//   // 🔥 PARAM PARSING (UNCHANGED)
//   params.forEach((param, index) => {

//     if(param.type === "array"){
//       wrapper += `int[] ${param.name} = parseArray(test[${index}]);\n`;
//     }

//     else if(param.type === "number"){
//       wrapper += `int ${param.name} = Integer.parseInt(test[${index}]);\n`;
//     }

//     else if(param.type === "string"){
//       wrapper += `String ${param.name} = test[${index}];\n`;
//     }

//     else if(param.type === "matrix"){
//       wrapper += `int[][] ${param.name} = parseMatrix(test[${index}]);\n`;
//     }

//     else if(param.type === "linkedlist"){
//       wrapper += `ListNode ${param.name} = buildList(test[${index}]);\n`;
//     }

//     else if(param.type === "tree"){
//       wrapper += `TreeNode ${param.name} = buildTree(test[${index}]);\n`;
//     }

//     else if(param.type === "graph"){
//       wrapper += `List<List<Integer>> ${param.name} = buildGraph(test[${index}]);\n`;
//     }

//     else if(param.type === "stack"){
//       wrapper += `Stack<Integer> ${param.name} = buildStack(test[${index}]);\n`;
//     }

//     else if(param.type === "queue"){
//       wrapper += `Queue<Integer> ${param.name} = buildQueue(test[${index}]);\n`;
//     }

//   });

//   const paramNames = params.map(p => p.name).join(",");

//   wrapper += `
// var result = Solution.${fnName}(${paramNames});
// `;

//   // OUTPUT (UNCHANGED)
//   if(returnType === "number" || returnType === "string"){
//     wrapper += `System.out.println(result);\n`;
//   }

//   else if(returnType === "array"){
//     wrapper += `
// System.out.print("[");
// for(int i=0;i<result.length;i++){
//     System.out.print(result[i]);
//     if(i<result.length-1) System.out.print(",");
// }
// System.out.println("]");
// `;
//   }

//   else if(returnType === "matrix"){
//     wrapper += `System.out.println(Arrays.deepToString(result));\n`;
//   }

//   else if(returnType === "linkedlist"){
//     wrapper += `printList(result);\n`;
//   }

//   wrapper += `
// }

// }
// }
// `;

//   return wrapper;
// };







export const BuildJavaWrapper = (
  userCode,
  fnName,
  testCases,
   inputType,
  params,
  returnType
) => {

  // ===============================
  // 🔥 SAFE PARAMS PARSE (FIX)
  // ===============================
  if (typeof params === "string") {
    try {
      params = JSON.parse(params);
    } catch (e) {
      console.log("⚠️ Invalid params मिले → auto-fix लगा");
      params = [{ name: "input", type: params }];
    }
  }

  if (!Array.isArray(params)) {
    console.log("⚠️ params corrupt → fallback use");
    params = [{ name: "input", type: "array" }];
  }

  // ===============================
  // 🔥 REMOVE CLASS SAFELY
  // ===============================
  function removeClass(code, className) {
    const start = code.indexOf(`class ${className}`);
    if (start === -1) return code;

    let braceCount = 0;
    let i = start;

    while (i < code.length) {
      if (code[i] === "{") braceCount++;
      if (code[i] === "}") braceCount--;

      if (braceCount === 0 && i > start) {
        return code.slice(0, start) + code.slice(i + 1);
      }
      i++;
    }
    return code;
  }

  function enforceSolutionClass(code) {
    const match = code.match(/class\s+Solution[\s\S]*/);
    return match ? match[0] : code;
  }

  // ===============================
  // 🔥 CLEAN USER CODE
  // ===============================
  let cleanUserCode = userCode
    .replace(/import\s+java\.[^;]+;/g, "")
    .trim();

  cleanUserCode = removeClass(cleanUserCode, "TreeNode");
  cleanUserCode = removeClass(cleanUserCode, "ListNode");
  cleanUserCode = enforceSolutionClass(cleanUserCode);
  cleanUserCode = cleanUserCode.replace(/^\s*\}+/g, "").trim();

  // ===============================
  // 🔥 FORMAT TEST CASES
  // ===============================
  const formattedTests = testCases
    .map(tc => `{${tc.input.map(inp => `"${JSON.stringify(inp)}"`).join(",")}}`)
    .join(",");

  // 🔥 POS LIST (cycle)
  const posList = testCases.map(tc => tc.extra?.pos ?? -1);

  // ===============================
  // 🔥 WRAPPER START
  // ===============================
  let wrapper = `
import java.util.*;

// ----------- DATA STRUCTURES -----------

class ListNode {
    int val;
    ListNode next;
    ListNode(int x){ val = x; }
}

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x){ val = x; }
}

// ----------- USER CODE -----------

${cleanUserCode}

public class Main {

// ----------- HELPERS -----------

static int[] parseArray(String arr){
    arr = arr.replaceAll("[\\\\[\\\\]\\\\s]", "");
    if(arr.isEmpty()) return new int[0];

    String[] parts = arr.split(",");
    int[] nums = new int[parts.length];

    for(int i=0;i<parts.length;i++){
        nums[i] = Integer.parseInt(parts[i]);
    }

    return nums;
}

static ListNode buildList(String arr){
    int[] nums = parseArray(arr);

    ListNode head = null, tail = null;

    for(int x : nums){
        ListNode node = new ListNode(x);

        if(head == null){
            head = tail = node;
        } else {
            tail.next = node;
            tail = node;
        }
    }

    return head;
}

// 🔥 CYCLE BUILDER
static ListNode buildCyclicList(String arr, int pos){
    int[] nums = parseArray(arr);

    ListNode head = null, tail = null;
    ListNode cycleNode = null;

    for(int i=0;i<nums.length;i++){
        ListNode node = new ListNode(nums[i]);

        if(head == null){
            head = tail = node;
        } else {
            tail.next = node;
            tail = node;
        }

        if(i == pos) cycleNode = node;
    }

    if(pos != -1 && tail != null){
        tail.next = cycleNode;
    }

    return head;
}

// ----------- MAIN -----------

public static void main(String[] args){

String[][] testCases = {${formattedTests}};
int[] posList = {${posList.join(",")}};

for(int i = 0; i < testCases.length; i++){
    String[] test = testCases[i];
`;

  // ===============================
  // 🔥 PARAM PARSING
  // ===============================
  params.forEach((param, index) => {

    if(param.type === "array"){
      wrapper += `int[] ${param.name} = parseArray(test[${index}]);\n`;
    }

    else if(param.type === "number"){
      wrapper += `int ${param.name} = Integer.parseInt(test[${index}]);\n`;
    }

    else if(param.type === "string"){
      wrapper += `String ${param.name} = test[${index}];\n`;
    }

    else if(param.type === "linkedlist"){
      wrapper += `
ListNode ${param.name} = (posList[i] == -1)
  ? buildList(test[${index}])
  : buildCyclicList(test[${index}], posList[i]);
`;
    }

  });

  const paramNames = params.map(p => p.name).join(",");

  // ===============================
  // 🔥 FUNCTION CALL
  // ===============================
  wrapper += `
var result = Solution.${fnName}(${paramNames});
`;

  // ===============================
  // 🔥 OUTPUT HANDLING
  // ===============================
  if(returnType === "linkedlist"){
    wrapper += `
if(result != null) System.out.println(result.val);
else System.out.println(-1);
`;
  }

  else if(returnType === "number" || returnType === "string"){
    wrapper += `System.out.println(result);\n`;
  }

  else if(returnType === "array"){
    wrapper += `
System.out.print("[");
for(int i2=0;i2<result.length;i2++){
    System.out.print(result[i2]);
    if(i2<result.length-1) System.out.print(",");
}
System.out.println("]");
`;
  }

  // ===============================
  wrapper += `
}

}
}
`;

  return wrapper;
};

export default { BuildJavaWrapper };