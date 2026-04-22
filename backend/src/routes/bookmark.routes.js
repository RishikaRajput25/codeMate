import  {Router} from "express";
import { BookarmedProblem,getBookmarked,checkBookmark } from "../controllers/bookmark.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router= Router();
router.route('/:problemId').post(verifyJWT,BookarmedProblem);
router.route('/check/:problemId').get(verifyJWT,checkBookmark)
router.route('/').get(verifyJWT,getBookmarked);
export default router;