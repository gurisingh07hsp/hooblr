'use client';
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer';
import { 
  Search,
  MapPin,
  Clock,
  Users,
  Zap,
  Heart,
  Globe,
  Award,
  Briefcase,
  Star
} from 'lucide-react';
import axios from 'axios';
const CareersDetailsPage = () => {
     const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<any[]>([]); 
  const [showModal, setShowModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
   const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverletter: '',
  })

  const fetchCareerJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/careerjobs/`);
      const data = await response.data;
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(()=> {
    fetchCareerJobs();
  },[])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

   const handleApplyClick = (job: any) => {
    setSelectedJob(job)
    setShowModal(true)
    setShowSuccess(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async() => {
    // Simulate form submission
    if (formData.name && formData.email && formData.phone && formData.experience) {
      try{
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/careerjobs/apply/${selectedJob?._id}`, formData);
        if(response.status === 200){
          setShowSuccess(true)
          setTimeout(() => {
            setShowModal(false)
            setShowSuccess(false)
            setFormData({
              name: '',
              email: '',
              phone: '',
              experience: '',
              coverletter: ''
            })
          }, 2000)
        }
      }catch(error){
        console.log(error);
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setShowSuccess(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      coverletter: ''
    })
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us revolutionize the way people find jobs and build careers. 
              Join a team that&#39;s passionate about making a difference.
            </p>
          </div>

          {/* Why Work With Us */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Meaningful Impact</h3>
                <p className="text-gray-600">
                  Help millions of people find their dream jobs and build fulfilling careers.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation Culture</h3>
                <p className="text-gray-600">
                  Work with cutting-edge technology and innovative solutions in a fast-paced environment.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Team</h3>
                <p className="text-gray-600">
                  Collaborate with talented individuals from diverse backgrounds and experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Pay</h3>
                <p className="text-gray-600 text-sm">
                  Competitive salary, equity, and performance-based bonuses.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Work</h3>
                <p className="text-gray-600 text-sm">
                  Remote-first culture with flexible hours and work arrangements.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Benefits</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive health, dental, and vision insurance coverage.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth & Learning</h3>
                <p className="text-gray-600 text-sm">
                  Professional development budget and learning opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {'Remote'}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 ${job.status == 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-sm font-medium rounded-full`}>
                      {job.status}
                    </span>
                  </div>
                </div>
                
                <div className="quill-content prose prose-sm sm:prose lg:prose-lg max-w-none mb-2" dangerouslySetInnerHTML={{ __html: job.description }} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                    <div className="quill-content prose prose-sm sm:prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: job.requirements }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                    <div className="quill-content prose prose-sm sm:prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: job.benefits }} />
                  </div>
                </div>
                
                <button
                  onClick={() => handleApplyClick(job)}
                  className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse all departments.</p>
            </div>
          )}

          {/* CTA */}
          {/* <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Don&#39;t See the Right Fit?</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                We&#39;re always looking for talented individuals to join our team. 
                Send us your resume and we&#39;ll keep you in mind for future opportunities.
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold">
                Send Your Resume
              </button>
            </div>
          </div> */}
        </div>
      </div>


       {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Apply for {selectedJob?.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {!showSuccess ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverletter"
                      value={formData.coverletter}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us why you're perfect for this role..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h3>
                  <p className="text-gray-600">Thank you for your interest. We&apos;ll review your application and get back to you soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CareersDetailsPage
