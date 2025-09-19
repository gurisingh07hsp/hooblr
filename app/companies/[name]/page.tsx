'use client'

import React from 'react';
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
  DollarSign
} from 'lucide-react';

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
  benefits: string[];
  featured?: boolean;
  about?: string;
  mission?: string;
  culture?: string;
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
  jobs?: Array<{
    id: number;
    title: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
  }>;
}

export default function CompanyProfilePage() {
  const router = useRouter();
  const params = useParams();
  const companyNameSlug = params.name;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Mock company data - in a real app, this would come from an API
  const companies: Company[] = [
    {
      id: 1,
      name: "TechCorp Inc.",
      industry: "Technology & IT",
      location: "San Francisco, CA",
      size: "1000-5000",
      description: "Leading technology company specializing in cloud solutions and AI development. We're committed to innovation and creating products that make a difference.",
      rating: 4.5,
      reviewCount: 234,
      openJobs: 15,
      founded: "2010",
      website: "techcorp.com",
      benefits: ["Health Insurance", "401k Matching", "Flexible Hours", "Remote Work", "Stock Options", "Learning Budget"],
      featured: true,
      about: "TechCorp Inc. is a leading technology company that has been at the forefront of innovation for over a decade. We specialize in cloud computing solutions, artificial intelligence, and digital transformation services that help businesses thrive in the digital age.",
      mission: "To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation while creating meaningful opportunities for our team members.",
      culture: "At TechCorp, we foster a culture of innovation, collaboration, and continuous learning. Our team members are encouraged to think creatively, take calculated risks, and push the boundaries of what's possible in technology.",
      contact: {
        email: "careers@techcorp.com",
        phone: "+1 (555) 123-4567",
        address: "123 Innovation Drive, San Francisco, CA 94105"
      },
      jobs: [
        {
          id: 1,
          title: "Senior Software Engineer",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$120,000 - $180,000",
          posted: "2 days ago"
        },
        {
          id: 2,
          title: "Product Manager",
          location: "Remote",
          type: "Full-time",
          salary: "$130,000 - $200,000",
          posted: "1 week ago"
        },
        {
          id: 3,
          title: "Data Scientist",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$110,000 - $160,000",
          posted: "3 days ago"
        }
      ]
    },
    {
      id: 2,
      name: "Ministry of Finance",
      industry: "Government & Public Sector",
      location: "Washington, DC",
      size: "5000+",
      description: "Federal government agency responsible for economic policy, tax collection, and financial regulation. Offering stable careers in public service.",
      rating: 4.2,
      reviewCount: 156,
      openJobs: 8,
      founded: "1789",
      website: "treasury.gov",
      benefits: ["Federal Benefits", "Pension Plan", "Job Security", "Professional Development", "Health Insurance", "Paid Time Off"],
      about: "The Ministry of Finance is a federal government agency responsible for managing the nation's finances, implementing economic policy, and ensuring financial stability. We play a crucial role in shaping the country's economic future.",
      mission: "To promote the economic prosperity and financial security of the United States through effective financial management, sound economic policy, and strong financial institutions.",
      culture: "We value integrity, excellence, and public service. Our team members are dedicated to serving the public interest and contributing to the nation's economic well-being.",
      contact: {
        email: "careers@treasury.gov",
        phone: "+1 (202) 622-2000",
        address: "1500 Pennsylvania Avenue NW, Washington, DC 20220"
      },
      jobs: [
        {
          id: 4,
          title: "Financial Analyst",
          location: "Washington, DC",
          type: "Full-time",
          salary: "$80,000 - $120,000",
          posted: "1 week ago"
        },
        {
          id: 5,
          title: "Policy Advisor",
          location: "Washington, DC",
          type: "Full-time",
          salary: "$90,000 - $140,000",
          posted: "2 weeks ago"
        }
      ]
    },
    {
      id: 3,
      name: "Creative Solutions",
      industry: "Design & Creative",
      location: "New York, NY",
      size: "50-200",
      description: "Award-winning creative agency helping brands tell their stories through innovative design and marketing campaigns.",
      rating: 4.7,
      reviewCount: 89,
      openJobs: 6,
      founded: "2015",
      website: "creativesolutions.com",
      benefits: ["Creative Freedom", "Health Insurance", "Bonus Structure", "Learning Budget", "Flexible Hours", "Remote Work"],
      about: "Creative Solutions is an award-winning creative agency that helps brands tell their stories through innovative design, compelling content, and strategic marketing campaigns.",
      mission: "To create meaningful connections between brands and their audiences through creative excellence, strategic thinking, and innovative solutions.",
      culture: "We celebrate creativity, diversity, and collaboration. Our team thrives in an environment that encourages experimentation, risk-taking, and pushing creative boundaries.",
      contact: {
        email: "hello@creativesolutions.com",
        phone: "+1 (212) 555-0123",
        address: "456 Creative Avenue, New York, NY 10001"
      },
      jobs: [
        {
          id: 6,
          title: "Senior Designer",
          location: "New York, NY",
          type: "Full-time",
          salary: "$85,000 - $130,000",
          posted: "3 days ago"
        },
        {
          id: 7,
          title: "Creative Director",
          location: "New York, NY",
          type: "Full-time",
          salary: "$120,000 - $180,000",
          posted: "1 week ago"
        }
      ]
    },
    {
      id: 4,
      name: "DataTech Solutions",
      industry: "Technology & IT",
      location: "Seattle, WA",
      size: "200-1000",
      description: "Data analytics and machine learning company helping businesses make data-driven decisions with cutting-edge AI technology.",
      rating: 4.4,
      reviewCount: 178,
      openJobs: 12,
      founded: "2018",
      website: "datatech.com",
      benefits: ["Stock Options", "Health Insurance", "Learning Budget", "Flexible PTO", "Remote Work", "Professional Development"],
      about: "DataTech Solutions is a cutting-edge data analytics and machine learning company that helps businesses make informed decisions through advanced AI technology and data-driven insights.",
      mission: "To democratize data analytics and AI technology, making powerful insights accessible to businesses of all sizes while fostering innovation and growth.",
      culture: "We embrace a culture of continuous learning, experimentation, and collaboration. Our team values curiosity, technical excellence, and the pursuit of knowledge.",
      contact: {
        email: "careers@datatech.com",
        phone: "+1 (206) 555-0123",
        address: "789 Data Street, Seattle, WA 98101"
      },
      jobs: [
        {
          id: 8,
          title: "Data Scientist",
          location: "Seattle, WA",
          type: "Full-time",
          salary: "$100,000 - $150,000",
          posted: "1 week ago"
        },
        {
          id: 9,
          title: "Machine Learning Engineer",
          location: "Remote",
          type: "Full-time",
          salary: "$110,000 - $170,000",
          posted: "3 days ago"
        }
      ]
    },
    {
      id: 5,
      name: "City General Hospital",
      industry: "Healthcare",
      location: "Chicago, IL",
      size: "1000-5000",
      description: "Leading healthcare institution providing comprehensive medical services and advancing patient care through innovation and research.",
      rating: 4.3,
      reviewCount: 203,
      openJobs: 10,
      founded: "1950",
      website: "citygeneral.com",
      benefits: ["Health Insurance", "Dental Coverage", "Vision Coverage", "Retirement Plan", "Paid Time Off", "Professional Development"],
      about: "City General Hospital is a leading healthcare institution committed to providing exceptional patient care, advancing medical research, and training the next generation of healthcare professionals.",
      mission: "To improve the health and well-being of our community through excellence in patient care, medical education, and research while maintaining the highest standards of medical practice.",
      culture: "We foster a culture of compassion, excellence, and continuous improvement. Our team is dedicated to patient-centered care and professional growth in a supportive environment.",
      contact: {
        email: "hr@citygeneral.com",
        phone: "+1 (312) 555-0123",
        address: "123 Medical Center Drive, Chicago, IL 60601"
      },
      jobs: [
        {
          id: 10,
          title: "Registered Nurse",
          location: "Chicago, IL",
          type: "Full-time",
          salary: "$65,000 - $95,000",
          posted: "2 days ago"
        },
        {
          id: 11,
          title: "Physician",
          location: "Chicago, IL",
          type: "Full-time",
          salary: "$200,000 - $300,000",
          posted: "1 week ago"
        }
      ]
    },
    {
      id: 6,
      name: "Green Energy Co.",
      industry: "Energy & Utilities",
      location: "Austin, TX",
      size: "500-1000",
      description: "Renewable energy company focused on sustainable solutions and reducing carbon footprint through innovative green technologies.",
      rating: 4.6,
      reviewCount: 134,
      openJobs: 7,
      founded: "2012",
      website: "greenenergy.com",
      benefits: ["Health Insurance", "401k Matching", "Flexible Hours", "Remote Work", "Professional Development", "Green Initiatives"],
      about: "Green Energy Co. is a forward-thinking renewable energy company dedicated to creating sustainable solutions for a cleaner, greener future. We specialize in solar, wind, and other renewable energy technologies.",
      mission: "To accelerate the transition to clean, renewable energy by providing innovative, sustainable solutions that benefit both our customers and the planet.",
      culture: "We are passionate about environmental sustainability and innovation. Our team values creativity, environmental responsibility, and making a positive impact on the world.",
      contact: {
        email: "careers@greenenergy.com",
        phone: "+1 (512) 555-0123",
        address: "456 Green Street, Austin, TX 73301"
      },
      jobs: [
        {
          id: 12,
          title: "Solar Engineer",
          location: "Austin, TX",
          type: "Full-time",
          salary: "$80,000 - $120,000",
          posted: "4 days ago"
        },
        {
          id: 13,
          title: "Environmental Specialist",
          location: "Remote",
          type: "Full-time",
          salary: "$70,000 - $100,000",
          posted: "1 week ago"
        }
      ]
    }
  ];

  // Helper function to convert company name to slug
  const nameToSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Find company by slug
  const company = companies.find(c => nameToSlug(c.name) === companyNameSlug);

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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Hooblr</span>
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
                <div className="w-20 h-20 bg-[#9333E9] rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
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
                    <div className="flex items-center">
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
                    </div>
                    <div className="flex items-center text-green-600 font-medium">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span className="text-sm">{company.openJobs} open jobs</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button className="bg-[#9333E9] text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold">
                  View All Jobs
                </button>
                <div className="flex space-x-3">
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors border border-gray-200 rounded-lg">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors border border-gray-200 rounded-lg">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors border border-gray-200 rounded-lg">
                    <Eye className="w-5 h-5" />
                  </button>
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
                  {company.jobs?.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-xl p-6">
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
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            Posted {job.posted}
                          </div>
                        </div>
                        <button className="bg-[#9333E9] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
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
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-gray-700">Founded {company.founded}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-purple-600 mr-3" />
                    <a href={`https://${company.website}`} className="text-purple-600 hover:text-purple-700 flex items-center">
                      {company.website}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
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
          <div className="mt-12">
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
            
            {/* Show message if no similar companies */}
            {companies.filter(c => c.id !== company.id && c.industry === company.industry).length === 0 && (
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No similar companies found in the same industry.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 