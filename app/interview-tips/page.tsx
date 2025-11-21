import React from 'react';
import InterviewTips from '@/components/InterviewTipsPage';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ace Interviews With Expert Tips',
  description: 'Improve your interview success with Hooblr’s proven tips, sample answers, and confidence-boosting guidance for every job role.',
  alternates: {
    canonical: '/interview-tips',
  },
}

export default function InterviewTipsPage() {

  return (
    <div>
      <InterviewTips/>
    </div>
  );
} 