// components/CompanyJobs.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import JobForm from "./JobForm";
import axios from "axios";
import { Eye, FileText, User, X } from "lucide-react";
import { sendMessage, listenToMessages, markMessagesAsSeen } from "@/lib/chat";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/hooks/generateSlug";

interface Job {
  _id: string;
  title: string;
  location: string;
  requirements: string;
  responsibilities: string;
  description: string;
  benefits: string[];
  type: string;
  category: string;
  company?: { name: string; logo: string };
  department: string;
  status: "active" | "paused" | "closed" | "draft";
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  applications: Array<{
    _id: string;
    user: {
      _id: string;
      profile: {
        name: string;
      };
    };
    coverLetter: string;
    resume: string;
    phone?: string;
    location?: string;
    status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
    appliedAt: string;
  }>;
  views: number;
  createdAt: string;
  applicationDeadline?: string;
  isRemote: boolean;
  skills: string[];
  experience: string;
  education: string;
  isGovernment: boolean;
  tags: string[];
  featured: boolean;
  urgent: boolean;
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
  text: string;
}

const CompanyJobs = () => {
  const { user } = useUser();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showApplications, setShowApplications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resume, setResume] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [notifications, setNotifications] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/company/my-jobs`,
        { withCredentials: true }
      );
      if (response.status == 200) {
        console.log(response.data.jobs);
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = () => {
    if (!selectedJob?._id) return;
    const unsub = listenToMessages(selectedJob?._id, (msgs: any) => {
      setMessages(msgs);
    });
    return () => unsub();
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedJob]);

  useEffect(() => {
    console.log("messge : ", messages);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    handleSeen(selectedConversation, selectedJob?._id);
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

  const handleJobSaved = () => {
    setShowJobForm(false);
    setEditingJob(null);
    fetchJobs();
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowJobForm(true);
    fetchJobs();
  };

  const handleDeleteJob = async (jobId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this job? This action cannot be undo."
      )
    ) {
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/${jobId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        fetchJobs();
        setMessage(response.data.message);
        if (selectedJob?._id === jobId) {
          setSelectedJob(null);
        }
      } else {
        setMessage("Failed to delete job");
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
      setMessage("Failed to delete job");
    }
  };

  const handleSend = async (receiver: string, receiverName: string) => {
    if (selectedJob?._id && selectedJob.company?.name && receiver && text) {
      await sendMessage(
        selectedJob._id,
        selectedJob.company.name,
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

  useEffect(() => {
    if (!jobs) return;
    for (let i = 0; i < jobs?.flat().length; i++) {
      listenToMessages(jobs?.flat()[i]?._id, (msgs: any) => {
        setNotifications(msgs);
      });
    }
  }, [jobs]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatSalary = (salary: any) => {
    if (!salary || !salary.min || !salary.max) return "Not specified";
    return `${
      salary.currency
    } ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} / ${
      salary.period
    }`;
  };

  const filteredJobs =
    filterStatus === "all"
      ? jobs
      : jobs?.flat().filter((job) => job.status === filterStatus);

  const handleChangeStatus = async (value: string, userId: string) => {
    if (selectedJob) {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/applications/change-status`,
          { jobId: selectedJob._id, userId, value },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setSelectedJob(response.data.job);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (showJobForm) {
    return (
      <>
        {user?.companies && user.companies.length > 0 ? (
          <JobForm
            job={editingJob}
            onSave={handleJobSaved}
            onCancel={() => {
              setShowJobForm(false);
              setEditingJob(null);
            }}
          />
        ) : (
          <div className="text-center mt-[25%] text-xl font-semibold">
            Create company before Posting the Job
          </div>
        )}
      </>
    );
  }

  if (showApplications) {
    return (
      <div className="">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowApplications(false)}
            className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {selectedJob && selectedJob?.applications?.length > 0 ? (
            selectedJob?.applications.map((app, index) => (
              <div
                key={index}
                className="p-6 border rounded-xl bg-gray-50 shadow-md hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {app.user.profile.name}
                  </h3>
                  <div>
                    <select
                      onChange={(e) =>
                        handleChangeStatus(e.target.value, app.user._id)
                      }
                      name="status"
                      id="status"
                      className="p-2 rounded-lg"
                    >
                      <option value="">Change Status</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === "shortlisted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Meta Info */}
                {app.phone && (
                  <p className="text-sm text-gray-500 mb-6">
                    Phone: {app.phone}
                  </p>
                )}
                {app.location && (
                  <p className="text-sm text-gray-500 mb-6">
                    Location: {app.location}
                  </p>
                )}

                <p className="text-sm text-gray-500 mb-6">
                  Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </p>

                {/* Grid Layout for Documents */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Cover Letter */}
                  <div className="p-4 border rounded-lg bg-white shadow-sm overflow-auto">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">
                      Cover Letter
                    </h2>
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                      {app.coverLetter}
                    </pre>
                  </div>

                  {/* Resume */}
                  {app.resume && (
                    <div className="p-4 border rounded-lg bg-white shadow-sm overflow-auto">
                      <h2 className="text-lg font-semibold mb-2 text-gray-700">
                        Resume
                      </h2>
                      <div>
                        <div className="flex gap-2 items-center">
                          <div className="bg-blue-100 p-4 rounded-full mb-3">
                            <FileText className="w-6 h-6 text-blue-600" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              {app.resume?.split("/").pop()?.slice(14)}
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setResume(app.resume);
                                  setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-[#6D47F1]  text-white rounded-lg transition-colors text-sm font-medium"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Resume Preview
                              </h3>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setShowModal(false)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <X className="w-5 h-5 text-gray-600" />
                                </button>
                              </div>
                            </div>

                            {/* PDF Viewer */}
                            <div className="flex-1 overflow-hidden">
                              <iframe
                                src={resume}
                                className="w-full h-full"
                                title="Resume Preview"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No Applications Found.</div>
          )}
        </div>
      </div>
    );
  }

  if (showMessages) {
    return (
      <div className="h-[85vh] lg:w-[60vw] mx-auto bg-zinc-50 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Messages</h2>
          </div>
          <button
            onClick={() => setShowMessages(false)}
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
                    handleSeen(msg.id, selectedJob?._id);
                    setShowMessages(false);
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
                          {msg.texts[0].senderName}
                        </p>
                        <p
                          className={`w-8 h-8 ${
                            msg.texts.filter(
                              (m) =>
                                m.isSeen == false &&
                                m.sender != selectedJob?._id
                            ).length == 0
                              ? "hidden"
                              : "flex"
                          } justify-center items-center bg-green-600 text-white rounded-full mr-4`}
                        >
                          {
                            msg.texts.filter(
                              (m) =>
                                m.isSeen == false &&
                                m.sender != selectedJob?._id
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
                When you receive messages, they&apos;ll appear here. Check back
                later!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

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
                    messages.find((msg) => msg.id === selectedConversation)
                      ?.texts?.[0]?.senderName
                  }
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setShowChat(false);
              setShowMessages(true);
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
                  m.sender == selectedJob?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`ml-13 p-3 inline-block max-w-[40%] ${
                    m.sender == selectedJob?._id
                      ? "mr-10 border-r-2 border-blue-200 text-right bg-slate-100"
                      : "ms-8 border-l-2 border-blue-200"
                  } bg-slate-100 mt-4 py-2 `}
                >
                  <p className="text-slate-700 leading-relaxed">{m.text}</p>
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
                  ?.participants?.[0] ?? "",
                messages.find((msg) => msg.id === selectedConversation)
                  ?.senderName ?? ""
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex lg:flex-row flex-col justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">
            Create, manage, and track your job postings.
          </p>
        </div>
        <button
          onClick={() => setShowJobForm(true)}
          className="px-4 py-2 bg-[#6D47F1] mt-2 lg:mt-0 text-white font-medium rounded-lg focus:outline-none focus:ring-offset-2"
        >
          + Create New Job
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Jobs", count: jobs?.flat().length, status: "all" },
          {
            label: "Active",
            count: jobs?.flat().filter((j) => j.status === "active").length,
            status: "active",
          },
          {
            label: "Paused",
            count: jobs?.flat().filter((j) => j.status === "paused").length,
            status: "paused",
          },
          {
            label: "Closed",
            count: jobs?.flat().filter((j) => j.status === "closed").length,
            status: "closed",
          },
          {
            label: "Draft",
            count: jobs?.flat().filter((j) => j.status === "draft").length,
            status: "draft",
          },
        ].map((stat) => (
          <button
            key={stat.status}
            onClick={() => setFilterStatus(stat.status)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              filterStatus === stat.status
                ? "border-[#6D47F1] bg-[#6D47F1] text-white"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="text-2xl font-bold">{stat.count}</div>
            <div className="text-sm">{stat.label}</div>
          </button>
        ))}
      </div>

      {filteredJobs.length <= 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.094M6 6a2 2 0 012-2h4a2 2 0 012 2v2M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600 mb-4">
            {filterStatus === "all"
              ? "You haven't created any jobs yet. Create your first job posting to start hiring!"
              : `No jobs with status "${filterStatus}" found.`}
          </p>
          <button
            onClick={() => setShowJobForm(true)}
            className="px-4 py-2 bg-[#6D47F1] text-white font-medium rounded-lg"
          >
            Create Your First Job
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs?.flat()?.map((job) => (
              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white rounded-2xl p-2 cursor-pointer transition-all ${
                  selectedJob?._id === job._id ? "ring-2 ring-[#6D47F1]" : ""
                }`}
              >
                <div className="flex relative border-b pb-4">
                  <div
                    onClick={() => router.push(`/jobs/${generateSlug(job?.company?.name || '') + '-' + generateSlug(job.title) + '-' + generateSlug(job.location) + '-' + job._id}`)}
                    className="w-14 h-14 rounded-xl border flex justify-center items-center px-1 cursor-pointer"
                  >
                    <img
                      className={job?.company?.logo ? "block" : "hidden"}
                      src={job?.company?.logo}
                      alt="company logo"
                    />
                  </div>
                  <div className="ms-2">
                    <p className="font-bold">{job.title}</p>
                    <p>{job?.company?.name}</p>
                  </div>
                  <div className="absolute right-4 flex flex-col items-end gap-2">
                    <div className="flex justify-between">
                      <p
                        className={`w-8 h-8 ${
                          notifications.filter(
                            (n) =>
                              n.participants[1] == job._id &&
                              n.texts?.some(
                                (m) =>
                                  m.isSeen == false && n.senderId != job._id
                              )
                          ).length == 0
                            ? "hidden"
                            : "flex"
                        } justify-center items-center bg-green-600 text-white rounded-full mr-4`}
                      >
                        {
                          notifications.filter(
                            (n) =>
                              n.participants[1] == job._id &&
                              n.texts.some(
                                (m) => m.isSeen == false && m.sender != job?._id
                              )
                          ).length
                        }
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditJob(job);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteJob(job._id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex gap-x-3 justify-center items-center">
                    <div className="px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm">
                      {job.type}
                    </div>
                    <div className="px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm">
                      {job.experience}
                    </div>
                    <div className="px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm">
                      {job.education}
                    </div>
                  </div>

                  <div className="mt-4 ms-4 text-neutral-500">
                    <p className="text-sm text-gray-600 mb-2">
                      {job.department} • {job.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6834 0 11.3834 0 10C0 8.6167 0.2625 7.3167 0.7875 6.10003C1.3125 4.88336 2.025 3.82503 2.925 2.92503C3.825 2.02503 4.88333 1.31253 6.1 0.787531C7.31667 0.262531 8.61667 3.05176e-05 10 3.05176e-05C11.3833 3.05176e-05 12.6833 0.262531 13.9 0.787531C15.1167 1.31253 16.175 2.02503 17.075 2.92503C17.975 3.82503 18.6875 4.88336 19.2125 6.10003C19.7375 7.3167 20 8.6167 20 10C20 11.3834 19.7375 12.6834 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM9.975 17C10.2083 17 10.4125 16.9125 10.5875 16.7375C10.7625 16.5625 10.85 16.3584 10.85 16.125V15.75C11.6833 15.6 12.4 15.275 13 14.775C13.6 14.275 13.9 13.5334 13.9 12.55C13.9 11.85 13.7 11.2084 13.3 10.625C12.9 10.0417 12.1 9.53336 10.9 9.10003C9.9 8.7667 9.20833 8.47503 8.825 8.22503C8.44167 7.97503 8.25 7.63336 8.25 7.20003C8.25 6.7667 8.40417 6.42503 8.7125 6.17503C9.02083 5.92503 9.46667 5.80003 10.05 5.80003C10.3833 5.80003 10.675 5.85836 10.925 5.97503C11.175 6.0917 11.3833 6.25003 11.55 6.45003C11.7167 6.65003 11.9042 6.78753 12.1125 6.86253C12.3208 6.93753 12.5167 6.93336 12.7 6.85003C12.95 6.75003 13.1208 6.5792 13.2125 6.33753C13.3042 6.09586 13.2833 5.87503 13.15 5.67503C12.8833 5.2917 12.5542 4.9667 12.1625 4.70003C11.7708 4.43336 11.35 4.28336 10.9 4.25003V3.87503C10.9 3.6417 10.8125 3.43753 10.6375 3.26253C10.4625 3.08753 10.2583 3.00003 10.025 3.00003C9.79167 3.00003 9.5875 3.08753 9.4125 3.26253C9.2375 3.43753 9.15 3.6417 9.15 3.87503V4.25003C8.31667 4.43336 7.66667 4.80003 7.2 5.35003C6.73333 5.90003 6.5 6.5167 6.5 7.20003C6.5 7.98336 6.72917 8.6167 7.1875 9.10003C7.64583 9.58336 8.36667 10 9.35 10.35C10.4 10.7334 11.1292 11.075 11.5375 11.375C11.9458 11.675 12.15 12.0667 12.15 12.55C12.15 13.1 11.9542 13.5042 11.5625 13.7625C11.1708 14.0209 10.7 14.15 10.15 14.15C9.71667 14.15 9.325 14.0459 8.975 13.8375C8.625 13.6292 8.33333 13.3167 8.1 12.9C7.96667 12.6667 7.79167 12.5084 7.575 12.425C7.35833 12.3417 7.14167 12.3417 6.925 12.425C6.69167 12.5084 6.52083 12.6667 6.4125 12.9C6.30417 13.1334 6.3 13.3584 6.4 13.575C6.66667 14.1417 7.025 14.6042 7.475 14.9625C7.925 15.3209 8.46667 15.5667 9.1 15.7V16.125C9.1 16.3584 9.1875 16.5625 9.3625 16.7375C9.5375 16.9125 9.74167 17 9.975 17Z"
                          fill="#60A5FA"
                        />
                      </svg>
                      <div className="flex items-center">
                        <p> {formatSalary(job.salary)}</p>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_2011_417"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect
                            y="3.05176e-05"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_2011_417)">
                          <path
                            d="M12.0017 11.8654C12.4993 11.8654 12.9247 11.6882 13.2779 11.3339C13.6311 10.9796 13.8077 10.5536 13.8077 10.056C13.8077 9.55845 13.6305 9.13306 13.2762 8.77986C12.9218 8.42666 12.4959 8.25006 11.9983 8.25006C11.5007 8.25006 11.0753 8.42723 10.7221 8.78156C10.3689 9.13589 10.1923 9.56185 10.1923 10.0594C10.1923 10.557 10.3695 10.9824 10.7238 11.3356C11.0782 11.6888 11.5041 11.8654 12.0017 11.8654ZM12 21.5096C9.48335 19.3288 7.59618 17.2994 6.33848 15.4212C5.08079 13.543 4.45195 11.8186 4.45195 10.2481C4.45195 7.94044 5.19843 6.07219 6.69138 4.64334C8.18431 3.21449 9.95385 2.50006 12 2.50006C14.0462 2.50006 15.8157 3.21449 17.3086 4.64334C18.8016 6.07219 19.548 7.94044 19.548 10.2481C19.548 11.8186 18.9192 13.543 17.6615 15.4212C16.4038 17.2994 14.5167 19.3288 12 21.5096Z"
                            fill="#F87171"
                          />
                        </g>
                      </svg>
                      <p className="ms-1">
                        {job.location} {job.isRemote && " (Remote)"}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_2011_422"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect
                            y="3.05176e-05"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_2011_422)">
                          <path
                            d="M1.36543 17.7885C1.12023 17.7885 0.914695 17.7055 0.748828 17.5397C0.582978 17.3738 0.500053 17.1683 0.500053 16.9231V16.5693C0.500053 15.9039 0.847487 15.3574 1.54235 14.9299C2.23722 14.5023 3.14298 14.2885 4.25963 14.2885C4.44424 14.2885 4.63015 14.2943 4.81733 14.3058C5.00451 14.3174 5.19297 14.3398 5.3827 14.3731C5.18784 14.6847 5.04329 15.0081 4.94905 15.3433C4.85484 15.6786 4.80773 16.0225 4.80773 16.375V17.7885H1.36543ZM7.40785 17.7885C7.14752 17.7885 6.93114 17.7019 6.7587 17.5286C6.58625 17.3554 6.50003 17.1407 6.50003 16.8846V16.4135C6.50003 15.9453 6.63145 15.5174 6.89428 15.1297C7.15709 14.742 7.53594 14.4039 8.0308 14.1154C8.52567 13.827 9.11028 13.6106 9.78463 13.4664C10.459 13.3222 11.1962 13.2501 11.9962 13.2501C12.8115 13.2501 13.5564 13.3222 14.2308 13.4664C14.9051 13.6106 15.4897 13.827 15.9846 14.1154C16.4795 14.4039 16.8557 14.742 17.1134 15.1297C17.3711 15.5174 17.5 15.9453 17.5 16.4135V16.8846C17.5 17.1407 17.4134 17.3554 17.2401 17.5286C17.0669 17.7019 16.8522 17.7885 16.5961 17.7885H7.40785ZM19.1923 17.7885V16.3764C19.1923 15.9999 19.1477 15.6456 19.0586 15.3135C18.9695 14.9815 18.8359 14.668 18.6577 14.3731C18.8538 14.3398 19.0413 14.3174 19.2202 14.3058C19.399 14.2943 19.5756 14.2885 19.75 14.2885C20.8666 14.2885 21.7708 14.4997 22.4625 14.9222C23.1541 15.3446 23.5 15.8936 23.5 16.5693V16.9231C23.5 17.1683 23.417 17.3738 23.2512 17.5397C23.0853 17.7055 22.8798 17.7885 22.6346 17.7885H19.1923ZM4.25708 13.3174C3.78571 13.3174 3.38305 13.1498 3.04908 12.8146C2.71511 12.4794 2.54813 12.0765 2.54813 11.6059C2.54813 11.1289 2.71571 10.7261 3.05088 10.3972C3.38605 10.0684 3.78896 9.90393 4.25963 9.90393C4.73655 9.90393 5.14103 10.0684 5.47308 10.3972C5.80513 10.7261 5.97115 11.1299 5.97115 11.6087C5.97115 12.0735 5.80689 12.4744 5.47835 12.8116C5.14982 13.1488 4.74273 13.3174 4.25708 13.3174ZM19.75 13.3174C19.2833 13.3174 18.8814 13.1488 18.5442 12.8116C18.2071 12.4744 18.0385 12.0735 18.0385 11.6087C18.0385 11.1299 18.2071 10.7261 18.5442 10.3972C18.8814 10.0684 19.284 9.90393 19.7519 9.90393C20.2339 9.90393 20.6394 10.0684 20.9682 10.3972C21.2971 10.7261 21.4615 11.1289 21.4615 11.6059C21.4615 12.0765 21.2975 12.4794 20.9695 12.8146C20.6414 13.1498 20.2349 13.3174 19.75 13.3174ZM12.0034 12.5001C11.2832 12.5001 10.6699 12.2477 10.1635 11.7429C9.65708 11.2381 9.40388 10.6251 9.40388 9.90393C9.40388 9.16836 9.65628 8.55179 10.1611 8.05421C10.6659 7.55662 11.2789 7.30783 12 7.30783C12.7356 7.30783 13.3522 7.5563 13.8498 8.05323C14.3473 8.55016 14.5961 9.16594 14.5961 9.90056C14.5961 10.6208 14.3477 11.2341 13.8507 11.7405C13.3538 12.2469 12.738 12.5001 12.0034 12.5001Z"
                            fill="#22C55E"
                          />
                        </g>
                      </svg>
                      <p>
                        {job?.applications?.length > 0
                          ? job.applications.length
                          : "0"}{" "}
                        Applications
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 mt-4 py-3 border-y border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {job?.applications?.length}
                    </div>
                    <div className="text-xs text-gray-500">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {job.views}
                    </div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {
                        job.applications?.filter(
                          (app) => app.status === "shortlisted"
                        ).length
                      }
                    </div>
                    <div className="text-xs text-gray-500">Shortlisted</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pb-2 px-2">
                  <button
                    onClick={() => router.push(`/jobs/${generateSlug(job?.company?.name || '') + '-' + generateSlug(job.title) + '-' + generateSlug(job.location) + '-' + job._id}`)}
                    className={`px-4 py-1 flex items-center border rounded-3xl text-[#6D47F1]`}
                  >
                    View Job
                  </button>
                  <p className="text-neutral-500 text-sm">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Job Details */}
          <div className="lg:sticky lg:top-8">
            {selectedJob ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <button
                    onClick={() => handleEditJob(selectedJob)}
                    className="w-full bg-[#6D47F1] text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Edit Job
                  </button>

                  <button
                    onClick={() => setShowApplications(true)}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Applications
                  </button>
                  <button
                    onClick={() => setShowMessages(true)}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Messages
                  </button>
                </div>
                <div className="flex items-start mt-2 justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedJob.title}
                    </h2>
                    <p className="text-gray-600">
                      {selectedJob.department} • {selectedJob.category}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          selectedJob.status
                        )}`}
                      >
                        {selectedJob.status}
                      </span>
                      {selectedJob.urgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Urgent
                        </span>
                      )}
                      {selectedJob.featured && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Job Details
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>
                        <strong>Location:</strong> {selectedJob.location}
                        {selectedJob.isRemote && " (Remote)"}
                      </div>
                      <div>
                        <strong>Type:</strong> {selectedJob.type}
                      </div>
                      <div>
                        <strong>Salary:</strong>{" "}
                        {formatSalary(selectedJob.salary)}
                      </div>
                      <div>
                        <strong>Posted:</strong>{" "}
                        {new Date(selectedJob.createdAt).toLocaleDateString()}
                      </div>
                      {selectedJob.applicationDeadline && (
                        <div>
                          <strong>Deadline:</strong>{" "}
                          {new Date(
                            selectedJob.applicationDeadline
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Performance
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Total Applications:</span>
                        <span className="font-medium">
                          {selectedJob.applications.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Views:</span>
                        <span className="font-medium">{selectedJob.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shortlisted:</span>
                        <span className="font-medium">
                          {
                            selectedJob.applications.filter(
                              (app) => app.status === "shortlisted"
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hired:</span>
                        <span className="font-medium">
                          {
                            selectedJob.applications.filter(
                              (app) => app.status === "hired"
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.094M6 6a2 2 0 012-2h4a2 2 0 012 2v2M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Job
                </h3>
                <p className="text-gray-600">
                  Click on a job to view details and manage applications.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
