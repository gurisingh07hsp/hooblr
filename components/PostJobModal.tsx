'use client'

import React, {useState } from 'react';
import { X, Building2, MapPin, Clock, DollarSign, Users, FileText, Tag } from 'lucide-react';
import axios from 'axios';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: () => void;
}

export default function PostJobModal({ isOpen, onClose, }: PostJobModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: '',
    location: '',
    type: 'Full-time',
    workplaceType: 'Remote',
    experience: 'Mid-level',
    salary: {
      min: '10000',
      max: '20000',
      currency: 'USD',
      type: 'yearly'
    },
    description: '',
    responsibilities: '',
    requirements: '',
    skills: [''],
    education: '',
    isGovernment: false,
    benefits: [''],
    applicationDeadline: '',
    contactEmail: '',
    department: '',
    jobType: '',
    urgentHiring: false,
    promoted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('salary.')) {
      const salaryField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value
        }
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }else if (name === "skills") {
      // Convert comma-separated string to array
      const arr = value.split(",").map((s) => s.trim()).filter(Boolean);
      setFormData((prev) => ({
        ...prev,
        skills: arr,
      }));
    }else if (name === "benefits") {
      // Convert comma-separated string to array
      const arr = value.split(",").map((s) => s.trim()).filter(Boolean);
      setFormData((prev) => ({
        ...prev,
        benefits: arr,
      }));
    }else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // console.log("job : ", formData);
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/`, formData, {withCredentials: true});
      if(response.status === 200){
        onClose();
        // Reset form
        setFormData({
          title: '',
          company: '',
          category: '',
          location: '',
          type: 'Full-time',
          workplaceType: 'Remote',
          experience: 'Mid-level',
          salary: {
            min: '',
            max: '',
            currency: 'USD',
            type: 'yearly'
          },
          description: '',
          responsibilities: '',
          requirements: '',
          skills: [],
          education: '',
          isGovernment: false,
          benefits: [],
          applicationDeadline: '',
          contactEmail: '',
          department: '',
          jobType: 'permanent',
          urgentHiring: false,
          promoted: false
        });
      }
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Post a New Job</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-2" />
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. Tech Solutions Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. New York, NY or Remote"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Job Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select job category</option>
                <option value="Technology & IT">Technology & IT</option>
                <option value="Government & Public Sector">Government & Public Sector</option>
                <option value="Healthcare & Medical">Healthcare & Medical</option>
                <option value="Finance & Banking">Finance & Banking</option>
                <option value="Education & Training">Education & Training</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Legal & Compliance">Legal & Compliance</option>
                <option value="Operations & Management">Operations & Management</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Design & Creative">Design & Creative</option>
                <option value="Research & Development">Research & Development</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Transportation & Logistics">Transportation & Logistics</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Media & Communications">Media & Communications</option>
                <option value="Non-Profit & NGO">Non-Profit & NGO</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>
          </div>

          {/* Job Type and Work Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Work Type *
              </label>
              <select
                name="workType"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workplace Type *
              </label>
              <select
                name="workplaceType"
                value={formData.workplaceType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Experience Level *
              </label>
              <select
                name="experienceLevel"
                value={formData.experience}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior-level">Senior-level</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>

          {/* Salary Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Salary Range
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="number"
                name="salary.min"
                value={formData.salary.min}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Min salary"
              />
              <input
                type="number"
                name="salary.max"
                value={formData.salary.max}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Max salary"
              />
              <select
                name="salary.currency"
                value={formData.salary.currency}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
              <select
                name="salary.type"
                value={formData.salary.type}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="yearly">Per Year</option>
                <option value="monthly">Per Month</option>
                <option value="hourly">Per Hour</option>
              </select>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide a detailed description of the role, company culture, and what makes this opportunity unique..."
            />
          </div>

            <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Requirements *
    </label>
    <textarea
      name="requirements"
      value={formData.requirements}
      onChange={handleInputChange}
      required
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="List required skills, qualifications..."
    />
  </div>

  {/* Responsibilities */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Responsibilities *
    </label>
    <textarea
      name="responsibilities"
      value={formData.responsibilities}
      onChange={handleInputChange}
      required
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="List job responsibilities..."
    />
  </div>

  {/* Department */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Department *
    </label>
    <input
      type="text"
      name="department"
      value={formData.department}
      onChange={handleInputChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="e.g. Engineering, Marketing"
    />
  </div>

  {/* Benefits */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Benefits
    </label>
    <input
      type="text"
      name="benefits"
      // value={formData.benefits}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Comma-separated (e.g. Health insurance, Paid time off)"
    />
  </div>

  {/* Skills */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Skills
    </label>
    <input
      type="text"
      name="skills"
      // value={formData.skills}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Comma-separated (e.g. JavaScript, React, Node.js)"
    />
  </div>

  {/* Education */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Education *
    </label>
    <select
      name="education"
      value={formData.education}
      onChange={handleInputChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      <option value="high-school">High School</option>
      <option value="associate">Associate</option>
      <option value="bachelor">Bachelor</option>
      <option value="master">Master</option>
      <option value="phd">PhD</option>
    </select>
  </div>

  {/* Application Deadline */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Application Deadline
    </label>
    <input
      type="date"
      name="applicationDeadline"
      value={formData.applicationDeadline}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Tags */}
  {/* <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Tags
    </label>
    <input
      type="text"
      name="tags"
      value={formData.tags}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Comma-separated (e.g. urgent, remote, AI)"
    />
  </div> */}

  {/* Remote & Government */}
  <div className="flex space-x-4">
    {/* <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="isRemote"
        checked={formData.isRemote}
        onChange={handleInputChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <span>Remote</span>
    </label> */}
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="isGovernment"
        checked={formData.isGovernment}
        onChange={handleInputChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <span>Government</span>
    </label>
  </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="hr@company.com"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}