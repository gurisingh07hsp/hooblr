import React from "react";
import LocationJobs from "@/components/LocationJobs";
import type { Metadata } from 'next'

interface PageProps {
  params: {
    location: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Latest jobs in ${params.location.replace('-', ' ')} – Apply Now`,
    description: 'Discover the latest jobs in India on Hooblr. Browse roles, compare companies, and apply instantly to fast-track your career growth.',
    alternates: {
      canonical: `/jobs/location/${params.location.replace('-', ' ')}`,
    },
  }
}

export default function FindJobsPage({ params }: PageProps) {
  return (
   <LocationJobs params={params}/>
  );
}
