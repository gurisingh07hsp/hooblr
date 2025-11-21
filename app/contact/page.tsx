import Contact from '@/components/Contact';
import React from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Hooblr Support Today',
  description: "Reach Hooblr for quick help, feedback, or inquiries. Our team supports both job seekers and employers with fast and reliable responses.",
  alternates: {
    canonical: '/contact',
  },
}
export default function ContactPage() {

  return (
    <div>
      <Contact/>
    </div>
  );
} 