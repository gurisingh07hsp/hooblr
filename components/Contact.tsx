'use client';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import { 
  Mail,
  // Phone,
  // MapPin,
  // Clock,
  Send,
  MessageSquare,
  HelpCircle,
  FileText
} from 'lucide-react';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">

      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions, feedback, or need support? We&apos;re here to help. 
              Reach out to our team and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Job Posting">Job Posting</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Press Inquiry">Press Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* General Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">support@hooblr.com</p>
                    </div>
                  </div>
                  {/* <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div> */}
                  {/* <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">123 Innovation Drive<br />San Francisco, CA 94105</p>
                    </div>
                  </div> */}
                  {/* <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9AM - 6PM PST</p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Quick Support */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Support</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                    <HelpCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Help Center</p>
                      <p className="text-sm text-gray-600">Find answers to common questions</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                    <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">Chat with our support team</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                    <FileText className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Documentation</p>
                      <p className="text-sm text-gray-600">Browse our guides and tutorials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I create an account?</h3>
                <p className="text-gray-600">
                  You can create an account by clicking the &quot;Sign Up&quot; button in the top navigation. 
                  Simply provide your email address and create a password to get started.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I post a job?</h3>
                <p className="text-gray-600">
                  To post a job, you&apos;ll need to create a company account first. Once approved, 
                  you can post unlimited jobs through our easy-to-use job posting interface.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What are the pricing plans?</h3>
                <p className="text-gray-600">
                  We offer various pricing plans for job posters, from basic to enterprise. 
                  Contact our sales team for detailed pricing information and custom solutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I reset my password?</h3>
                <p className="text-gray-600">
                  Click on &quot;Forgot Password&quot; on the login page and enter your email address. 
                  We&apos;ll send you a link to reset your password securely.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help you 
                with any questions or concerns you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold">
                  Start Live Chat
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact
