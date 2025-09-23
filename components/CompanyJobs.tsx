// components/CompanyJobs.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import JobForm from './JobForm';
import axios from 'axios';

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
        <p className="text-sm text-gray-500 mb-6">
          Applied on: {new Date(app.appliedAt).toLocaleDateString()}
        </p>

        {/* Grid Layout for Documents */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
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
          <div className="p-4 border rounded-lg bg-white shadow-sm overflow-auto">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Resume</h2>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
              {app.resume}
            </pre>
          </div>
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
          { label: 'Total Jobs', count: jobs?.length, status: 'all' },
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
                <div className="flex items-start justify-between mb-6">
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

                <div className="space-y-3 pt-4 border-t border-gray-200">             
                  <button
                    onClick={() => handleEditJob(selectedJob)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Job
                  </button>
                  
                  <button onClick={()=> setShowApplications(true)} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    View Applications
                  </button>
                </div>
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