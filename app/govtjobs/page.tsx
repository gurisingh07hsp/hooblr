"use client"

import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Briefcase, DollarSign, Filter, BriefcaseBusiness, IndianRupee } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface GovtJob {
  _id: string;
  title: string;
  officialLink: string;
  state: string;
  category: string;
  eligibilityCriteria: string;
  ageLimit: string;
  salary: string;
  applicationFees: string;
  selectionProcess: string;
  howToApply: string;
  lastDateToApply: string;
  createdAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const GovtJobsPortal = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<GovtJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All India Govt Jobs',
    'State Govt Jobs',
    'Bank Jobs',
    'Teaching Jobs',
    'Engineering Jobs',
    'Railway Jobs',
    'Police/Defence Jobs'
  ];

  const states = [
    'AP', 'AS', 'BR', 'CG', 'DL', 'GJ', 'HP', 'HR', 'JH', 'KA', 
    'KL', 'MH', 'MP', 'OD', 'PB', 'RJ', 'TN', 'TS', 'UK', 'UP', 'WB'
  ];

  // Mock data for demonstration
//   const mockJobs: GovtJob[] = [
//     {
//       _id: '1',
//       title: 'India Post IPPB GDS Executive Recruitment 2025',
//       officialLink: 'https://indiapost.gov.in',
//       state: 'All India',
//       category: 'Bank Jobs',
//       eligibilityCriteria: '12th Pass from recognized board',
//       ageLimit: '18-40 years',
//       salary: '₹14,500 - ₹19,000 per month',
//       applicationFees: '₹100 for General/OBC, Free for SC/ST/Women',
//       selectionProcess: 'Written Exam, Document Verification',
//       howToApply: 'Apply online through official website',
//       lastDateToApply: '2025-11-15',
//       createdAt: '2025-10-10'
//     },
//     {
//       _id: '2',
//       title: 'SECL 543 Assistant Foreman Recruitment 2025',
//       officialLink: 'https://secl.gov.in',
//       state: 'CG',
//       category: 'Engineering Jobs',
//       eligibilityCriteria: 'Diploma in Mining/Mechanical Engineering',
//       ageLimit: '18-35 years',
//       salary: '₹35,400 - ₹1,12,400 per month',
//       applicationFees: '₹500 for General/OBC, ₹250 for SC/ST',
//       selectionProcess: 'Written Exam, Interview, Medical Test',
//       howToApply: 'Apply online through recruitment portal',
//       lastDateToApply: '2025-10-30',
//       createdAt: '2025-10-08'
//     },
//     {
//       _id: '3',
//       title: 'Railway Recruitment Board (RRB) ALP Recruitment 2025',
//       officialLink: 'https://rrbcdg.gov.in',
//       state: 'All India',
//       category: 'Railway Jobs',
//       eligibilityCriteria: 'ITI or Diploma in relevant trade',
//       ageLimit: '18-30 years',
//       salary: '₹19,900 - ₹63,200 per month',
//       applicationFees: '₹500 for General/OBC, ₹250 for SC/ST',
//       selectionProcess: 'CBT, Aptitude Test, Document Verification, Medical',
//       howToApply: 'Register on RRB official portal and fill application',
//       lastDateToApply: '2025-11-20',
//       createdAt: '2025-10-12'
//     }
//   ];

  useEffect(() => {
    fetchJobs();
  }, [pagination.page, selectedCategory, selectedState, searchQuery]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedState && { state: selectedState }),
        ...(searchQuery && { search: searchQuery })
      });
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs?${params}`);
      const data = await response.data.jobs;
      console.log(data);
      
      // Mock API response
      setTimeout(() => {
        const filteredJobs = data.filter((job: GovtJob) => {
          const matchesCategory = !selectedCategory || job.category === selectedCategory;
          const matchesState = !selectedState || job.state === selectedState || job.state === 'All India';
          const matchesSearch = !searchQuery || job.title.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesState && matchesSearch;
        });
        
        setJobs(filteredJobs);
        setPagination(prev => ({
          ...prev,
          total: filteredJobs.length,
          pages: Math.ceil(filteredJobs.length / prev.limit)
        }));
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getDaysRemaining = (lastDate: string) => {
    const today = new Date();
    const deadline = new Date(lastDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      {/* Header */}
      <header className="bg-[#6D47F1] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded">
                <BriefcaseBusiness className="w-8 h-8 text-[#6D47F1]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Goverment Jobs</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-50 shadow">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#6D47F1] text-white'
                    : 'border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pb-3">
            {states.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state === selectedState ? '' : state)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  selectedState === state
                    ? 'bg-[#6D47F1] text-white'
                    : 'border'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Sidebar */}
          {/* <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4 text-blue-700">Notifications</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-2">📢</span> Latest Notifications
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-2">💼</span> Employment News
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-2">🔍</span> Search Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-2">🏛️</span> Sarkari Job
                  </a>
                </li>
              </ul>
            </div>
          </aside> */}

          {/* Job Listings */}
          <main>
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, category, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-[#6D47F1] text-white rounded-lg flex items-center gap-2"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory || selectedState) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('')} className="hover:text-blue-900">×</button>
                  </span>
                )}
                {selectedState && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {selectedState}
                    <button onClick={() => setSelectedState('')} className="hover:text-blue-900">×</button>
                  </span>
                )}
              </div>
            )}

            {/* Job Cards */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D47F1]"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {jobs.map((job) => {
                  const daysRemaining = getDaysRemaining(job.lastDateToApply);
                  return (
                    <article key={job._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#6D47F1] cursor-pointer">
                            <a href={job.officialLink} target="_blank" rel="noopener noreferrer">{job.title}</a>
                          </h2>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.state}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.category}
                            </span>
                           
                          </div>
                        </div>
                        {daysRemaining >= 0 && (
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            daysRemaining <= 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {daysRemaining === 0 ? 'Last Day' : `${daysRemaining} days left`}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        {/* <div>
                          <p className="text-gray-600"><strong>Eligibility:</strong> {job.eligibilityCriteria}</p>
                        </div> */}
                        <div>
                          <p className="text-gray-600"><strong>Age Limit:</strong> {job.ageLimit}</p>
                        </div>
                        <div>
                          <p className="text-gray-600"><strong>Application Fee:</strong> {job.applicationFees}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <strong>Last Date:</strong> {formatDate(job.lastDateToApply)}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <strong>Salary: </strong>
                          <div className='flex items-center'>
                            <IndianRupee className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </p>
                         {/* <span className="flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              {job.salary}
                        </span> */}
                      </div>

                      <div className="flex gap-3">
                        <a
                          href={job.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-[#6D47F1] text-white rounded-lg transition-colors font-medium"
                        >
                          Apply Now
                        </a>
                        <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                          View Details
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                      className={`px-4 py-2 rounded-lg ${
                        pagination.page === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  disabled={pagination.page === pagination.pages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default GovtJobsPortal;
