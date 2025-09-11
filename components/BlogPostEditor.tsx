'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { X, Save, Eye, ArrowLeft } from 'lucide-react';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
});

import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  id?: string;
  title: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  content: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
  published?: string;
  views?: number;
  likes?: number;
}

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export default function BlogPostEditor({ 
  post, onSave, onCancel, mode 
}: BlogPostEditorProps) {
  const initialPost = post || {};
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: '',
    author: '',
    category: 'Career Advice',
    status: 'draft',
    content: '',
    excerpt: '',
    tags: [],
    featuredImage: '',
    ...initialPost
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [newTag, setNewTag] = useState('');

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

  const handleSave = () => {
    const postToSave = {
      ...blogPost,
      id: blogPost.id || Date.now().toString(),
      published: blogPost.status === 'published' ? new Date().toISOString().split('T')[0] : undefined,
      views: blogPost.views || 0,
      likes: blogPost.likes || 0
    };
    onSave(postToSave);
  };

  const addTag = () => {
    if (newTag.trim() && !blogPost.tags?.includes(newTag.trim())) {
      setBlogPost({
        ...blogPost,
        tags: [...(blogPost.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setBlogPost({
      ...blogPost,
      tags: blogPost.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const renderPreview = () => (
    <div className="prose max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
        <span>By {blogPost.author}</span>
        <span>•</span>
        <span>{blogPost.category}</span>
        <span>•</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          blogPost.status === 'published' ? 'bg-green-100 text-green-800' :
          blogPost.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {blogPost.status}
        </span>
      </div>
      
      {blogPost.featuredImage && (
        <img 
          src={blogPost.featuredImage} 
          alt={blogPost.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      
      {blogPost.excerpt && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-lg text-gray-700 italic">{blogPost.excerpt}</p>
        </div>
      )}
      
      <div 
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blogPost.content }}
      />
      
      {blogPost.tags && blogPost.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map(tag => (
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
  );

  const renderEditor = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={blogPost.title}
            onChange={(e) => setBlogPost({...blogPost, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter blog post title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
          <input
            type="text"
            value={blogPost.author}
            onChange={(e) => setBlogPost({...blogPost, author: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter author name..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={blogPost.category}
            onChange={(e) => setBlogPost({...blogPost, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Career Advice">Career Advice</option>
            <option value="Workplace">Workplace</option>
            <option value="Technology">Technology</option>
            <option value="Leadership">Leadership</option>
            <option value="Government Jobs">Government Jobs</option>
            <option value="Interview Tips">Interview Tips</option>
            <option value="Resume Writing">Resume Writing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={blogPost.status}
            onChange={(e) => setBlogPost({...blogPost, status: e.target.value as 'draft' | 'published' | 'archived'})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Featured Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
        <input
          type="url"
          value={blogPost.featuredImage}
          onChange={(e) => setBlogPost({...blogPost, featuredImage: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
        <textarea
          value={blogPost.excerpt}
          onChange={(e) => setBlogPost({...blogPost, excerpt: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the blog post..."
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {blogPost.tags?.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center space-x-1"
            >
              <span>#{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add a tag..."
          />
          <button
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
        <div className="border border-gray-300 rounded-lg">
          <ReactQuill
            value={blogPost.content}
            onChange={(content) => setBlogPost({...blogPost, content})}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your blog post content here..."
            style={{ height: '400px' }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
              </h2>
              <p className="text-sm text-gray-600">
                {mode === 'create' ? 'Write a new blog post for your audience' : 'Update your blog post content'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                isPreviewMode 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={!blogPost.title || !blogPost.author || !blogPost.content}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>Save {mode === 'create' ? 'Post' : 'Changes'}</span>
            </button>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isPreviewMode ? renderPreview() : renderEditor()}
        </div>
      </div>
    </div>
  );
} 