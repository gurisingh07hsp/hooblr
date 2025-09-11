'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Building2, MapPin, Clock, DollarSign, ArrowLeft, Heart, Share2, X, CheckCircle } from 'lucide-react';
import Footer from '@/components/Footer';

type Salary = { min: number; max: number; currency: string; period: string };

type Job = {
  _id: string;
  title: string;
  company: { _id: string; name: string; location?: string };
  description: string;
  requirements: string;
  responsibilities?: string;
  location: string;
  type: string;
  category: string;
  department?: string;
  salary: Salary;
  benefits?: string[];
  skills?: string[];
  experience?: string;
  education?: string;
  isRemote?: boolean;
  createdAt: string;
  views: number;
  applications: Array<any>;
};

const API_BASE = 'http://localhost:5001';

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/jobs/${id}`);
        if (!res.ok) throw new Error('Job not found');
        const data = await res.json();
        setJob(data.job);
      } catch (e: any) {
        setError(e?.message || 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const formatSalary = (s: Salary) => `$${Math.round(s.min/1000)}k - $${Math.round(s.max/1000)}k ${s.period}`;

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverLetter, resume })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({} as any));
        throw new Error(j?.error || 'Failed to apply');
      }
      setSubmitted(true);
      setShowApply(false);
      // refresh stats (applications count)
      const refreshed = await fetch(`${API_BASE}/api/jobs/${id}`).then(r => r.json()).catch(() => null);
      if (refreshed?.job) setJob(refreshed.job);
    } catch (e: any) {
      setError(e?.message || 'Failed to apply');
    } finally {
      setSubmitting(false);
    }
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

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">Job not found</p>
          <p className="text-gray-600 mb-6">{error || 'Please try again later.'}</p>
          <button onClick={() => router.push('/jobs')} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg">Back to Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-purple-200 fixed w-full top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push('/jobs')} className="flex items-center text-gray-600 hover:text-purple-600">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Jobs
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-red-500"><Heart className="w-5 h-5" /></button>
              <button className="p-2 text-gray-400 hover:text-purple-500"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 rounded-xl shadow-lg border border-purple-200 p-6 mb-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-gray-700">
                <span className="flex items-center"><Building2 className="w-4 h-4 mr-2 text-purple-500" />{job.company.name}</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-purple-500" />{job.location}</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-purple-500" />{job.type.replace('-', ' ')}</span>
                <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1 text-purple-500" />{formatSalary(job.salary)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowApply(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg">Apply Now</button>
              <span className="text-sm text-gray-500">Views: {job.views} • Applications: {job.applications.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
              </section>
              <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.requirements}</p>
              </section>
              {job.responsibilities && (
                <section className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                  <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
                </section>
              )}
            </div>
            <aside className="space-y-6">
              <div className="bg-white/80 rounded-xl shadow border border-purple-200 p-6">
                <h3 className="text-lg font-semibold mb-3">Details</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Category: {job.category.replace('-', ' ')}</li>
                  {job.department && <li>Department: {job.department}</li>}
                  {job.experience && <li>Experience: {job.experience}</li>}
                  {job.education && <li>Education: {job.education}</li>}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {showApply && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">Apply for {job.title}</h3>
              <button onClick={() => setShowApply(false)} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={submitApplication} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={6} className="w-full border rounded-lg px-3 py-2" placeholder="Why are you a great fit?" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume / Summary</label>
                <textarea value={resume} onChange={(e) => setResume(e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2" placeholder="Paste resume or short experience summary" required />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowApply(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-60">{submitting ? 'Submitting…' : 'Submit Application'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {submitted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
            <p className="text-lg font-semibold mb-2">Application submitted!</p>
            <p className="text-gray-600 mb-4">We’ll review and get back to you soon.</p>
            <button onClick={() => setSubmitted(false)} className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}


