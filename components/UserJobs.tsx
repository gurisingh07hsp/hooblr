// components/UserJobs.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  company: {
    _id: string;
    company: {
      name: string;
      logo?: string;
    };
  };
  location: string;
  type: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  applicationStatus: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  description: string;
  requirements: string;
}

const UserJobs = () => {
  const router = useRouter();
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/user/my-applications`, {withCredentials: true});
      if (response.status === 200) {
        console.log(response.data);
        setAppliedJobs(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch applied jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'hired':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (salary: any) => {
    if (!salary || !salary.min || !salary.max) return 'Not specified';
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} / ${salary.period}`;
  };

  const filteredJobs = filterStatus === 'all' 
    ? appliedJobs 
    : appliedJobs.filter(job => job.applicationStatus === filterStatus);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Applied Jobs</h1>
        <p className="text-gray-600">Track your job applications and their status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Applied', count: appliedJobs.length, status: 'all' },
          { label: 'Pending', count: appliedJobs.filter(j => j.applicationStatus === 'pending').length, status: 'pending' },
          { label: 'Under Review', count: appliedJobs.filter(j => j.applicationStatus === 'reviewed').length, status: 'reviewed' },
          { label: 'Shortlisted', count: appliedJobs.filter(j => j.applicationStatus === 'shortlisted').length, status: 'shortlisted' },
          { label: 'Hired', count: appliedJobs.filter(j => j.applicationStatus === 'hired').length, status: 'hired' },
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

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.094M6 6a2 2 0 012-2h4a2 2 0 012 2v2M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">
            {filterStatus === 'all' 
              ? "You haven't applied to any jobs yet. Start browsing and apply to jobs that interest you!"
              : `No applications with status "${filterStatus}" found.`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedJob?._id === job._id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                      {job.company.company.logo ? (
                        <img 
                          src={job.company.company.logo} 
                          alt={job.company.company.name}
                          className="w-8 h-8 rounded"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">
                          {job.company.company.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company.company.name}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(job.applicationStatus)}`}>
                    {job.applicationStatus}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    {/* <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg> */}
                    {formatSalary(job.salary)}
                  </div>
                  <div className="flex items-center text-xs">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-9 0h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
                    </svg>
                    Applied on {new Date(job.appliedAt).toLocaleDateString()}
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
                    <p className="text-gray-600">{selectedJob.company.company.name}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize mt-2 ${getStatusColor(selectedJob.applicationStatus)}`}>
                      {selectedJob.applicationStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Job Details</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Location:</strong> {selectedJob.location}</div>
                      <div><strong>Type:</strong> {selectedJob.type}</div>
                      <div><strong>Salary:</strong> {formatSalary(selectedJob.salary)}</div>
                      <div><strong>Applied:</strong> {new Date(selectedJob.appliedAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedJob.requirements}
                    </p>
                  </div> */}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button onClick={()=> router.push(`/jobs/${selectedJob._id}`) } className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View Full Job Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Job</h3>
                <p className="text-gray-600">Click on a job application to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserJobs;