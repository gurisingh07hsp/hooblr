import React from 'react';
import CompaniesPage from '@/components/CompaniesPage';
import Footer from '@/components/Footer';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Top Hiring Companies India',
  description: 'Discover companies hiring across India. View profiles, job openings, and insights to find employers that match your career goals.',
  alternates: {
    canonical: '/companies',
  },
}

export default function CompaniesPageRoute() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">

      {/* Main Content */}
      <main className="pt-16">
        <CompaniesPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 