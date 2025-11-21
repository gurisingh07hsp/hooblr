'use client';
import React, { useState, useEffect } from 'react'
import { Search, MapPin, Briefcase, IndianRupee } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

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

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface PageProps {
  params: {
    category: string;
  };
}
const SearchGovtjobsPage = ({ params }: PageProps) => {
    const router = useRouter();
  const [jobs, setJobs] = useState<GovtJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  const category = capitalizeWords(
    decodeURIComponent(params.category.replace(/-/g, " "))
  );

  console.log(category);
  // Filters
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "State Govt Jobs",
    "Bank Jobs",
    "Teaching Jobs",
    "Engineering Jobs",
    "Railway Jobs",
    "Police Jobs",
    "Defence Jobs",
  ];

  const indianStates = [
    // States
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    // Union Territories
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(() => {
    fetchJobs();
  }, [pagination.page, selectedCategory, selectedState, searchQuery]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedState && { state: selectedState }),
        ...(searchQuery && { search: searchQuery }),
      });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs?${params}`
      );
      const data = await response.data.jobs;
      console.log(data);

      setTimeout(() => {
        setJobs(data);
        setPagination((prev) => ({
          ...prev,
          total: data.length,
          pages: Math.ceil(data.length / prev.limit),
        }));
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysRemaining = (lastDate: string) => {
    const today = new Date();
    const deadline = new Date(lastDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
     <div className="min-h-screen mt-16 bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white py-5 border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <div className=" overflow-x-auto">
            <div className="flex justify-center mx-auto gap-2 py-3 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    router.push(`${cat.replace(/\s+/g, "-").toLowerCase()}`)
                  }
                  className={`px-4 py-2 rounded font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                <input
                  type="text"
                  placeholder="Find Job"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                />
              </div>

              <div className="relative flex items-center">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                >
                  <option className="bg-white" value="All India">
                    All India
                  </option>
                  {indianStates.map((state) => (
                    <option key={state} className="bg-white" value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative flex items-center">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                >
                  <option className="bg-white" value="">
                    Recruitment Board
                  </option>
                  {categories.map((category) => (
                    <option
                      className="bg-white"
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 h-[100vh]">
        <div className="max-w-7xl mx-auto">
          {/* Job Listings */}
          <main>
            {/* Job Cards */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D47F1]"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500 text-lg">
                  No jobs found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                {jobs.map((job) => {
                  const daysRemaining = getDaysRemaining(job.lastDateToApply);
                  return (
                    <article
                      key={job._id}
                      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#6D47F1] cursor-pointer">
                            <p
                              onClick={() =>
                                router.push(`/govtjobs/${job.title}`)
                              }
                            >
                              {job.title}
                            </p>
                          </h2>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="flex items-center px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.state}
                            </span>
                            <span className="flex items-center px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.category}
                            </span>
                          </div>
                        </div>
                        {daysRemaining >= 0 ? (
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              daysRemaining <= 5
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {daysRemaining === 0
                              ? "Last Day"
                              : `${daysRemaining} days left`}
                          </div>
                        ) : (
                          <div className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                            Closed
                          </div>
                        )}
                      </div>
                      <hr className="my-4" />
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">
                            <strong>Age Limit:</strong> {job.ageLimit}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <strong>Application Fee:</strong>{" "}
                            {job.applicationFees}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <strong>Start Date:</strong>{" "}
                            {formatDate(job.startDateToApply)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <strong>Last Date:</strong>{" "}
                            {formatDate(job.lastDateToApply)}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <strong>Salary: </strong>
                          <span className="flex items-center">
                            <IndianRupee className="w-4 h-4" />
                            {job.salary}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                          <strong>Total Posts: </strong>
                          <span className="flex items-center">
                            {job.totalPosts}
                          </span>
                        </p>
                      </div>

                      <div className="flex gap-3 border-t pt-2">
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-[#6D47F1] text-white rounded-lg transition-colors font-medium"
                        >
                          Apply Now
                        </a>
                        <button
                          onClick={() =>
                            router.push(
                              `/govtjobs/${job.title.replace(/\s+/g, "-")}`
                            )
                          }
                          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  disabled={pagination.page === 1}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from(
                  { length: Math.min(5, pagination.pages) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, page: pageNum }))
                        }
                        className={`px-4 py-2 rounded-lg ${
                          pagination.page === pageNum
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
                <button
                  disabled={pagination.page === pagination.pages}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default SearchGovtjobsPage
