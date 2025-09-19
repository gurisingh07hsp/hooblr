'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "@/context/UserContext";
import { useRouter } from 'next/navigation';
import { signIn} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import {Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AuthModal() {
  const { setUser} = useUser();
  const router = useRouter();
  // const [selectedRole, setSelectedRole] = useState<'user' | 'company' | 'admin' | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'user',
    companyName: '',
    companySize: '',
    industry: ''
  });


  // useEffect(()=>{
  //   setFormData((prev) => ({ ...prev, role: selectedRole }));
  // },[selectedRole]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    if(authMode == 'signup'){
      try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, formData, {withCredentials: true});
        setUser(response.data.user);
        setMessage('✅ Account Created successful!');
        resetForm();
        setTimeout(()=>{
        router.back();
        },1500);
      }catch(error){
        if (axios.isAxiosError(error)) {
          const err = error.response?.data?.message || 'Failed to Signup';
          setMessage(err);
        } else {
          setMessage('An unexpected error occurred');
        }
      } 
    }
    else{
      try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, formData, {withCredentials: true});
        setUser(response.data.user);
        setMessage('✅ Login successful!');
        router.back();
        resetForm();
      }catch(error){
        if (axios.isAxiosError(error)) {
          const err = error.response?.data?.error || 'Failed to login';
          setMessage(err);
        } else {
          setMessage('An unexpected error occurred');
        }
      } 
    }
  };

  const resetForm = () => {
    setAuthMode('signin');
    setMessage('');
    setShowPassword(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'user',
      companyName: '',
      companySize: '',
      industry: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-zinc-200 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden" style={{ zIndex: 10000 }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome to Hooblr
          </h2>
        </div>

        {/* Authentication Step */}
        
          <div className={`${authMode == 'signin' ? 'p-6' : 'px-6'}`}>

            {/* Auth Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  authMode === 'signin'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  authMode === 'signup'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Sign Up Only) */}
              {authMode === 'signup' && (
                <div>
                  <input
                    type="text"
                    name={'name'}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={'Enter your full name'}
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up Only) */}
              {authMode === 'signup' && (
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}
              
              <p className='text-center'>{message}</p>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors bg-purple-600 hover:bg-purple-700`}
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
             <button onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full mt-2 flex items-center justify-center py-2 font-semibold mx-auto border rounded-lg">
                <FcGoogle className="mr-2 size-5" />
                {authMode === 'signin' ? 'Continue with Google' : 'Sign up with Google'}
              </button>
            {/* Terms and Privacy (Sign Up Only) */}
            {authMode === 'signup' && (
                <p className="text-xs text-gray-600 text-center mt-3 pb-2">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              )}
          </div>

      </div>
    </div>
  );
}