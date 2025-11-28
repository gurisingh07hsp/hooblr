"use client";

import React, { useEffect, useState } from "react";
import {useRouter } from "next/navigation";
import {
  MapPin,
  CheckCircle,
  Building2,
  User,
  SquareArrowOutUpRight,
  IndianRupee,
  Calendar,
} from "lucide-react";
import Footer from "@/components/Footer";
import axios from "axios";

interface GovtJob {
  _id: string;
  title: string;
  officialLink: string;
  applyLink: string;
  notificationLink: string;
  state: string;
  category: string;
  eligibilityCriteria: string;
  ageLimit: string;
  totalPosts: string;
  salary: string;
  applicationFees: string;
  description: string;
  selectionProcess: string;
  howToApply: string;
  startDateToApply: string;
  lastDateToApply: string;
  createdAt: string;
}

const GovtJobDetailsClient = ({ job }: { job: GovtJob }) => {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [similarJobs, setSimilarJobs] = useState<GovtJob[]>([]);

      useEffect(()=> {
    fetchSimilarJobs();
  },[job])

  const fetchSimilarJobs = async() => {
    try {
      const params = new URLSearchParams({
        page: String(1),
        limit: "20",
        category: job.category,
      });

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs?${params.toString()}`
      );

      const similarjobs = res.data.jobs;
      setSimilarJobs(similarjobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  }
    
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      };
    
      if (!job) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900 mb-2">
                Job not found
              </p>
              <button
                onClick={() => router.push("/govtjobs")}
                className="bg-[#9333E9] text-white px-5 py-2 rounded-lg"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        );
      }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 rounded-xl shadow-lg border border-purple-200 p-4 mb-8">
            <div className="flex border-b pb-4">
              <div className="ms-2">
                <p className="font-bold text-lg">{job.title}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="mt-3 flex gap-3 text-gray-700">
                <span className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-purple-500" />
                  {job.category}
                </span>
              </div>
              <span className="flex items-center text-gray-500 mt-2">
                <IndianRupee className="w-4 h-4 mr-2 text-purple-500" />
                {job.salary}
              </span>
              <span className="flex items-center text-gray-500 mt-2">
                <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                {job.state}
              </span>
              <span className="flex items-center text-gray-500 mt-2">
                <User className="w-4 h-4 mr-2 text-purple-500" />{" "}
                {job.totalPosts} Posts
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-purple-600 flex justify-center items-center gap-1 text-white px-5 py-2 rounded-lg cursor-pointer`}
              >
                {"Apply Now"}
                <SquareArrowOutUpRight className="w-4 h-4" />
              </a>
              <a
                href={job.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-purple-600 flex justify-center items-center gap-1 text-white px-5 py-2 rounded-lg cursor-pointer`}
              >
                {"Website"}
                <SquareArrowOutUpRight className="w-4 h-4" />
              </a>
              <a
                href={job.notificationLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-purple-600 flex justify-center gap-1 items-center text-white px-5 py-2 rounded-lg cursor-pointer`}
              >
                {"Notification"}
                <SquareArrowOutUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col-reverse gap-6">
            <div className="space-y-6 w-full">
              {job.description && (
                <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                  <h2 className="text-xl font-semibold mb-3">
                    About Job
                  </h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: job.description,
                    }}
                  />
                </section>
              )}
              {job.eligibilityCriteria && (
                <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                  <h2 className="text-xl font-semibold mb-3">
                    Eligibility Criteria
                  </h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: job.eligibilityCriteria,
                    }}
                  />
                </section>
              )}

              {job.selectionProcess && (
                <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                  <h2 className="text-xl font-semibold mb-3">
                    Selection Process
                  </h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: job.selectionProcess }}
                  />
                </section>
              )}

              {job.howToApply && (
                <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                  <h2 className="text-xl font-semibold mb-3">How to Apply</h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: job.howToApply }}
                  />
                </section>
              )}
              {similarJobs.length > 1 && (
              <div className="bg-white rounded-2xl border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
                <div className="space-y-4 max-h-72 overflow-auto">
                  {similarJobs?.map((sjob) => (
                    <div key={sjob._id} className={`${sjob._id == job._id && 'hidden'} border border-gray-200 rounded-xl p-6`}>
                      <div className="flex lg:flex-row flex-col items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{sjob.title}</h3>
                          <div className="flex lg:flex-row flex-col gap-2 lg:items-center text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {sjob.state}
                            </div>
                            <div className="flex items-center">
                               <User className="w-4 h-4 mr-2 text-purple-500" />
                              {sjob.totalPosts} Posts
                            </div>
                            <div className="flex items-center">
                              <IndianRupee className="w-4 h-4 mr-1" />
                              {sjob.salary}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            Posted {sjob.createdAt ? new Date(sjob.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }) : "just now"}
                          </div>
                        </div>
                        <button onClick={()=> router.push(`/govtjobs/${sjob.title}`)} className="bg-[#9333E9] mt-3 lg:mt-0 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>
            <aside className="space-y-6">
              <div className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                <h3 className="text-lg font-semibold mb-3">Details</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    <b>Age Limit:</b> {job.ageLimit}
                  </li>
                  <li>
                    <b>Application Fees:</b> {job.applicationFees}
                  </li>
                  <li>
                    <b>Start Date:</b> {formatDate(job.startDateToApply)}
                  </li>
                  <li>
                    <b>Last Date:</b> {formatDate(job.lastDateToApply)}
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {submitted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold mb-2">Application submitted!</p>
            <p className="text-gray-600 mb-4">
              We’ll review and get back to you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2 rounded-lg bg-purple-600 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default GovtJobDetailsClient
