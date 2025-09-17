'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign,
  IndianRupee,
  Euro,
  Building2, 
  Filter, 
  Heart, 
  Share2, 
  ChevronRight,
  CheckCircle,
  // Currency
} from 'lucide-react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

interface Job {
  _id: string;
  title: string;
  company: {company: {name: string}};
  location: string;
  type: string;
  salary: {min: string, max: string, currency: string, period: string};
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  category: string;
  urgent?: boolean;
  featured?: boolean;
  companyLogo?: string;
  rating?: number;
  applications: [];
}

interface FindJobsPageProps {
  initialCategory?: string;
}

export default function FindJobsPage({initialCategory }: FindJobsPageProps) {
  const router = useRouter();
  const {user} = useUser();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState<string[]>([]); 

  const [filters, setFilters] = useState({
    type: "",
    experience: "",
    minSalary: "",
    maxSalary: "",
    search: "",
  });

  const categories = [
    'Law Enforcement',
    'Administration',
    'Healthcare',
    'Education',
    'Government Jobs',
    'Technology & IT',
    'Government & Public Sector',
    'Healthcare & Medical',
    'Finance & Banking',
    'Education & Training',
    'Engineering',
    'Sales & Marketing',
    'Human Resources',
    'Legal & Compliance',
    'Operations & Management',
    'Customer Service',
    'Design & Creative',
    'Research & Development',
    'Manufacturing',
    'Retail & E-commerce',
    'Transportation & Logistics',
    'Real Estate',
    'Media & Communications',
    'Non-Profit & NGO',
    'Consulting'
  ];

  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Washington, DC',
    'Austin, TX',
    'Seattle, WA',
    'Chicago, IL',
    'Boston, MA',
    'Los Angeles, CA',
    'Remote'
  ];

  // const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
  // const salaryRanges = ['$0-50k', '$50k-100k', '$100k-150k', '$150k+'];





  // Fetch jobs with filters
  const fetchJobs = async (pageNumber: number, filters: any) => {
    if (loading) return;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: "20",
        location: selectedLocation,
        category: selectedCategory,
        ...(filters.type && { type: filters.type }),
        ...(filters.experience && { experience: filters.experience }),
        ...(filters.minSalary && { minSalary: filters.minSalary }),
        ...(filters.maxSalary && { maxSalary: filters.maxSalary }),
        ...(filters.search && { search: filters.search }),
      });

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${params.toString()}`
      );

      const newJobs = res.data.jobs;
      setFilteredJobs((prev) => (pageNumber === 1 ? newJobs : [...prev, ...newJobs]));
      setHasMore(pageNumber < res.data.pagination.pages);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }

    setLoading(false);
  };

  // Reload jobs when filters change
  useEffect(() => {
    setPage(1);
    fetchJobs(1, filters);
  }, [filters,selectedCategory, selectedLocation]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const el = document.getElementById("load-more");
    if (el) observer.observe(el);

    return () => {
      const el = document.getElementById("load-more");
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      fetchJobs(page, filters);
    }
  }, [page]);

  useEffect(() => {
    const filtered = filteredJobs;

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.posted).getTime() - new Date(a.posted).getTime();
        case 'salary-high':
          return parseInt(b.salary.max) - parseInt(a.salary.max);
        case 'salary-low':
          return parseInt(a.salary.max) - parseInt(b.salary.max);
        case 'company':
          return a.company.company?.name.localeCompare(b.company.company.name);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [selectedType, selectedSalaryRange, sortBy]);

  useEffect(()=>{
    if(user && filteredJobs){
      filteredJobs.forEach(job => job.applications.forEach((app: {user: string}) => {
        if(app.user == user._id){
         setIsApplied(prev => [...prev, job._id]);
        } 
      }))
    }
  },[user, filteredJobs])

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedType('');
    setSelectedSalaryRange('');
    setFilters({
      type: "",
      experience: "",
      minSalary: "",
      maxSalary: "",
      search: "",
    });
  };

  const getCurrencyIcon = (currency: string) => {
  switch (currency) {
    case "USD":
      return <DollarSign className="w-4 h-4 mr-1 text-purple-500" />;
    case "INR":
      return <IndianRupee className="w-4 h-4 mr-1 text-purple-500" />;
    case "EUR":
      return <Euro className="w-4 h-4 mr-1 text-purple-500" />;
    default:
      return <DollarSign className="w-4 h-4 mr-1 text-purple-500" />; // fallback
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover thousands of opportunities from top companies and government organizations
          </p>
          
          {/* Advanced Search */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white/50"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white/50"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* <button className="bg-[#9333E9] text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Search Jobs
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-purple-600" />
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Job Type</label>
          {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map(
            (t) => (
              <label key={t} className="flex items-center p-2 rounded-lg hover:bg-purple-50 cursor-pointer">
                <input
                  type="radio"
                  name="jobType"
                  value={t}
                  checked={filters.type === t}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{t}</span>
              </label>
            )
          )}
        </div>


        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Salary Range</label>
          <label className="flex items-center p-2 rounded-lg hover:bg-purple-50 cursor-pointer">
            <input
              type="radio"
              name="salary"
              onChange={() =>
                setFilters({ ...filters, minSalary: "0", maxSalary: "50000" })
              }
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">$0–50k</span>
          </label>
          <label className="flex items-center p-2 rounded-lg hover:bg-purple-50 cursor-pointer">
            <input
              type="radio"
              name="salary"
              onChange={() =>
                setFilters({ ...filters, minSalary: "50000", maxSalary: "100000" })
              }
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">$50k–100k</span>
          </label>
          <label className="flex items-center p-2 rounded-lg hover:bg-purple-50 cursor-pointer">
            <input
              type="radio"
              name="salary"
              onChange={() =>
                setFilters({ ...filters, minSalary: "100000", maxSalary: "150000" })
              }
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">$100k–150k</span>
          </label>
          <label className="flex items-center p-2 rounded-lg hover:bg-purple-50 cursor-pointer">
            <input
              type="radio"
              name="salary"
              onChange={() =>
                setFilters({ ...filters, minSalary: "150000", maxSalary: "9999999" })
              }
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">$150k+</span>
          </label>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Experience</label>
          {["Entry-level", "Mid-level", "Senior-level", "Executive"].map((exp) => (
            <label key={exp} className="flex items-center p-2 rounded-lg hover:bg-purple-50 cursor-pointer">
              <input
                type="radio"
                name="experience"
                checked={filters.experience === exp}
                onChange={() => setFilters({ ...filters, experience: exp })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
               <span className="ml-2 text-sm text-gray-700">{exp}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredJobs.length} Jobs Found
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                >
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                  <option value="company">Company A-Z</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-6 transition-all duration-300 ${
                    job.featured ? 'ring-2 ring-purple-500 ring-opacity-20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3
                          onClick={() => router.push(`/jobs/${job._id}`)}
                          className="text-xl font-semibold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors"
                        >
                          {job.title}
                        </h3>
                        {job.featured && (
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                        {job.urgent && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1 text-purple-500" />
                          <span>{job.company?.company?.name}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-purple-500" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          {getCurrencyIcon(job.salary.currency)}
                          <span>{`${job.salary.min} - ${job.salary.max} ${job.salary.period}`}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                          {job.category}
                        </span>
                        {/* <span className="text-sm text-gray-500">• Posted {job.posted}</span> */}
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                           <button onClick={() => router.push(`/jobs/${job._id}`)} className={`${isApplied.includes(job._id) ? 'bg-green-600' : 'bg-purple-600'} flex justify-center items-center text-white px-5 py-2 rounded-lg`}>
                            {isApplied.includes(job._id) ? 'Applied' : 'Apply Now'}
                            {isApplied.includes(job._id) && <CheckCircle className='ms-1 w-4 h-4'/>}
                            </button>
                          {/* <button
                            onClick={() => router.push(`/jobs/${job._id}`)}
                            className="bg-[#9333E9] text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg"
                          >
                            Apply Now
                          </button> */}
                          <button
                            onClick={() => router.push(`/jobs/${job._id}`)}
                            className="text-purple-600 hover:text-purple-700 font-medium flex items-center transition-colors"
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {loading && <p>Loading...</p>}
              <div id="load-more" className="h-10"></div>
              {!hasMore && <p className="text-gray-500 ms-4">No more jobs</p>}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or clearing the filters.
                </p>
                <button
                  // onClick={clearFilters}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}