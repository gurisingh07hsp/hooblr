'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, ArrowLeft, X, Save, Plus } from 'lucide-react';
import BlogPostEditor from '../../components/BlogPostEditor';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';

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
  id?: string;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  published?: string;
  views?: number;
  likes?: number;
  content: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
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


interface Admin {
  name: string | undefined;
  email: string;
  role: string;
}

type Status = "active" | "inactive" | "draft" | "pending" | "archived";

// ------------------- POST -------------------
interface Item {
  type: string;
  title: string;
  author: string;
  category: string;
  status: Status;
  views?: number;
  likes?: number;
  published?: string;
  featuredImage?: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  company: string;
  location: string;
  salary?: string;
  applications: number;
  posted: string;
  industry: string;
  size: string; // could make this enum if you want
  jobsCount: number;
  name: string;
  email: string;
  role: "user" | "company" | "admin";
  joined: string;
  lastLogin?: string;
}



export default function AdminPage() {
  const router = useRouter();
  const {user, logout} = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<Admin | null>(null);
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalType] = useState<'job' | 'company' | 'blog' | 'user'>('blog');
  
  // Blog editor states
  const [isBlogEditorOpen, setIsBlogEditorOpen] = useState(false);
  const [blogEditorMode, setBlogEditorMode] = useState<'create' | 'edit'>('create');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

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
      likes: 89,
      content: 'This comprehensive guide covers everything you need to know about acing job interviews in 2024. From preparation strategies to common questions and answers, we\'ve got you covered.',
      excerpt: 'Master the art of job interviews with our comprehensive guide covering preparation strategies, common questions, and expert tips for 2024.',
      tags: ['interview', 'career', 'tips', '2024'],
      featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
    },
    {
      id: '2',
      title: 'Remote Work Best Practices',
      author: 'Mike Chen',
      category: 'Workplace',
      status: 'published',
      published: '2024-01-12',
      views: 892,
      likes: 67,
      content: 'Learn the essential best practices for remote work success. From setting up your home office to maintaining work-life balance, discover how to thrive in a remote work environment.',
      excerpt: 'Discover essential strategies for remote work success, from home office setup to maintaining work-life balance.',
      tags: ['remote-work', 'workplace', 'productivity'],
      featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
    },
    {
      id: '3',
      title: 'Government Job Application Guide',
      author: 'Lisa Rodriguez',
      category: 'Career Advice',
      status: 'draft',
      content: 'A step-by-step guide to applying for government positions. Learn about the application process, required documents, and tips for standing out in government job applications.',
      excerpt: 'Navigate the government job application process with our step-by-step guide and expert tips.',
      tags: ['government', 'application', 'career'],
      featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
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

  useEffect(() => {
    // Check if user is authenticated as admin
    const checkAuth = () => {
      
      if(user?.role === 'admin'){
        setIsAuthenticated(true);
        setAdminUser({
          name: user.profile?.name,
          email: user.email,
          role: user.role
        });
      }
      else{
        if(user?.role === 'user')
        {
          router.push('/');
        }
      }
    };
      checkAuth();
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setAdminUser(null);
  };

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

  // const handleView = (type: 'job' | 'company' | 'blog' | 'user', item: Item) => {
  //   setModalType(type);
  //   setSelectedItem(item);
  //   setIsViewModalOpen(true);
  // };

  // const handleEdit = (type: 'job' | 'company' | 'blog' | 'user', item: Item) => {
  //   setModalType(type);
  //   setSelectedItem(item);
  //   setIsEditModalOpen(true);
  // };

  const handleSaveEdit = (updatedItem: any) => {
    if (modalType === 'job') {
      setJobs(jobs.map(job => job.id === updatedItem.id ? updatedItem : job));
    } else if (modalType === 'company') {
      setCompanies(companies.map(company => company.id === updatedItem.id ? updatedItem : company));
    } else if (modalType === 'blog') {
      setBlogPosts(blogPosts.map(post => post.id === updatedItem.id ? updatedItem : post));
    } else if (modalType === 'user') {
      setUsers(users.map(user => user.id === updatedItem.id ? updatedItem : user));
    }
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleCreateBlogPost = () => {
    setBlogEditorMode('create');
    setSelectedBlogPost(null);
    setIsBlogEditorOpen(true);
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setBlogEditorMode('edit');
    setSelectedBlogPost(post);
    setIsBlogEditorOpen(true);
  };

  const handleSaveBlogPost = (post: BlogPost) => {
    if (blogEditorMode === 'create') {
      setBlogPosts([...blogPosts, post]);
    } else {
      setBlogPosts(blogPosts.map(p => p.id === post.id ? post : p));
    }
    setIsBlogEditorOpen(false);
    setSelectedBlogPost(null);
  };

  const handleCancelBlogEditor = () => {
    setIsBlogEditorOpen(false);
    setSelectedBlogPost(null);
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

  const renderViewModal = () => {
    if (!selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              View {modalType === 'job' ? 'Job' : modalType === 'company' ? 'Company' : modalType === 'blog' ? 'Blog Post' : 'User'}
            </h2>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {modalType === 'blog' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span>By {selectedItem.author}</span>
                    <span>•</span>
                    <span>{selectedItem.category}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                    <span>{selectedItem.views || 0} views</span>
                    <span>{selectedItem.likes || 0} likes</span>
                    {selectedItem.published && <span>Published {selectedItem.published}</span>}
                  </div>
                  
                  {selectedItem.featuredImage && (
                    <img 
                      src={selectedItem.featuredImage} 
                      alt={selectedItem.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  {selectedItem.excerpt && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-lg text-gray-700 italic">{selectedItem.excerpt}</p>
                    </div>
                  )}
                  
                  <div className="prose max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: selectedItem.content }}
                    />
                  </div>
                  
                  {selectedItem.tags && selectedItem.tags.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag: string) => (
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
              </div>
            )}

            {modalType === 'job' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Company:</span>
                      <p className="text-gray-900">{selectedItem.company}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Location:</span>
                      <p className="text-gray-900">{selectedItem.location}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <p className="text-gray-900">{selectedItem.type}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Salary:</span>
                      <p className="text-gray-900">{selectedItem.salary}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Applications:</span>
                      <p className="text-gray-900">{selectedItem.applications}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Views:</span>
                      <p className="text-gray-900">{selectedItem.views}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Posted:</span>
                      <p className="text-gray-900">{selectedItem.posted}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalType === 'company' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Industry:</span>
                      <p className="text-gray-900">{selectedItem.industry}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Size:</span>
                      <p className="text-gray-900">{selectedItem.size}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Location:</span>
                      <p className="text-gray-900">{selectedItem.location}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Active Jobs:</span>
                      <p className="text-gray-900">{selectedItem.jobsCount}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Joined:</span>
                      <p className="text-gray-900">{selectedItem.joined}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalType === 'user' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-gray-900">{selectedItem.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Role:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedItem.role === 'admin' ? 'bg-red-100 text-red-800' :
                        selectedItem.role === 'company' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedItem.role}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Joined:</span>
                      <p className="text-gray-900">{selectedItem.joined}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Login:</span>
                      <p className="text-gray-900">{selectedItem.lastLogin}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderEditModal = () => {
    if (!selectedItem) return null;

    return (
      <EditModal 
        item={selectedItem}
        type={modalType}
        onSave={handleSaveEdit}
        onClose={() => setIsEditModalOpen(false)}
      />
    );
  };

  const EditModal = ({ item, type, onSave, onClose }: { 
    item: any; 
    type: 'job' | 'company' | 'blog' | 'user'; 
    // eslint-disable-next-line no-unused-vars
    onSave: (updatedItem: any) => void; 
    onClose: () => void; 
  }) => {
    const [editData, setEditData] = useState(item);

    const handleSave = () => {
      onSave(editData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                     <div className="flex items-center justify-between p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-gray-900">
               Edit {type === 'job' ? 'Job' : type === 'company' ? 'Company' : type === 'blog' ? 'Blog Post' : 'User'}
             </h2>
             <button
               onClick={onClose}
               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
             >
               <X className="w-5 h-5 text-gray-500" />
             </button>
           </div>

          <div className="p-6">
            {type === 'blog' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={editData.author}
                    onChange={(e) => setEditData({...editData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={editData.category}
                    onChange={(e) => setEditData({...editData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Career Advice">Career Advice</option>
                    <option value="Workplace">Workplace</option>
                    <option value="Technology">Technology</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={editData.content}
                    onChange={(e) => setEditData({...editData, content: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {type === 'job' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={editData.company}
                    onChange={(e) => setEditData({...editData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({...editData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={editData.type}
                      onChange={(e) => setEditData({...editData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                  <input
                    type="text"
                    value={editData.salary}
                    onChange={(e) => setEditData({...editData, salary: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            )}

            {type === 'company' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={editData.industry}
                      onChange={(e) => setEditData({...editData, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Government">Government</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <select
                      value={editData.size}
                      onChange={(e) => setEditData({...editData, size: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="201-500 employees">201-500 employees</option>
                      <option value="501-1000 employees">501-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            )}

            {type === 'user' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={editData.role}
                      onChange={(e) => setEditData({...editData, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="user">User</option>
                      <option value="company">Company</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({...editData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-medium mb-1">Total Jobs</p>
              <p className="text-xl font-bold text-blue-900 mb-1">{jobs.length}</p>
              <p className="text-blue-600 text-xs">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">J</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-xs font-medium mb-1">Active Users</p>
              <p className="text-xl font-bold text-green-900 mb-1">{users.filter(u => u.status === 'active').length}</p>
              <p className="text-green-600 text-xs">+8% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">U</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-medium mb-1">Companies</p>
              <p className="text-xl font-bold text-purple-900 mb-1">{companies.length}</p>
              <p className="text-purple-600 text-xs">+5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">C</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border border-orange-200 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-xs font-medium mb-1">Blog Posts</p>
              <p className="text-xl font-bold text-orange-900 mb-1">{blogPosts.length}</p>
              <p className="text-orange-600 text-xs">+3% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">B</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-200">
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

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1">
              Add Job
            </button>
            <button className="p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1">
              Write Blog
            </button>
            <button className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1">
              Manage Users
            </button>
            <button className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-1">
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
        <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <span>+</span>
          <span>Add Job</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location} • {job.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.posted}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        // onClick={() => handleView('job', job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        👁️
                      </button>
                      <button 
                        // onClick={() => handleEdit('job', job)}
                        className="text-green-600 hover:text-green-900"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete('job', job.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️
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
          <span>+</span>
          <span>Add Company</span>
        </button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow">
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
              <button 
                // onClick={() => handleView('company', company)}
                className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                👁️ View
              </button>
              <button 
                // onClick={() => handleEdit('company', company)}
                className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => handleDelete('company', company.id)}
                className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                🗑️ Delete
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
        <button 
          onClick={handleCreateBlogPost}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Write Post</span>
        </button>
      </div>

      {/* Blog Posts */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow">
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
                {post.excerpt && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
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
                // onClick={() => handleView('blog', post)}
                className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                👁️ Preview
              </button>
              <button 
                onClick={() => handleEditBlogPost(post)}
                className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              >
                ✏️ Edit
              </button>
              <button className="flex-1 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
                📤 Share
              </button>
              <button 
                onClick={() => post.id && handleDelete('blog', post.id)}
                className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                🗑️ Delete
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
          <span>+</span>
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
                      <button 
                        // onClick={() => handleView('user', user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        👁️
                      </button>
                      <button 
                        // onClick={() => handleEdit('user', user)}
                        className="text-green-600 hover:text-green-900"
                      >
                        ✏️
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">🛡️</button>
                      <button 
                        onClick={() => handleDelete('user', user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️
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
          <span>💾</span>
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-purple-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Site</span>
              </button>
              <div className="h-6 w-px bg-purple-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Hooblr Admin</h1>
                  <p className="text-sm text-gray-600">System Management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{adminUser?.name}</p>
                <p className="text-xs text-gray-500">{adminUser?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-200 p-6 sticky top-6">
              <nav className="space-y-3">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'dashboard' 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span className="font-medium">Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'jobs' 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span className="font-medium">Job Management</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('companies')}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'companies' 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span className="font-medium">Company Management</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'blog' 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span className="font-medium">Blog Management</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'users' 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span className="font-medium">User Management</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'settings' 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span className="font-medium">Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-200 p-6">
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
      {isViewModalOpen && renderViewModal()}
      {isEditModalOpen && renderEditModal()}
      {isBlogEditorOpen && (
        <BlogPostEditor
          post={selectedBlogPost || undefined}
          onSave={handleSaveBlogPost}
          onCancel={handleCancelBlogEditor}
          mode={blogEditorMode}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
} 