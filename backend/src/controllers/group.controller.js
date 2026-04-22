import { Group } from "../models/group.model.js";
import { User } from "../models/user.model.js";
import { GroupScore } from "../models/groupScore.model.js";
//import {Submission} from "../models/submission.model.js";
import Submission from "../models/submission.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";


export const createGroup= asyncHandler(async(req,res)=>{
    const user= req.user;
    if(!user){
        throw new ApiError(404,"Unauthoized Request");
    }
    const {name}= req.body;
    if(!name){
        throw new ApiError(403,"Group name not found ");
    }
    if (user.groupId) {
    throw new ApiError(400, "You are already in a group. Cannot create a new one.");
  }
    const group = await Group.create({
        name,
        creator:user._id,
        members: [user._id],
    })
    user.groupId= group._id;
    await user.save();

    //new added start
     const solvedCount = await Submission.countDocuments({
  user: user._id,
  status: "Accepted",
});
    //new added end
    await GroupScore.create({
        groupId: group._id,
        userId:user._id,
        // totalSolved:user.totalSolved,
         totalSolved: solvedCount,
    });
     return res.status(200).json( new ApiResponce(200,group,"Group  created successfully"));
})


export const addMember = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const { groupId } = req.params;
  const { email } = req.body;
 console.log("data ander aa gya ")
  if (!loggedInUser) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (!groupId) {
    throw new ApiError(400, "Group ID is required");
  }

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  // Only creator can add
  if (group.creator.toString() !== loggedInUser._id.toString()) {
    throw new ApiError(403, "Only creator can add members");
  }

  if (group.members.length >= 10) {
    throw new ApiError(400, "Maximum 10 members allowed");
  }

  const newUser = await User.findOne({ email });
  if (!newUser) {
    throw new ApiError(404, "User not found");
  }

  // Prevent duplicate
  if (group.members.includes(newUser._id)) {
    throw new ApiError(400, "User already in this group");
  }

  // Add member
  group.members.push(newUser._id);
  await group.save();
  //update new  member groupId
 newUser.groupId = group._id;
await newUser.save();



const solvedCount = await Submission.countDocuments({
  user: newUser._id,
  status: "Accepted",
});

  // Create GroupScore entry
  await GroupScore.create({
    groupId: group._id,
    userId: newUser._id,
    totalSolved: solvedCount,
    // totalSolved: newUser.totalSolved || 0,
  });

  return res
    .status(200)
    .json(new ApiResponce(200, null, "Member added successfully"));
});


export const leaveGroup = asyncHandler(async (req, res) => {

  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized Request");
  }

  if (!user.groupId) {
    throw new ApiError(400, "User not in any group");
  }

  const group = await Group.findById(user.groupId);

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  // Remove user from members
  group.members = group.members.filter(
    (m) => m.toString() !== user._id.toString()
  );

  // Delete GroupScore entry
  await GroupScore.deleteOne({
    groupId: group._id,
    userId: user._id,
  });

  // If creator leaving
  if (group.creator.equals(user._id)) {

    if (group.members.length === 0) {
      await group.deleteOne();
    } else {
      group.creator = group.members[0];
      await group.save();
    }

  } else {

    if (group.members.length === 0) {
      await group.deleteOne();
    } else {
      await group.save();
    }

  }

  // updating user
  user.groupId = null;
  await user.save();

  return res.status(200).json(
    new ApiResponce(200, null, "Left group successfully")
  );
});

export const deleteGroup = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const { groupId } = req.params;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  if (group.creator.toString() !== loggedInUser._id.toString()) {
    throw new ApiError(403, "Only creator can delete group");
  }

  // Reset groupId for all members
  await User.updateMany(
    { groupId: group._id },
    { $set: { groupId: null } }
  );

  await GroupScore.deleteMany({ groupId: group._id });

  await group.deleteOne();

  return res.status(200).json(
    new ApiResponce(200, null, "Group deleted successfully")
  );
});

export const getMyGroup= asyncHandler(async(req,res)=>{
  const user = req.user;
  if(!user.groupId){
    throw new ApiError(404,"User is Not in any group");
  }
   const group = await Group.findById(user.groupId)
   .populate("creator","username email")
   .populate("members","username email");
   if(!group){
    throw new ApiError(404,"Group not found");
   }
   return res.status(200).json(
    new ApiResponce(200, group, "Group fetched successfully")
  );
}) 

export const getGroupById = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId)
    .populate("creator", "username email")
    .populate("members", "username email");

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  return res.status(200).json(
    new ApiResponce(200, group, "Group fetched successfully")
  );
});
export const removeMember = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const { groupId, userId } = req.params;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  if (group.creator.toString() !== loggedInUser._id.toString()) {
    throw new ApiError(403, "Only creator can remove members");
  }

  if (group.creator.toString() === userId) {
    throw new ApiError(400, "Creator cannot remove themselves");
  }

  group.members = group.members.filter(
    (member) => member.toString() !== userId
  );

  await group.save();

  await User.findByIdAndUpdate(userId, { groupId: null });

  await GroupScore.deleteOne({
    groupId: groupId,
    userId: userId,
  });

  return res.status(200).json(
    new ApiResponce(200, null, "Member removed successfully")
  );
});
export const updateGroupName = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const { groupId } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Group name is required");
  }

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  if (group.creator.toString() !== loggedInUser._id.toString()) {
    throw new ApiError(403, "Only creator can update group");
  }

  group.name = name;
  await group.save();

  return res.status(200).json(
    new ApiResponce(200, group, "Group updated successfully")
  );
});

export const getLeaderboard = asyncHandler(async(req,res)=>{
  console.log("leaderboard ke ander  aa chuki hu ")
  const  user= req.user;
  if(!user){
    throw new ApiError(400,"Unauthoized Request");
  }
  const groupId = user.groupId;
  if(!groupId){
    throw new ApiError(400,"group not found");
  }
 const startofDay = new Date();
startofDay.setUTCHours(0, 0, 0, 0);

console.log("startofDay :",startofDay);
  const leaderboard = await GroupScore.aggregate([
    //match group
    {
      $match:{
        groupId : new mongoose.Types.ObjectId(groupId),
      },
    },
    //lookup for today submission
    {
      $lookup :{
        from:"submissions",
        let:{userId : "$userId", groupId: "$groupId"},


        pipeline: [
  {
    $match: {
      $expr: {
        $and: [
          {
            $eq: [
              { $toObjectId: "$user" },
              "$$userId"
            ]
          },
          { $eq: [{ $toLower: "$status" }, "accepted"] },
          { $gte: ["$createdAt", startofDay] }
        ]
      }
    }
  }
],

        as:"todaySubmissions",
      },
    },
    
     //  Add todaySolved count
    {
      $addFields: {
        todaySolved: { $size: "$todaySubmissions" },
      },
    },

    //  Lookup user info
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
//group name
     {
    $lookup: {
      from: "groups",
      localField: "groupId",
      foreignField: "_id",
      as: "group",
    },
  },
  { $unwind: "$group" },
   
  //  Sort by todaySolved first, then totalSolved
    {
      $sort: {
        todaySolved: -1,
        totalSolved: -1,
      },
    },
    // Final 
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        username: "$user.username",
        totalSolved: 1,
        todaySolved: 1,
        groupName: "$group.name",
      },
    },
  ]);

   // Assign rank dynamically
  const rankedLeaderboard = leaderboard.map((entry, index) => ({
    rank: index + 1,
    ...entry,
  }));
  
  return res.status(200).json(new ApiResponce(200,{leaderboard: rankedLeaderboard},"leaderboard data successfully accessed"));

});


export default {createGroup,addMember,leaveGroup,deleteGroup,getMyGroup,getGroupById,removeMember,updateGroupName,getLeaderboard};
