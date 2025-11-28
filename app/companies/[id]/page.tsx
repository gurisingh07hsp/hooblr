'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  Building2,
  MapPin,
  Users,
  Globe,
  Briefcase,
  Award,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  ArrowLeft,
  Clock,
  DollarSign,
  IndianRupee,
  Euro,
} from 'lucide-react';
import axios from 'axios';
import { generateSlug } from '@/hooks/generateSlug';

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
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs,setJobs] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getCompany = async() => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/${companyId}`);
      console.log(response);
      setCompany(response.data.company);
      setJobs(response.data.jobs);
    }catch(error){  
      console.log(error);
    }
    setLoading(false);
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
        {loading ? (
          <div className="h-[100vh] w-[100%] flex justify-center items-center text-center">
            <div>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#6D47F1] mx-auto" />
              <p className="mt-4 text-gray-600">Loading Jobs…</p>
            </div>
          </div>
        ) : (
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
        )}

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
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
          <div className="bg-white rounded-2xl border p-4 mb-8">
            <div>
              <div className="flex items-start space-x-6 mb-4">
                <div className='w-16 h-16 rounded-xl border flex justify-center items-center px-1'>
                  <img className={company?.logo ? "block" : 'hidden'} src={company?.logo} alt='company logo'/>
                </div>
                <h1 className="lg:text-3xl text-lg font-bold text-gray-900">{company.name}</h1>
              </div>
              <hr />
                <div className='mt-3'>
                  <div className="flex items-center space-x-3 mb-2">
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
                      <Users className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="font-medium">{company.size} Employees</span>
                    </div>
                  </div>
                   <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="font-medium">{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center text-green-600 font-medium">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span className="text-sm">{jobs?.length} open jobs</span>
                    </div>
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

              {/* Open Jobs */}
              <div className="bg-white rounded-2xl border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
                <div className="space-y-4">
                  {jobs?.map((job) => (
                    <div key={job._id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex lg:flex-row flex-col items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex lg:flex-row flex-col gap-2 lg:items-center text-sm text-gray-600 mb-3">
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
                        <button onClick={()=> router.push(`/jobs/${generateSlug(company?.name || '') + '-' + generateSlug(job.title) + '-' + generateSlug(job.location) + '-' + job._id}`)} className="bg-[#9333E9] mt-3 lg:mt-0 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
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
        </div>
      </div>

      <Footer />
    </div>
  );
} 