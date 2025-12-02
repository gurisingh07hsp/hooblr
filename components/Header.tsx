"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { listenToMessages } from "@/lib/chat";
import { Menu, X, LogOut, MessageSquareTextIcon, User } from "lucide-react";
import Image from "next/image";
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hideNavbar = ["/dashboard"].includes(pathname);
  const hide = ['/forgotpassword'].includes(pathname);
  const { user, isLoggedIn, setIsLoggedIn, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<number>(0);
  const [messages, setMessages] = useState<any[]>([]);

  const handleAuth = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (user) {
      handleAuth();
    }
  }, [user]);

  const fetchMessages = () => {
    if (!user?._id) return;
    const unsub = listenToMessages(user?._id, (msgs: any) => {
      setMessages(msgs);
    });
    return () => unsub();
  };

  useEffect(() => {
    fetchMessages();
  }, [user]);

  useEffect(() => {
    console.log("messge : ", messages);
    const totalUnseen = messages.reduce((count, msg) => {
      const unseenInThisConversation =
        msg.texts?.filter(
          (t: any) => t.isSeen === false && t.sender != user?._id
        ).length || 0;
      return count + unseenInThisConversation;
    }, 0);

    setNotifications(totalUnseen);
    console.log("Total unseen messages:", totalUnseen);
  }, [messages]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`${hideNavbar && "lg:block hidden"} ${hide && 'hidden'}`}>
      <nav className="bg-white fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex ${
              hideNavbar ? "justify-end gap-7" : "justify-between"
            } items-center h-16`}
          >
            {/* Logo */}
            <div
              className={`${
                hideNavbar ? "hidden" : "flex"
              } items-center cursor-pointer`}
              onClick={() => router.push("/")}
            >
            <Image
              src="/hooblrlogo.png"
              alt="logo"
              width={120}
              height={50}
              className="w-20 h-auto sm:w-28 md:w-32 lg:w-[120px]"
            />

            </div>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center space-x-8 h-[42px]`}>
              <button
                onClick={() => router.push("/jobs")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Find Job
              </button>
              <button
                onClick={() => router.push("/govtjobs")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Govt Jobs
              </button>
              <button
                onClick={() => router.push("/companies")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Companies
              </button>
              <button
                onClick={() => router.push("/resources")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Resources
              </button>
              <button
                onClick={() => router.push("/blog")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => router.push("/resume-builder")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Resume Builder
              </button>

              {isLoggedIn && (
                <div className="flex items-center space-x-4">
                  {user?.role === "admin" && (
                    <button
                      onClick={() => router.push("/admin")}
                      className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                    >
                      Admin
                    </button>
                  )}

                  <button
                    onClick={() => router.push("/dashboard")}
                    className="text-gray-700 border hover:border-purple-600 p-2 rounded-lg hover:text-purple-600 transition-colors font-medium"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => router.push("/dashboard?tab=messages")}
                    className="w-[40px] h-[40px] relative rounded-full border-2 flex justify-center items-center hover:border-purple-600 transition-colors"
                  >
                    {notifications > 0 && (
                      <div className="p-[4px] border border-white bg-red-600 rounded-full absolute right-[6px] top-2"></div>
                    )}
                    <MessageSquareTextIcon className="text-gray-600 w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hidden p-2 lg:flex items-center rounded-lg bg-red-600 text-white transition-colors font-medium"
              >
                Logout
                <LogOut className="w-4 h-4 ms-1" />
              </button>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <button
                  onClick={() => router.push("/login")}
                  className="bg-[#9333E9] text-white ms-4 lg:px-6 px-4 lg:py-2 py-1 rounded-xl font-semibold"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden flex gap-4">
              {isLoggedIn ? (
                <div>
                  <button
                  onClick={()=> router.push('/dashboard')}
                  >
                    <User className="w-6 h-6"/>
                  </button>
                </div>
              ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push("/login")}
                  className="bg-[#9333E9] text-white ms-4 lg:px-6 px-4 lg:py-2 py-1 rounded-xl font-semibold"
                >
                  Sign In
                </button>
              </div>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden h-[100vh] bg-white border-t border-purple-200">
            <div className="px-2 pt-2 pb-3 space-y-2 divide-y">
              <button
                onClick={() => {
                  router.push("/");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  router.push("/jobs");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Find Jobs
              </button>

              <button
                onClick={() => {
                  router.push("/govtjobs");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Govt Jobs
              </button>

              <button
                onClick={() => {
                  router.push("/companies");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Companies
              </button>
              <button
                onClick={() => {
                  router.push("/resources");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Resources
              </button>
              <button
                onClick={() => {
                  router.push("/blog");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => {
                  router.push("/resume-builder");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Resume Builder
              </button>

              {isLoggedIn ? (
                <>
                  {user?.role == 'admin' && (
                    <button
                      onClick={() => {
                        router.push("/admin");
                        setIsMenuOpen(false);
                      }}
                      className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
                    >
                      Admin
                    </button>
                  )}

                  <div>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="text-gray-700 ms-2 mt-2 border rounded-lg px-3 py-2 hover:text-purple-600 transition-colors font-medium"
                  >
                    Dashboard
                  </button>

                  </div>

                  <div>
                  <button
                    onClick={() => router.push("/dashboard?tab=messages")}
                    className="relative py-2 mt-1 flex justify-center items-center transition-colors"
                  >
                    <p className="ms-3">Messages</p>
                    {notifications > 0 && (
                      <div className="p-[4px] border border-white bg-red-600 rounded-full ms-1"></div>
                    )}
                  </button>
                  </div>

                  <div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="p-2 ms-3 mt-4 flex items-center rounded-lg bg-red-600 text-white transition-colors font-medium"
                  >
                    Logout
                    <LogOut className="w-4 h-4 ms-1" />
                  </button>
                  </div>

                </>
              ) : (
                <>
                  {/* <button
                    onClick={() => {
                      router.push("/login");
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 bg-[#9333E9] text-white rounded-lg mx-3 my-2 text-center font-semibold"
                  >
                    Join Now
                  </button> */}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
