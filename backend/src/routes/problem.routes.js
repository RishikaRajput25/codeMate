import { Router } from "express";
import { createProblem,deletePersonal,getAllProblems, getMyProblems, getProblemById, getProblemsByTopics, getPublicProblemById, getPublicTopics, searchProblems } from "../controllers/problem.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { runCode } from "../controllers/runCode.controller.js";

import { getLastSubmission, getMyAcceptedSubmissions, submitSolution } from "../controllers/submission.controller.js";
import {getAnalyticsData} from "../controllers/profileAnalytics.controller.js";
import { aiReview } from "../controllers/aiReview.controller.js";
import { generateProblem } from "../controllers/generateProblem.js";
const router= Router();
router .route('/generate-ai').post(verifyJWT, generateProblem);
router.route('/create').post(verifyJWT,createProblem);

router.route('/').get(getAllProblems);
// for search function
router.route('/search').get(searchProblems);

router.route('/topics').get(getPublicTopics);

router.route('/topic/:topic').get(getProblemsByTopics);

router.route('/my').get(verifyJWT,getMyProblems);
router.route('/getAnalytics').get(verifyJWT,getAnalyticsData);
router.route('/:id').get(getPublicProblemById);
router.route('/personal/:id').delete(verifyJWT,deletePersonal);
router.route('/run').post(verifyJWT,runCode);

router.route('/submit').post(verifyJWT,submitSolution);

router.route('/submit/last/:problemId').get(verifyJWT,getLastSubmission);
router.route('/submit/mysubmitted').get(verifyJWT,getMyAcceptedSubmissions);
router.route('/my/:id').get(verifyJWT,getProblemById);
router.route('/ai-review').post(verifyJWT, aiReview);
// router .route('/generate-ai').post(verifyJWT, generateProblem);
export default router;
 