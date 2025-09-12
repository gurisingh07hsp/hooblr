'use client'

import React from 'react';
// import { useRouter } from 'next/navigation';
// import { Menu, X } from 'lucide-react';
import ResourcesPage from '@/components/ResourcesPage';
import Footer from '@/components/Footer';

export default function ResourcesPageRoute() {
  // const router = useRouter();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Main Content */}
      <main className="pt-16">
        <ResourcesPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 