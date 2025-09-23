'use client'

import React from 'react';
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp,
  Heart
} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Hooblr</span>
            </div> */}
            <Image src='/hooblrlogo.png' width={120} height={50} alt='logo'/>
            <p className="text-purple-100 mt-2 mb-6 leading-relaxed">
              The most trusted platform for government careers. Connect with thousands of opportunities 
              across federal, state, and local government agencies with Hooblr.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Job Seekers</h3>
            <ul className="space-y-3">
              <li><a href="/jobs" className="text-purple-100 hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="/" className="text-purple-100 hover:text-white transition-colors">Create Profile</a></li>
              <li><a href="/resources" className="text-purple-100 hover:text-white transition-colors">Career Resources</a></li>
              <li><a href="/resume-builder" className="text-purple-100 hover:text-white transition-colors">Resume Builder</a></li>
              <li><a href="/interview-tips" className="text-purple-100 hover:text-white transition-colors">Interview Tips</a></li>
              <li><a href="/resources" className="text-purple-100 hover:text-white transition-colors">Salary Guide</a></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Employers</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-purple-100 hover:text-white transition-colors">Post a Job</a></li>
              <li><a href="/companies" className="text-purple-100 hover:text-white transition-colors">Browse Candidates</a></li>
              <li><a href="/admin" className="text-purple-100 hover:text-white transition-colors">Recruitment Tools</a></li>
              <li><a href="/" className="text-purple-100 hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="/blog" className="text-purple-100 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="/" className="text-purple-100 hover:text-white transition-colors">Partner Program</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-purple-100 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/mission" className="text-purple-100 hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="/careers" className="text-purple-100 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/press" className="text-purple-100 hover:text-white transition-colors">Press & Media</a></li>
              <li><a href="/blog" className="text-purple-100 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-purple-100 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-purple-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-purple-100">support@hooblr.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-purple-100">1-800-HOOBLR</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-purple-100">Washington, DC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-purple-900 border-t border-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 text-sm text-purple-200">
              <span>&copy; 2024 Hooblr. All rights reserved.</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-sm text-purple-200 mr-2">Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-purple-200 ml-2">for public service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#9333E9] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        <ArrowUp className="w-5 h-5 group-hover:transform group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer; 