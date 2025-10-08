'use client'

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X,  
  LogOut
} from 'lucide-react';
import PostJobModal from './PostJobModal';
import Image from 'next/image';
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hideNavbar = ["/dashboard"].includes(pathname);
  const {user,isLoggedIn, setIsLoggedIn,logout} = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

    const handleAuth = () => {
    setIsLoggedIn(true);
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
    <div className={`${hideNavbar && 'lg:block hidden'}`}>
        <nav className="bg-white fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${hideNavbar ? 'justify-end gap-7' : 'justify-between'} items-center h-16`}>
            {/* Logo */}
            <div 
              className={`${hideNavbar ? 'hidden' : 'flex'} items-center cursor-pointer`}
              onClick={() => router.push('/')}
            >
            <Image src='/hooblrlogo.png' width={120} height={50} alt='logo'/>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center space-x-8 h-[42px]`}>
              <button
                onClick={() => router.push('/jobs')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Find Job
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
              
              {isLoggedIn && (
                <div className="flex items-center space-x-4">
                  {user?.role === 'admin' &&
                    <button
                    onClick={() => router.push('/admin')}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    Admin
                  </button>
                  }

                  <button
                    onClick={() => router.push('/dashboard')}
                    className="text-gray-700 border hover:border-purple-600 p-2 rounded-lg hover:text-purple-600 transition-colors font-medium"
                  >
                    Dashboard
                  </button>
                </div>
              )}
            </div>

              {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="p-2 flex items-center rounded-lg bg-red-600 text-white transition-colors font-medium"
                  >
                    Logout
                    <LogOut className='w-4 h-4 ms-1'/>
                  </button>
              ):(
                <div className=" hidden lg:flex items-center space-x-4">
                  <button
                    onClick={() => router.push('/login')  }
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    Join now
                  </button>
                  <button
                    onClick={() => router.push('/login')}
                    className="bg-[#9333E9] text-white px-6 py-2 rounded-xl font-semibold"
                  >
                    Hire now
                  </button>
                </div>
              )}

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

                <button
                    onClick={() => router.push('/dashboard')}
                    className="text-gray-700 px-3 py-2 hover:text-purple-600 transition-colors font-medium"
                  >
                    Dashboard
                  </button>
                  {/* {user?.role === 'company' &&
                                    <button
                    onClick={() => {
                      setIsPostJobModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 bg-[#9333E9] text-white rounded-lg mx-3 my-2 text-center font-semibold"
                  >
                    Post Job
                  </button> 
                  } */}

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
                      router.push('/login');
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push('/login');
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

        <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onSubmit={handlePostJob}
        />

    </div>
  )
}

export default Header
