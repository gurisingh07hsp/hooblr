'use client'

import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Building2, 
  Users, 
  Briefcase, 
  ArrowRight,
  Shield,
  FileText,
  GraduationCap,
  Heart,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface State {
  name: string;
  code: string;
  jobCount: number;
  departments: string[];
}

const indianStates: State[] = [
  { name: 'Andhra Pradesh', code: 'AP', jobCount: 1250, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Arunachal Pradesh', code: 'AR', jobCount: 320, departments: ['Education', 'Healthcare'] },
  { name: 'Assam', code: 'AS', jobCount: 890, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Bihar', code: 'BR', jobCount: 2100, departments: ['Education', 'Healthcare', 'Administration', 'Police'] },
  { name: 'Chhattisgarh', code: 'CG', jobCount: 750, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Goa', code: 'GA', jobCount: 280, departments: ['Education', 'Healthcare', 'Tourism'] },
  { name: 'Gujarat', code: 'GJ', jobCount: 1800, departments: ['Education', 'Healthcare', 'Administration', 'Industry'] },
  { name: 'Haryana', code: 'HR', jobCount: 950, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Himachal Pradesh', code: 'HP', jobCount: 420, departments: ['Education', 'Healthcare', 'Tourism'] },
  { name: 'Jharkhand', code: 'JH', jobCount: 680, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Karnataka', code: 'KA', jobCount: 1600, departments: ['Education', 'Healthcare', 'Administration', 'IT'] },
  { name: 'Kerala', code: 'KL', jobCount: 1200, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Madhya Pradesh', code: 'MP', jobCount: 1400, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Maharashtra', code: 'MH', jobCount: 2800, departments: ['Education', 'Healthcare', 'Administration', 'Finance', 'Banking', 'Engineering'] },
  { name: 'Manipur', code: 'MN', jobCount: 350, departments: ['Education', 'Healthcare'] },
  { name: 'Meghalaya', code: 'ML', jobCount: 280, departments: ['Education', 'Healthcare'] },
  { name: 'Mizoram', code: 'MZ', jobCount: 220, departments: ['Education', 'Healthcare'] },
  { name: 'Nagaland', code: 'NL', jobCount: 180, departments: ['Education', 'Healthcare'] },
  { name: 'Odisha', code: 'OD', jobCount: 1100, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Punjab', code: 'PB', jobCount: 850, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Rajasthan', code: 'RJ', jobCount: 1300, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Sikkim', code: 'SK', jobCount: 150, departments: ['Education', 'Healthcare'] },
  { name: 'Tamil Nadu', code: 'TN', jobCount: 1900, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Telangana', code: 'TS', jobCount: 1100, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Tripura', code: 'TR', jobCount: 320, departments: ['Education', 'Healthcare'] },
  { name: 'Uttar Pradesh', code: 'UP', jobCount: 3500, departments: ['Education', 'Healthcare', 'Administration', 'Police', 'Teaching', 'Railway'] },
  { name: 'Uttarakhand', code: 'UK', jobCount: 480, departments: ['Education', 'Healthcare', 'Tourism'] },
  { name: 'West Bengal', code: 'WB', jobCount: 1800, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Delhi', code: 'DL', jobCount: 1200, departments: ['Education', 'Healthcare', 'Administration', 'Police', 'Banking', 'Railway'] },
  { name: 'Jammu & Kashmir', code: 'JK', jobCount: 650, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Ladakh', code: 'LA', jobCount: 120, departments: ['Education', 'Healthcare'] },
  { name: 'Chandigarh', code: 'CH', jobCount: 280, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Dadra & Nagar Haveli', code: 'DN', jobCount: 85, departments: ['Education', 'Healthcare'] },
  { name: 'Daman & Diu', code: 'DD', jobCount: 65, departments: ['Education', 'Healthcare'] },
  { name: 'Lakshadweep', code: 'LD', jobCount: 45, departments: ['Education', 'Healthcare'] },
  { name: 'Puducherry', code: 'PY', jobCount: 180, departments: ['Education', 'Healthcare', 'Administration'] },
  { name: 'Andaman & Nicobar', code: 'AN', jobCount: 95, departments: ['Education', 'Healthcare'] }
];

export default function GovernmentJobsPage() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const filteredStates = indianStates.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const departments = [
    'Education', 'Healthcare', 'Administration', 'Police', 
    'Finance', 'IT', 'Industry', 'Tourism', 'Banking',
    'Engineering', 'Railway', 'Defence', 'Teaching'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Hooblr</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">Find Jobs</Link>
              <Link href="/companies" className="text-gray-600 hover:text-gray-900 transition-colors">Companies</Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">Admin</Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
              <Link href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Government Jobs in India
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of government job opportunities across all states and union territories of India. 
            Find your perfect role in public service and contribute to nation building.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">36</div>
            <div className="text-sm text-gray-600">States & UTs</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">25,000+</div>
            <div className="text-sm text-gray-600">Active Jobs</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Select Your State
          </h2>
          
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Department:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDepartment('')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDepartment === '' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Departments
              </button>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDepartment === dept 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* States Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStates
              .filter(state => 
                selectedDepartment === '' || 
                state.departments.includes(selectedDepartment)
              )
              .map((state) => (
                <div
                  key={state.code}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedState === state.code
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedState(state.code)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{state.name}</h3>
                      <p className="text-sm text-gray-600">{state.jobCount.toLocaleString()} jobs</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {state.departments.slice(0, 3).map(dept => (
                      <span
                        key={dept}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {dept}
                      </span>
                    ))}
                    {state.departments.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{state.departments.length - 3}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                    <span>View Jobs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Job Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Government Job Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
              State Govt Jobs
            </button>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
              Bank Jobs
            </button>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
              Teaching Jobs
            </button>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
              Engineering Jobs
            </button>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
              Railway Jobs
            </button>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
              Police/Defence Jobs
            </button>
          </div>
        </div>

        {/* Featured Departments */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
              <p className="text-gray-600 text-sm mb-4">Teaching, administration, research positions</p>
              <div className="text-2xl font-bold text-blue-600">8,500+</div>
              <div className="text-sm text-gray-500">Active Jobs</div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare</h3>
              <p className="text-gray-600 text-sm mb-4">Medical, nursing, public health roles</p>
              <div className="text-2xl font-bold text-green-600">6,200+</div>
              <div className="text-sm text-gray-500">Active Jobs</div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Administration</h3>
              <p className="text-gray-600 text-sm mb-4">Office management, clerical positions</p>
              <div className="text-2xl font-bold text-purple-600">5,800+</div>
              <div className="text-sm text-gray-500">Active Jobs</div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Police</h3>
              <p className="text-gray-600 text-sm mb-4">Law enforcement, security positions</p>
              <div className="text-2xl font-bold text-red-600">3,500+</div>
              <div className="text-sm text-gray-500">Active Jobs</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your State</h3>
              <p className="text-gray-600">Choose your preferred state or union territory from our comprehensive list</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Jobs</h3>
              <p className="text-gray-600">Explore available positions in your selected state and department</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply & Get Hired</h3>
              <p className="text-gray-600">Submit your application and start your government career journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 