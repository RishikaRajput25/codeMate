import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema= new mongoose.Schema({  
    username:{
        type:String,
        required:true,
        maxlength:50,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required: true
    },
    totalSolved:{
        type: Number,
        default:0,
    },
    groupId:{
     type: mongoose.Schema.Types.ObjectId,
     ref:"Group",
     default:null,
    },
    refreshToken:{
        type:String,
    }
    
},{timestamps :true})
// function me next pass tha sur return me bhi next();tha
userSchema.pre("save", async function(){
    if(!this.isModified("password"))
        return ;
    this.password= await bcrypt.hash(this.password,10);
     
});
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password, this.password)
};
//Access Token - short term
userSchema.methods.generateAccessToken= function(){
    return jwt.sign({
        _id: this._id.toString(),
      username: this.username,
      email: this.email,
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})
}
//Refresh Tokem - long Term
userSchema.methods.generateRefreshToken= function(){
   return jwt.sign(
    {
        _id:this._id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
   ) 
}
export const User = mongoose.model("User",userSchema);