'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "@/context/UserContext";
import { X, User, Building2, Mail, Lock, Eye, EyeOff, Briefcase, Users } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  // onAuth: (userData: any) => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { setUser} = useUser();
  const [step, setStep] = useState<'role' | 'auth'>('role');
  const [selectedRole, setSelectedRole] = useState<'user' | 'company' | 'admin' | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: selectedRole,
    companyName: '',
    companySize: '',
    industry: ''
  });

  const handleRoleSelect = (role: 'user' | 'company' | 'admin') => {
    setSelectedRole(role);
    setStep('auth');
  };


  useEffect(()=>{
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  },[selectedRole]);

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
        const response = await axios.post('http://localhost:5000/api/auth/register', formData, {withCredentials: true});
        setUser(response.data.user);
        setMessage('✅ Account Created successful!');
        resetForm();
        setTimeout(()=>{
          onClose();
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
        const response = await axios.post('http://localhost:5000/api/auth/login', formData, {withCredentials: true});
        setUser(response.data.user);
        setMessage('✅ Login successful!');
        resetForm();
        setTimeout(()=>{
          onClose();
        },1500);
      }catch(error){
        if (axios.isAxiosError(error)) {
          const err = error.response?.data?.error || 'Failed to login';
          setMessage(err);
        } else {
          setMessage('An unexpected error occurred');
        }
      } 
    }
    
    // Mock authentication - in real app, this would call an API
    // const userData = {
    //   id: Math.random().toString(36).substr(2, 9),
    //   email: formData.email,
    //   role: selectedRole,
    //   name: selectedRole === 'company' ? formData.companyName : formData.name,
    //   ...(selectedRole === 'company' && {
    //     companySize: formData.companySize,
    //     industry: formData.industry
    //   })
    // };

    // // Add admin access for demo purposes
    // if (formData.email === 'admin@hooblr.com') {
    //   userData.role = 'admin'  ;
    // }

    // onAuth(userData);
    // onClose();
    // resetForm();
  };

  const resetForm = () => {
    setStep('role');
    setSelectedRole(null);
    setAuthMode('signin');
    setShowPassword(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: selectedRole,
      companyName: '',
      companySize: '',
      industry: ''
    });
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden" style={{ zIndex: 10000 }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">
            {step === 'role' ? 'Welcome to Hooblr' : 
             selectedRole === 'company' ? 'Company Account' : 'Job Seeker Account'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Role Selection Step */}
        {step === 'role' && (
          <div className="p-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                What brings you here today?
              </h3>
              <p className="text-gray-600">
                Choose your path to get started with the right experience
              </p>
            </div>

            <div className="space-y-4">
              {/* Job Seeker Option */}
              <button
                onClick={() => handleRoleSelect('user')}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-medium text-gray-900">I&apos;m looking for a job</h4>
                    <p className="text-gray-600 text-sm">
                      Find your dream job from thousands of opportunities
                    </p>
                  </div>
                </div>
              </button>

              {/* Company Option */}
              <button
                onClick={() => handleRoleSelect('company')}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-medium text-gray-900">I&apos;m hiring talent</h4>
                    <p className="text-gray-600 text-sm">
                      Post jobs and find the perfect candidates for your team
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Authentication Step */}
        {step === 'auth' && (
          <div className="p-6">
            {/* Back Button */}
            <button
              onClick={() => setStep('role')}
              className="mb-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to role selection
            </button>

            {/* Role Indicator */}
            <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
              {selectedRole === 'company' ? (
                <Building2 className="w-5 h-5 text-green-600" />
              ) : (
                <User className="w-5 h-5 text-blue-600" />
              )}
              <span className="text-sm font-medium text-gray-700">
                {selectedRole === 'company' ? 'Company Account' : 'Job Seeker Account'}
              </span>
            </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedRole === 'company' ? 'Company Name' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name={selectedRole === 'company' ? 'companyName' : 'name'}
                    value={selectedRole === 'company' ? formData.companyName : formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={selectedRole === 'company' ? 'Enter company name' : 'Enter your full name'}
                  />
                </div>
              )}

              {/* Company-specific fields */}
              {authMode === 'signup' && selectedRole === 'company' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size *
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
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
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                  selectedRole === 'company'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>

              {/* Terms and Privacy (Sign Up Only) */}
              {authMode === 'signup' && (
                <p className="text-xs text-gray-600 text-center">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}