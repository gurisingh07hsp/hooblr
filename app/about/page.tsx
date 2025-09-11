'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Menu, 
  X,
  Users,
  Target,
  Award,
  Globe,
  Heart,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About Hooblr</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&#39;re revolutionizing the way people find jobs and companies find talent. 
              Our platform connects ambitious professionals with opportunities that matter.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Job Seekers</div>
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

          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  Founded in 2024, Hooblr emerged from a simple observation: the job market was broken. 
                  Traditional job boards were cluttered, impersonal, and inefficient for both job seekers and employers.
                </p>
                <p className="text-gray-600 mb-4">
                  We set out to create a platform that would not only connect people with opportunities 
                  but also provide the tools and resources they need to succeed in their careers.
                </p>
                <p className="text-gray-600">
                  Today, Hooblr is more than just a job board. We&#39;re a comprehensive career platform 
                  that empowers professionals to build meaningful careers and helps companies find the perfect talent.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Hooblr?</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">AI-powered job matching</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Comprehensive career resources</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Personalized experience</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Dedicated support team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">People First</h3>
                <p className="text-gray-600">
                  We believe that every person deserves to find meaningful work that aligns with their passions and goals.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously innovate to provide the best tools and resources for career development.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Inclusivity</h3>
                <p className="text-gray-600">
                  We&#39;re committed to creating opportunities for people from all backgrounds and experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
                <p className="text-purple-600 font-medium mb-2">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Former HR executive with 15+ years of experience in talent acquisition and career development.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Chen</h3>
                <p className="text-purple-600 font-medium mb-2">CTO</p>
                <p className="text-gray-600 text-sm">
                  Tech leader with expertise in AI, machine learning, and scalable platform development.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emily Rodriguez</h3>
                <p className="text-purple-600 font-medium mb-2">Head of Product</p>
                <p className="text-gray-600 text-sm">
                  Product strategist focused on creating intuitive and effective career development tools.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Whether you&#39;re looking for your next opportunity or seeking to hire great talent, 
                we&#39;re here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/jobs')}
                  className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold"
                >
                  Find Your Next Job
                </button>
                <button
                  onClick={() => router.push('/contact')}
                  className="border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold"
                >
                  Get in Touch
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