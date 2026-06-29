"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Download, Search, ArrowLeft, AlertCircle, Bell, ClipboardList, Sparkles, Calendar, MapPin, Clock, User, BookOpen, ShieldCheck, Info } from "lucide-react";
import Footer from "@/components/Footer";
import axios from "axios";
import { useParams } from "next/navigation";

export default function AdmitCardPage() {
  const router = useRouter();
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

  const notifications = [
    { title: "Punjab Police Constable Admit Card 2026 Out", date: "June 28, 2024", isNew: true },
    { title: "SBI PO Prelims Admit Card Released", date: "June 25, 2024", isNew: true },
    { title: "SSC CHSL Tier 1 Admit Card 2024", date: "June 20, 2024", isNew: false },
    { title: "RRB NTPC Stage 2 Admit Card Update", date: "June 15, 2024", isNew: false },
  ];

  const recentAdmitCards = [
    {
      examName: "Punjab Police Constable Admit Card 2026",
      regNo: "PP20261234567",
      examDate: "July 15, 2026",
      examTime: "10:00 AM - 12:00 PM",
      venue: "Guru Nanak Dev University, Amritsar, Punjab - 143005",
      postName: "Constable (District Police)",
      rollNo: "PP2026014523",
    },
    {
      examName: "SBI PO Prelims Admit Card 2024",
      regNo: "SBI20249876543",
      examDate: "July 20, 2024",
      examTime: "2:00 PM - 4:00 PM",
      venue: "Delhi Public School, Sector-45, Noida, Uttar Pradesh",
      postName: "Probationary Officer (PO)",
      rollNo: "SBI2024120089",
    },
  ];

  const importantLinks = [
    { text: "Official Notification", icon: FileText },
    { text: "Syllabus & Exam Pattern", icon: BookOpen },
    { text: "Answer Key", icon: ClipboardList },
    { text: "Previous Year Papers", icon: FileText },
  ];

  const examDetails = [
    { label: "Organization", value: "Punjab Police Department" },
    { label: "Post Name", value: "Constable (District Police & Armed Police)" },
    { label: "Vacancies", value: "1746 Posts" },
    { label: "Exam Date", value: "15th July 2026" },
    { label: "Admit Card Status", value: "Released" },
    { label: "Official Website", value: "punjabpolice.gov.in" },
  ];

  const stepsToDownload = [
    "Visit the official website of Punjab Police at punjabpolice.gov.in",
    "Click on the 'Recruitment' tab on the homepage",
    "Find the link for 'Punjab Police Constable Admit Card 2026'",
    "Enter your Registration Number and Date of Birth",
    "Click on the 'Submit' button",
    "Your admit card will be displayed on the screen",
    "Download the admit card and take a printout for future reference",
  ];

  const documentsRequired = [
    "Printed copy of Admit Card",
    "Original Photo ID Proof (Aadhaar Card, PAN Card, Voter ID, Passport, Driving License)",
    "Passport size photograph (same as uploaded during registration)",
    "Caste Certificate (if applicable)",
  ];

  const handleDownload = () => {
    alert("Admit card downloaded successfully!");
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
                <span>Latest Update</span>
              </div>
              <h1 className="text-3xl flex justify-center items-center md:text-4xl font-bold text-black mb-4">
                <span className='lg:text-4xl text-3xl text-[#8A38EE]'>{exam?.title}</span>
              </h1>
              <p className="text-lg mb-6 text-black max-w-3xl mx-auto leading-relaxed">
                Download {exam.title} for the exam scheduled on {new Date(exam.examDate).toDateString()}. Check exam date, time, venue, and important instructions here.
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
                  Exam Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* {examDetails.map((detail, index) => (
                    <div key={index} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">{detail.label}:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{detail.value}</span>
                    </div>
                  ))} */}
                    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Organiztion:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{exam.organization}</span>
                    </div>
                    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Post Name:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{exam.title}</span>
                    </div>
                    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Vacancies:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{exam.vacancies}</span>
                    </div>
                    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-gray-500 font-semibold text-sm w-1/2">Exam Date:</span>
                      <span className="text-gray-800 font-medium text-sm w-1/2">{new Date(exam.examDate).toDateString()}</span>
                    </div>
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

              {/* Download Form */}
              {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Download className="w-6 h-6 text-[#8A38EE]" />
                  Download Admit Card
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="regNumber" className="text-gray-700 font-bold">
                      Registration Number
                    </Label>
                    <Input
                      id="regNumber"
                      placeholder="Enter your Registration Number"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
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
                    Search & Download
                  </button>
                </div>
              </div> */}

              {/* Steps to Download */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#8A38EE]" />
                  Download {exam.title}
                </h2>
                {/* <ol className="space-y-4">
                  {stepsToDownload.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-[#8A38EE] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol> */}
                 <div className="quill-content prose prose-sm sm:prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: exam.description }} />
              </div>

              {/* Your Admit Cards */}
              {/* <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#8A38EE]" />
                  Your Admit Cards
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {recentAdmitCards.map((card, index) => (
                    <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8A38EE] transition-colors">{card.examName}</h3>
                            <p className="text-sm text-purple-600 font-semibold mb-2">{card.postName}</p>
                          </div>
                          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 text-[#8A38EE] px-3 py-1 rounded-full text-xs font-bold">
                            Available
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <User className="w-4 h-4 text-[#8A38EE] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Registration No</p>
                              <p className="text-sm font-semibold text-gray-800">{card.regNo}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <ClipboardList className="w-4 h-4 text-[#8A38EE] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Roll Number</p>
                              <p className="text-sm font-semibold text-gray-800">{card.rollNo}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-[#8A38EE] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Exam Date</p>
                              <p className="text-sm font-semibold text-gray-800">{card.examDate}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 text-[#8A38EE] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Exam Time</p>
                              <p className="text-sm font-semibold text-gray-800">{card.examTime}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-[#8A38EE] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Exam Venue</p>
                            <p className="text-sm font-semibold text-gray-800">{card.venue}</p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={handleDownload}
                            className="bg-[#8A38EE] text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center transform hover:-translate-y-1 text-sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Documents Required */}
              {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#8A38EE]" />
                  Documents Required on Exam Day
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {documentsRequired.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8A38EE] rounded-full flex-shrink-0"></span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Important Instructions */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-4 text-lg">Important Instructions for Candidates</h4>
                    <ul className="text-yellow-800 space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Download your admit card at least 3 days before the exam to avoid last-minute issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Reach the exam venue 1 hour 30 minutes before the reporting time mentioned on your admit card</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>No electronic devices (mobile phones, calculators, smart watches) are allowed inside the exam hall</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Candidates must follow all COVID-19 safety guidelines issued by the authorities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Verify all details on your admit card (name, photo, signature, exam date, venue) and contact authorities in case of any discrepancy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>Candidates without a valid admit card and photo ID proof will not be allowed to enter the examination hall</span>
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
                    onClick={()=> router.push(exam.admitCardLink)}
                    className="w-full bg-[#8A38EE] text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center transform hover:-translate-y-1 text-sm mb-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Admit Card
                  </button>
                  {/* <p className="text-xs text-gray-500 text-center">
                    Last Updated: June 28, 2026
                  </p> */}
                </div>

                {/* Important Links */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border p-6">
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
                </div>

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
                    <li className="hover:text-[#8A38EE] cursor-pointer transition-colors">Forgot Registration Number?</li>
                    <li className="hover:text-[#8A38EE] cursor-pointer transition-colors">Contact Helpdesk</li>
                    <li className="hover:text-[#8A38EE] cursor-pointer transition-colors">FAQs</li>
                    <li className="hover:text-[#8A38EE] cursor-pointer transition-colors">Report Discrepancy</li>
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
