// components/UserJobs.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { generateSlug } from '@/hooks/generateSlug';

interface Job {
  _id: string;
  title: string;
  company: {
    _id: string;
    name: string;
    logo?: string;
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
  experience: string;
  education: string;
  applications: string;
}

const UserJobs = () => {
  const router = useRouter();
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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
                ? 'border-[#6D47F1] bg-[#6D47F1] text-white'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold">{stat.count}</div>
            <div className="text-sm">{stat.label}</div>
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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">

          {/* Jobs List */}
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="w-full bg-white rounded-2xl border p-2"
                >
                  <div className="flex relative border-b pb-4">
                    <div onClick={() => router.push(`/jobs/${generateSlug(job?.company?.name || '') + '-' + generateSlug(job.title) + '-' + generateSlug(job.location) + '-' + job._id}`)} className="w-14 h-14 rounded-xl border flex justify-center items-center px-1 cursor-pointer">
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
                  <span className={`px-3 py-1 h-6 absolute right-4 top-3 rounded-full text-xs font-medium capitalize ${getStatusColor(job.applicationStatus)}`}>
                    {job.applicationStatus}
                  </span>
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
                        <p className="ms-1">{job.location}</p>
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

                  <div className="flex justify-between items-center mt-6 pb-2 px-2">
                    <button
                      onClick={() => router.push(`/jobs/${generateSlug(job?.company?.name || '') + '-' + generateSlug(job.title) + '-' + generateSlug(job.location.split(',').pop() || job.location) + '-' + job._id}`)}
                      className={`px-4 py-1 flex items-center border rounded-3xl text-[#6D47F1]`}
                    >
                    View Job
                    </button>
                    <p className="text-neutral-500 text-sm">Applied on {new Date(job.appliedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default UserJobs;