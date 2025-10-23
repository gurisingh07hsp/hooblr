'use client'

import React from 'react';
import ResourcesPage from '@/components/ResourcesPage';
import Footer from '@/components/Footer';

export default function ResourcesPageRoute() {

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="pt-16">
        <ResourcesPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 