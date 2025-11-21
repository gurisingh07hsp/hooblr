import React from 'react';
import CareersDetailsPage from '@/components/CareersDetailsPage';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Hooblr – Join Our Team',
  description: 'Explore openings at Hooblr and build a rewarding career with a team focused on innovation, talent, and empowering job seekers.',
  alternates: {
    canonical: '/careers',
  },
}

export default function CareersPage() {

  return (
    <div>
      <CareersDetailsPage/>
    </div>
  );
} 