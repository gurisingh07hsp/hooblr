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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  
    // const [filters, setFilters] = useState({
    //   size: '',
    //   search: "",
    // });

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

  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Washington, DC',
    'Seattle, WA',
    'Chicago, IL',
    'Austin, TX',
    'Remote'
  ];

  const companySizes = [
    '1-50',
    '50-200',
    '200-1000',
    '1000-5000',
    '5000+'
  ];

  const getCompanies = async() => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/`);
      if(response.status == 200){
        setCompanies(response.data.companies);
        setFilteredCompanies(response.data.companies);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getCompanies();
  },[])

  useEffect(()=> {
    console.log("companies : ", companies);
  },[companies])

  const handleSearch = () => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry) {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }

    if (selectedLocation) {
      filtered = filtered.filter(company => company.location === selectedLocation);
    }

    if (selectedSize) {
      filtered = filtered.filter(company => company.size === selectedSize);
    }

      setFilteredCompanies(filtered);
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedIndustry, selectedLocation, selectedSize]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setSelectedLocation('');
    setSelectedSize('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover Amazing Companies
            </h1>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              Explore top companies from innovative startups to established government agencies. 
              Find your perfect workplace and build your career.
            </p>
            
            {/* Search Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Company name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-2 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                </div>
                
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                
                <button 
                  onClick={handleSearch}
                  className="bg-[#9333E9] text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center transform hover:-translate-y-1"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{companies.length}</div>
              <div className="text-sm text-gray-600">Total Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{companies.filter(c => c.featured).length}</div>
              <div className="text-sm text-gray-600">Featured Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{companies.reduce((sum, c) => sum + c.jobs?.length, 0)}</div>
              <div className="text-sm text-gray-600">Open Positions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 p-6 sticky top-6">
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
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Company Size</label>
                  <div className="space-y-2">
                    {companySizes.map(size => (
                      <label key={size} className="flex items-center cursor-pointer hover:bg-purple-50 p-2 rounded-lg transition-colors">
                        <input
                          type="radio"
                          name="companySize"
                          value={size}
                          checked={selectedSize === size}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{size} employees</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Rating</label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center cursor-pointer hover:bg-purple-50 p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <div className="ml-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-700">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Company Listings */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {filteredCompanies.length} Companies Found
              </h2>
              {/* <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Most Jobs</option>
                  <option>Company Name A-Z</option>
                </select>
              </div> */}
            </div>

            <div className="space-y-6">
              {filteredCompanies.map((company) => (
                <div
                  key={company._id}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-6 transition-all duration-300 transform hover:-translate-y-1 ${
                    company.featured ? 'ring-2 ring-purple-500 ring-opacity-30 bg-gradient-to-r from-purple-50/50 to-indigo-50/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 bg-[#9333E9] rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                            {company.name}
                          </h3>
                          {company.featured && (
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-gray-600 mb-3">
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
                            {/* <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Globe className="w-3 h-3" />
                              <span>Founded {company.founded}</span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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