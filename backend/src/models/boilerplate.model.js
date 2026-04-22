import mongoose from "mongoose";
const boilerPlateSchema= new mongoose.Schema({
  language :{
   type:String,
  //  enum:["JAVASCRIPT","PYTHON"],
  enum:["JAVASCRIPT","PYTHON","CPP","JAVA"],
   required:true,
  } ,
  code:{
    type: String,
    required:true,
  } ,
},
{_id:false}
)
export default boilerPlateSchema;