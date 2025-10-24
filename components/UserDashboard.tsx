"use client";

import { useEffect, useState, useRef } from "react";
import { useUser } from "@/context/UserContext";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UserProfile from "./UserProfile";
import UserJobs from "./UserJobs";
import CompanyProfile from "./CompanyProfile";
import CompanyJobs from "./CompanyJobs";
import axios from "axios";
import { ChartBarIcon, MessageSquareTextIcon, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { listenToMessages, markMessagesAsSeen, sendMessage } from "@/lib/chat";

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface Message {
  id: string;
  participants: string[];
  texts: Array<{
    sender: string;
    senderName: string;
    text: string;
    isSeen: boolean;
    timestamp: Date;
  }>;
  senderId: string;
  senderName: string;
  receiverName: string;
  text: string;
}

const UserDashboard = ({ tab }: any) => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab || "dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sidebarItems: SidebarItem[] = [
    { id: "dashboard", name: "Dashboard", icon: HomeIcon },
    { id: "profile", name: "Profile", icon: UserIcon },
    { id: "Applied jobs", name: "Applied Jobs", icon: BriefcaseIcon },
    {
      id: "Company profile",
      name: "Company Profile",
      icon: BuildingOfficeIcon,
    },
    { id: "job Management", name: "Job Management", icon: BriefcaseIcon },
    { id: "Company analytics", name: "Company Analytics", icon: ChartBarIcon },
    {
      id: "messages",
      name: "Messages",
      icon: MessageSquareTextIcon,
      count: notifications,
    },
    { id: "settings", name: "Settings", icon: Cog6ToothIcon },
    { id: "help", name: "Help & Support", icon: QuestionMarkCircleIcon },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // Close mobile sidebar when tab is selected
  };

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
        msg.texts?.filter((t) => t.isSeen === false && t.sender != user?._id)
          .length || 0;
      return count + unseenInThisConversation;
    }, 0);

    setNotifications(totalUnseen);
    console.log("Total unseen messages:", totalUnseen);
  }, [messages]);

  const handleSend = async (receiver: string, receiverName: string) => {
    if (user?._id && user.profile?.name && receiver && text) {
      await sendMessage(
        user._id,
        user.profile.name,
        receiver,
        receiverName,
        text
      );
      setText("");
    }
  };

  const handleSeen = (id: string, userId: string = "") => {
    markMessagesAsSeen(id, userId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    handleSeen(selectedConversation, user?._id);
  }, [messages, selectedConversation]);

  useEffect(() => {
    // Small timeout to ensure messages are rendered
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }
    }, 0);
  }, [selectedConversation]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "Applied jobs":
        return <UserJobs />;
      case "Company profile":
        return <CompanyProfile />;
      case "job Management":
        return <CompanyJobs />;
      case "dashboard":
        return <DashboardOverview />;
      case "messages":
        if (showChat) {
          return (
            <div className="h-[85vh] relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <p className="font-semibold text-slate-800">
                        {
                          messages.find(
                            (msg) => msg.id === selectedConversation
                          )?.receiverName
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowChat(false);
                  }}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div ref={scrollContainerRef} className="h-[75%] overflow-y-auto">
                {messages
                  .find((msg) => msg.id === selectedConversation)
                  ?.texts.map((m, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        m.sender == user?._id ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`ml-13 p-3 inline-block max-w-[40%] ${
                          m.sender == user?._id
                            ? "mr-10 border-r-2 border-blue-200 text-right bg-slate-100"
                            : "ms-8 border-l-2 border-blue-200"
                        } bg-slate-100 mt-4 py-2 `}
                      >
                        <p className="text-slate-700 leading-relaxed">
                          {m.text}
                        </p>
                      </div>
                      <br />
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="bg-slate-400 py-2 absolute bottom-0 w-full flex justify-center gap-4">
                <input
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  required
                  className="w-[90%] rounded-3xl ps-3"
                  placeholder="Message"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSend(
                      messages.find((msg) => msg.id === selectedConversation)
                        ?.participants?.[1] ?? "",
                      messages.find((msg) => msg.id === selectedConversation)
                        ?.receiverName ?? ""
                    );
                  }}
                  className="bg-green-600 p-3 text-white rounded-full"
                >
                  send
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="h-[85vh] lg:w-[60vw] mx-auto bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Messages
                </h2>
              </div>
            </div>

            {/* Messages Container */}
            <div className="overflow-y-auto h-[calc(100%-76px)] px-6 py-4">
              {messages && messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setShowChat(true);
                        setSelectedConversation(msg?.id);
                        handleSeen(msg.id, user?._id);
                      }}
                      className="bg-white cursor-pointer rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between">
                            <p className="font-semibold text-slate-800">
                              {msg.receiverName}
                            </p>
                            <p
                              className={`w-8 h-8 ${
                                msg.texts.filter(
                                  (m) =>
                                    m.isSeen == false && m.sender != user?._id
                                ).length == 0
                                  ? "hidden"
                                  : "flex"
                              } justify-center items-center bg-green-600 text-white rounded-full mr-4`}
                            >
                              {
                                msg.texts.filter(
                                  (m) =>
                                    m.isSeen == false && m.sender != user?._id
                                ).length
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-13 pl-3 border-l-2 border-blue-200">
                        <p className="text-slate-700 leading-relaxed">
                          Check new messges.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-white rounded-full p-6 shadow-lg mb-4">
                    <svg
                      className="w-16 h-16 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    No Messages Yet
                  </h3>
                  <p className="text-slate-500 text-center max-w-sm">
                    When you receive messages, they&apos;ll appear here. Check
                    back later!
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600">This feature is under development.</p>
          </div>
        );
    }
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src="/hooblrlogo.png" width={120} height={50} alt="logo" />
          </div>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 pb-4 flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-[#8A38EE] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {notifications}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.profile?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-medium text-gray-900">
              {user?.profile?.name || "User"}
            </div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 bg-white shadow-lg">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Image
                  src="/hooblrlogo.png"
                  width={120}
                  height={50}
                  alt="logo"
                />
              </div>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>

        <main className="p-4 lg:p-8 mt-10">{renderContent()}</main>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState(0);
  const stats = [
    { label: "Applications Sent", value: jobs },
    { label: "Saved Jobs", value: 0 },
  ];

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/user/my-applications`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log(response.data);
        setJobs(response.data.length);
      }
    } catch (error) {
      console.error("Failed to fetch applied jobs:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.profile?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                action: "Applied to Frontend Developer at Tech Corp",
                time: "2 hours ago",
              },
              { action: "Profile viewed by Startup Inc", time: "1 day ago" },
              { action: "Saved UX Designer position", time: "2 days ago" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span className="text-gray-900">{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
