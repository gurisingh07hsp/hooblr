import React from "react";
import GovtJobsPage from "@/components/GovtJobsPage";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest Govt Jobs in India – Apply Now',
  description: 'Find the latest government job openings in India. Explore SSC, railway, banking, police, and state govt vacancies and apply online quickly through Hooblr.',
  alternates: {
    canonical: '/govtjobs',
  },
}

const GovtJobsPortal = () => {
  return (
    <div>
      <GovtJobsPage/>
    </div>
  );
};

export default GovtJobsPortal;
