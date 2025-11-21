import React from 'react';
import ResumeBuilder from '@/components/ResumeBuilder';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Build Job-Ready Resume – Free Tool',
  description: 'Create a professional, ATS-friendly resume with Hooblr’s builder. Edit, format, and download instantly to boost your job applications.',
  alternates: {
    canonical: '/resume-builder',
  },
}
export default function ResumeBuilderPage() {

  return (
   <div>
      <ResumeBuilder/>
   </div>
  );
} 