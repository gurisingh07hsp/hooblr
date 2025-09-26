'use client'

import React, { useEffect, useState } from 'react';
import BlogPage from '@/components/BlogPage';
import Footer from '@/components/Footer';
import axios from 'axios';

// Mock blog posts data
const mockBlogPosts = [
  {
    id: '1',
    title: 'Interview Tips for 2024: Master the Art of Job Interviews',
    author: 'Sarah Johnson',
    category: 'Interview Tips',
    status: 'published' as const,
    published: '2024-01-15',
    views: 1247,
    likes: 89,
    content: '<h2>Mastering Job Interviews in 2024</h2><p>This comprehensive guide covers everything you need to know about acing job interviews in 2024. From preparation strategies to common questions and answers, we\'ve got you covered.</p><h3>Preparation is Key</h3><p>Start by researching the company thoroughly. Understand their mission, values, and recent news. This will help you tailor your responses and show genuine interest.</p><h3>Common Questions to Prepare For</h3><ul><li>Tell me about yourself</li><li>Why do you want to work here?</li><li>What are your strengths and weaknesses?</li><li>Where do you see yourself in 5 years?</li></ul>',
    excerpt: 'Master the art of job interviews with our comprehensive guide covering preparation strategies, common questions, and expert tips for 2024.',
    tags: ['interview', 'career', 'tips', '2024', 'preparation'],
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  },
  {
    id: '2',
    title: 'Remote Work Best Practices: Thriving in the Digital Workplace',
    author: 'Mike Chen',
    category: 'Workplace',
    status: 'published' as const,
    published: '2024-01-12',
    views: 892,
    likes: 67,
    content: '<h2>Thriving in Remote Work</h2><p>Learn the essential best practices for remote work success. From setting up your home office to maintaining work-life balance, discover how to thrive in a remote work environment.</p><h3>Setting Up Your Workspace</h3><p>Create a dedicated workspace that minimizes distractions and promotes productivity. Invest in ergonomic furniture and proper lighting.</p><h3>Maintaining Work-Life Balance</h3><p>Set clear boundaries between work and personal time. Use time-blocking techniques and take regular breaks to avoid burnout.</p>',
    excerpt: 'Discover essential strategies for remote work success, from home office setup to maintaining work-life balance.',
    tags: ['remote-work', 'workplace', 'productivity', 'work-life-balance'],
    featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
  },
  {
    id: '3',
    title: 'Government Job Application Guide: Your Complete Roadmap',
    author: 'Lisa Rodriguez',
    category: 'Government Jobs',
    status: 'published' as const,
    published: '2024-01-10',
    views: 567,
    likes: 34,
    content: '<h2>Navigating Government Job Applications</h2><p>A step-by-step guide to applying for government positions. Learn about the application process, required documents, and tips for standing out in government job applications.</p><h3>Understanding the Process</h3><p>Government job applications often have specific requirements and longer processing times. Be prepared for detailed forms and background checks.</p><h3>Required Documents</h3><ul><li>Resume tailored to government format</li><li>Cover letter addressing key qualifications</li><li>Transcripts and certifications</li><li>References and background information</li></ul>',
    excerpt: 'Navigate the government job application process with our step-by-step guide and expert tips.',
    tags: ['government', 'application', 'career', 'public-sector'],
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  },
  {
    id: '4',
    title: 'Salary Negotiation Strategies: Get the Compensation You Deserve',
    author: 'David Park',
    category: 'Career Growth',
    status: 'published' as const,
    published: '2024-01-08',
    views: 1234,
    likes: 156,
    content: '<h2>Getting the Salary You Deserve</h2><p>Master the art of salary negotiation with proven strategies that help you get the compensation you deserve without damaging relationships.</p><h3>Research and Preparation</h3><p>Before entering negotiations, research industry standards and company salary ranges. Know your worth and be prepared to articulate your value.</p><h3>Negotiation Techniques</h3><ul><li>Start with a higher anchor point</li><li>Focus on value, not just salary</li><li>Practice your pitch</li><li>Be prepared to walk away</li></ul>',
    excerpt: 'Master salary negotiation with proven strategies to get the compensation you deserve.',
    tags: ['salary', 'negotiation', 'career', 'compensation'],
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'
  },
  {
    id: '5',
    title: 'Building Your Professional Network in the Digital Age',
    author: 'Emily Thompson',
    category: 'Networking',
    status: 'published' as const,
    published: '2024-01-05',
    views: 789,
    likes: 89,
    content: '<h2>Networking in the Digital Age</h2><p>Networking has evolved beyond business cards and conferences. Learn how to build meaningful professional relationships online and offline.</p><h3>Online Networking</h3><p>Platforms like LinkedIn have revolutionized professional networking. Create a compelling profile and engage with industry leaders.</p><h3>Offline Networking</h3><p>Attend industry events, join professional associations, and participate in local meetups to expand your network.</p>',
    excerpt: 'Build meaningful professional relationships in the digital age with effective networking strategies.',
    tags: ['networking', 'linkedin', 'professional', 'relationships'],
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  }
];

export default function BlogPageRoute() {
  const [blogs, setBlogs] = useState([]);
  const fetchblogs = async()=>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/`);
      if(response.status === 200){
        console.log(response.data.posts);
        setBlogs(response.data.posts);
      }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchblogs();
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">

      {/* Main Content */}
      <main className="pt-16">
        <BlogPage posts={blogs} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 