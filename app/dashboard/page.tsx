// components/Dashboard.tsx
'use client';

// import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import UserDashboard from '@/components/UserDashboard';
import { useRouter } from 'next/navigation';
import CompanyDashboard from '@/components/CompanyDashboard';
import { useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const { user,setUser } = useUser();
  const router = useRouter();

    const getProfile = async() =>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {withCredentials: true});
        if(response.status == 200){
            setUser(response.data.user);
        }
    }catch(error){
        if (axios.isAxiosError(error)) {
          router.push('/');
        }
      } 
  }

  useEffect(()=>{
    getProfile();
  },[])


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loading...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'company' ? <CompanyDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
