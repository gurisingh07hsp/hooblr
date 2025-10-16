'use client'

import React from 'react';;
import FindJobsPage from '@/components/FindJobsPage';
import Footer from '@/components/Footer';

export default function JobsPage() {
  // Get category from URL parameters
  const [searchParams] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('category');
    }
    return null;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Main Content */}
      
      <main className="pt-16">
        <FindJobsPage initialCategory={searchParams || undefined} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 