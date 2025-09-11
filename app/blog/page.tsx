'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import BlogPage from '@/components/BlogPage';
import Footer from '@/components/Footer';

// Mock blog posts data
const mockBlogPosts = [
  {
    id: '1',
    title: 'Interview Tips for 2024: Master the Art of Job Interviews',
    author: 'Sarah Johnson',
    category: 'Interview Tips',
    status: 'published' as const,
    published: '2024-01-15',
    views: 1247,
    likes: 89,
    content: '<h2>Mastering Job Interviews in 2024</h2><p>This comprehensive guide covers everything you need to know about acing job interviews in 2024. From preparation strategies to common questions and answers, we\'ve got you covered.</p><h3>Preparation is Key</h3><p>Start by researching the company thoroughly. Understand their mission, values, and recent news. This will help you tailor your responses and show genuine interest.</p><h3>Common Questions to Prepare For</h3><ul><li>Tell me about yourself</li><li>Why do you want to work here?</li><li>What are your strengths and weaknesses?</li><li>Where do you see yourself in 5 years?</li></ul>',
    excerpt: 'Master the art of job interviews with our comprehensive guide covering preparation strategies, common questions, and expert tips for 2024.',
    tags: ['interview', 'career', 'tips', '2024', 'preparation'],
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  },
  {
    id: '2',
    title: 'Remote Work Best Practices: Thriving in the Digital Workplace',
    author: 'Mike Chen',
    category: 'Workplace',
    status: 'published' as const,
    published: '2024-01-12',
    views: 892,
    likes: 67,
    content: '<h2>Thriving in Remote Work</h2><p>Learn the essential best practices for remote work success. From setting up your home office to maintaining work-life balance, discover how to thrive in a remote work environment.</p><h3>Setting Up Your Workspace</h3><p>Create a dedicated workspace that minimizes distractions and promotes productivity. Invest in ergonomic furniture and proper lighting.</p><h3>Maintaining Work-Life Balance</h3><p>Set clear boundaries between work and personal time. Use time-blocking techniques and take regular breaks to avoid burnout.</p>',
    excerpt: 'Discover essential strategies for remote work success, from home office setup to maintaining work-life balance.',
    tags: ['remote-work', 'workplace', 'productivity', 'work-life-balance'],
    featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
  },
  {
    id: '3',
    title: 'Government Job Application Guide: Your Complete Roadmap',
    author: 'Lisa Rodriguez',
    category: 'Government Jobs',
    status: 'published' as const,
    published: '2024-01-10',
    views: 567,
    likes: 34,
    content: '<h2>Navigating Government Job Applications</h2><p>A step-by-step guide to applying for government positions. Learn about the application process, required documents, and tips for standing out in government job applications.</p><h3>Understanding the Process</h3><p>Government job applications often have specific requirements and longer processing times. Be prepared for detailed forms and background checks.</p><h3>Required Documents</h3><ul><li>Resume tailored to government format</li><li>Cover letter addressing key qualifications</li><li>Transcripts and certifications</li><li>References and background information</li></ul>',
    excerpt: 'Navigate the government job application process with our step-by-step guide and expert tips.',
    tags: ['government', 'application', 'career', 'public-sector'],
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  },
  {
    id: '4',
    title: 'Salary Negotiation Strategies: Get the Compensation You Deserve',
    author: 'David Park',
    category: 'Career Growth',
    status: 'published' as const,
    published: '2024-01-08',
    views: 1234,
    likes: 156,
    content: '<h2>Getting the Salary You Deserve</h2><p>Master the art of salary negotiation with proven strategies that help you get the compensation you deserve without damaging relationships.</p><h3>Research and Preparation</h3><p>Before entering negotiations, research industry standards and company salary ranges. Know your worth and be prepared to articulate your value.</p><h3>Negotiation Techniques</h3><ul><li>Start with a higher anchor point</li><li>Focus on value, not just salary</li><li>Practice your pitch</li><li>Be prepared to walk away</li></ul>',
    excerpt: 'Master salary negotiation with proven strategies to get the compensation you deserve.',
    tags: ['salary', 'negotiation', 'career', 'compensation'],
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'
  },
  {
    id: '5',
    title: 'Building Your Professional Network in the Digital Age',
    author: 'Emily Thompson',
    category: 'Networking',
    status: 'published' as const,
    published: '2024-01-05',
    views: 789,
    likes: 89,
    content: '<h2>Networking in the Digital Age</h2><p>Networking has evolved beyond business cards and conferences. Learn how to build meaningful professional relationships online and offline.</p><h3>Online Networking</h3><p>Platforms like LinkedIn have revolutionized professional networking. Create a compelling profile and engage with industry leaders.</p><h3>Offline Networking</h3><p>Attend industry events, join professional associations, and participate in local meetups to expand your network.</p>',
    excerpt: 'Build meaningful professional relationships in the digital age with effective networking strategies.',
    tags: ['networking', 'linkedin', 'professional', 'relationships'],
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  }
];

export default function BlogPageRoute() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
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
                className="text-purple-600 font-medium"
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
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors w-full text-left font-medium"
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
                className="block px-3 py-2 text-purple-600 font-medium w-full text-left"
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
        <BlogPage posts={mockBlogPosts} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 