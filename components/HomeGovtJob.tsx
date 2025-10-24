import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
const HomeGovtJobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [seeJobs, setSeeJobs] = React.useState(6);
  const [selectedState, setSelectedState] = React.useState("Andhra Pradesh");



  const fetchJobs = async (pageNumber: number) => {
    try {
      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: "20",
        state: selectedState,
      });

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/govtjobs?${params.toString()}`
      );

      const newJobs = res.data.jobs;
      setJobs((prev) => (pageNumber === 1 ? newJobs : [...prev, ...newJobs]));
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  React.useEffect(() => {
    fetchJobs(1);
  }, [selectedState]);

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <h2 className="lg:text-[48px] text-3xl font-medium mb-14">
          <span className="text-purple-600">Latest</span>{" "}
          <span className="text-gray-900">Govt Job Opportunity</span>
        </h2>

        {/* Category Filters */}
        <div className="flex flex-nowrap lg:flex-wrap w-full gap-2 lg:gap-3 mb-8 bg-[#F5F5F5] rounded-3xl px-2 py-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
          {[
            "Andhra Pradesh",
            "Bihar",
            "Gujarat",
            "Haryana",
            "Maharashtra",
            "Punjab",
            "Rajasthan",
            "Chandigarh",
            "Delhi",
          ].map((category, index) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedState(category);
              }}
              key={index}
              className={`px-4 lg:px-5 py-1.5 lg:py-1 rounded-full font-medium text-sm lg:text-base whitespace-nowrap transition-all flex-shrink-0 ${
                category == selectedState
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
                  {job.state}
                </p>
              </div>

              {/* Posted & Applicants */}
              <div
                className={`flex items-center gap-2 text-sm mb-6 group-hover:text-purple-100 text-gray-600`}
              >
                <span>
                  {new Date(job.startDateToApply).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{new Date(job.lastDateToApply).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
              </div>

              <div className="space-y-2">
                <p><b>Age Limit: </b>{job.ageLimit}</p>
                <p><b>Application Fees: </b>{job.applicationFees}</p>
                <p><b>Total Posts: </b>{job.totalPosts}</p>

              </div>

              {/* Apply Button & Salary */}
              <div className="mb-2 border-gray-300">
                <div
                  className={`lg:text-right mb-4 mt-4 group-hover:text-white flex items-center text-purple-600`}
                >
                  <p className="text-lg font-bold">{job.salary}</p>
                </div>
                <button
                  onClick={()=> router.push(`/govtjobs/${job.title.replace(/\s+/g, '-')}`)}
                  className={`lg:px-6 px-2 py-2 rounded-full font-semibold transition-all hover:scale-105 group-hover:bg-white group-hover:text-purple-600 hover:shadow-lg bg-purple-600 text-white`}
                >
                  Apply Now
                </button>
            
              </div>

              {/* Company Info */}
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

export default HomeGovtJobs;

