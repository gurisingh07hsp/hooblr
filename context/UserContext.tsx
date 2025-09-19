"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  const router = useRouter();
  const { data: session } = useSession();

  const googleRegister = async(session: any) => {
    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/googlelogin`, {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }, {withCredentials: true});
        if(res.status === 200){
          setUser(res.data.user);
        }
    }catch{
      console.log("Google Signin Error");
    }
  }

    useEffect(() => {
    if (session?.user) {
      googleRegister(session);
    }
  }, [session]);

  const getProfile = async() =>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {withCredentials: true});
        if(response.status == 200){
            setUser(response.data.user);
            console.log(response.data);
        }
    }catch(error){
        if (axios.isAxiosError(error)) {
          setUser(null);
        }
      } 
  }

  useEffect(()=>{
    getProfile();
  },[])

  const logout = async() => {
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {withCredentials: true});
        console.log(response.data);
        if(response.status == 200){
            setUser(null);
            setIsLoggedIn(false);
            router.push('/');
        }
    }catch(error){
        console.log(error);
    }
    signOut({ callbackUrl: "/" })
    
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for easy access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
