'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import FindJobsPage from '@/components/FindJobsPage';
import Footer from '@/components/Footer';

// Mock data for jobs
const mockJobs = [
  // Law Enforcement Jobs
  {
    id: 1,
    title: "Police Officer",
    company: "City Police Department",
    location: "New York, NY",
    type: "Full-time",
    salary: "$65,000 - $85,000",
    description: "Serve and protect the community by maintaining law and order. Respond to emergency calls and conduct investigations.",
    requirements: ["High school diploma", "Physical fitness", "Clean background", "Police academy training"],
    benefits: ["Health Insurance", "Pension", "Job Security", "Professional Development"],
    posted: "1 day ago",
    category: "Law Enforcement",
    featured: true,
    urgent: true
  },
  {
    id: 2,
    title: "FBI Special Agent",
    company: "Federal Bureau of Investigation",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$85,000 - $120,000",
    description: "Conduct federal investigations and enforce federal laws. Work on high-profile cases and national security matters.",
    requirements: ["Bachelor's degree", "Physical fitness", "Security clearance", "Law enforcement experience"],
    benefits: ["Federal Benefits", "Pension", "Job Security", "Travel Opportunities"],
    posted: "3 days ago",
    category: "Law Enforcement",
    featured: true,
    urgent: false
  },
  
  // Administration Jobs
  {
    id: 3,
    title: "Administrative Assistant",
    company: "Department of Transportation",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$45,000 - $60,000",
    description: "Provide administrative support to department managers. Handle correspondence, scheduling, and office management.",
    requirements: ["High school diploma", "Office experience", "Microsoft Office skills", "Communication skills"],
    benefits: ["Federal Benefits", "Health Insurance", "Pension", "Professional Development"],
    posted: "2 days ago",
    category: "Administration",
    featured: false,
    urgent: false
  },
  {
    id: 4,
    title: "Office Manager",
    company: "State Government",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$55,000 - $75,000",
    description: "Manage daily office operations and supervise administrative staff. Coordinate with various departments.",
    requirements: ["Bachelor's degree", "Management experience", "Organizational skills", "Leadership abilities"],
    benefits: ["Health Insurance", "Pension", "Professional Development", "Flexible Hours"],
    posted: "1 week ago",
    category: "Administration",
    featured: true,
    urgent: false
  },
  
  // Healthcare Jobs
  {
    id: 5,
    title: "Registered Nurse",
    company: "Veterans Affairs Hospital",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$70,000 - $95,000",
    description: "Provide patient care in a federal healthcare facility. Work with veterans and their families.",
    requirements: ["RN license", "Bachelor's degree", "Clinical experience", "Patient care skills"],
    benefits: ["Federal Benefits", "Health Insurance", "Pension", "Professional Development"],
    posted: "1 day ago",
    category: "Healthcare",
    featured: true,
    urgent: true
  },
  {
    id: 6,
    title: "Public Health Specialist",
    company: "Centers for Disease Control",
    location: "Atlanta, GA",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    description: "Develop and implement public health programs. Conduct research and provide health education.",
    requirements: ["Master's degree", "Public health experience", "Research skills", "Communication abilities"],
    benefits: ["Federal Benefits", "Health Insurance", "Pension", "Research Opportunities"],
    posted: "2 days ago",
    category: "Healthcare",
    featured: true,
    urgent: false
  },
  
  // Education Jobs
  {
    id: 7,
    title: "High School Teacher",
    company: "Public School District",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$50,000 - $75,000",
    description: "Teach high school students in a public school setting. Develop curriculum and assess student progress.",
    requirements: ["Teaching certification", "Bachelor's degree", "Subject expertise", "Classroom management"],
    benefits: ["Health Insurance", "Pension", "Summer breaks", "Professional Development"],
    posted: "3 days ago",
    category: "Education",
    featured: false,
    urgent: false
  },
  {
    id: 8,
    title: "Education Administrator",
    company: "Department of Education",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    description: "Manage educational programs and policies at the federal level. Oversee educational initiatives.",
    requirements: ["Master's degree", "Administrative experience", "Policy knowledge", "Leadership skills"],
    benefits: ["Federal Benefits", "Health Insurance", "Pension", "Policy Impact"],
    posted: "1 week ago",
    category: "Education",
    featured: true,
    urgent: false
  },
  
  // Government Jobs (General)
  {
    id: 9,
    title: "Government Policy Analyst",
    company: "Department of Health",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$75,000 - $95,000",
    description: "Analyze and develop policies related to public health initiatives. Work with cross-functional teams.",
    requirements: ["Master's degree", "Policy analysis experience", "Government experience", "Research skills"],
    benefits: ["Federal Benefits", "Pension", "Job Security", "Professional Development"],
    posted: "1 day ago",
    category: "Government Jobs",
    featured: true,
    urgent: true
  },
  {
    id: 10,
    title: "Federal Program Manager",
    company: "Department of Transportation",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    description: "Manage federal transportation programs and oversee project implementation. Coordinate with state agencies.",
    requirements: ["Bachelor's degree", "Project management experience", "Government experience", "Leadership skills"],
    benefits: ["Federal Benefits", "Health Insurance", "Pension", "Travel Opportunities"],
    posted: "2 days ago",
    category: "Government Jobs",
    featured: true,
    urgent: false
  }
];

export default function JobsPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get category from URL parameters
  const [searchParams] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('category');
    }
    return null;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-purple-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">Hooblr</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push('/jobs')}
                className="text-purple-600 font-medium"
              >
                Find Jobs
              </button>
              <button
                onClick={() => router.push('/companies')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
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
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/admin')}
                  className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                >
                  Admin
                </button>
                <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Login</button>
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg">Sign Up</button>
              </div>
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
                className="block px-3 py-2 text-purple-600 font-medium w-full text-left"
              >
                Find Jobs
              </button>
              <button
                onClick={() => {
                  router.push('/companies');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
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
                  router.push('/admin');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-red-600 hover:text-red-700 transition-colors w-full text-left font-medium"
              >
                Admin
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <FindJobsPage jobs={mockJobs} initialCategory={searchParams || undefined} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 