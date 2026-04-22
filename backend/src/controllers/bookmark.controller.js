//import {Problem} from "../models/problem.model.js"
//import {User} from "../models/user.model.js"
import { Bookmark } from "../models/bookmarked.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const BookarmedProblem = asyncHandler(async(req,res)=>{
    console.log("request aa gyi hai  Bookmark")
const userId= req.user?._id;
const {problemId} = req.params;
if(!userId){
    throw new ApiError(404,"Unauthoized request")
}
if(!problemId){
    throw new ApiError(404,"Problem not found");
}
const existing = await Bookmark.findOne({
    user:userId,
    problem:problemId
})
if(existing){
    //remove existing
    await Bookmark.deleteOne({_id:existing._id});
    //  return res.status(202).json(new ApiResponce(200,null,"Bookmark removed"));
     return res.status(200).json(
      new ApiResponce(200, { isBookmarked: false }, "Bookmark removed"));
}

// Add Bookmark
await Bookmark.create({
    user:userId,
    problem:problemId,
});
return res.status(201).json(new ApiResponce(201, { isBookmarked: true },"Problem Bookmarked"));

});

 export const getBookmarked = asyncHandler(async(req,res)=>{
    const userId= req.user?._id;
    if(!userId){
        throw new ApiError(404,"Unauthoized Request");
    }
    const bookmarks=await Bookmark.find({user:userId}).populate({
        path: "problem",
    })
    .sort({createdAt : -1});
    return res.status(200).json(new ApiResponce(200,bookmarks,"Bookmarked fetched"));

 })
export const checkBookmark = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { problemId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const existing = await Bookmark.findOne({
    user: userId,
    problem: problemId,
  });

  return res.status(200).json(
    new ApiResponce(200, { isBookmarked: !!existing }, "Bookmark status")
  );
});
export default {BookarmedProblem,getBookmarked,checkBookmark};