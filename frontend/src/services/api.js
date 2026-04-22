import axios from "axios";
import toast from "react-hot-toast";

export const api= axios.create({
    baseURL:"http://localhost:5000/api/v1",
    withCredentials : true,
})

export const checkLoginStatus= async()=>{
    try{
    const res= await api.get("/users/check-auth");
    return res.data;
    }
    catch(error){
    return null;
    }
};
export const logoutUser= async()=>{
    try{
   const res= await api.post("/users/logout")
   toast.success("User logout successfully")
   return res.data
    }
    catch(err){
        return null;
    }
}

export const createProblem=(payload)=>{
    return api.post("/problems/create", payload)
};
