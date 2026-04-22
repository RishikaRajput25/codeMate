
// import { DB_Name } from "../constants.js";
import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB=async()=>{
  try{
   
    const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)

  }
  catch(error){
   console.log("MONGODB connection Failed : ", error);
   process.exit(1);
  }
}
export default connectDB;
