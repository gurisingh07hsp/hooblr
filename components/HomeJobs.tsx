import { Job } from "@/types/user";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Euro,
  IndianRupee,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
const HomeJobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [seeJobs, setSeeJobs] = React.useState(6);
  const [selectedCategory, setSelectedCategory] =
    React.useState("Technology & IT");

  const formatSalary = (s: any) =>
    `${Math.round(s.min / 1000)}k - ${Math.round(s.max / 1000)}k ${s.period}`;

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case "USD":
        return <DollarSign className="w-4 h-4 mr-1" />;
      case "INR":
        return <IndianRupee className="w-4 h-4 mr-1" />;
      case "EUR":
        return <Euro className="w-4 h-4 mr-1" />;
      default:
        return <DollarSign className="w-4 h-4 mr-1" />;
    }
  };

  const fetchJobs = async (pageNumber: number) => {
    try {
      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: "20",
        category: selectedCategory,
      });

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${params.toString()}`
      );

      const newJobs = res.data.jobs;
      console.log(newJobs);
      setJobs((prev) => (pageNumber === 1 ? newJobs : [...prev, ...newJobs]));
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  React.useEffect(() => {
    fetchJobs(1);
  }, [selectedCategory]);

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <h2 className="lg:text-[48px] text-3xl font-medium mb-14">
          <span className="text-purple-600">Latest</span>{" "}
          <span className="text-gray-900">Job Opportunity</span>
        </h2>

        {/* Category Filters */}
        <div className="flex flex-nowrap lg:flex-wrap w-full gap-2 lg:gap-3 mb-8 bg-[#F5F5F5] rounded-3xl px-2 py-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
          {[
            "Technology & IT",
            "Finance & Banking",
            "Healthcare",
            "Education",
            "Design & Creative",
            "Sales & Marketing",
            "Human Resources",
          ].map((category, index) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(category);
              }}
              key={index}
              className={`px-4 lg:px-5 py-1.5 lg:py-1 rounded-full font-medium text-sm lg:text-base whitespace-nowrap transition-all flex-shrink-0 ${
                category == selectedCategory
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.slice(0, seeJobs).map((job, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 border transition-all hover:shadow-lg hover:text-white hover:bg-gradient-to-br from-purple-600 to-purple-500 border-[#B683F5] group`}
            >
              {/* Job Title & Location */}
              <div className="mb-4">
                <h3
                  className={`text-2xl font-bold mb-1 text-gray-900 group-hover:text-white`}
                >
                  {job.title}
                </h3>
                <p
                  className={`text-sm italic group-hover:text-purple-100 text-gray-500}`}
                >
                  {job.location}
                </p>
              </div>

              {/* Job Details Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white bg-gray-100 text-gray-700`}
                >
                  {job.type}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white bg-gray-100 text-gray-700`}
                >
                  {job.experience}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white bg-gray-100 text-gray-700`}
                >
                  {job.education}
                </span>
              </div>

              {/* Posted & Applicants */}
              <div
                className={`flex items-center gap-2 text-sm mb-6 group-hover:text-purple-100 text-gray-600`}
              >
                <span>
                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{job?.applications?.length || 0} Aplicants</span>
              </div>

              {/* Apply Button & Salary */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-dashed border-gray-300">
                <button
                  onClick={() => router.push(`/jobs/${job._id}`)}
                  className={`lg:px-6 px-2 py-2 rounded-full font-semibold transition-all hover:scale-105 group-hover:bg-white group-hover:text-purple-600 hover:shadow-lg bg-purple-600 text-white`}
                >
                  Apply Now
                </button>
                <div
                  className={`lg:text-right group-hover:text-white flex items-center text-purple-600`}
                >
                  <p>{getCurrencyIcon(job.salary.currency)}</p>
                  <p className="text-lg font-bold">{`${formatSalary(
                    job.salary
                  )}`}</p>
                </div>
              </div>

              {/* Company Info */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex justify-center items-center group-hover:bg-white group-hover:bg-opacity-20 bg-gray-200`}
                >
                  <img
                    className={`${
                      job?.company?.logo ? "block" : "hidden"
                    } rounded-full`}
                    src={job?.company?.logo}
                    alt="company logo"
                  />
                </div>
                <div>
                  <p
                    className={`font-semibold group-hover:text-white text-gray-900`}
                  >
                    {job?.company?.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          {jobs?.length > 6 ? (
            <button
              onClick={() => setSeeJobs(9)}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all hover:shadow-lg"
            >
              See More Jobs
              <ChevronDown className="w-5 h-5" />
            </button>
          ) : (
            <div>
              {seeJobs == 9 && (
                <button
                  onClick={() => setSeeJobs(6)}
                  className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all hover:shadow-lg"
                >
                  See More Jobs
                  <ChevronUp className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeJobs;
