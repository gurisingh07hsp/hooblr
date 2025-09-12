'use client'

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModal';
import { useUser } from '@/context/UserContext';
import { 
  Menu, 
  X,  
  Shield,
} from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';
import PostJobModal from './PostJobModal';
const Header = () => {
      const router = useRouter();
      const {user,isLoggedIn, setIsLoggedIn,logout} = useUser();
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
      const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
      const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

    const handleAuth = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  useEffect(()=>{
    if(user){
      handleAuth();
    }
  },[user])

  const handleLogout = () => {
    logout();
  };

  const handlePostJob = () => {
    // console.log('Job posted:', jobData);
    // In a real app, this would send data to an API
  };
  return (
    <div>
        <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Hooblr</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push('/jobs')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Find Jobs
              </button>
              <button
                onClick={() => router.push('/companies')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Companies
              </button>
              <button
                onClick={() => router.push('/resources')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Resources
              </button>
              <button
                onClick={() => router.push('/blog')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Blog
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {user?.role === 'admin' &&
                    <button
                    onClick={() => router.push('/admin')}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    Admin
                  </button>
                  }

                  {user?.role === 'company' &&
                  <button
                    onClick={() => setIsPostJobModalOpen(true)}
                    className="bg-[#9333E9] text-white px-6 py-2 rounded-xl transition-all duration-300 font-semibold"
                  >
                    Post Job
                  </button> 
                  }
                  
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  {/* <button
                    onClick={() => setIsAdminLoginModalOpen(true)}
                    className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                  >
                    Admin
                  </button> */}
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-[#9333E9] text-white px-6 py-2 rounded-xl font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-purple-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  router.push('/jobs');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Find Jobs
              </button>
              <button
                onClick={() => {
                  router.push('/companies');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Companies
              </button>
              <button
                onClick={() => {
                  router.push('/resources');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Resources
              </button>
              <button
                onClick={() => {
                  router.push('/blog');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Blog
              </button>
              
              {isLoggedIn ? (
                <>
                {user?.role &&
                  <button
                    onClick={() => {
                      router.push('/admin');
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
                  >
                    Admin
                  </button>
                }
                  {user?.role === 'company' &&
                                    <button
                    onClick={() => {
                      setIsPostJobModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 bg-[#9333E9] text-white rounded-lg mx-3 my-2 text-center font-semibold"
                  >
                    Post Job
                  </button> 
                  }

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* <button
                    onClick={() => {
                      setIsAdminLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-red-600 hover:text-red-700 transition-colors w-full text-left font-medium"
                  >
                    Admin
                  </button> */}
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 bg-[#9333E9] text-white rounded-lg mx-3 my-2 text-center font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        />

        <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onAuth={handleAuth}
        />

        <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onSubmit={handlePostJob}
        />

    </div>
  )
}

export default Header
