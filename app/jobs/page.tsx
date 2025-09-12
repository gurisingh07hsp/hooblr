'use client'

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Menu, X } from 'lucide-react';
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
  // const router = useRouter();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
      {/* Main Content */}
      
      <main className="pt-16">
        <FindJobsPage jobs={mockJobs} initialCategory={searchParams || undefined} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 