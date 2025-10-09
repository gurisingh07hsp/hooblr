'use client'

import React, { useEffect, useState } from 'react';
import BlogPage from '@/components/BlogPage';
import Footer from '@/components/Footer';
import axios from 'axios';


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