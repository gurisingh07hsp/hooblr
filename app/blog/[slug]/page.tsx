'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, User, Eye, Heart, Share2, Bookmark, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

interface BlogPost {
  _id: string;
  title: string;
  author: {profile: {name: string}};
  category: string;
  status: 'published' | 'draft' | 'archived';
  content: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
  published?: string;
  views?: number;
  likes?: number;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const getBlog = async() => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${params.slug}`);
      if(response.status === 200){
        setPost(response.data.post);
      }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    getBlog();
  },[])

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/blog')}
            className="bg-[#9333E9] text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

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
              <Image src='/hooblrlogo.png' width={120} height={50} alt='logo'/>
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
                className="text-purple-600 font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => router.push('/resume-builder')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Resume Builder
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Back to Blog Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => router.push('/blog')}
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm shadow-lg border border-purple-200 text-purple-600 hover:text-purple-700 px-4 py-2 rounded-xl transition-all duration-300 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </button>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 overflow-hidden">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex px-3 py-1 text-sm font-bold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{post.author.profile.name}</span>
                  </div>
                  {post.published && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>{post.published}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>5 min read</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span>{post.views?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center space-x-2 mb-6">
                  <Tag className="w-4 h-4 text-purple-600" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Article Content */}
            <div 
              className="quill-content prose prose-sm sm:prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Article Footer */}
            <div className="mt-8 pt-6 border-t border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Like this article</span>
                  </button>
                  <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                    <Bookmark className="w-5 h-5" />
                    <span className="font-medium">Bookmark</span>
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 