'use client'

import React from 'react';
import { 
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
    <footer className="bg-white text-black">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Image src='/hooblrlogo.png' width={120} height={50} alt='logo'/>
            <p className="text-black mt-2 mb-6 leading-relaxed">
              The most trusted platform for government careers. Connect with thousands of opportunities 
              across federal, state, and local government agencies with Hooblr.
            </p>
            <div className="flex space-x-4 text-white">
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
              <li><a href="/jobs" className="text-black hover:text-[#8A38EE] transition-colors">Browse Jobs</a></li>
              <li><a href="/" className="text-black hover:text-[#8A38EE] transition-colors">Create Profile</a></li>
              <li><a href="/resources" className="text-black hover:text-[#8A38EE] transition-colors">Career Resources</a></li>
              <li><a href="/resume-builder" className="text-black hover:text-[#8A38EE] transition-colors">Resume Builder</a></li>
              <li><a href="/interview-tips" className="text-black hover:text-[#8A38EE] transition-colors">Interview Tips</a></li>
              <li><a href="/resources" className="text-black hover:text-[#8A38EE] transition-colors">Salary Guide</a></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Employers</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-black hover:text-[#8A38EE] transition-colors">Post a Job</a></li>
              <li><a href="/companies" className="text-black hover:text-[#8A38EE] transition-colors">Browse Candidates</a></li>
              <li><a href="/admin" className="text-black hover:text-[#8A38EE] transition-colors">Recruitment Tools</a></li>
              <li><a href="/" className="text-black hover:text-[#8A38EE] transition-colors">Pricing Plans</a></li>
              <li><a href="/blog" className="text-black hover:text-[#8A38EE] transition-colors">Success Stories</a></li>
              <li><a href="/" className="text-black hover:text-[#8A38EE] transition-colors">Partner Program</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-black hover:text-[#8A38EE] transition-colors">About Us</a></li>
              <li><a href="/mission" className="text-black hover:text-[#8A38EE] transition-colors">Our Mission</a></li>
              <li><a href="/careers" className="text-black hover:text-[#8A38EE] transition-colors">Careers</a></li>
              <li><a href="/press" className="text-black hover:text-[#8A38EE] transition-colors">Press & Media</a></li>
              <li><a href="/blog" className="text-black hover:text-[#8A38EE] transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-black hover:text-[#8A38EE] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-[#8A38EE]">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex justify-center items-center">
              <Mail className="w-5 h-5 text-[#8A38EE] mr-3" />
              <button className="text-[#8A38EE]">support@hooblr.com</button>
            </div>
            {/* <div className="flex items-center">
              <Phone className="w-5 h-5 text-[#8A38EE] mr-3" />
              <span className="text-[#8A38EE]">1-800-HOOBLR</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-[#8A38EE] mr-3" />
              <span className="text-[#8A38EE]">Washington, DC</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-purple-800 border-t border-[#8A38EE]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center space-x-6 text-sm text-purple-200">
              <span>&copy; 2025 Hooblr. All rights reserved.</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
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