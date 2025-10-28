import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import JobDetailsClient from "@/components/JobDetailsClient";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(`${API_BASE}/api/jobs/${params.id}`, { cache: "no-store" });
  const data = await res.json();
  const job = data.job;

  // return {
  //   title: `${job.title} - ${job.company.name}`,
  //   description: job.description,
  //   openGraph: {
  //     title: job.title,
  //     description: job.description,
  //   },
  //   // ✅ Proper JobPosting JSON-LD
  //   other: {
  //     "script:ld+json": JSON.stringify({
  //       "@context": "https://schema.org/",
  //       "@type": "JobPosting",
  //       title: job.title,
  //       description: job.description,
  //       datePosted: job.createdAt,
  //       employmentType: job.type,
  //       hiringOrganization: {
  //         "@type": "Organization",
  //         name: job.company.name,
  //         sameAs: job.company.website || "",
  //       },
  //       jobLocation: {
  //         "@type": "Place",
  //         address: {
  //           "@type": "PostalAddress",
  //           addressLocality: job.location,
  //           addressCountry: "IN",
  //         },
  //       },
  //       baseSalary: {
  //         "@type": "MonetaryAmount",
  //         currency: job.salary.currency,
  //         value: {
  //           "@type": "QuantitativeValue",
  //           minValue: job.salary.min,
  //           maxValue: job.salary.max,
  //           unitText: job.salary.period,
  //         },
  //       },
  //       validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  //     }),
  //   },
  // };

  return {
    title: `${job.title} - ${job.company.name}`,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
    },
  };
}


export default async function JobDetailsPage({ params }: { params: { id: string } }) {

  const res = await fetch(`${API_BASE}/api/jobs/${params.id}`, { cache: "no-store" });
  const data = await res.json();
  const job = data.job;

  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML
    datePosted: job.createdAt,
    employmentType: job.type,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      sameAs: job.company.website || "",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: job.salary.period,
      },
    },
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  return (
    <>
      {/* ✅ Safe JSON-LD Injection */}
      <Script
        id="job-posting-schema"
        type="application/ld+json"
        strategy="beforeInteractive" // ensures it's loaded early
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      <JobDetailsClient job={job} />
    </>
  );

}
