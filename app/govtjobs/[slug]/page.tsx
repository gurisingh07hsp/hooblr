import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import GovtJobDetailsClient from "@/components/GovtJobDetailsClient";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const title = (
    Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  )?.replace(/-/g, " ");
  const res = await fetch(`${API_BASE}/api/govtjobs/${title}`, { cache: "no-store" });
  const data = await res.json();
  const job = data.job;

  return {
    title: job.seoTitle || job.title,
    description: job.seoDescription || job.description,
    openGraph: {
      title: job.title,
      description: job.description,
    },
    alternates: {
      canonical: `/govtjobs/${params.slug}`,
    },
  };
}

export default async function GovtJobDetailsPage({ params }: { params: { slug: string } }) {

  const title = (
    Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  )?.replace(/-/g, " ");
 
  const res = await fetch(`${API_BASE}/api/govtjobs/${title}`, { cache: "no-store" });
  const data = await res.json();
  const job = data.job;

  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.eligibilityCriteria.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML
    datePosted: job.createdAt,
    hiringOrganization: {
      "@type": "Organization",
      name: job.category,
      sameAs: job.officialLink || "",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "",
        addressRegion: job.state,
        addressCountry: "IN",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      value: {
        "@type": "QuantitativeValue",
        value: job.salary
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

      <GovtJobDetailsClient job={job} />
    </>
  );
}
