'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Building2, 
  Users, 
  Star, 
  ChevronRight,
  Filter,
  Globe,
  Briefcase,
  Award,
  Heart,
  Eye,
  Share2
} from 'lucide-react';
import axios from 'axios';

interface Company {
  _id: number;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  rating: number;
  reviewCount: number;
  jobs: [];
  // founded: string;
  website: string;
  featured?: boolean;
}

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([])
  // const [companies] = useState<Company[]>([
  //   {
  //     id: 1,
  //     name: "TechCorp Inc.",
  //     industry: "Technology & IT",
  //     location: "San Francisco, CA",
  //     size: "1000-5000",
  //     description: "Leading technology company specializing in cloud solutions and AI development. We're committed to innovation and creating products that make a difference.",
  //     rating: 4.5,
  //     reviewCount: 234,
  //     openJobs: 15,
  //     founded: "2010",
  //     website: "techcorp.com",
  //     benefits: ["Health Insurance", "401k Matching", "Flexible Hours", "Remote Work"],
  //     featured: true
  //   },
  //   {
  //     id: 2,
  //     name: "Ministry of Finance",
  //     industry: "Government & Public Sector",
  //     location: "Washington, DC",
  //     size: "5000+",
  //     description: "Federal government agency responsible for economic policy, tax collection, and financial regulation. Offering stable careers in public service.",
  //     rating: 4.2,
  //     reviewCount: 156,
  //     openJobs: 8,
  //     founded: "1789",
  //     website: "treasury.gov",
  //     benefits: ["Federal Benefits", "Pension Plan", "Job Security", "Professional Development"]
  //   },
  //   {
  //     id: 3,
  //     name: "Creative Solutions",
  //     industry: "Design & Creative",
  //     location: "New York, NY",
  //     size: "50-200",
  //     description: "Award-winning creative agency helping brands tell their stories through innovative design and marketing campaigns.",
  //     rating: 4.7,
  //     reviewCount: 89,
  //     openJobs: 6,
  //     founded: "2015",
  //     website: "creativesolutions.com",
  //     benefits: ["Creative Freedom", "Health Insurance", "Bonus Structure", "Learning Budget"]
  //   },
  //   {
  //     id: 4,
  //     name: "DataTech Solutions",
  //     industry: "Technology & IT",
  //     location: "Seattle, WA",
  //     size: "200-1000",
  //     description: "Data analytics and machine learning company helping businesses make data-driven decisions with cutting-edge AI technology.",
  //     rating: 4.4,
  //     reviewCount: 178,
  //     openJobs: 12,
  //     founded: "2018",
  //     website: "datatech.com",
  //     benefits: ["Stock Options", "Health Insurance", "Learning Budget", "Flexible PTO"],
  //     featured: true
  //   },
  //   {
  //     id: 5,
  //     name: "City General Hospital",
  //     industry: "Healthcare & Medical",
  //     location: "Chicago, IL",
  //     size: "1000-5000",
  //     description: "Leading healthcare provider committed to delivering exceptional patient care and advancing medical research.",
  //     rating: 4.3,
  //     reviewCount: 267,
  //     openJobs: 22,
  //     founded: "1965",
  //     website: "citygeneralhospital.org",
  //     benefits: ["Medical Benefits", "Retirement Plan", "Continuing Education", "Paid Time Off"]
  //   },
  //   {
  //     id: 6,
  //     name: "Department of Education",
  //     industry: "Government & Public Sector",
  //     location: "Austin, TX",
  //     size: "1000-5000",
  //     description: "State government agency focused on improving educational outcomes and supporting teachers and students across the state.",
  //     rating: 4.1,
  //     reviewCount: 134,
  //     openJobs: 11,
  //     founded: "1949",
  //     website: "education.state.tx.us",
  //     benefits: ["Government Benefits", "Pension", "Professional Development", "Work-Life Balance"]
  //   }
  // ]);

  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  
    const [filters, setFilters] = useState({
      size: '',
      search: "",
    });

  const industries = [
    'Technology & IT',
    'Government & Public Sector',
    'Healthcare & Medical',
    'Finance & Banking',
    'Education & Training',
    'Design & Creative',
    'Manufacturing',
    'Consulting'
  ];

  const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ];

  const getCompanies = async(pageNumber: number, filters: any) => {
    try{
      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: "20",
        location: selectedLocation,
        industry: selectedIndustry,
        ...(filters.size && { size: filters.size }),
        ...(filters.search && { search: filters.search }),
      });
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/?${params.toString()}`);


      if(response.status == 200){
      const newCompanies = response.data.companies;
      setCompanies(response.data.companies);
      setFilteredCompanies((prev) => (pageNumber === 1 ? newCompanies : [...prev, ...newCompanies]));
      setHasMore(pageNumber < response.data.pagination.pages);
        setFilteredCompanies(response.data.companies);
      }
    }catch(error){
      console.log(error);
    }
  }

    // Reload jobs when filters change
    useEffect(() => {
      setPage(1);
      getCompanies(1, filters);
    }, [filters,selectedIndustry, selectedLocation]);
  
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
        getCompanies(page, filters);
      }
    }, [page]);


  useEffect(()=> {
    console.log("companies : ", companies);
  },[companies])


  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedIndustry('');
    setFilters({
      size: "",
      search: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Companies
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore top companies from innovative startups to established government agencies. 
              Find your perfect workplace and build your careerkkm.
            </p>
            
            {/* Search Section */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="Company name"
                    value={filters.search}
                     onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                  />
                </div>
                
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>

                 <div className="relative flex items-center">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                     onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                  />
                </div>
                
                {/* <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6D47F1] mb-1">{companies.length}</div>
              <div className="text-sm text-gray-600">Total Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6D47F1] mb-1">{companies.filter(c => c.featured).length}</div>
              <div className="text-sm text-gray-600">Featured Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6D47F1] mb-1">{companies.reduce((sum, c) => sum + c.jobs?.length, 0)}</div>
              <div className="text-sm text-gray-600">Open Positions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8  bg-[#f8fafc]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/5 lg:block hidden">
            <div className="bg-white rounded-2xl shadow-lg border p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <div className='border mr-2 rounded-full w-10 h-10 flex items-center justify-center'>
                    <Filter className="w-5 h-5" />
                  </div>
                  Filter
                </h3>
                 <button
                  onClick={clearFilters}
                  className="text-[#6D47F1] border px-3 py-2 rounded-3xl text-sm font-medium"
                >
                  Reset
                </button>
              </div>
              
              <div className="space-y-6">
                <div className='border-t-2 pt-4'>
                  <label className="block text-sm font-semibold mb-3">Company Size</label>

                  {companySizes.map(
                    (t) => (
                      <label key={t} className="flex items-center p-2 rounded-lg hover:bg-[#FAFAFA] cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          value={t}
                          checked={filters.size === t}
                          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                          className=" w-5 h-5 border-2 rounded-full accent-[#6D47F1] cursor-pointer border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{t} employees</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

                    {/* Mobile Filters - Horizontal Scroll */}
                    <div className="lg:hidden mb-6">
                      <div className="flex items-center justify-between mb-4 px-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <div className='border mr-2 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Filter className="w-5 h-5" />
                          </div>
                          Filter
                        </h3>
                       <button
                          onClick={clearFilters}
                          className="text-[#6D47F1] border px-3 py-2 rounded-3xl text-sm font-medium"
                        >
                          Reset
                        </button>
                      </div>

                                   <div className="flex-shrink-0">
                  <select
                    value={filters.size}
                    onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                    className="px-4 py-2 border border-purple-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Company Size</option>
                    {companySizes.map((s,index)=>(
                      <option key={index} value={s}>{s} employees</option>
                    ))}
                  </select>
                </div>
                    </div>

          {/* Company Listings */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {filteredCompanies.length} Companies Found
              </h2>
            </div>

            {/* <div className="space-y-6">
              {filteredCompanies.map((company) => (
                <div
                  key={company._id}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-6 transition-all duration-300 transform hover:-translate-y-1 ${
                    company.featured ? 'ring-2 ring-purple-500 ring-opacity-30 bg-gradient-to-r from-purple-50/50 to-indigo-50/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col items-start space-x-4 flex-1">
                      <div className='flex'>
                      {company.logo ? (
                        <img src={company.logo} alt='company logo' width={80} height={70} className='rounded-md'/>
                      ): (
                      <div className="w-16 hidden h-16 bg-[#9333E9] rounded-xl lg:flex items-center justify-center shadow-lg">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      )}
                      
                        <div className="flex ms-4 items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                            {company.name}
                          </h3>
                          {company.featured && (
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                        
                      <div className="flex-1 mt-2">
                        <div className="flex flex-wrap items-center space-x-4 text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Award className="w-4 h-4 mr-1 text-purple-600" />
                            <span className="font-medium text-sm">{company.industry}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-purple-600" />
                            <span className="font-medium text-sm">{company.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-purple-600" />
                            <span className="font-medium text-sm">{company.size} employees</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center text-green-600 font-medium">
                            <Briefcase className="w-4 h-4 mr-1" />
                            <span className="text-sm">{company.jobs?.length} open jobs</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                          {company.description}
                        </p>
                        
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => router.push(`/companies/${company._id}`)} 
                              className="bg-[#9333E9] text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold transform hover:-translate-y-1 text-sm">
                              View Jobs
                            </button>
                            <button 
                              onClick={() => router.push(`/companies/${company._id}`)}
                              className="text-purple-600 hover:text-purple-700 font-semibold flex items-center transition-colors text-sm"
                            >
                              Company Profile
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
                              <Heart className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}



            <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 bg-[#f8fafc]'>
              {filteredCompanies.map((company) => (
                <div key={company._id} className='w-full bg-white rounded-2xl border p-2'>
                  <div className='flex border-b pb-4'>
                  <div onClick={() => router.push(`/companies/${company._id}`)} className='w-14 h-14 rounded-xl border flex justify-center items-center px-1 cursor-pointer'>
                    <img className={company?.logo ? "block" : 'hidden'} src={company?.logo} alt='company logo'/>
                  </div>
                  <div className='ms-2'>
                    <p>{company?.name}</p>
                    {company.featured && (
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              Featured
                            </span>
                          )}
                  </div>
                  </div>
                  <div className='mt-4'>
                    <div className='flex gap-x-3 items-center'>
                      <div className='px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm'>{company.industry}</div>
                      <div className='px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm'>{company.size} employees</div>
                    </div>

                    <div className='mt-4 ms-4 text-neutral-500'> 


                      <div className='mt-2 flex items-center gap-1'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <mask id="mask0_2011_417" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect y="3.05176e-05" width="24" height="24" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_2011_417)">
                            <path d="M12.0017 11.8654C12.4993 11.8654 12.9247 11.6882 13.2779 11.3339C13.6311 10.9796 13.8077 10.5536 13.8077 10.056C13.8077 9.55845 13.6305 9.13306 13.2762 8.77986C12.9218 8.42666 12.4959 8.25006 11.9983 8.25006C11.5007 8.25006 11.0753 8.42723 10.7221 8.78156C10.3689 9.13589 10.1923 9.56185 10.1923 10.0594C10.1923 10.557 10.3695 10.9824 10.7238 11.3356C11.0782 11.6888 11.5041 11.8654 12.0017 11.8654ZM12 21.5096C9.48335 19.3288 7.59618 17.2994 6.33848 15.4212C5.08079 13.543 4.45195 11.8186 4.45195 10.2481C4.45195 7.94044 5.19843 6.07219 6.69138 4.64334C8.18431 3.21449 9.95385 2.50006 12 2.50006C14.0462 2.50006 15.8157 3.21449 17.3086 4.64334C18.8016 6.07219 19.548 7.94044 19.548 10.2481C19.548 11.8186 18.9192 13.543 17.6615 15.4212C16.4038 17.2994 14.5167 19.3288 12 21.5096Z" fill="#F87171"/>
                          </g>
                        </svg>
                        <p className='ms-1'>{company.location}</p>
                      </div>

                      <div className='mt-2 flex items-center gap-2'>
                        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_2011_422" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <rect y="3.05176e-05" width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_2011_422)">
                          <path d="M1.36543 17.7885C1.12023 17.7885 0.914695 17.7055 0.748828 17.5397C0.582978 17.3738 0.500053 17.1683 0.500053 16.9231V16.5693C0.500053 15.9039 0.847487 15.3574 1.54235 14.9299C2.23722 14.5023 3.14298 14.2885 4.25963 14.2885C4.44424 14.2885 4.63015 14.2943 4.81733 14.3058C5.00451 14.3174 5.19297 14.3398 5.3827 14.3731C5.18784 14.6847 5.04329 15.0081 4.94905 15.3433C4.85484 15.6786 4.80773 16.0225 4.80773 16.375V17.7885H1.36543ZM7.40785 17.7885C7.14752 17.7885 6.93114 17.7019 6.7587 17.5286C6.58625 17.3554 6.50003 17.1407 6.50003 16.8846V16.4135C6.50003 15.9453 6.63145 15.5174 6.89428 15.1297C7.15709 14.742 7.53594 14.4039 8.0308 14.1154C8.52567 13.827 9.11028 13.6106 9.78463 13.4664C10.459 13.3222 11.1962 13.2501 11.9962 13.2501C12.8115 13.2501 13.5564 13.3222 14.2308 13.4664C14.9051 13.6106 15.4897 13.827 15.9846 14.1154C16.4795 14.4039 16.8557 14.742 17.1134 15.1297C17.3711 15.5174 17.5 15.9453 17.5 16.4135V16.8846C17.5 17.1407 17.4134 17.3554 17.2401 17.5286C17.0669 17.7019 16.8522 17.7885 16.5961 17.7885H7.40785ZM19.1923 17.7885V16.3764C19.1923 15.9999 19.1477 15.6456 19.0586 15.3135C18.9695 14.9815 18.8359 14.668 18.6577 14.3731C18.8538 14.3398 19.0413 14.3174 19.2202 14.3058C19.399 14.2943 19.5756 14.2885 19.75 14.2885C20.8666 14.2885 21.7708 14.4997 22.4625 14.9222C23.1541 15.3446 23.5 15.8936 23.5 16.5693V16.9231C23.5 17.1683 23.417 17.3738 23.2512 17.5397C23.0853 17.7055 22.8798 17.7885 22.6346 17.7885H19.1923ZM4.25708 13.3174C3.78571 13.3174 3.38305 13.1498 3.04908 12.8146C2.71511 12.4794 2.54813 12.0765 2.54813 11.6059C2.54813 11.1289 2.71571 10.7261 3.05088 10.3972C3.38605 10.0684 3.78896 9.90393 4.25963 9.90393C4.73655 9.90393 5.14103 10.0684 5.47308 10.3972C5.80513 10.7261 5.97115 11.1299 5.97115 11.6087C5.97115 12.0735 5.80689 12.4744 5.47835 12.8116C5.14982 13.1488 4.74273 13.3174 4.25708 13.3174ZM19.75 13.3174C19.2833 13.3174 18.8814 13.1488 18.5442 12.8116C18.2071 12.4744 18.0385 12.0735 18.0385 11.6087C18.0385 11.1299 18.2071 10.7261 18.5442 10.3972C18.8814 10.0684 19.284 9.90393 19.7519 9.90393C20.2339 9.90393 20.6394 10.0684 20.9682 10.3972C21.2971 10.7261 21.4615 11.1289 21.4615 11.6059C21.4615 12.0765 21.2975 12.4794 20.9695 12.8146C20.6414 13.1498 20.2349 13.3174 19.75 13.3174ZM12.0034 12.5001C11.2832 12.5001 10.6699 12.2477 10.1635 11.7429C9.65708 11.2381 9.40388 10.6251 9.40388 9.90393C9.40388 9.16836 9.65628 8.55179 10.1611 8.05421C10.6659 7.55662 11.2789 7.30783 12 7.30783C12.7356 7.30783 13.3522 7.5563 13.8498 8.05323C14.3473 8.55016 14.5961 9.16594 14.5961 9.90056C14.5961 10.6208 14.3477 11.2341 13.8507 11.7405C13.3538 12.2469 12.738 12.5001 12.0034 12.5001Z" fill="#22C55E"/>
                        </g>
                        </svg> */}
                        <Briefcase className='w-5 h-5'/>
                        {company.jobs?.length} open jobs
                        {/* <p>{job?.applications?.length > 0 ? job.applications.length : '0'} Applications</p> */}
                      </div>

                      <div className='mt-2 h-14'>
                          <p>{company.description.slice(0,100)} {company.description.length > 100 && '...'}</p>
                      </div>

                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-4 pb-2 px-2'>
                    <button onClick={() => router.push(`/companies/${company._id}`)} className='px-4 py-1 border rounded-3xl text-[#6D47F1]'>View Jobs</button>
                    <button onClick={() => router.push(`/companies/${company._id}`)}  className='text-neutral-500 flex items-center hover:text-[#6D47F1] text-sm'>
                      Company Profile
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>

                </div>
              ))}
            </section>






            {loading && <p>Loading...</p>}
              <div id="load-more" className="h-10"></div>
              {!hasMore && <p className="text-gray-500 ms-4">No more jobs</p>}

            {filteredCompanies.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No companies found</h3>
                {/* <p className="text-gray-600 mb-8 text-lg">
                  Try adjusting your search criteria or clearing the filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-pur text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg"
                >
                  Clear Filters
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}