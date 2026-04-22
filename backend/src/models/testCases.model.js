/*
import mongoose from "mongoose";

const testCaseSchema= new mongoose.Schema({
    input:{
        type: Object,  // JSON input (nums, target, string, etc.)
        required: true,
    },
    expectedOutput:{
        type:Object,
        required : true,
    },
},
{_id:false}
)
export default testCaseSchema;
*/

import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: [mongoose.Schema.Types.Mixed], // ordered params
      required: true,
    },
    expectedOutput: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    extra: {
      type: mongoose.Schema.Types.Mixed, // metadata (cycle, graph, etc.)
      default: {},
    },
  },
  { _id: false }
);

export default testCaseSchema;