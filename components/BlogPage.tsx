'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, User, Eye, Heart, ArrowLeft, Search, BookOpen, Star, Clock, Share2, Sparkles, Bookmark, MessageCircle } from 'lucide-react';

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  author: {profile: {name: string}};
  category: string;
  status: 'published' | 'draft' | 'archived';
  content: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
  published?: string;
  featured: boolean;
  views?: number;
  likes?: number;
}

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter published posts
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  // Filter by category and search
  const filteredPosts = publishedPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(publishedPosts.map(post => post.category)))];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Career Advice': 'from-blue-500 to-indigo-600',
      'Workplace': 'from-green-500 to-emerald-600',
      'Technology': 'from-purple-500 to-pink-600',
      'Leadership': 'from-orange-500 to-red-600',
      'Government Jobs': 'from-red-500 to-pink-600',
      'Interview Tips': 'from-indigo-500 to-purple-600',
      'Resume Writing': 'from-pink-500 to-rose-600',
      'Career Growth': 'from-emerald-500 to-teal-600',
      'Networking': 'from-cyan-500 to-blue-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const featuredPosts = publishedPosts.slice(0, 2);
  const regularPosts = filteredPosts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Expert Career Insights</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Career Insights & Tips
            </h1>
            <p className="text-lg mb-6 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Expert advice, industry trends, and practical tips to accelerate your career growth
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg bg-white/90 backdrop-blur-sm"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg bg-white/90 backdrop-blur-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && searchTerm === '' && selectedCategory === 'all' && (
          <div className="mb-20">
            <div className="text-center mb-12">
              {/* <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Star className="w-4 h-4" />
                <span>Featured Articles</span>
              </div> */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Must-Read Career Insights</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most popular and highly-rated articles to help you advance your career
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article key={post._id} className="group bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-5">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getCategoryColor(post.category)} text-white shadow-md`}>
                        {post.category}
                      </span>
                      {post.featured && 
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 text-xs font-bold rounded-full">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                      }
                      
                    </div>
                    
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-purple-600" />
                          <span className="font-medium">{post.author.profile.name}</span>
                        </div>
                        {post.published && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-purple-600" />
                            <span>{post.published}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-purple-600" />
                          <span>{post.views || 0}</span>
                        </div>
                        {/* <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span>{post.likes || 0}</span>
                        </div> */}
                      </div>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs rounded-full border border-purple-200 hover:bg-purple-200 transition-colors font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="bg-[#9333E9] text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold flex items-center space-x-2 transform hover:-translate-y-1"
                      >
                        <span>Read Full Article</span>
                        <ArrowLeft className="w-3 h-3 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Try adjusting your search terms or browse different categories to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg"
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Articles' : selectedCategory}
                <span className="text-gray-500 text-lg font-normal ml-2">({regularPosts.length})</span>
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Latest insights</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <article key={post._id} className="group bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getCategoryColor(post.category)} text-white shadow-md`}>
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-purple-600" />
                          <span className="font-medium">{post.author.profile.name}</span>
                        </div>
                        {post.published && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-purple-600" />
                            <span>{post.published}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-purple-600" />
                          <span>{post.views || 0}</span>
                        </div>
                        {/* <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span>{post.likes || 0}</span>
                        </div> */}
                      </div>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag: string) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs rounded-full border border-purple-200 hover:bg-purple-200 transition-colors font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                            +{post.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="bg-[#9333E9] text-white px-3 py-1.5 rounded-lg transition-all duration-300 text-xs font-semibold"
                      >
                        Read More
                      </button>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                          <Bookmark className="w-3 h-3" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                          <Share2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              <span>Stay Updated</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated with Career Insights</h3>
            <p className="text-purple-100 mb-8 text-lg max-w-xl mx-auto">
              Get the latest career advice, industry trends, and job search tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-300 focus:outline-none shadow-lg"
              />
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}