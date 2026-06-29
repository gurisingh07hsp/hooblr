"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FileText, Award, ArrowRight, ClipboardList, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

export default function ExamPortalLanding() {
  const router = useRouter();

  const features = [
    {
      title: "Download Admit Card",
      description: "Get your exam hall ticket with all necessary details for the upcoming examinations.",
      icon: FileText,
      link: "/exam-portal/admit-card",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Check Exam Results",
      description: "View your exam results, scorecards, and performance details instantly.",
      icon: Award,
      link: "/exam-portal/results",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  const notifications = [
    { title: "UPSC Civil Services Admit Card 2024 Released", date: "June 28, 2024", type: "Admit Card" },
    { title: "SSC CGL Tier 1 Results Declared", date: "June 25, 2024", type: "Result" },
    { title: "IBPS PO Admit Card Available Soon", date: "June 20, 2024", type: "Admit Card" },
    { title: "RRB NTPC Results to be Announced", date: "June 18, 2024", type: "Result" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white border-b">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-[#8A38EE] backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Exam Portal</span>
              </div>
              <h1 className="text-2xl flex justify-center items-center md:text-4xl font-bold text-black mb-4">
                <span className='lg:text-4xl text-2xl text-[#8A38EE]'>Exam</span> Updates & Results
              </h1>
              <p className="text-lg mb-6 text-black max-w-3xl mx-auto leading-relaxed">
                Your one-stop destination for downloading admit cards and checking exam results
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl border border-[#8A38EE] lg:p-6 p-2 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="space-x-4">
                    <div className='flex items-center gap-2'>
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8A38EE] transition-colors">{feature.title}</h3>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{feature.description}</p>
                      <button 
                        onClick={() => router.push(feature.link)}
                        className="bg-[#8A38EE] mt-4 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center transform hover:-translate-y-1 text-sm"
                      >
                        Explore Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notifications */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Latest Notifications</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest admit card and result announcements
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notifications.map((notification, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="space-x-4">
                    <div className='flex gap-2'>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`bg-gradient-to-r ${notification.type === "Admit Card" ? "from-purple-100 to-indigo-100 text-purple-800" : "from-blue-100 to-indigo-100 text-blue-800"} text-xs font-bold px-2.5 py-1 rounded-full`}>
                            {notification.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8A38EE] transition-colors">{notification.title}</h3>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{notification.date}</p>
                      <button 
                        onClick={() => router.push(notification.type === "Admit Card" ? "/exam-portal/admit-card" : "/exam-portal/results")}
                        className="text-[#8A38EE] hover:text-purple-700 font-semibold text-sm flex items-center transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
