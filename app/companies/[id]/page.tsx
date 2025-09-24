'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Menu, 
  X,
  Building2,
  MapPin,
  Users,
  Star,
  Globe,
  Briefcase,
  Award,
  Heart,
  Eye,
  Share2,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  Clock,
  DollarSign,
  IndianRupee,
  Euro
} from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

interface Company {
  id: number;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  rating: number;
  reviewCount: number;
  openJobs: number;
  founded: string;
  website: string;
  featured?: boolean;
  about?: string;
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
}

interface Job {
  _id: number;
    title: string;
    location: string;
    type: string;
    salary: {min: number, max: number, currency: string, period: string};
    posted: string;
    createdAt: Date;
}

export default function CompanyProfilePage() {
  const router = useRouter();
  const params = useParams();
  const companyId = params.id;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs,setJobs] = useState<Job[] | null>(null);

  const getCompany = async() => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/${companyId}`);
      console.log(response);
      setCompany(response.data.company);
      setJobs(response.data.jobs);
    }catch(error){  
      console.log(error);
    }
  }

  useEffect(()=>{
    getCompany();
  },[])

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


  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h1>
              <p className="text-gray-600 mb-8">The company you&apos;re looking for doesn&apos;t exist.</p>
              <button
                onClick={() => router.push('/companies')}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
              >
                Back to Companies
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white backdrop-blur-sm shadow-sm border-b border-purple-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => router.push('/')}
            >
              {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Hooblr</span> */}
              <Image src='/hooblrlogo.png' width={120} height={50} alt='logo'/>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push('/jobs')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Find Jobs
              </button>
              <button
                onClick={() => router.push('/companies')}
                className="text-purple-600 font-medium"
              >
                Companies
              </button>
              <button
                onClick={() => router.push('/resources')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Resources
              </button>
              <button
                onClick={() => router.push('/blog')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => router.push('/resume-builder')}
                className="text-purple-600 font-medium"
              >
                Resume Builder
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-purple-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  router.push('/jobs');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Find Jobs
              </button>
              <button
                onClick={() => {
                  router.push('/companies');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-purple-600 font-medium w-full text-left"
              >
                Companies
              </button>
              <button
                onClick={() => {
                  router.push('/resources');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Resources
              </button>
              <button
                onClick={() => {
                  router.push('/blog');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => {
                  router.push('/resume-builder');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-purple-600 font-medium w-full text-left"
              >
                Resume Builder
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.push('/companies')}
            className="flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Companies
          </button>

          {/* Company Header */}
          <div className="bg-white rounded-2xl border p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start space-x-6 mb-6 lg:mb-0">
                 {company.logo ? (
                    <img src={company.logo} alt='company logo' width={100} height={80} className='rounded-md'/>
                  ): (
                  <div className="w-16 hidden h-16 bg-[#9333E9] rounded-xl lg:flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  )}
                {/* <div className="w-20 h-20 bg-[#9333E9] rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div> */}
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                    {company.featured && (
                      <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="font-medium">{company.industry}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="font-medium">{company.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="font-medium">{company.size} employees</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(company.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {company.rating} ({company.reviewCount} reviews)
                      </span>
                    </div> */}
                    <div className="flex items-center text-green-600 font-medium">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span className="text-sm">{jobs?.length} open jobs</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                {/* <button className="bg-[#9333E9] text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold">
                  View All Jobs
                </button> */}
                <div className="flex space-x-3">
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors border border-gray-200 rounded-lg">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors border border-gray-200 rounded-lg">
                    <Share2 className="w-5 h-5" />
                  </button>
                  {/* <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors border border-gray-200 rounded-lg">
                    <Eye className="w-5 h-5" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-2xl border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About {company.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{company.about}</p>
                <p className="text-gray-700 leading-relaxed">{company.description}</p>
              </div>

              {/* Mission & Culture */}
              {/* <div className="bg-white rounded-2xl border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Mission & Culture</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed">{company.mission}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Culture</h3>
                    <p className="text-gray-700 leading-relaxed">{company.culture}</p>
                  </div>
                </div>
              </div> */}

              {/* Open Jobs */}
              <div className="bg-white rounded-2xl border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
                <div className="space-y-4">
                  {jobs?.map((job) => (
                    <div key={job._id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              {getCurrencyIcon(job.salary.currency)}
                              {job.salary.min} - {job.salary.max} {job.salary.period}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }) : "just now"}
                          </div>
                        </div>
                        <button onClick={()=> router.push(`/jobs/${job._id}`)} className="bg-[#9333E9] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-2xl border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                <div className="space-y-3">
                  {/* <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-gray-700">Founded {company.founded}</span>
                  </div> */}
                  {company.website && <div className="flex items-center">
                    <Globe className="w-4 h-4 text-purple-600 mr-3" />
                    <a href={`https://${company.website}`} className="text-purple-600 hover:text-purple-700 flex items-center">
                      {company.website}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>}
                  
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-gray-700">{company.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-gray-700">{company.size} employees</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              {/* <div className="bg-white rounded-2xl border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                <div className="space-y-2">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Contact */}
              {company.contact && (
                <div className="bg-white rounded-2xl border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-purple-600 mr-3" />
                      <a href={`mailto:${company.contact.email}`} className="text-purple-600 hover:text-purple-700 text-sm">
                        {company.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-purple-600 mr-3" />
                      <a href={`tel:${company.contact.phone}`} className="text-purple-600 hover:text-purple-700 text-sm">
                        {company.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-purple-600 mr-3 mt-0.5" />
                      <span className="text-gray-700 text-sm">{company.contact.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Companies */}
          {/* <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Companies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies
                .filter(c => c.id !== company.id && c.industry === company.industry)
                .slice(0, 3)
                .map((relatedCompany) => (
                  <div 
                    key={relatedCompany.id}
                    className="bg-white rounded-xl p-6 transition-shadow cursor-pointer border"
                    onClick={() => router.push(`/companies/${nameToSlug(relatedCompany.name)}`)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#9333E9] rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{relatedCompany.name}</h3>
                          {relatedCompany.featured && (
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-purple-600" />
                            <span>{relatedCompany.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1 text-purple-600" />
                            <span>{relatedCompany.size}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(relatedCompany.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-xs text-gray-600">
                              {relatedCompany.rating}
                            </span>
                          </div>
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <Briefcase className="w-3 h-3 mr-1" />
                            <span>{relatedCompany.openJobs} jobs</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 line-clamp-2">
                          {relatedCompany.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
         
            {companies.filter(c => c.id !== company.id && c.industry === company.industry).length === 0 && (
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No similar companies found in the same industry.</p>
              </div>
            )}
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
} 