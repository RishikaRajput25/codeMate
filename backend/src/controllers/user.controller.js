import {asyncHandler} from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponce} from "../utils/ApiResponce.js";

const generateAccessAndRefreshTokens= async(userId)=>{
    try{
 const user= await User.findById(userId);
 const accessToken= user.generateAccessToken();
 const refreshToken = user.generateRefreshToken();
  
 user.refreshToken= refreshToken;
 await user.save({ validateBeforeSave: false });

 return {accessToken, refreshToken};}
 catch(err){
 console.log("TOKEN ERROR:", err);
     throw new ApiError(500, "Error generating tokens");
 }
};

const registerUser= asyncHandler(async(req,res)=>{
  let {username,email,password}=req.body;
  if([username,email,password].some((f)=>f?.trim()=="")){
    throw new ApiError(400,"All fields are required")
  }
  username= username.toLowerCase();
  email= email.toLowerCase();
  const existedUser= await User.findOne({
    $or:[{username,email}],
  })
  if(existedUser){
    throw new ApiError(409,"User already exists")
  }
  const user = await User.create({
    username,
    email,
    password,
  })

  const createdUser= await User.findById(user._id).select("-password -refreshToken");
  return res
  .status(201)
  .json(new ApiResponce(200, createdUser,"User registered successfully"));
});



const loginUser= asyncHandler(async(req,res)=>{
const {username,email,password}=req.body;
// if (username) username = username.toLowerCase();
// if (email) email = email.toLowerCase();
if(!username && !email){
  throw new ApiError(400,"Username or Email is required")
}
const user = await User.findOne({
  $or: [{username},{email}],
})
if(!user){
  throw new ApiError(404,"User does not exist")
}
const isPasswordValid=await user.isPasswordCorrect(password);
if(!isPasswordValid){
  throw new ApiError(401, "Password is incorrect");
}
const {accessToken, refreshToken}=await generateAccessAndRefreshTokens(user._id);
const loggedInUser=await User.findById(user._id)
.select(
  "-password -refreshToken"
);
const options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",//extra added
  };
return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );

})
const checkAuth= asyncHandler(async(req,res)=>{
  return res.status(200).json({
    success:true,
    message:"User is logged in",
    user:req.user,
  });
});

const logoutUser = asyncHandler(async(req,res)=>{
  console.log(" LOGOUT CONTROLLER HIT");
  await User.findByIdAndUpdate(
    req.user._id,
    {$set :{refreshToken:null}},
    {new:true}
  );
   const options={
    httpOnly:true,
    secure:false,
    sameSite:"lax",
     path:"/"
   }
   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json({
      success: true,
      message: "Logged out successfully",
    });

})

const updateUsername = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // from auth middleware
  let { username } = req.body;

  //  validation
  if (!username || username.trim() === "") {
    throw new ApiError(400, "Username is required");
  }

  username = username.toLowerCase().trim();

  // check duplicate username
  const existingUser = await User.findOne({ username });

  if (existingUser && existingUser._id.toString() !== userId.toString()) {
    throw new ApiError(409, "Username already taken");
  }

  //  update
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponce(200, updatedUser, "Username updated successfully"));
});
export {registerUser,loginUser,checkAuth,logoutUser,updateUsername};

