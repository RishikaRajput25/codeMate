import  {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addMember, createGroup, deleteGroup, getGroupById, getLeaderboard, getMyGroup, leaveGroup, removeMember, updateGroupName } from "../controllers/group.controller.js";

const router= Router();

router.route('/create').post(verifyJWT,createGroup);
router.route('/leaderboard').get(verifyJWT,getLeaderboard);
router.route("/:groupId/add").post(verifyJWT,addMember);
router.route('/:groupId/remove/:userId').delete(verifyJWT,removeMember);
router.route('/leave').post(verifyJWT,leaveGroup);
router.route('/:groupId').delete(verifyJWT,deleteGroup);
router.route('/my-group').get(verifyJWT,getMyGroup);
router.route('/:groupId').get(verifyJWT,getGroupById);
router.route('/:groupId').patch(verifyJWT,updateGroupName);
router.route('/leaderboard').get(verifyJWT,getLeaderboard);
export default router;