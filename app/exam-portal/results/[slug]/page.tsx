"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Download, Search, ArrowLeft, CheckCircle, Bell, ClipboardList, Sparkles, Trophy, TrendingUp, BarChart3, BookOpen, FileText, Info, Calendar } from "lucide-react";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ExamResultsPage() {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState("");
  const [dob, setDob] = useState("");

  const {slug} = useParams();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<any>();

  const fetchExam = async() => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exam/${slug}`);
    if(response.status == 200){
        setExam(response.data.exam);
    }
    setLoading(false);

  } 

  useEffect(()=> {
    fetchExam();
  },[]);


  const handleDownload = () => {
    alert("Result downloaded successfully!");
  };

  if(loading){
    return (
        <div className="w-screen h-screen flex justify-center items-center text-center">
            Loading...
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        {/* Hero */}
        <div className="relative overflow-hidden bg-white border-b">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-2 text-gray-600 hover:text-[#8A38EE] mb-6 transition-colors cursor-pointer" onClick={() => router.push("/exam-portal")}>
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Exam Portal</span>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-[#8A38EE] backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Result Declared</span>
              </div>
              <h1 className="text-3xl flex justify-center items-center md:text-4xl font-bold text-black mb-4">
                <span className='lg:text-4xl text-3xl text-[#8A38EE]'>{exam.title}</span>
              </h1>
              <p className="text-lg mb-6 text-black max-w-3xl mx-auto leading-relaxed">
                Check {exam.title} Download scorecard, check cutoff marks, and final merit list here.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-12">
              {/* Overview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-[#8A38EE]" />
                  Result Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Post Name:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{exam.title}</span>
                    </div>
             
                    {/* <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Exam Date:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{new Date(exam.examDate).toDateString()}</span>
                    </div> */}
                    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Admit Card Status:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{exam.status}</span>
                    </div>
                    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Official Website:</span>
                      <span className="text-gray-800 font-medium break-words text-sm w-1/2">{exam.officialSite}</span>
                    </div>
                </div>
              </div>

              {/* Check Result Form */}
              {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Search className="w-6 h-6 text-[#8A38EE]" />
                  Check Your Result
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-gray-700 font-bold">
                      Roll Number / Registration Number
                    </Label>
                    <Input
                      id="rollNumber"
                      placeholder="Enter your Roll Number"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-gray-700 font-bold">
                      Date of Birth (DD/MM/YYYY)
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <button
                    className="w-full bg-[#8A38EE] mt-4 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center transform hover:-translate-y-1 text-sm"
                    onClick={handleDownload}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Check Result
                  </button>
                </div>
              </div> */}

              {/* Steps to Check Result */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ClipboardList className="w-6 h-6 text-[#8A38EE]" />
                  Check {exam.title}
                </h2>
               <div className="quill-content prose prose-sm sm:prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: exam.description }} />
              </div>

              {/* Your Results */}
              {/* <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#8A38EE]" />
                  Your Results
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {recentResults.map((result, index) => (
                    <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8A38EE] transition-colors">{result.examName}</h3>
                            <p className="text-sm text-purple-600 font-semibold mb-1">Roll Number: {result.rollNo}</p>
                            <p className="text-xs text-gray-500">Result Date: {result.resultDate}</p>
                          </div>
                          <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                            result.status === "Qualified" 
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {result.status}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-purple-50 p-4 rounded-xl text-center">
                            <p className="text-xs text-purple-600 font-semibold mb-1">Marks Obtained</p>
                            <p className="text-3xl font-bold text-[#8A38EE]">{result.marks}</p>
                            <p className="text-xs text-purple-600">out of {result.totalMarks}</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-xl text-center">
                            <p className="text-xs text-purple-600 font-semibold mb-1">Percentage</p>
                            <p className="text-3xl font-bold text-[#8A38EE]">
                              {((result.marks / result.totalMarks) * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-xl text-center">
                            <p className="text-xs text-purple-600 font-semibold mb-1">Percentile</p>
                            <p className="text-3xl font-bold text-[#8A38EE]">{result.percentile}%</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <Trophy className="w-4 h-4 text-[#8A38EE] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Category Rank</p>
                              <p className="text-sm font-semibold text-gray-800">#{result.rank}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <BarChart3 className="w-4 h-4 text-[#8A38EE] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Category Cut Off</p>
                              <p className="text-sm font-semibold text-gray-800">{result.cutoff} ({result.category})</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={handleDownload}
                            className="bg-[#8A38EE] text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center transform hover:-translate-y-1 text-sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Score Card
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Cut Off Marks */}
              {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#8A38EE]" />
                  Punjab Police Constable Cut Off 2026
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-purple-200">
                        <th className="pb-4 px-4 text-sm font-bold text-gray-900">Category</th>
                        <th className="pb-4 px-4 text-sm font-bold text-gray-900">Cut Off Marks (Out of 200)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cutoffMarks.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 last:border-0">
                          <td className="py-3 px-4 text-sm font-semibold text-gray-700">{item.category}</td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800">{item.cutoff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div> */}

              {/* Key Highlights */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-green-800 mb-4 text-lg">Important Information About Result</h4>
                    <ul className="text-green-800 space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>The Punjab Police Constable Result 2026 has been declared online at the official website</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Candidates can check their result using their Roll Number or Registration Number and Date of Birth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>The result PDF contains details like marks obtained, percentile, rank, and qualification status</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Shortlisted candidates will be called for Physical Measurement Test (PMT) and Physical Efficiency Test (PET)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Final selection will be based on written test, PET/PMT, and document verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Keep your scorecard safe for all future stages of the recruitment process</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-6 space-y-6">
                {/* Quick Actions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Download className="w-5 h-5 mr-2 text-purple-600" />
                    Quick Actions
                  </h3>
                  <button
                    onClick={()=> router.push(exam.resultLink)}
                    className="w-full bg-[#8A38EE] text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center transform hover:-translate-y-1 text-sm mb-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Result
                  </button>
                  {/* <p className="text-xs text-gray-500 text-center">
                    Last Updated: June 28, 2026
                  </p> */}
                </div>

                {/* Top Achiever */}
                {/* <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
                  <Trophy className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Top Achiever</h3>
                  <p className="text-purple-100 text-sm mb-4">
                    Congratulations on qualifying!
                  </p>
                  <div className="bg-white bg-opacity-10 rounded-xl p-3">
                    <p className="text-xs text-purple-100">Your Percentile</p>
                    <p className="text-3xl font-bold">94.2%</p>
                  </div>
                </div> */}

                {/* Important Links */}
                {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 mr-2 text-purple-600" />
                    Important Links
                  </h3>
                  <ul className="space-y-3">
                    {importantLinks.map((link, index) => (
                      <li key={index} className="flex items-center gap-3 hover:text-[#8A38EE] cursor-pointer transition-colors group">
                        <link.icon className="w-4 h-4 text-purple-600 group-hover:text-[#8A38EE]" />
                        <span className="text-sm text-gray-700 group-hover:text-[#8A38EE]">{link.text}</span>
                      </li>
                    ))}
                  </ul>
                </div> */}

                {/* Notifications */}
                {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 mr-2 text-purple-600" />
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    {notifications.map((notif, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        {notif.isNew && (
                          <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></span>
                        )}
                        {!notif.isNew && (
                          <span className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0 mt-2"></span>
                        )}
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{notif.title}</p>
                          <span className="text-xs text-gray-500">{notif.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Help & Support */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 mr-2 text-purple-600" />
                    Help & Support
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="hover:text-[#8A38EE] cursor-pointer transition-colors">Result Discrepancy?</li>
                    <li className="hover:text-[#8A38EE] cursor-pointer transition-colors">Contact Helpdesk</li>
                    <li className="hover:text-[#8A38EE] cursor-pointer transition-colors">FAQs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
