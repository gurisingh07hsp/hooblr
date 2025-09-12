"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user";
import axios from "axios";

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

  const getProfile = async() =>{
    try{
        const response = await axios.get('http://localhost:5000/api/auth/me', {withCredentials: true});
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
        const response = await axios.get(`http://localhost:5000/api/auth/logout`, {withCredentials: true});
        console.log(response.data);
        if(response.status == 200){
            setUser(null);
            setIsLoggedIn(false);
            router.push('/');
        }
    }catch(error){
        console.log(error);
    }
    
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
