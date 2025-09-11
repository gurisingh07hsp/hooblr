'use client'

import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Briefcase, 
  FileText, 
  Edit3, 
  Search, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Building2,
  Shield,
  Share2
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  status: 'active' | 'inactive' | 'pending';
  posted: string;
  applications: number;
  views: number;
}

interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  status: 'verified' | 'pending' | 'suspended';
  jobsCount: number;
  joined: string;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  published: string;
  views: number;
  likes: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'company' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joined: string;
  lastLogin: string;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      status: 'active',
      posted: '2024-01-15',
      applications: 45,
      views: 234
    },
    {
      id: '2',
      title: 'Government Policy Analyst',
      company: 'Department of Health',
      location: 'Washington, DC',
      type: 'Full-time',
      salary: '$75,000 - $95,000',
      status: 'active',
      posted: '2024-01-14',
      applications: 23,
      views: 156
    },
    {
      id: '3',
      title: 'Marketing Manager',
      company: 'Creative Agency',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80,000 - $110,000',
      status: 'pending',
      posted: '2024-01-13',
      applications: 0,
      views: 89
    }
  ]);

  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'TechCorp Inc.',
      industry: 'Technology',
      size: '201-500 employees',
      location: 'San Francisco, CA',
      status: 'verified',
      jobsCount: 12,
      joined: '2023-06-15'
    },
    {
      id: '2',
      name: 'Department of Health',
      industry: 'Government',
      size: '1000+ employees',
      location: 'Washington, DC',
      status: 'verified',
      jobsCount: 8,
      joined: '2023-03-20'
    },
    {
      id: '3',
      name: 'Creative Agency',
      industry: 'Marketing',
      size: '11-50 employees',
      location: 'New York, NY',
      status: 'pending',
      jobsCount: 3,
      joined: '2024-01-10'
    }
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Interview Tips for 2024',
      author: 'Sarah Johnson',
      category: 'Career Advice',
      status: 'published',
      published: '2024-01-15',
      views: 1247,
      likes: 89
    },
    {
      id: '2',
      title: 'Remote Work Best Practices',
      author: 'Mike Chen',
      category: 'Workplace',
      status: 'published',
      published: '2024-01-12',
      views: 892,
      likes: 67
    },
    {
      id: '3',
      title: 'Government Job Application Guide',
      author: 'Lisa Rodriguez',
      category: 'Career Advice',
      status: 'draft',
      published: '',
      views: 0,
      likes: 0
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      status: 'active',
      joined: '2023-12-01',
      lastLogin: '2024-01-15'
    },
    {
      id: '2',
      name: 'TechCorp HR',
      email: 'hr@techcorp.com',
      role: 'company',
      status: 'active',
      joined: '2023-06-15',
      lastLogin: '2024-01-14'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@hooblr.com',
      role: 'admin',
      status: 'active',
      joined: '2023-01-01',
      lastLogin: '2024-01-15'
    }
  ]);

  const handleDelete = (type: string, id: string) => {
    if (type === 'job') {
      setJobs(jobs.filter(job => job.id !== id));
    } else if (type === 'company') {
      setCompanies(companies.filter(company => company.id !== id));
    } else if (type === 'blog') {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
    } else if (type === 'user') {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleStatusChange = (type: string, id: string, newStatus: string) => {
    if (type === 'job') {
      setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus as any } : job));
    } else if (type === 'company') {
      setCompanies(companies.map(company => company.id === id ? { ...company, status: newStatus as any } : company));
    } else if (type === 'blog') {
      setBlogPosts(blogPosts.map(post => post.id === id ? { ...post, status: newStatus as any } : post));
    } else if (type === 'user') {
      setUsers(users.map(user => user.id === id ? { ...user, status: newStatus as any } : user));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'archived':
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-medium mb-1">Total Jobs</p>
              <p className="text-xl font-bold text-blue-900 mb-1">{jobs.length}</p>
              <p className="text-blue-600 text-xs">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-xs font-medium mb-1">Active Users</p>
              <p className="text-xl font-bold text-green-900 mb-1">{users.filter(u => u.status === 'active').length}</p>
              <p className="text-green-600 text-xs">+8% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-medium mb-1">Companies</p>
              <p className="text-xl font-bold text-purple-900 mb-1">{companies.length}</p>
              <p className="text-purple-600 text-xs">+5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-xs font-medium mb-1">Blog Posts</p>
              <p className="text-xl font-bold text-orange-900 mb-1">{blogPosts.length}</p>
              <p className="text-orange-600 text-xs">+3% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-200 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New job posted: Senior Developer at TechCorp</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">User registered: john.doe@example.com</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Blog published: Interview Tips for 2024</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Company verified: Creative Agency</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-200 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <Plus className="w-4 h-4 mx-auto mb-1" />
              Add Job
            </button>
            <button className="p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <Edit3 className="w-4 h-4 mx-auto mb-1" />
              Write Blog
            </button>
            <button className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <Users className="w-4 h-4 mx-auto mb-1" />
              Manage Users
            </button>
            <button className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <BarChart3 className="w-4 h-4 mx-auto mb-1" />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobsManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Job Management</h2>
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add Job</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-purple-100">
              {jobs
                .filter(job => 
                  job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (filterStatus === 'all' || job.status === filterStatus)
                )
                .map((job) => (
                <tr key={job.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location} • {job.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.posted}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('job', job.id)}
                        className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
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
    </div>
  );

  const renderCompaniesManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Company Management</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{company.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{company.size}</span>
                  <span>•</span>
                  <span>{company.location}</span>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                {company.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>{company.jobsCount} active jobs</span>
              <span>Joined {company.joined}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              <button className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button 
                onClick={() => handleDelete('company', company.id)}
                className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlogManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Write Post</span>
        </button>
      </div>

      {/* Blog Posts */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                  {post.published && (
                    <>
                      <span>•</span>
                      <span>Published {post.published}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{post.views} views</span>
                  <span>{post.likes} likes</span>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                {post.status}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </button>
              <button className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button className="flex-1 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
              <button 
                onClick={() => handleDelete('blog', post.id)}
                className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'company' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <Shield className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('user', user.id)}
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
    </div>
  );

  const renderSettings = () => (
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Applications per Job</label>
              <input
                type="number"
                defaultValue="100"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Strong (8+ chars, special chars)</option>
                <option>Medium (6+ chars)</option>
                <option>Weak (4+ chars)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex border border-purple-200">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-purple-50 to-indigo-50 border-r border-purple-200 flex flex-col">
          <div className="p-5 border-b border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                  <p className="text-xs text-gray-600">System Management</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-purple-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                activeTab === 'jobs' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">Job Management</span>
            </button>
            
            <button
              onClick={() => setActiveTab('companies')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                activeTab === 'companies' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="font-medium">Company Management</span>
            </button>
            
            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                activeTab === 'blog' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Blog Management</span>
            </button>
            
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                activeTab === 'users' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">User Management</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                activeTab === 'settings' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
          <div className="p-6">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'jobs' && renderJobsManagement()}
            {activeTab === 'companies' && renderCompaniesManagement()}
            {activeTab === 'blog' && renderBlogManagement()}
            {activeTab === 'users' && renderUserManagement()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}