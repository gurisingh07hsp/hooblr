'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, User, Eye, Heart, Share2, Bookmark, Clock, Tag, Shield } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  author: string;
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

// Mock blog posts data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Essential Interview Tips for Government Jobs',
    author: 'Sarah Johnson',
    category: 'Interview Tips',
    status: 'published',
    content: `
      <h2>Mastering Government Job Interviews</h2>
      <p>Government job interviews can be quite different from private sector interviews. Here are 10 essential tips to help you succeed:</p>
      
      <h3>1. Research the Agency</h3>
      <p>Before your interview, thoroughly research the specific government agency you're applying to. Understand their mission, current projects, and recent news. This shows genuine interest and preparation.</p>
      
      <h3>2. Understand the STAR Method</h3>
      <p>Government interviews often use the STAR (Situation, Task, Action, Result) method. Practice structuring your responses using this format to demonstrate your problem-solving abilities.</p>
      
      <h3>3. Prepare for Behavioral Questions</h3>
      <p>Expect questions about how you've handled difficult situations, worked with diverse teams, or managed competing priorities. Have specific examples ready.</p>
      
      <h3>4. Know the Mission</h3>
      <p>Government work is mission-driven. Be prepared to discuss how your skills and experience align with the agency's mission and public service goals.</p>
      
      <h3>5. Dress Professionally</h3>
      <p>Government interviews typically require conservative, professional attire. When in doubt, err on the side of being more formal rather than less.</p>
      
      <h3>6. Understand the Process</h3>
      <p>Government hiring processes can be lengthy. Be patient and understand that decisions may take weeks or months.</p>
      
      <h3>7. Prepare for Technical Questions</h3>
      <p>Depending on the role, you may face technical questions specific to government systems or regulations. Review relevant laws and procedures.</p>
      
      <h3>8. Show Public Service Motivation</h3>
      <p>Demonstrate your commitment to public service and helping others. Government work is about serving the public, not just earning a paycheck.</p>
      
      <h3>9. Ask Thoughtful Questions</h3>
      <p>Prepare questions about the role, team dynamics, and opportunities for growth. This shows your interest in the position and organization.</p>
      
      <h3>10. Follow Up Appropriately</h3>
      <p>Send a thank-you email within 24 hours, but be patient about follow-up. Government hiring timelines are different from private sector.</p>
      
      <h2>Final Thoughts</h2>
      <p>Government job interviews require preparation, patience, and a genuine interest in public service. By following these tips, you'll be well-positioned to succeed in your government career.</p>
    `,
    excerpt: 'Master the art of government job interviews with these 10 essential tips that will help you stand out from the competition.',
    tags: ['interview', 'government', 'career', 'tips'],
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    published: '2024-01-15',
    views: 2341,
    likes: 156
  },
  {
    id: '2',
    title: 'Building a Strong Government Resume: A Complete Guide',
    author: 'Michael Chen',
    category: 'Resume Writing',
    status: 'published',
    content: `
      <h2>Creating a Government Resume That Stands Out</h2>
      <p>Government resumes follow different rules than private sector resumes. Here's your complete guide to creating a compelling government resume:</p>
      
      <h3>Understanding Government Resume Requirements</h3>
      <p>Government resumes are typically longer and more detailed than private sector resumes. They often require specific information about your experience, education, and qualifications.</p>
      
      <h3>Key Sections to Include</h3>
      <ul>
        <li><strong>Personal Information:</strong> Full name, contact information, and citizenship status</li>
        <li><strong>Summary:</strong> Brief overview of your qualifications and career objectives</li>
        <li><strong>Work Experience:</strong> Detailed descriptions of your responsibilities and achievements</li>
        <li><strong>Education:</strong> Degrees, certifications, and relevant coursework</li>
        <li><strong>Skills:</strong> Technical skills, languages, and relevant competencies</li>
        <li><strong>References:</strong> Professional references who can speak to your qualifications</li>
      </ul>
      
      <h3>Writing Effective Job Descriptions</h3>
      <p>When describing your work experience, use action verbs and quantify your achievements. Include specific examples of projects you've worked on and their outcomes.</p>
      
      <h3>Highlighting Relevant Experience</h3>
      <p>Emphasize experience that's relevant to the government position you're applying for. This might include project management, policy analysis, or public service experience.</p>
      
      <h3>Using Keywords Effectively</h3>
      <p>Government resumes are often screened using keyword matching. Include relevant keywords from the job announcement in your resume to increase your chances of being selected for an interview.</p>
      
      <h3>Formatting Guidelines</h3>
      <p>Use a clean, professional format with consistent formatting throughout. Avoid fancy fonts or graphics that might not display properly in government systems.</p>
      
      <h2>Final Tips</h2>
      <p>Remember that government hiring processes can be lengthy, so be patient and persistent. A well-crafted government resume can significantly increase your chances of landing your dream government job.</p>
    `,
    excerpt: 'Learn how to create a compelling government resume that follows the specific requirements and stands out to hiring managers.',
    tags: ['resume', 'government', 'career', 'writing'],
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    published: '2024-01-12',
    views: 1892,
    likes: 134
  },
  {
    id: '3',
    title: 'Navigating the Federal Hiring Process: What You Need to Know',
    author: 'Emily Rodriguez',
    category: 'Government Jobs',
    status: 'published',
    content: `
      <h2>Understanding the Federal Hiring Process</h2>
      <p>The federal hiring process can seem complex and overwhelming, but understanding how it works can significantly improve your chances of success.</p>
      
      <h3>The USAJOBS Application Process</h3>
      <p>Most federal jobs are posted on USAJOBS.gov. The application process typically involves:</p>
      <ul>
        <li>Creating a USAJOBS account</li>
        <li>Building a federal resume</li>
        <li>Completing occupational questionnaires</li>
        <li>Submitting required documents</li>
      </ul>
      
      <h3>Understanding Job Announcements</h3>
      <p>Federal job announcements contain important information about:</p>
      <ul>
        <li>Position requirements and qualifications</li>
        <li>Application deadlines</li>
        <li>Required documents</li>
        <li>Evaluation criteria</li>
      </ul>
      
      <h3>The Selection Process</h3>
      <p>After applications are submitted, the selection process typically involves:</p>
      <ol>
        <li><strong>Application Review:</strong> HR specialists review applications for minimum qualifications</li>
        <li><strong>Referral:</strong> Qualified candidates are referred to hiring managers</li>
        <li><strong>Interviews:</strong> Selected candidates are invited for interviews</li>
        <li><strong>Selection:</strong> The hiring manager makes the final selection</li>
        <li><strong>Onboarding:</strong> Selected candidates complete the onboarding process</li>
      </ol>
      
      <h3>Tips for Success</h3>
      <p>To improve your chances of success in the federal hiring process:</p>
      <ul>
        <li>Carefully read job announcements and follow all instructions</li>
        <li>Tailor your resume to each specific position</li>
        <li>Use keywords from the job announcement in your resume</li>
        <li>Be patient - the process can take several months</li>
        <li>Follow up appropriately but don't be overly persistent</li>
      </ul>
      
      <h2>Common Mistakes to Avoid</h2>
      <p>Many applicants make these common mistakes:</p>
      <ul>
        <li>Not following application instructions exactly</li>
        <li>Submitting generic resumes instead of tailored ones</li>
        <li>Missing application deadlines</li>
        <li>Not providing required documentation</li>
        <li>Being impatient with the process timeline</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>While the federal hiring process can be complex, understanding how it works and following best practices can significantly improve your chances of success. Remember to be patient, persistent, and thorough in your applications.</p>
    `,
    excerpt: 'Get a comprehensive overview of the federal hiring process and learn how to navigate it successfully.',
    tags: ['federal', 'hiring', 'government', 'process'],
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    published: '2024-01-10',
    views: 2156,
    likes: 178
  }
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const post = blogPosts.find(p => p.id === params.id);

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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Hooblr</span>
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
                    <span className="font-medium">{post.author}</span>
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
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <span>{post.likes}</span>
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
              className="prose prose-lg max-w-none"
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