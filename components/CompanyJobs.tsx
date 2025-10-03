// components/CompanyJobs.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import JobForm from './JobForm';
import axios from 'axios';
import { Eye, FileText, User, X } from 'lucide-react';
import { sendMessage, listenToMessages, markMessagesAsSeen } from "@/lib/chat";

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
  company?: {name: string}; 
  department: string;
  status: 'active' | 'paused' | 'closed' | 'draft';
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
    status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showApplications, setShowApplications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resume, setResume] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/company/my-jobs`, {withCredentials:true});
      if (response.status == 200) {
        console.log(response.data.jobs);
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
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
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedJob]);

  useEffect(()=>{
    console.log("messge : ", messages);
  },[messages])

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
    if (!confirm('Are you sure you want to delete this job? This action cannot be undo.')) {
      return;
    }

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/${jobId}`, {withCredentials:true});

      if (response.status === 200) {
        fetchJobs();
        setMessage(response.data.message);
        if (selectedJob?._id === jobId) {
          setSelectedJob(null);
        }
      } else {
        setMessage('Failed to delete job');
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
      setMessage('Failed to delete job');
    }
  };

    const handleSend = async (receiver: string, receiverName: string) => {
      if(selectedJob?._id && selectedJob.company?.name && receiver && text){
        await sendMessage(selectedJob._id, selectedJob.company.name, receiver, receiverName, text);
        setText("");
      }
    };

    const handleSeen = (id: string, userId: string = '') => {
      markMessagesAsSeen(id, userId);
    }


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (salary: any) => {
    if (!salary || !salary.min || !salary.max) return 'Not specified';
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} / ${salary.period}`;
  };

  const filteredJobs = filterStatus === 'all' 
    ? jobs 
    : jobs?.flat().filter(job => job.status === filterStatus);

  const handleChangeStatus = async(value: string, userId: string) => {
    if(selectedJob){
    try{
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/applications/change-status`, {jobId: selectedJob._id, userId, value}, {withCredentials: true});
      if(response.status === 200){
        setSelectedJob(response.data.job);
        console.log(response.data);
      }
    }catch(error){
      console.error(error);
    }
  }
}


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
        <div className='text-center mt-[25%] text-xl font-semibold'>
          Create company before Posting the Job
        </div>
      )}

      </>
    );
  }


  if(showApplications){
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
    {selectedJob && selectedJob?.applications?.length > 0 ? ( selectedJob?.applications.map((app, index) => (
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
            <select onChange={(e)=>handleChangeStatus(e.target.value, app.user._id)} name="status" id="status" className='p-2 rounded-lg'>
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
        {app.phone && <p className="text-sm text-gray-500 mb-6">
          Phone: {app.phone}
        </p> }
        {app.location && <p className="text-sm text-gray-500 mb-6">
          Location: {app.location}
        </p> }
        
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
          {app.resume && 
          <div className="p-4 border rounded-lg bg-white shadow-sm overflow-auto">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Resume</h2>
            <div>
            <div className='flex gap-2 items-center'>
            <div className="bg-blue-100 p-4 rounded-full mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            
            <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {app.resume?.split('/').pop()?.slice(14)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={(e) => {e.preventDefault(); setResume(app.resume); setShowModal(true)}}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
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
              <h3 className="text-lg font-semibold text-gray-800">Resume Preview</h3>
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
        }
        </div>
      </div>
    ))) : (
      <div>
        No Applications Found.
      </div>
    )}
  </div>
</div>

    )
  }

  if(showMessages){
  return (
    <div className='h-[85vh] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg overflow-hidden'>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Messages</h2>
          {/* <p className="text-sm text-slate-500">{messages?.length || 0} messages</p> */}
        </div>
        <button
          onClick={() => setShowMessages(false)}
          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className='overflow-y-auto h-[calc(100%-76px)] px-6 py-4'>
        {messages && messages.length > 0 ? (
          <div className='space-y-4'>
            {messages.map((msg, index) => (
              <div key={index} onClick={()=> {setShowChat(true); setSelectedConversation(msg?.id); handleSeen(msg.id,selectedJob?._id); setShowMessages(false)}} className='bg-white cursor-pointer rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-200'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='bg-gradient-to-br from-blue-500 to-blue-600 p-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md'>
                    <User className='h-5 w-5 text-white'/>
                  </div>
                  <div className='w-full'>
                    <div className='flex justify-between'>
                      <p className='font-semibold text-slate-800'>{msg.texts[0].senderName}</p>
                      <p className={`w-8 h-8 ${msg.texts.filter((m)=> m.isSeen == false && m.sender != selectedJob?._id ).length == 0 ? 'hidden' : 'flex'} justify-center items-center bg-green-600 text-white rounded-full mr-4`}>{msg.texts.filter((m)=> m.isSeen == false && m.sender != selectedJob?._id ).length}</p>
                    </div>
                    {/* <p className='text-xs text-slate-500'>
                            {msg.texts[msg?.texts?.length - 1 ].timestamp 
        ? new Date(msg.texts[msg?.texts?.length - 1].timestamp  * 1000).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        : 'Just now'
      }
                    </p> */}
                  </div>
                </div>
                <div className='ml-13 pl-3 border-l-2 border-blue-200'>
                  <p className='text-slate-700 leading-relaxed'>Check new messges.</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='bg-white rounded-full p-6 shadow-lg mb-4'>
              <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-slate-700 mb-2'>No Messages Yet</h3>
            <p className='text-slate-500 text-center max-w-sm'>
              When you receive messages, they&apos;ll appear here. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


if(showChat){
  return (
          <div className='h-[85vh] relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg overflow-hidden'>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className='flex items-center gap-3 mb-3'>
                  <div className='bg-gradient-to-br from-blue-500 to-blue-600 p-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md'>
                    <User className='h-5 w-5 text-white'/>
                  </div>
                  <div className='w-full'>
                    <div className='flex justify-between'>
                      <p className='font-semibold text-slate-800'>{messages.find((msg) => msg.id === selectedConversation)?.texts?.[0]?.senderName }</p>
                    </div>
                    {/* <p className='text-xs text-slate-500'>
                            {selectedConversation.texts[selectedConversation?.texts?.length - 1 ].timestamp 
        ? new Date(selectedConversation.texts[selectedConversation?.texts?.length - 1 ].timestamp  * 1000).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        : 'Just now'
      }
                    </p> */}
                  </div>
                </div>
        <button
          onClick={() => {setShowChat(false); setShowMessages(true)}}
          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className='h-[75%] overflow-y-auto'>
      {messages.find((msg) => msg.id === selectedConversation)?.texts.map((m,index)=> (
        <div key={index} className={`flex ${m.sender == selectedJob?._id ? 'justify-end' : 'justify-start'}`}>
          <div className={`ml-13 p-3 inline-block max-w-[40%] ${m.sender == selectedJob?._id ? 'mr-10 border-r-2 border-blue-200 text-right bg-slate-100' : 'ms-8 border-l-2 border-blue-200'} bg-slate-100 mt-4 py-2 `}>
            <p className='text-slate-700 leading-relaxed'>{m.text}</p>
          </div>
          <br />
        </div>
      ))}
      </div>
      <div className='bg-slate-400 py-2 absolute bottom-0 w-full flex justify-center gap-4'>
        <input type="text"
          onChange={(e)=> setText(e.target.value)}
          value={text}
          required
          className='w-[90%] rounded-3xl ps-3'
          placeholder='Message'
        />
        <button onClick={(e)=> {e.preventDefault(); handleSend(messages.find((msg) => msg.id === selectedConversation)?.participants?.[0] ?? '', messages.find((msg) => msg.id === selectedConversation)?.senderName ?? '')}} className='bg-green-600 p-3 text-white rounded-full'>
          send
        </button>
      </div>
    </div>
  )
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
          <p className="text-gray-600">Create, manage, and track your job postings.</p>
        </div>
        <button
          onClick={() => setShowJobForm(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + Create New Job
        </button>
      </div>

         {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Jobs', count: jobs?.flat().length, status: 'all' },
          { label: 'Active', count: jobs?.flat().filter(j => j.status === 'active').length, status: 'active' },
          { label: 'Paused', count: jobs?.flat().filter(j => j.status === 'paused').length, status: 'paused' },
          { label: 'Closed', count: jobs?.flat().filter(j => j.status === 'closed').length, status: 'closed' },
          { label: 'Draft', count: jobs?.flat().filter(j => j.status === 'draft').length, status: 'draft' },
        ].map((stat) => (
          <button
            key={stat.status}
            onClick={() => setFilterStatus(stat.status)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              filterStatus === stat.status
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </button>
        ))}
      </div>

      {!filteredJobs ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.094M6 6a2 2 0 012-2h4a2 2 0 012 2v2M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">
            {filterStatus === 'all' 
              ? "You haven't created any jobs yet. Create your first job posting to start hiring!"
              : `No jobs with status "${filterStatus}" found.`
            }
          </p>
          <button
            onClick={() => setShowJobForm(true)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
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
                className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedJob?._id === job._id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      {job.urgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Urgent
                        </span>
                      )}
                      {job.featured && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.department} • {job.category}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {job.location}
                        {job.isRemote && ' (Remote)'}
                      </span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(job.status)}`}>
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
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteJob(job._id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{job?.applications?.length}</div>
                    <div className="text-xs text-gray-500">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{job.views}</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {job.applications?.filter(app => app.status === 'shortlisted').length}
                    </div>
                    <div className="text-xs text-gray-500">Shortlisted</div>
                  </div>
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
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Job
                  </button>
                  
                  <button onClick={()=> setShowApplications(true)} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    View Applications
                  </button>
                  <button onClick={()=> setShowMessages(true)} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    View Messages
                  </button>
                </div>
                <div className="flex items-start mt-2 justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                    <p className="text-gray-600">{selectedJob.department} • {selectedJob.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedJob.status)}`}>
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
                    <h3 className="font-semibold text-gray-900 mb-2">Job Details</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Location:</strong> {selectedJob.location}{selectedJob.isRemote && ' (Remote)'}</div>
                      <div><strong>Type:</strong> {selectedJob.type}</div>
                      <div><strong>Salary:</strong> {formatSalary(selectedJob.salary)}</div>
                      <div><strong>Posted:</strong> {new Date(selectedJob.createdAt).toLocaleDateString()}</div>
                      {selectedJob.applicationDeadline && (
                        <div><strong>Deadline:</strong> {new Date(selectedJob.applicationDeadline).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Performance</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Total Applications:</span>
                        <span className="font-medium">{selectedJob.applications.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Views:</span>
                        <span className="font-medium">{selectedJob.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shortlisted:</span>
                        <span className="font-medium">
                          {selectedJob.applications.filter(app => app.status === 'shortlisted').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hired:</span>
                        <span className="font-medium">
                          {selectedJob.applications.filter(app => app.status === 'hired').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="space-y-3 pt-4 border-t border-gray-200">             
                  <button
                    onClick={() => handleEditJob(selectedJob)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Job
                  </button>
                  
                  <button onClick={()=> setShowApplications(true)} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    View Applications
                  </button>
                </div> */}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.094M6 6a2 2 0 012-2h4a2 2 0 012 2v2M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Job</h3>
                <p className="text-gray-600">Click on a job to view details and manage applications.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;