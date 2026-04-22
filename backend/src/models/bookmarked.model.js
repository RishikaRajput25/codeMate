import mongoose from "mongoose"

const bookMarkedSchema=  new mongoose.Schema({
    user:{
      type: mongoose.Types.ObjectId,
      ref:"User",
      required:true,
    },
    problem:{
        type : mongoose.Types.ObjectId,
        ref:"Problem",
        required:true,
    }
},{timestamps:true})
bookMarkedSchema.index({user:1,problem:1},{unique:true});
export const Bookmark= mongoose.model("Bookmark",bookMarkedSchema);