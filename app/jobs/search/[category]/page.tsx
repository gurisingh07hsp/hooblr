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
    title: `${params.category.replace('-', ' ')} in India – Apply Now  ${params.category == 'work-from-home-jobs' && 'Remote Jobs'}`,
    description: `${params.category == 'work-from-home-jobs' ? 'Find high-paying remote jobs in India on Hooblr. Explore flexible WFH roles, filter by skills and companies, and apply instantly today.' : 'Discover the latest jobs in India on Hooblr. Browse roles, compare companies, and apply instantly to fast-track your career growth.'}`,
    alternates: {
      canonical: `/jobs/search/${params.category == 'work-from-home-jobs' ? 'Remote-jobs' : params.category}`,
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
