'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Menu, 
  X,
  Download,
  Mail,
  Phone,
  Globe,
  FileText,
  Image as ImageIcon,
  Users,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';

export default function PressPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pressReleases = [
    {
      id: '1',
      title: 'Hooblr Launches Revolutionary AI-Powered Job Matching Platform',
      date: 'March 15, 2024',
      summary: 'Hooblr introduces advanced AI technology to revolutionize how people find jobs and companies find talent.',
      category: 'Product Launch'
    },
    {
      id: '2',
      title: 'Hooblr Reaches 50,000 Active Users Milestone',
      date: 'February 28, 2024',
      summary: 'Platform celebrates rapid growth and user adoption, helping thousands find meaningful career opportunities.',
      category: 'Company News'
    },
    {
      id: '3',
      title: 'Hooblr Partners with Leading Universities for Career Development',
      date: 'February 10, 2024',
      summary: 'Strategic partnerships established to provide students with enhanced career resources and job opportunities.',
      category: 'Partnerships'
    },
    {
      id: '4',
      title: 'Hooblr Secures $10M Series A Funding Round',
      date: 'January 25, 2024',
      summary: 'Investment will accelerate product development and expand market reach across the United States.',
      category: 'Funding'
    }
  ];

  const mediaAssets = [
    {
      name: 'Hooblr Logo',
      type: 'Logo',
      format: 'PNG, SVG',
      description: 'High-resolution Hooblr logo in various formats'
    },
    {
      name: 'Brand Guidelines',
      type: 'Document',
      format: 'PDF',
      description: 'Complete brand guidelines and style guide'
    },
    {
      name: 'Product Screenshots',
      type: 'Images',
      format: 'PNG, JPG',
      description: 'High-quality screenshots of the Hooblr platform'
    },
    {
      name: 'Team Photos',
      type: 'Images',
      format: 'JPG',
      description: 'Professional headshots of the Hooblr leadership team'
    }
  ];

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
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Press &amp; Media</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, press releases, and media resources from Hooblr. 
              For media inquiries, please contact our press team.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1K+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Jobs Posted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Press Releases */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <div key={release.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                        {release.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {release.date}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{release.summary}</p>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Read Full Release →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Media Kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaAssets.map((asset, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {asset.type === 'Logo' && <ImageIcon className="w-6 h-6 text-purple-600" />}
                    {asset.type === 'Document' && <FileText className="w-6 h-6 text-purple-600" />}
                    {asset.type === 'Images' && <ImageIcon className="w-6 h-6 text-purple-600" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{asset.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{asset.description}</p>
                  <p className="text-xs text-gray-500 mb-4">{asset.format}</p>
                  <button className="flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Company Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About Hooblr</h3>
                <p className="text-gray-600 mb-4">
                  Hooblr is a revolutionary career platform that connects talented professionals with meaningful opportunities. 
                  Founded in 2024, we&#39;re on a mission to democratize career opportunities and empower every individual 
                  to build fulfilling careers that align with their passions and potential.
                </p>
                <p className="text-gray-600">
                  Our AI-powered platform provides personalized job matching, comprehensive career resources, 
                  and innovative tools to help both job seekers and employers succeed in today&#39;s dynamic job market.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Founded: 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Headquarters: San Francisco, CA</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Industry: Career Technology</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Funding: $10M Series A</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Media Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-purple-100">press@hooblr.com</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-purple-100">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Website</h3>
                <p className="text-purple-100">www.hooblr.com</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-purple-100 mb-4">
                For media inquiries, interview requests, or press opportunities, 
                please contact our press team. We typically respond within 24 hours.
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold">
                Contact Press Team
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Subscribe to our press mailing list to receive the latest news, 
                press releases, and company updates directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 