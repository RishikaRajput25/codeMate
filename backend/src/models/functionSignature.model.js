/*
import mongoose from "mongoose";
const functionSignatureSchema= mongoose.Schema({
    name:{
     type:String,  // e.g. twoSum, reverseString
     required: true,
     trim:true,
    },
    params:{
      type:[String],  // e.g. ["nums", "target"]
      required: true,
    },
    returnType:{
      type: String,   // optional (Array, Number, String, etc.)
    },
},{_id : false}
)
export default functionSignatureSchema;
*/

import mongoose from "mongoose";
const functionSignatureSchema= mongoose.Schema({
    name:{
     type:String,  // e.g. twoSum, reverseString
     required: true,
     trim:true,
    },
    params: [
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["array", "number", "string", "matrix", "linkedlist", "tree", "graph"]
    }
  }
],
    returnType:{
      type: String,   // optional (Array, Number, String, etc.)
    },
},{_id : false}
)
export default functionSignatureSchema;