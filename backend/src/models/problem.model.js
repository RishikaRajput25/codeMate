import mongoose, { Schema } from "mongoose";
import testCaseSchema from "./testCases.model.js";
import boilerPlateSchema from "./boilerplate.model.js";
import functionSignatureSchema from "./functionSignature.model.js";
const problemSchema= new mongoose.Schema({
  title:{
   type:String,
   required: true,
   trim: true,
   unique:true,
  },
  topics: {
  type: [String],
  required: true,
  validate: {
    validator: v => v.length > 0,
    message: "At least one topic is required",
  },
},
  description:{
    type:String,
    required : true,
    
  },
  difficulty:{
   type: String,
   enum: ["easy","medium","hard"],
   required: true,
  },
  functionSignature:{
 type:functionSignatureSchema,
 required: true,
  },
  boilerplate:{
   type:[boilerPlateSchema],
   required : true,
   validate :[
    (v)=>v.length >0,
    "At least one boilerplate is required",
   ]

  },
  testCases:{
  type:[testCaseSchema],
  required : true,
  validate:[
    (v)=>v.length>0,"At least one test case is required",
  ],
  },
  hiddenTestCases:{
type:[testCaseSchema],
default:[],
  },
  visibility:{
 type: String,
 enum:["PUBLIC","PRIVATE"], // private for user
  default : "PRIVATE",
  },
  createdBy:{
   type: mongoose.Schema.Types.ObjectId,
   ref:"User",
   default:null,// null hai admin ke liye 
  },
},{timestamps : true});

export const Problem= mongoose.model("Problem",problemSchema);