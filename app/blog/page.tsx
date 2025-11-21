import React from 'react';
import BlogPage from '@/components/BlogPage';
import Footer from '@/components/Footer';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Career Tips & Job Guides – Hooblr',
  description: 'Read expert career blogs with job search tips, resume advice, interview help, and insights to grow your professional journey.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPageRoute() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">

      {/* Main Content */}
      <main className="pt-16">
        <BlogPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 