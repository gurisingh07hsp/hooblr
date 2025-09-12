'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Menu, 
  X,
  Target,
  Globe,
  Heart,
  Lightbulb,
  Users,
  Award,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';

export default function MissionPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize career opportunities and empower every individual to build meaningful, 
              fulfilling careers that align with their passions and potential.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission Statement</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Hooblr, we believe that every person deserves access to meaningful career opportunities. 
                Our mission is to break down barriers in the job market and create a platform where talent 
                meets opportunity in the most efficient, transparent, and human-centered way possible.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We&#39;re committed to building a future where career growth is accessible to everyone, 
                regardless of background, location, or experience level. Through innovative technology, 
                comprehensive resources, and unwavering dedication to our users, we&#39;re transforming how 
                people find and build their careers.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Vision</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Impact</h3>
                <p className="text-gray-600">
                  We envision a world where career opportunities are truly global, where talent knows no borders, 
                  and where every individual can contribute their unique skills to meaningful work.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation First</h3>
                <p className="text-gray-600">
                  We strive to be at the forefront of career technology, continuously innovating to provide 
                  the most effective tools and resources for career development and job matching.
                </p>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect 1M+ Professionals</h3>
                <p className="text-gray-600 text-sm">
                  Help over a million professionals find their dream jobs by 2025.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">95% Success Rate</h3>
                <p className="text-gray-600 text-sm">
                  Achieve a 95% job placement success rate for our users.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Career Platform</h3>
                <p className="text-gray-600 text-sm">
                  Become the leading career development platform globally.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Drives Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Empathy</h3>
                <p className="text-gray-600 text-sm">
                  We understand the challenges of career transitions and build solutions with real people in mind.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  We constantly push boundaries to create better, more effective career solutions.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">
                  We strive for excellence in everything we do, from user experience to customer support.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inclusivity</h3>
                <p className="text-gray-600 text-sm">
                  We believe in creating opportunities for people from all backgrounds and experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-purple-100">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1K+</div>
                <div className="text-purple-100">Companies Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">90%</div>
                <div className="text-purple-100">User Satisfaction</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Whether you&#39;re looking for your next opportunity or seeking to hire great talent, 
                we&#39;re here to help you succeed in your career journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/jobs')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold"
                >
                  Find Your Next Job
                </button>
                <button
                  onClick={() => router.push('/about')}
                  className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold"
                >
                  Learn More About Us
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