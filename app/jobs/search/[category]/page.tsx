import React from "react";
import SearchJobsPage from "@/components/SearchJobsPage";
import type { Metadata } from 'next'

interface PageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.category.replace('-', ' ')} in India – Apply Now`,
    description: 'Find the latest government job openings in India. Explore SSC, railway, banking, police, and state govt vacancies and apply online quickly through Hooblr.',
    alternates: {
      canonical: `/jobs/search/${params.category}`,
    },
  }
}

export default function FindJobsPage({ params }: PageProps) {

  return (
   <div>
    <SearchJobsPage params={params}/>
   </div>
  );
}
