import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

const app= express();
dotenv.config({
    path:'./env'
})
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser())
import userRouter from "./routes/user.routes.js"
import problemRouter from "./routes/problem.routes.js";
import bookmarkRouter from "./routes/bookmark.routes.js";
import groupRouter from "./routes/group.routes.js"
app.use((req,res,next)=>{
    console.log("Incoming Request:", req.method, req.url);
    next();
});
app.use("/api/v1/users",userRouter);
app.use("/api/v1/problems",problemRouter);
app.use("/api/v1/bookmarks",bookmarkRouter);
app.use("/api/v1/groups",groupRouter);
export default app;