import React from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   MapPin,
//   Clock,
//   DollarSign,
//   X,
//   CheckCircle,
//   IndianRupee,
//   Euro,
//   Eye,
//   FileText,
//   Upload,
//   ArrowUpRightFromCircle,
// } from "lucide-react";
// import { useUser } from "@/context/UserContext";
// import Footer from "@/components/Footer";
// import { sendMessage } from "@/lib/chat";
import { Metadata } from "next";
import JobDetailsClient from "@/components/JobDetailsClient";

// type Salary = { min: number; max: number; currency: string; period: string };

// type Job = {
//   _id: string;
//   title: string;
//   company: { _id: string; name: string; logo: string; location?: string };
//   description: string;
//   requirements: string;
//   responsibilities?: string;
//   location: string;
//   type: string;
//   category: string;
//   department?: string;
//   salary: Salary;
//   benefits?: string[];
//   skills?: string[];
//   experience?: string;
//   education?: string;
//   isRemote?: boolean;
//   createdAt: string;
//   views: number;
//   applications: Array<any>;
//   thirdpartyapply?: string;
// };

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(`${API_BASE}/api/jobs/${params.id}`, { cache: "no-store" });
  const data = await res.json();
  const job = data.job;

  return {
    title: `${job.title} - ${job.company.name}`,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
    },
    // ✅ Proper JobPosting JSON-LD
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
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
      }),
    },
  };
}


export default async function JobDetailsPage({ params }: { params: { id: string } }) {

  const res = await fetch(`${API_BASE}/api/jobs/${params.id}`, { cache: "no-store" });
  const data = await res.json();
  const job = data.job;

  return <JobDetailsClient job={job} />;
  // const router = useRouter();
  // const params = useParams();
  // const id = params?.id as string;

  // const { user } = useUser();

  // const [job, setJob] = useState<Job | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [showApply, setShowApply] = useState(false);
  // const [submitting, setSubmitting] = useState(false);
  // const [coverLetter, setCoverLetter] = useState("");
  // const [phone, setPhone] = useState("");
  // const [location, setLocation] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  // const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  // const [isApplied, setIsApplied] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  // const [showResumeField, setShowResumeField] = useState(false);
  // const [file, setFile] = useState<File | null>(null);
  // const [text, setText] = useState("");

  // const fetchJob = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(`${API_BASE}/api/jobs/${id}`);
  //     if (!res.ok) throw new Error("Job not found");
  //     const data = await res.json();
  //     console.log(data);
  //     setJob(data.job);
  //   } catch (e) {
  //     setError("Failed to load job");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (!id) return;
  //   fetchJob();
  // }, [id]);

  // useEffect(() => {
  //   if (job && user) {
  //     job.applications.forEach((app) => {
  //       if (app.user?._id == user._id) {
  //         setIsApplied(true);
  //       }
  //     });
  //   }

  //   if (user?.profile?.resume) {
  //     setShowResumeField(true);
  //   }
  // }, [job, user]);

  // const handleSend = async () => {
  //   if (user?._id && user.profile?.name && job?._id && job.company.name) {
  //     await sendMessage(
  //       user?._id,
  //       user?.profile?.name,
  //       job?._id,
  //       job.company.name,
  //       text
  //     );
  //     setText("");
  //   }
  // };

  // const formatSalary = (s: Salary) =>
  //   `${Math.round(s.min / 1000)}k - ${Math.round(s.max / 1000)}k ${s.period}`;

  // const submitApplication = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!id) return;

  //   const formData = new FormData();

  //   // Always create formData and append profile data as JSON string
  //   formData.append(
  //     "jobData",
  //     JSON.stringify({
  //       location,
  //       phone,
  //       coverLetter,
  //     })
  //   );

  //   // Append resume file if it exists
  //   if (file) {
  //     formData.append("resume", file);
  //   }

  //   try {
  //     setSubmitting(true);
  //     const res = await axios.post(
  //       `${API_BASE}/api/jobs/${id}/apply`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       setCoverLetter("");
  //       setSubmitted(true);
  //       setShowApply(false);
  //       fetchJob();
  //     }
  //     // refresh stats (applications count)
  //     fetchJob();
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       setError(error.response?.data?.error);
  //     }
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // const isLoggedIn = async () => {
  //   if (user && user.email) {
  //     if (job?.thirdpartyapply) {
  //       router.push(job.thirdpartyapply);
  //     } else {
  //       setShowApply(true);
  //     }
  //   } else {
  //     setShowLoginPrompt(true);
  //   }
  // };

  // const handleFileChange = (e: any) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setFile(file);
  //     console.log("File selected:", file.name);
  //     setShowResumeField(true);
  //   }
  // };

  // const handleDragOver = (e: any) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = () => {
  //   setIsDragging(false);
  // };

  // const handleDrop = (e: any) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const file = e.dataTransfer.files?.[0];
  //   if (file) {
  //     setFile(file);
  //     setShowResumeField(true);
  //   }
  // };

  // const getCurrencyIcon = (currency: string) => {
  //   switch (currency) {
  //     case "USD":
  //       return <DollarSign className="w-4 h-4 mr-1 text-purple-500" />;
  //     case "INR":
  //       return <IndianRupee className="w-4 h-4 mr-1 text-purple-500" />;
  //     case "EUR":
  //       return <Euro className="w-4 h-4 mr-1 text-purple-500" />;
  //     default:
  //       return <DollarSign className="w-4 h-4 mr-1 text-purple-500" />; // fallback
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto" />
  //         <p className="mt-4 text-gray-600">Loading job…</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!job) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-xl font-semibold text-gray-900 mb-2">
  //           Job not found
  //         </p>
  //         <button
  //           onClick={() => router.push("/jobs")}
  //           className="bg-[#9333E9] text-white px-5 py-2 rounded-lg"
  //         >
  //           Back to Jobs
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  
}
