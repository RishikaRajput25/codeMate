/*
import { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus, logoutUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await checkLoginStatus();
      setUser(res?.data?.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        logout: handleLogout,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/
import { createContext,useContext ,useEffect, useState} from "react";
import { checkLoginStatus,logoutUser } from "../services/api.js";

const AuthContext= createContext();

export const AuthProvider=({children})=>{
  const [user, setUser]=useState(null);
  const [loading, setLoading]= useState(true);

  const fetchUser= async()=>{
    const res= await checkLoginStatus();
    if(res?.user){
      setUser(res.user);
    }
    else{
      setUser(null)
    }
    setLoading(false);
  };
  
  const logout= async()=>{
    await logoutUser();
     setUser(null);
  }

   useEffect(()=>{
    fetchUser();
   },[])
       // 🔥 MOST IMPORTANT

   return(
    <AuthContext.Provider value={{user,setUser,loading,logout}}>
      {children}
    </AuthContext.Provider>
   )
};

export const useAuth = ()=>useContext(AuthContext);