'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, ArrowLeft, X, Save, Plus, Eye, Edit, Trash2, Building, Briefcase, Users, Settings, BarChart3, FileText, Menu, Search, BriefcaseBusiness } from 'lucide-react';
import BlogPostEditor from '../../components/BlogPostEditor';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
});

import 'react-quill/dist/quill.snow.css';
import { categories } from '@/types/utils';

// Enhanced interfaces
interface Company {
  _id: string;
  name: string;
  companyemail: string;
  companyowner: {
    _id: string;
    profile?: {
      name: string;
    };
  };
  size: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
  industry: string;
  website?: string;
  description?: string;
  logo?: string;
  location: string;
  createdAt: string;
  jobs?: any[];
}

interface Job {
  _id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
  category: string;
  department: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  benefits: string[];
  skills: string[];
  experience: 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Executive';
  education: 'high-school' | 'associate' | 'bachelor' | 'master' | 'phd';
  status: 'active' | 'paused' | 'closed' | 'draft';
  isRemote: boolean;
  isGovernment: boolean;
  applicationDeadline?: string;
  views: number;
  applications: any[];
  tags: string[];
  featured: boolean;
  urgent: boolean;
  createdAt: string;
}

interface BlogPost {
  _id?: string;
  title: string;
  slug?: string;
  author?: string;
  content: string;
  excerpt: string;
  category: 'Interview Tips' | 'Workplace' | 'Government Jobs' | 'Career Growth' | 'Networking' | 'Salary Guide' | 'Resume Tips' | 'Industry News' | string;
  tags: string[];
  featuredImage: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  featured?: boolean;
  readTime?: number;
  createdAt?: string;
}

interface User {
  _id: string;
  email: string;
  authProvider: 'credentials' | 'google';
  role: 'user' | 'admin';
  profile?: {
    name?: string;
    phone?: string;
    location?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    resume?: string;
    avatar?: string;
  };
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  preferences: {
    jobAlerts: boolean;
    emailNotifications: boolean;
  };
  savedJobs: string[];
  jobAlerts: any[];
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, logout } = useUser();
  
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data states
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [govtJobs, setGovtJobs] = useState<any[]>([]);
  const [careerJobs, setCareerJobs] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);



    // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'blockquote', 'code-block'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'color', 'background', 'align',
    'link', 'image', 'blockquote', 'code-block'
  ];

  
  // Modal states
  const [modalState, setModalState] = useState({
    type: null as 'company' | 'job' | 'govtjob' | 'careerjob' | 'blog' | 'user' | null,
    mode: null as 'create' | 'edit' | 'view' | null,
    isOpen: false,
    data: null as any
  });

  // Blog editor states
  const [blogEditorState, setBlogEditorState] = useState({
    isOpen: false,
    mode: 'create' as 'create' | 'edit',
    post: null as BlogPost | null
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'companies', label: 'Companies', icon: Building },
    { id: 'jobs', label: 'Jobs', icon: BriefcaseBusiness },
    { id: 'govtjobs', label: 'Govt Jobs', icon: Briefcase},
    { id: 'careerjobs', label: 'Career Jobs', icon: Briefcase},
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    if (user?.role === 'admin') {
      setIsAuthenticated(true);
      fetchData();
    } else if (user?.role === 'user') {
      router.push('/');
    }
  }, [user, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCompanies(),
        fetchJobs(),
        fetchGovtJobs(),
        fetchCareerJobs(),
        fetchBlogPosts(),
        // fetchUsers()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies`);
      const data = await response.data
      setCompanies(data.companies || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      // Mock data for development
      setCompanies([
        {
          _id: '1',
          name: 'TechCorp Inc.',
          companyemail: 'contact@techcorp.com',
          companyowner: { _id: '1', profile: { name: 'John Smith' } },
          size: '201-500',
          industry: 'Technology',
          website: 'https://techcorp.com',
          description: 'Leading technology company',
          location: 'San Francisco, CA',
          createdAt: '2024-01-15T00:00:00Z'
        }
      ]);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/jobs`, {withCredentials:true});
      const data = await response.data  ;
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  const fetchGovtJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs/`);
      const data = await response.data  ;
      setGovtJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  const fetchCareerJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/careerjobs/`);
      const data = await response.data  ;
      setCareerJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog`, {withCredentials:true});
      if(response.status == 200){
        console.log("blogs: ", response.data);
        const data = response.data;
        setBlogPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch('/api/admin/users');
  //     const data = await response.json();
  //     setUsers(data.users || []);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  useEffect(()=>{
    fetchBlogPosts();
  },[setBlogEditorState])

  const openModal = (type: 'company' | 'job' | 'govtjob' | 'careerjob' | 'blog' | 'user', mode: 'create' | 'edit' | 'view', data?: any) => {
    setModalState({ type, mode, isOpen: true, data });
  };

  const closeModal = () => {
    setModalState({ type: null, mode: null, isOpen: false, data: null });
  };

  const handleSave = async (data: any) => {
    try {
      setLoading(true);
      const { type, mode } = modalState;
      
      if (type === 'company') {
        if (mode === 'create') {
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/profile`, {company: data}, {withCredentials:true});
          if (response.status === 200) {
            setCompanies(prev => [...prev, response.data.updatedCompany]);
            closeModal();
          }
        } else if (mode === 'edit') {
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/profile`, {company: data, id: data._id}, {withCredentials: true});
          if (response.status === 200) {
            fetchCompanies();
            closeModal();
          }
        }
      } else if (type === 'job') {
        if (mode === 'create') {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/`, data, {withCredentials: true} );
          if(response.status === 200){
            fetchJobs();
            closeModal();
          }
          
        } else if (mode === 'edit') {
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/${data._id}`, data, {withCredentials: true});
          if (response.status === 200) {
            setJobs(prev => prev.map(j => j._id === data._id ? response.data.job : j));
            closeModal();
          }
        }
      } else if(type === 'govtjob'){
        if(mode === 'create'){
           const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs/`, data, {withCredentials: true});
          if(response.status === 200){
            fetchGovtJobs();
            closeModal();
          }
        } else if(mode === 'edit'){
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs/${data._id}`, data, {withCredentials: true});
          if (response.status === 200) {
            setGovtJobs(prev => prev.map(j => j._id === data._id ? response.data.job : j));
            closeModal();
          }
        }
      } else if(type === 'careerjob'){
        if(mode === 'create'){
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/careerjobs/`, data, {withCredentials: true});
          if(response.status === 200){
            fetchCareerJobs();
            closeModal();
          }
        } else if(mode === 'edit'){
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/careerjobs/${data._id}`, data, {withCredentials: true});
          if (response.status === 200) {
            setCareerJobs(prev => prev.map(j => j._id === data._id ? response.data.job : j));
            closeModal();
          }
        }
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setLoading(true);
      
      if (type === 'company') {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/${id}`, {withCredentials:true});
        if (response.status === 200) {
          fetchCompanies();
        }
      } else if (type === 'job') {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/${id}`, {withCredentials:true});
        if(response.status === 200){
          setJobs(prev => prev.filter(j => j._id !== id));
        }
      } else if (type === 'govtjob') {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs/${id}`, {withCredentials:true});
        if(response.status === 200){
          setGovtJobs(prev => prev.filter(j => j._id !== id));
        }
      } else if (type === 'careerjob') {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/careerjobs/${id}`, {withCredentials:true});
        if(response.status === 200){
          setCareerJobs(prev => prev.filter(j => j._id !== id));
        }
      } else if (type === 'blog-post') {
         const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`, {withCredentials:true});
         if(response.status == 200){
           setBlogPosts(prev => prev.filter(p => p._id !== id));
         }
      } else if (type === 'user') {
        setUsers(prev => prev.filter(u => u._id !== id));
      }   
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      published: 'bg-green-100 text-green-800',
      verified: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-yellow-100 text-yellow-800',
      paused: 'bg-orange-100 text-orange-800',
      inactive: 'bg-red-100 text-red-800',
      closed: 'bg-red-100 text-red-800',
      archived: 'bg-red-100 text-red-800',
      suspended: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Company Form Component
  const CompanyForm = ({ company, onSave, onCancel }: { 
    company?: Company; 
    onSave: (data: any) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      name: company?.name || '',
      companyemail: company?.companyemail || '',
      logo: company?.logo || '',
      size: company?.size || '1-10' as Company['size'],
      industry: company?.industry || '',
      website: company?.website || '',
      description: company?.description || '',
      location: company?.location || ''
    });
    const [loading,setLoading] = useState(false);

      const handleUpload = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hooblr");

    const res = await fetch("https://api.cloudinary.com/v1_1/dtjobqhxb/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setFormData(prev => ({ ...prev, logo: data.secure_url }));
    setLoading(false);
  };

    const handleSubmit = (e: React.FormEvent) => {
      setLoading(true);
      e.preventDefault();
      onSave({ ...company, ...formData });
      setLoading(false);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <input
              type="file"
              id="logo"
              name="companylogo"
              onChange={handleUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D47F1] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Email *</label>
            <input
              type="email"
              required
              value={formData.companyemail}
              onChange={(e) => setFormData({ ...formData, companyemail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
            <select
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value as Company['size'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    );
  };

  // Job Form Component (simplified for brevity)
 const JobForm = ({ job, onSave, onCancel }: { 
    job?: Job; 
    onSave: (data: any) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      title: job?.title || '',
      company: job?.company?._id || '',
      description: job?.description || '',
      requirements: job?.requirements || '',
      responsibilities: job?.responsibilities || '',
      location: job?.location || '',
      type: job?.type || 'Full-time',
      category: job?.category || '',
      department: job?.department || '',
      salary: {
        min: job?.salary?.min,
        max: job?.salary?.max,
        currency: job?.salary?.currency || 'USD',
        period: job?.salary?.period || 'yearly'
      },
      benefits: job?.benefits || [],
      skills: job?.skills || [],
      experience: job?.experience || 'Entry-level',
      education: job?.education || 'bachelor',
      status: job?.status || 'draft',
      isRemote: job?.isRemote || false,
      isGovernment: job?.isGovernment || false,
      applicationDeadline: job?.applicationDeadline || '',
      tags: job?.tags || [],
      featured: job?.featured || false,
      urgent: job?.urgent || false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.company) {
        alert('Please select a company first');
        return;
      }
      onSave({ ...job, ...formData });
    };

    if (companies.length === 0) {
      return (
        <div className="text-center py-8">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Companies Found</h3>
          <p className="text-gray-600 mb-4">You need to create a company before posting jobs.</p>
          <button
            onClick={() => openModal('company', 'create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Company
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
            <select
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Job['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
            <input
              type="text"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Salary Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary *</label>
            <input
              type="number"
              required
              value={formData.salary.min}
              onChange={(e) => setFormData({ 
                ...formData, 
                salary: { ...formData.salary, min: parseInt(e.target.value)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary *</label>
            <input
              type="number"
              required
              value={formData.salary.max}
              onChange={(e) => setFormData({ 
                ...formData, 
                salary: { ...formData.salary, max: parseInt(e.target.value)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={formData.salary.currency}
              onChange={(e) => setFormData({ 
                ...formData, 
                salary: { ...formData.salary, currency: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="INR">INR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={formData.salary.period}
              onChange={(e) => setFormData({ 
                ...formData, 
                salary: { ...formData.salary, period: e.target.value as 'hourly' | 'monthly' | 'yearly' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Text Areas */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
            <textarea
              required
              rows={4}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities *</label>
            <textarea
              required
              rows={4}
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
            <select
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value as Job['experience'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior-level">Senior-level</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education *</label>
            <select
              required
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value as Job['education'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="high-school">High School</option>
              <option value="associate">Associate</option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
              <option value="phd">PhD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Job['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isRemote}
              onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Remote Work</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Featured</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.urgent}
              onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Urgent</span>
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Job</span>
          </button>
        </div>
      </form>
    );
  };



   const GovtJobForm = ({ govtjob, onSave, onCancel }: { 
    govtjob?: any; 
    onSave: (data: any) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      title: govtjob?.title || '',
      officialLink: govtjob?.officialLink || '',
      applyLink: govtjob?.applyLink || '',
      notificationLink: govtjob?.notificationLink || '',
      state: govtjob?.state || 'All India',
      location: govtjob?.location || '',
      category: govtjob?.category || '',
      eligibilityCriteria: govtjob?.eligibilityCriteria || '',
      ageLimit: govtjob?.ageLimit || '',
      totalPosts: govtjob?.totalPosts || '',
      salary: govtjob?.salary || '',
      applicationFees: govtjob?.applicationFees || '',
      description: govtjob?.description || '',
      selectionProcess: govtjob?.selectionProcess || '',
      howToApply: govtjob?.howToApply || '',
      startDateToApply: govtjob?.startDateToApply || '',
      lastDateToApply: govtjob?.lastDateToApply || '',
      seoTitle: govtjob?.seoTitle || '',
      seoDescription: govtjob?.seoDescription || ''
    });

    const indianStates = [
  // States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...govtjob, ...formData });
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Official Link *</label>
            <input
              type="url"
              required
              value={formData.officialLink}
              onChange={(e) => setFormData({ ...formData, officialLink: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Apply Link *</label>
             <input
              type="url"
              required
              value={formData.applyLink}
              onChange={(e) => setFormData({ ...formData, applyLink: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Link *</label>
             <input
              type="text"
              required
              value={formData.notificationLink}
              onChange={(e) => setFormData({ ...formData, notificationLink: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <select 
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option className='bg-white' value="All India">All India</option>
              {indianStates.map((state)=>(
                <option key={state} className='bg-white' value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recruitment Board *</label>
             <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
         
        </div>

        {/* Salary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary *</label>
            <input
              type="text"
              required
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Limit *</label>
            <input
              type="text"
              required
              value={formData.ageLimit}
              onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Posts *</label>
            <input
              type="text"
              required
              value={formData.totalPosts}
              onChange={(e) => setFormData({ ...formData, totalPosts: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Fees *</label>
              <input
                type="text"
                required
                value={formData.applicationFees}
                onChange={(e) => setFormData({ ...formData, applicationFees: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
          </div>
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
          </div>

        {/* Text Areas */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About Job *</label>
            <div className="rounded-lg pb-10">
              <ReactQuill
                value={formData.description}
                onChange={(description) => setFormData({ ...formData, description})}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write about job here....."
                style={{ height: '200px' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selection Process *</label>
            <div className="rounded-lg pb-10">
              <ReactQuill
                value={formData.selectionProcess}
                onChange={(selectionProcess) => setFormData({ ...formData, selectionProcess})}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your job selection process here....."
                style={{ height: '200px' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Criteria *</label>
            <div className="rounded-lg pb-10">
            <ReactQuill
            value={formData.eligibilityCriteria}
            onChange={(eligibilityCriteria) => setFormData({ ...formData, eligibilityCriteria})}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your job eligibility criteria here....."
            style={{ height: '200px' }}
          />
          </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How To Apply *</label>
            <div className="rounded-lg pb-10">
            <ReactQuill
            value={formData.howToApply}
            onChange={(howToApply) => setFormData({ ...formData, howToApply})}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your job Apply process here....."
            style={{ height: '200px' }}
          />
          </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date To Apply *</label>
              <input
                type="Date"
                value={formData.startDateToApply}
                onChange={(e) => setFormData({ ...formData, startDateToApply: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Date To Apply *</label>
             <input
              type='date'
              value={formData.lastDateToApply}
              onChange={(e) => setFormData({ ...formData, lastDateToApply: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* SEO Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value})}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
          </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Job</span>
          </button>
        </div>
      </form>
    );
  };
   const CareerJobForm = ({ careerjob, onSave, onCancel }: { 
    careerjob?: any; 
    onSave: (data: any) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      title: careerjob?.title || '',
      description: careerjob?.description ||'',
      role: careerjob?.role || '',
      type: careerjob?.type || '',
      vacancies: careerjob?.vacancies || '',
      status: careerjob?. status || '',
      requirements: careerjob?.requirements || '',
      benefits: careerjob?.benefits || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...careerjob, ...formData });
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={''}>Select Type</option>
              <option value={'Full-Time'}>Full-Time</option>
              <option value={'Part-Time'}>Part-Time</option>
              <option value={'Internship'}>Internship</option>
            </select>
          </div>
         
        </div>

        {/* Salary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vacancies *</label>
            <input
              type="text"
              required
              value={formData.vacancies}
              onChange={(e) => setFormData({ ...formData, vacancies: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={''}>Select Status</option>
              <option value={'Open'}>Open</option>
              <option value={'Closed'}>Closed</option>
            </select>
          </div>
        </div>

        {/* Text Areas */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="rounded-lg pb-10">
          <ReactQuill
            value={formData.description}
            onChange={(description) => setFormData({ ...formData, description})}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your job selection process here....."
            style={{ height: '200px' }}
          />
        </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
            <div className="rounded-lg pb-10">
          <ReactQuill
            value={formData.requirements}
            onChange={(requirements) => setFormData({ ...formData, requirements})}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your job selection process here....."
            style={{ height: '200px' }}
          />
        </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
            <div className="rounded-lg pb-10">
            <ReactQuill
            value={formData.benefits}
            onChange={(benefits) => setFormData({ ...formData, benefits})}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your job eligibility criteria here....."
            style={{ height: '200px' }}
          />
          </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Job</span>
          </button>
        </div>
      </form>
    );
  };






  // View Details Component
  const ViewDetails = ({ data, type }: { data: any; type: string }) => {
    if (type === 'company') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-900">{data.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-900">{data.companyemail}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Industry:</span>
                  <p className="text-gray-900">{data.industry}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Size:</span>
                  <p className="text-gray-900">{data.size} employees</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <p className="text-gray-900">{data.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Website:</span>
                  <p className="text-gray-900">{data.website || 'Not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <p className="text-gray-900">{new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
          {data.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{data.description}</p>
            </div>
          )}
        </div>
      );
    }

    if (type === 'job') {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span>{data.company?.name}</span>
              <span>•</span>
              <span>{data.location}</span>
              <span>•</span>
              <span>{data.type}</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(data.status)}`}>
                {data.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Details</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Category:</span> {data.category}</div>
                <div><span className="font-medium">Department:</span> {data.department}</div>
                <div><span className="font-medium">Experience:</span> {data.experience}</div>
                <div><span className="font-medium">Education:</span> {data.education}</div>
                <div><span className="font-medium">Salary:</span> {data.salary?.currency} {data.salary?.min} - {data.salary?.max} ({data.salary?.period})</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Applications:</span> {data.applications?.length || 0}</div>
                <div><span className="font-medium">Views:</span> {data.views || 0}</div>
                <div><span className="font-medium">Posted:</span> {new Date(data.createdAt).toLocaleDateString()}</div>
                {data.applicationDeadline && (
                  <div><span className="font-medium">Deadline:</span> {new Date(data.applicationDeadline).toLocaleDateString()}</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{data.description}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{data.requirements}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{data.responsibilities}</p>
            </div>
          </div>

          {data.skills && data.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    if (type === 'govtjob') {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span>{data.state}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Details</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Category:</span> {data.category}</div>
                <div><span className="font-medium">Official Link:</span> {data.officialLink}</div>
                <div><span className="font-medium">Apply Link:</span> {data.applyLink}</div>
                <div><span className="font-medium">Notification Link:</span> {data.notificationLink}</div>
                <div><span className="font-medium">Age Limit:</span> {data.ageLimit}</div>
                <div><span className="font-medium">Total Posts:</span> {data.totalPosts}</div>
                <div><span className="font-medium">Application Fees:</span> {data.applicationFees}</div>
                <div><span className="font-medium">Salary:</span> {data.salary}</div>
                <div><span className="font-medium">Start Date To Apply:</span> {data.startDateToApply}</div>
                <div><span className="font-medium">Last Date To Apply:</span> {data.lastDateToApply}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.eligibilityCriteria }} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">selectionProcess</h3>
             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.selectionProcess }} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">how To Apply</h3>
             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.howToApply }} />
          </div>
        </div>
      );
    }
    if(type === 'careerjob'){
      return (
        <div>
          <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Applications for {data.title}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-900">Candidate</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Experience</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Applied Date</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Cover Letter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.enteries.map((app: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-3">
                          <div>
                            <div className="font-semibold text-gray-900">{app.name}</div>
                            <div className="text-sm text-gray-600">{app.email}</div>
                            <div className="text-sm text-gray-600">{app.phone}</div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{app.experience} years</td>
                        <td className="p-3 text-gray-600">{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="p-3">
                          <p>{app.coverletter}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.enteries.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No applications found for this job.
                  </div>
                )}
              </div>
            </div>
        </div>
      )
    }
    if(type === "blog"){
      return (
            <div className="prose max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
        <span>By {data.author}</span>
        <span>•</span>
        <span>{data.category}</span>
        <span>•</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          data.status === 'published' ? 'bg-green-100 text-green-800' :
          data.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {data.status}
        </span>
      </div>
      
      {data.featuredImage && (
        <img 
          src={data.featuredImage} 
          alt={data.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      
      {data.excerpt && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-lg text-gray-700 italic">{data.excerpt}</p>
        </div>
      )}
      
      <div 
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      
      {data.tags && data.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: string) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
      )
    }

    return null;
  };

  // Modal Component
  const Modal = () => {
    if (!modalState.isOpen) return null;

    const { type, mode, data } = modalState;
    const title = `${mode === 'create' ? 'Create' : mode === 'edit' ? 'Edit' : 'View'} ${type?.charAt(0).toUpperCase()}${type?.slice(1)}`;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {mode === 'view' ? (
              <ViewDetails data={data} type={type!} />
            ) : type === 'company' ? (
              <CompanyForm company={data} onSave={handleSave} onCancel={closeModal} />
            ) : type === 'job' ? (
              <JobForm job={data} onSave={handleSave} onCancel={closeModal} />
            ) : type === 'govtjob' ? (   
              <GovtJobForm govtjob={data} onSave={handleSave} onCancel={closeModal} />
            ) : type === 'careerjob' ? ( 
              <CareerJobForm careerjob={data} onSave={handleSave} onCancel={closeModal} />
            ) : (
              <div>Form for {type} not implemented</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium mb-1">Total Jobs</p>
              <p className="text-2xl font-bold text-blue-900">{jobs.length}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium mb-1">Total Users</p>
              <p className="text-2xl font-bold text-green-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium mb-1">Companies</p>
              <p className="text-2xl font-bold text-purple-900">{companies.length}</p>
            </div>
            <Building className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium mb-1">Blog Posts</p>
              <p className="text-2xl font-bold text-orange-900">{blogPosts.length}</p>
            </div>
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => openModal('company', 'create')}
            className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center space-y-2"
          >
            <Building className="w-6 h-6" />
            <span>Add Company</span>
          </button>
          <button
            onClick={() => openModal('job', 'create')}
            className="p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center space-y-2"
          >
            <Briefcase className="w-6 h-6" />
            <span>Post Job</span>
          </button>
          <button
            onClick={() => setBlogEditorState({ isOpen: true, mode: 'create', post: null })}
            className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center space-y-2"
          >
            <FileText className="w-6 h-6" />
            <span>Write Blog</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center space-y-2"
          >
            <Users className="w-6 h-6" />
            <span>Manage Users</span>
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Activities</h3>
        <div className="space-y-3">
          {jobs.slice(0, 5).map((job) => (
            <div key={job._id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                New job posted: {job.title} at {job.company?.name}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompaniesManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Company Management</h2>
        <button
          onClick={() => openModal('company', 'create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies
          .filter(company => 
            company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company?.industry.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((company) => (
          <div key={company._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{company.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{company.size} employees</span>
                  <span>•</span>
                  <span>{company.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>{company.jobs?.length || 0} jobs</span>
              <span>Joined {new Date(company.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => openModal('company', 'view', company)}
                className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button 
                onClick={() => openModal('company', 'edit', company)}
                className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDelete('company', company._id)}
                className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {companies.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first company.</p>
          <button
            onClick={() => openModal('company', 'create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Company
          </button>
        </div>
      )}
    </div>
  );

  const renderJobsManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
        <button
          onClick={() => openModal('job', 'create')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post Job</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-white w-[80vw] lg:w-full rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs
                .filter(job => 
                  job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (filterStatus === 'all' || job.status === filterStatus)
                )
                .map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location} • {job.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.company?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications?.length || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openModal('job', 'view', job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openModal('job', 'edit', job)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('job', job._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">Create a company first, then post your first job.</p>
          <button
            onClick={() => companies.length > 0 ? openModal('job', 'create') : openModal('company', 'create')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {companies.length > 0 ? 'Post Job' : 'Create Company First'}
          </button>
        </div>
      )}
    </div>
  );

  const renderGovtJobsManagement = () => (
        <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Govt Job Management</h2>
        <button
          onClick={() => openModal('govtjob', 'create')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post Govt Job</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white w-[80vw] lg:w-full rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age Limit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {govtJobs
                .filter(job => 
                  job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (filterStatus === 'all' || job.status === filterStatus)
                )
                .map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.ageLimit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openModal('govtjob', 'view', job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openModal('govtjob', 'edit', job)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('govtjob', job._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">Create a company first, then post your first job.</p>
          <button
            onClick={() => companies.length > 0 ? openModal('job', 'create') : openModal('company', 'create')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {companies.length > 0 ? 'Post Job' : 'Create Company First'}
          </button>
        </div>
      )}
    </div>
  )

  const renderCareerJobsManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Career Job Management</h2>
        <button
          onClick={() => openModal('careerjob', 'create')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post Career Job</span>
        </button>
      </div>
            {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white w-[80vw] lg:w-full rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacancies</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {careerJobs
                .filter(job => 
                  job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (filterStatus === 'all' || job.status === filterStatus)
                )
                .map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.vacancies}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openModal('careerjob', 'view', job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openModal('careerjob', 'edit', job)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('careerjob', job._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">Create a company first, then post your first job.</p>
          <button
            onClick={() => companies.length > 0 ? openModal('job', 'create') : openModal('company', 'create')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {companies.length > 0 ? 'Post Job' : 'Create Company First'}
          </button>
        </div>
      )}
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
            <p className="text-gray-600 mb-6">Please log in with admin credentials to access this page.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }


    // Blog Management Component
  function renderBlogManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <button
            onClick={() => setBlogEditorState({ isOpen: true, mode: 'create', post: null })}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write Post</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Blog Posts */}
        <div className="space-y-4">
          {blogPosts
            .filter(post => 
              post?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post?.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
            <div key={post._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    {/* <span>By {post.author || 'Unknown'}</span> */}
                    {/* <span>•</span> */}
                    <span>{post.category}</span>
                    {post.publishedAt && (
                      <>
                        <span>•</span>
                        <span>Published {new Date(post.publishedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <span>{post.views} views</span>
                    <span>{post.likes} likes</span>
                    <span>{post.comments?.length || 0} comments</span>
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openModal('blog', 'view', post)}
                  className="flex-1 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button 
                  onClick={() => setBlogEditorState({ isOpen: true, mode: 'edit', post })}
                  className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => handleDelete('blog-post', post._id!)}
                  className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-4">Start creating engaging content for your audience.</p>
            <button
              onClick={() => setBlogEditorState({ isOpen: true, mode: 'create', post: null })}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Write Your First Post
            </button>
          </div>
        )}
      </div>
    );
  }


  // User Management Component
  function renderUserManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Users</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg w-[80vw] lg:w-full border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users
                  .filter(user => 
                    (user.profile?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (filterStatus === 'all' || user.role === filterStatus)
                  )
                  .map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.profile?.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => openModal('user', 'view', user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openModal('user', 'edit', user)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.role !== 'admin' && (
                          <button 
                            onClick={() => handleDelete('user', user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Settings Component
  function renderSettings() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  defaultValue="Hooblr"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  defaultValue="Find your dream government job or hire top talent"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  defaultValue="admin@hooblr.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Job Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-approve Jobs</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Expiry Days</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Job Price</label>
                <input
                  type="number"
                  defaultValue="99"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                <input
                  type="text"
                  defaultValue="smtp.gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                <input
                  type="number"
                  defaultValue="587"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                <input
                  type="email"
                  defaultValue="noreply@hooblr.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Optional</option>
                  <option>Required for Admins</option>
                  <option>Required for All</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    );
  }






  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
       {/* Header */}
       <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-purple-200 fixed w-full top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center h-16">
             <div className="flex items-center space-x-4">
               <button
                onClick={() => router.push('/')}
                className="lg:flex hidden items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Site</span>
              </button>
              <Menu onClick={()=>setSidebarOpen(true)} className='lg:hidden block'/>
              <div className="h-6 lg:block hidden w-px bg-purple-300"></div>
              <div className="flex items-center space-x-3">
                 <div 
                              className="flex items-center cursor-pointer"
                              onClick={() => router.push('/')}
                            >
                            <Image src='/hooblrlogo.png' width={120} height={50} alt='logo'/>
                            </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

        <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out lg:transition-none pt-16 lg:pt-0`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-200 p-6 h-full lg:h-auto lg:sticky lg:top-6">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 flex items-center space-x-3 ${
                          activeTab === item.id 
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-200 p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  <>
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'companies' && renderCompaniesManagement()}
                    {activeTab === 'jobs' && renderJobsManagement()}
                    {activeTab === 'govtjobs' && renderGovtJobsManagement()}
                    {activeTab === 'careerjobs' && renderCareerJobsManagement()}
                    {activeTab === 'blog' && renderBlogManagement()}
                    {activeTab === 'users' && renderUserManagement()}
                    {activeTab === 'settings' && renderSettings()}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal />
      
      {blogEditorState.isOpen && (
        <BlogPostEditor
          post={blogEditorState.post || undefined}
          onSave={(post: BlogPost) => {
            if (blogEditorState.mode === 'create') {
              setBlogPosts([...blogPosts, post]);
            } else {
              setBlogPosts(blogPosts.map(p => p._id === post._id ? post : p));
            }
            setBlogEditorState({ isOpen: false, mode: 'create', post: null });
          }}
          onCancel={() => setBlogEditorState({ isOpen: false, mode: 'create', post: null })}
          mode={blogEditorState.mode}
        />
      )}

      <Footer />
    </div>
  );
}





