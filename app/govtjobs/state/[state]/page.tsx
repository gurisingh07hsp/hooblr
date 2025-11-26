import React from 'react'
import SearchGovtjobsPage from "@/components/SearchGovtjobsPage";
import type { Metadata } from 'next'

interface PageProps {
  params: {
    category: string;
    state: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.state} in India – Apply Now`,
    description: 'Find the latest government job openings in India. Explore SSC, railway, banking, police, and state govt vacancies and apply online quickly through Hooblr.',
    alternates: {
      canonical: `/govtjobs/state/${params.state}`,
    },
  }
}

const page = ({ params }: PageProps) => {
  return (
      <SearchGovtjobsPage params={params} />
  )
}

export default page
