// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/index.js"

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );
// // "test": "echo \"Error: no test specified\" && exit 1"

import connectDB from "./db/index.js";
import app from "./app.js";
connectDB().then(()=>{
app.listen(process.env.PORT || 3000,()=>{
console.log(`App is listening on port ${process.env.PORT || 3000}`)
})
}).catch((err)=>{
   console.log("MongoDB Connection failed!", err);
})