import React from 'react';;
import FindJobsPage from '@/components/FindJobsPage';
import Footer from '@/components/Footer';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Jobs in India – Apply Today',
  description: 'Explore verified job openings across India. Filter by skills, company, or experience and apply instantly to roles that fit your goals.',
  alternates: {
    canonical: '/jobs',
  },
}
export default function JobsPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Main Content */}
      
      <main className="pt-16">
        <FindJobsPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 