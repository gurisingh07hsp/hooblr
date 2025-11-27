import React from "react";
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
    title: `${params.category} in India – Apply Now`,
    description: 'Find the latest government job openings in India. Explore SSC, railway, banking, police, and state govt vacancies and apply online quickly through Hooblr.',
    alternates: {
      canonical: `/govtjobs/search/${params.category}`,
    },
  }
}

const GovtJobsCategoryPage = ({ params }: PageProps) => {
  return (
   <SearchGovtjobsPage params={params} />
  );
};

export default GovtJobsCategoryPage;
