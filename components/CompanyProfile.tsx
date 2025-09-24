// components/CompanyProfile.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { Award, Building2, MapPin, Users } from 'lucide-react';
import Image from 'next/image';

interface CompanyProfileData {
  _id?: string;
  name: string;
  companyemail: string;
  logo?: string;
  size: string;
  industry: string;
  website?: string;
  description?: string;
  location?: string;
}

const CompanyProfile = () => {
  const { user} = useUser();
  const [activeSection, setActiveSection] = useState('companies');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState<CompanyProfileData>({
    _id: '',
    name: '',
    companyemail: '',
    logo: '',
    size: '',
    industry: '',
    website: '',
    description: '',
    location: '',
  });

  const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Marketing',
    'Consulting',
    'Real Estate',
    'Transportation',
    'Other'
  ];

  useEffect(() => {
    if (activeSection == 'companies') {
      setProfileData({
        _id: '',
        name: '',
        companyemail: '',
        logo: '',
        size: '',
        industry: '',
        website: '',
        description: '',
        location: ''
      });
    }
  }, [activeSection]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hooblr");

    const res = await fetch("https://api.cloudinary.com/v1_1/dtjobqhxb/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setProfileData(prev => ({ ...prev, logo: data.secure_url }));
    console.log("Uploaded image:", data.secure_url);
  };


  const handleCompanyInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/profile`, {
          company: {
            name: profileData.name,
            companyemail: profileData.companyemail,
            logo: profileData.logo,
            size: profileData.size,
            industry: profileData.industry,
            website: profileData.website,
            description: profileData.description,
            location: profileData.location
          }, id: profileData._id
        }, {withCredentials:true});

      if (response.status == 200) {
        setMessage('Company profile updated successfully!');
        setProfileData({
        _id: '',
        name: '',
        companyemail: '',
        logo: '',
        size: '',
        industry: '',
        website: '',
        description: '',
        location: ''
      });
      } else {
        const errorData = await response.data
        setMessage(errorData.message || 'Failed to update company profile');
      }
    } catch (error) {
      setMessage('An error occurred while updating company profile');
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteCompnay = async(id: string) => {
    if (!confirm('Are you sure you want to delete this company? This action cannot be undo.')) {
      return;
    }
    try{
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/${id}`, {withCredentials:true});
      if(response.status == 200){
        setMessage(response.data.message);
      }
    }catch(error){
      console.error(error);
      setMessage("Failed to Delete Company");
    }
  }

  const handleEditCompany = async(company: CompanyProfileData) => {
    if (user) {
      setProfileData({
        _id: company._id,
        name: company.name || '',
        companyemail: company.companyemail || '',
        logo: company.logo || '',
        size: company.size || '',
        industry: company.industry || '',
        website: company?.website || '',
        description: company?.description || '',
        location: company.location || '',
      });
      setActiveSection('company');
    }
  }

  const sections = [
    { id: 'companies', name: 'Companies' },
    { id: 'company', name: 'Create & Update' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
        <p className="text-gray-600">Manage your company information and security settings.</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeSection === 'company' && (
            <form onSubmit={handleCompanyInfoSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="companyemail"
                    value={profileData.companyemail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Logo
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="companylogo"
                    onChange={handleUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size *
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={profileData.size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select company size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size} employees
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={profileData.industry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.yourcompany.com"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., New York, NY"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={profileData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your company, mission, and values..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}


          {activeSection === 'companies' && (
            <div className="space-y-6">
              {user?.companies && user?.companies?.length > 0 ? ( user?.companies?.map((company,index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-6 transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col lg:flex-row items-start space-x-4 flex-1">
                      {company.logo ? (
                        <img src={company.logo} alt='company logo' width={64} height={64} className='rounded-md'/>
                      ): (
                      <div className="w-16 hidden h-16 bg-[#9333E9] rounded-xl lg:flex items-center justify-center shadow-lg">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                            {company?.name}
                          </h3>
                        </div>
                        
                        <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-4 text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Award className="w-4 h-4 mr-1 text-purple-600" />
                            <span className="font-medium text-sm">{company?.industry}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-purple-600" />
                            <span className="font-medium text-sm">{company?.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-purple-600" />
                            <span className="font-medium text-sm">{company?.size} employees</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                          {company?.description}
                        </p>
                           <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCompany(company);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCompnay(company._id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))) : (
                <button onClick={()=> setActiveSection('company')} className='bg-purple-600 text-white rounded-lg p-2 mx-auto'>Create Company</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
