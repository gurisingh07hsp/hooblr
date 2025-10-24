"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Building2,
  ChevronRight,
  Filter,
  Briefcase,
} from "lucide-react";
import axios from "axios";

interface Company {
  _id: number;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  rating: number;
  reviewCount: number;
  jobs: [];
  website: string;
  featured?: boolean;
}

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);

  const [filteredCompanies, setFilteredCompanies] =
    useState<Company[]>(companies);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    size: "",
    search: "",
  });

  const industries = [
    "Technology & IT",
    "Government & Public Sector",
    "Healthcare & Medical",
    "Finance & Banking",
    "Education & Training",
    "Design & Creative",
    "Manufacturing",
    "Consulting",
  ];

  const companySizes = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  const getCompanies = async (pageNumber: number, filters: any) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: "20",
        location: selectedLocation,
        industry: selectedIndustry,
        ...(filters.size && { size: filters.size }),
        ...(filters.search && { search: filters.search }),
      });
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/companies/?${params.toString()}`
      );

      if (response.status == 200) {
        const newCompanies = response.data.companies;
        setCompanies(response.data.companies);
        setFilteredCompanies((prev) =>
          pageNumber === 1 ? newCompanies : [...prev, ...newCompanies]
        );
        setHasMore(pageNumber < response.data.pagination.pages);
        setFilteredCompanies(response.data.companies);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Reload jobs when filters change
  useEffect(() => {
    setPage(1);
    getCompanies(1, filters);
  }, [filters, selectedIndustry, selectedLocation]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const el = document.getElementById("load-more");
    if (el) observer.observe(el);

    return () => {
      const el = document.getElementById("load-more");
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      getCompanies(page, filters);
    }
  }, [page]);

  useEffect(() => {
    console.log("companies : ", companies);
  }, [companies]);

  const clearFilters = () => {
    setSelectedLocation("");
    setSelectedIndustry("");
    setFilters({
      size: "",
      search: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Companies
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore top companies from innovative startups to established
              government agencies. Find your perfect workplace and build your
              career.
            </p>

            {/* Search Section */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="Company name"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                  />
                </div>

                <div className="relative flex items-center">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                  >
                    <option value="">All Industries</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] text-black placeholder:text-black rounded-3xl focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6D47F1] mb-1">
                {companies.length}
              </div>
              <div className="text-sm text-gray-600 text-center px-3">
                Total Companies
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6D47F1] mb-1">
                {companies.filter((c) => c.featured).length}
              </div>
              <div className="text-sm text-gray-600 text-center px-3">
                Featured Companies
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6D47F1] mb-1">
                {companies.reduce((sum, c) => sum + c.jobs?.length, 0)}
              </div>
              <div className="text-sm text-gray-600 text-center px-3">
                Open Positions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8  bg-[#f8fafc]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/5 lg:block hidden">
            <div className="bg-white rounded-2xl shadow-lg border p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <div className="border mr-2 rounded-full w-10 h-10 flex items-center justify-center">
                    <Filter className="w-5 h-5" />
                  </div>
                  Filter
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-[#6D47F1] border px-3 py-2 rounded-3xl text-sm font-medium"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-6">
                <div className="border-t-2 pt-4">
                  <label className="block text-sm font-semibold mb-3">
                    Company Size
                  </label>

                  {companySizes.map((t) => (
                    <label
                      key={t}
                      className="flex items-center p-2 rounded-lg hover:bg-[#FAFAFA] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="size"
                        value={t}
                        checked={filters.size === t}
                        onChange={(e) =>
                          setFilters({ ...filters, size: e.target.value })
                        }
                        className=" w-5 h-5 border-2 rounded-full accent-[#6D47F1] cursor-pointer border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {t} employees
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters - Horizontal Scroll */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between mb-4 px-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <div className="border mr-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <Filter className="w-5 h-5" />
                </div>
                Filter
              </h3>
              <button
                onClick={clearFilters}
                className="text-[#6D47F1] border px-3 py-2 rounded-3xl text-sm font-medium"
              >
                Reset
              </button>
            </div>

            <div className="flex-shrink-0">
              <select
                value={filters.size}
                onChange={(e) =>
                  setFilters({ ...filters, size: e.target.value })
                }
                className="px-4 py-2 border border-purple-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Company Size</option>
                {companySizes.map((s, index) => (
                  <option key={index} value={s}>
                    {s} employees
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Company Listings */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {filteredCompanies.length} Companies Found
              </h2>
            </div>
            <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 bg-[#f8fafc]">
              {filteredCompanies.map((company) => (
                <div
                  key={company._id}
                  className="w-full bg-white rounded-2xl border p-2"
                >
                  <div className="flex border-b pb-4">
                    <div
                      onClick={() => router.push(`/companies/${company._id}`)}
                      className="w-14 h-14 rounded-xl border flex justify-center items-center px-1 cursor-pointer"
                    >
                      <img
                        className={company?.logo ? "block" : "hidden"}
                        src={company?.logo}
                        alt="company logo"
                      />
                    </div>
                    <div className="ms-2">
                      <p>{company?.name}</p>
                      {company.featured && (
                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-x-3 items-center">
                      <div className="px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm">
                        {company.industry}
                      </div>
                      <div className="px-4 py-1 text-[#6D47F1] bg-[#F4F4F4] rounded-3xl text-sm">
                        {company.size} employees
                      </div>
                    </div>

                    <div className="mt-4 ms-4 text-neutral-500">
                      <div className="mt-2 flex items-center gap-1">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_2011_417"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          >
                            <rect
                              y="3.05176e-05"
                              width="24"
                              height="24"
                              fill="#D9D9D9"
                            />
                          </mask>
                          <g mask="url(#mask0_2011_417)">
                            <path
                              d="M12.0017 11.8654C12.4993 11.8654 12.9247 11.6882 13.2779 11.3339C13.6311 10.9796 13.8077 10.5536 13.8077 10.056C13.8077 9.55845 13.6305 9.13306 13.2762 8.77986C12.9218 8.42666 12.4959 8.25006 11.9983 8.25006C11.5007 8.25006 11.0753 8.42723 10.7221 8.78156C10.3689 9.13589 10.1923 9.56185 10.1923 10.0594C10.1923 10.557 10.3695 10.9824 10.7238 11.3356C11.0782 11.6888 11.5041 11.8654 12.0017 11.8654ZM12 21.5096C9.48335 19.3288 7.59618 17.2994 6.33848 15.4212C5.08079 13.543 4.45195 11.8186 4.45195 10.2481C4.45195 7.94044 5.19843 6.07219 6.69138 4.64334C8.18431 3.21449 9.95385 2.50006 12 2.50006C14.0462 2.50006 15.8157 3.21449 17.3086 4.64334C18.8016 6.07219 19.548 7.94044 19.548 10.2481C19.548 11.8186 18.9192 13.543 17.6615 15.4212C16.4038 17.2994 14.5167 19.3288 12 21.5096Z"
                              fill="#F87171"
                            />
                          </g>
                        </svg>
                        <p className="ms-1">{company.location}</p>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {company.jobs?.length} open jobs
                      </div>

                      <div className="mt-2 h-14">
                        <p>
                          {company.description.slice(0, 100)}{" "}
                          {company.description.length > 100 && "..."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pb-2 px-2">
                    <button
                      onClick={() => router.push(`/companies/${company._id}`)}
                      className="px-4 py-1 border rounded-3xl text-[#6D47F1]"
                    >
                      View Jobs
                    </button>
                    <button
                      onClick={() => router.push(`/companies/${company._id}`)}
                      className="text-neutral-500 flex items-center hover:text-[#6D47F1] text-sm"
                    >
                      Company Profile
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </section>

            {loading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#6D47F1] mx-auto" />
                <p className="mt-4 text-gray-600">Loading Companies…</p>
              </div>
            )}

            {/* {loading && <p>Loading...</p>} */}
            <div id="load-more" className="h-10"></div>
            {!hasMore && filteredCompanies.length !== 0 && (
              <p className="text-gray-500 ms-4">No more jobs</p>
            )}

            {!loading && filteredCompanies.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No companies found
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
