import { Router } from "express";
import {loginUser, registerUser,checkAuth, logoutUser, updateUsername} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router= Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/check-auth').get(verifyJWT,checkAuth);
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/update-username').post(verifyJWT,updateUsername);
export default router;