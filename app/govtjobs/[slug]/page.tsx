'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Clock, DollarSign, X, CheckCircle, IndianRupee, Euro, Eye, FileText, Upload, ArrowUpRightFromCircle, Building2, User, SquareArrowOutUpRight } from 'lucide-react';
import Footer from '@/components/Footer';

type Salary = { min: number; max: number; currency: string; period: string };

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
  selectionProcess: string;
  howToApply: string;
  startDateToApply: string;
  lastDateToApply: string;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GovtJobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const title = (Array.isArray(params?.slug) ? params.slug[0] : params?.slug)?.replace(/-/g, ' ');

  const [job, setJob] = useState<GovtJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);


   const fetchJob = async () => {
     try {
       setLoading(true);
       const res = await fetch(`${API_BASE}/api/govtjobs/${title}`);
       if (!res.ok) throw new Error('Job not found');
       const data = await res.json();
       setJob(data.job);
     } catch (e) {
       setError('Failed to load job');
     } finally {
       setLoading(false);
     }
   };
  useEffect(() => {
    if (!title) return;
    fetchJob();
  }, [title]);



    const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading job…</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">Job not found</p>
          <button onClick={() => router.push('/govtjobs')} className="bg-[#9333E9] text-white px-5 py-2 rounded-lg">Back to Jobs</button>
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
                <span className="flex items-center"><Building2 className="w-4 h-4 mr-2 text-purple-500" />{job.category}</span>
                <span className="flex items-center">{job.salary}</span>
              </div>
                <span className="flex items-center text-gray-500 mt-2"><MapPin className="w-4 h-4 mr-2 text-purple-500" />{job.state}</span>
                <span className="flex items-center text-gray-500 mt-2"><User className='w-4 h-4 mr-2 text-purple-500'/> {job.totalPosts} Posts</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className={`bg-purple-600 flex justify-center items-center gap-1 text-white px-5 py-2 rounded-lg cursor-pointer`}>
                {'Apply Now'}
                <SquareArrowOutUpRight className='w-4 h-4'/>
              </a>
              <a href={job.officialLink} target="_blank" rel="noopener noreferrer" className={`bg-purple-600 flex justify-center items-center gap-1 text-white px-5 py-2 rounded-lg cursor-pointer`}>
                {'Website'}
                <SquareArrowOutUpRight className='w-4 h-4'/>
              </a>
              <a href={job.notificationLink} target="_blank" rel="noopener noreferrer" className={`bg-purple-600 flex justify-center gap-1 items-center text-white px-5 py-2 rounded-lg cursor-pointer`}>
                {'Notification'}
                <SquareArrowOutUpRight className='w-4 h-4'/>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {job.eligibilityCriteria && 
                <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                    <h2 className="text-xl font-semibold mb-3">Eligibility Criteria</h2>
                    {/* <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p> */}
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.eligibilityCriteria }} />
                </section>
                }

                {job.selectionProcess &&
                    <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                        <h2 className="text-xl font-semibold mb-3">Selection Process</h2>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.selectionProcess }} />
                    </section>
                }

                {job.howToApply &&
                <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                  <h2 className="text-xl font-semibold mb-3">How to Apply</h2>
                       <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.howToApply }} />
                </section>
                }
            </div>
            <aside className="space-y-6">
              <div className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                <h3 className="text-lg font-semibold mb-3">Details</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><b>Age Limit:</b> {job.ageLimit}</li>
                  <li><b>Application Fees:</b> {job.applicationFees}</li>
                  <li><b>Start Date:</b> {formatDate(job.startDateToApply)}</li>
                  <li><b>Last Date:</b> {formatDate(job.lastDateToApply)}</li>
                </ul>
              </div>
            </aside>

          </div>
        </div>
      </main>

      {submitted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
            <p className="text-lg font-semibold mb-2">Application submitted!</p>
            <p className="text-gray-600 mb-4">We’ll review and get back to you soon.</p>
            <button onClick={() => setSubmitted(false)} className="px-5 py-2 rounded-lg bg-purple-600 text-white">Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}



