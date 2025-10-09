'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ChevronDown,
  ArrowRight,
  DollarSign,
  IndianRupee,
  Euro,
  ChevronUp
} from 'lucide-react';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Job } from '@/types/user';
import axios from 'axios';
import SearchComponent from '@/components/SearchComponent';

export default function Home() {
  const router = useRouter();
  const [jobs,setJobs] = useState<Job[]>([]);
  const [seeJobs, setSeeJobs] = useState(6);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Technology & IT');


  const partnerlogos = [
  "/Logo1.png",
  "/Logo2.png",
  "/Logo3.png",
  "/Logo.png",
  "/Logo4.png", 
  "/Logo3.png",
  "/Logo.png", // repeat for seamless loop
];

    const [categories, setCategories] = useState([
    { name: 'Technology & IT', active: true },
    { name: 'Finance & Banking', active: false },
    { name: 'Healthcare', active: false },
    { name: 'Education', active: false },
    { name: 'Design & Creative', active: false },
    { name: 'Sales & Marketing', active: false },
    { name: 'Human Resources', active: false },
  ]);

   const formatSalary = (s: any) => `${Math.round(s.min/1000)}k - ${Math.round(s.max/1000)}k ${s.period}`;

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
    // if (loading) return;
    // setLoading(true);

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

  useEffect(()=>{
    fetchJobs(1);
  },[selectedCategory]);


  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="relative max-w-7xl px-4 mx-auto flex lg:flex-row flex-col gap-y-8">
          <div>
          <div className='font-medium text-[16px] flex items-center gap-x-6'>
            <Image src='/Metric Container.png' alt='Metric Container' width={38} height={38}/>
            Inclusive workplaces for all.
            </div>
          <div className='lg:w-[676px] mt-6'>
            <div className='lg:text-[64px] text-4xl text-center lg:text-left font-semibold leading-tight'><span className='text-[#8A38EE]'>Job Finder</span> with Diversity Focus.</div>
          </div>
        <div className='lg:w-[27rem] text-[#5F5270] text-[20px] mt-8'>
          <p className='text-center lg:text-left'>Find jobs at companies focused on diversity and inclusion that match your values.</p>
        </div>

        <SearchComponent/>
        
        {/* <div className="flex border-2 lg:w-[33rem] mt-12 items-center px-2 lg:gap-x-3 gap-x-2 h-[74px] rounded-[37px] bg-[#F5F5F5]"> */}

      {/* Search Input */}
      {/* <div className="border-r">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          className="lg:px-2 bg-[#F5F5F5] lg:w-36 w-36 border-none placeholder:text-sm placeholder-gray-400 focus:outline-none"
        />
      </div>

<div className="border-r">
  <input
    type="text"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    placeholder="ex. graphic designer"
    className="lg:px-1 bg-[#F5F5F5] lg:w-40 w-36 border-none placeholder:text-sm placeholder-gray-400 focus:outline-none"
  />
</div> */}

        {/* Find Your Job Button */}
      {/* <button onClick={()=> router.push(`/jobs/location/${location}?category=IT-Education`)} className="flex items-center lg:gap-1 gap-1 bg-[#8A38EE] text-white lg:px-4 py-4 rounded-[46px] font-semibold shadow-lg shadow-purple-300">
        <span className="lg:text-[16px] text-[10px] lg:w-full w-20">Find Your Job</span>
        <div className="hidden lg:w-[28px] lg:h-[24px] border-2 border-white rounded-full lg:flex justify-center items-center">
          <Search className="w-4 h-4 font-bold" />
        </div>
      </button>

    </div> */}
    </div>

    <div className='flex relative w-full'>
      <div className='absolute z-30'>
        <svg width="254" height="550" viewBox="0 0 254 603" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M139.651 1.86913C10.5822 155.162 -52.4549 386.089 78.3089 420.73C241.764 464.031 195.595 53.5036 34.3448 293.366C-32.4924 392.788 -6.86653 601.733 253.636 599.831" stroke="url(#paint0_linear_2_22)" strokeWidth="5"/>
          <defs>
            <linearGradient id="paint0_linear_2_22" x1="238.966" y1="571.415" x2="-94.6817" y2="221.974" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0"/>
              <stop offset="0.2" stopColor="#00B3FF"/>
              <stop offset="0.4" stopColor="#8A38EE"/>
              <stop offset="0.6" stopColor="#FF0004"/>
              <stop offset="0.8" stopColor="#FF8000"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className='w-[65%] h-[470px] absolute bottom-0 right-20 bg-[#C4C4C4]'>
            <div className='bg-white absolute top-20 left-10 w-36 h-28 rounded-[20px] flex flex-col gap-y-1 justify-center items-center'>
              <p className='text-center font-medium'><span className='text-[#8A38EE]'>Free</span> Create Resume</p>
              <button onClick={()=>router.push('/resume-builder')} className='px-4 py-1 bg-[#8A38EE] text-white rounded-2xl cursor-pointer z-40'>Create</button>
            </div>

            <div className='bg-white flex items-center absolute bottom-28 right-5 gap-3 w-48 rounded-3xl px-4 py-2'>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#FF8000"/>
                <path d="M14.3462 23H16.6538M8 14.4544C8.00062 13.3883 8.26254 12.3377 8.76412 11.3893C9.2657 10.4409 9.99254 9.62188 10.8846 9M23 14.4544C22.9994 13.3883 22.7375 12.3377 22.2359 11.3893C21.7343 10.4409 21.0075 9.62188 20.1154 9M20.1154 14.6C20.1154 13.4118 19.6291 12.2723 18.7636 11.4322C17.898 10.592 16.7241 10.12 15.5 10.12C14.2759 10.12 13.102 10.592 12.2364 11.4322C11.3709 12.2723 10.8846 13.4118 10.8846 14.6V18.52C10.8846 18.9656 10.7023 19.3929 10.3777 19.7079C10.0531 20.023 9.61287 20.2 9.15385 20.2H21.8462C21.3871 20.2 20.9469 20.023 20.6223 19.7079C20.2977 19.3929 20.1154 18.9656 20.1154 18.52V14.6Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Job available</p>
            </div>
      </div>

      <div className='w-[70%] h-[550px] ms-44 bg-[#8A38EE] rounded-[30px]'></div>

    </div>
  </div>
      </section>



      <section className='mt-10 overflow-hidden'>
        <div className="max-w-7xl mx-auto">
            <h2 className='lg:w-[45%] lg:text-[46px] text-3xl lg:leading-relaxed font-medium text-center mx-auto'>Trusted <span className='text-[#8A38EE]'>1000+</span> company find best jobseeker</h2>
        </div>
        <div className='flex mt-20 animate-scroll-infinite overflow-hidden'>
          {partnerlogos.concat(partnerlogos).map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-40 mx-8">
              <Image
                src={logo}
                alt={`logo-${index}`}
                width={200}
                height={80}
                className="w-full h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-white mt-14">
        <div className="max-w-6xl mx-auto flex lg:flex-row flex-col gap-y-8">
          <div>
            <p className='text-[#8A38EE] font-medium text-[20px]'>About us</p>
            <p className='lg:text-[48px] text-3xl lg:leading-relaxed font-medium lg:w-[90%]'>Inclusive Opportunities, Tailored for You.</p>
            <div className='flex gap-x-4 mt-10'>
              <div className='w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center'>
                <p className='lg:text-[40px] text-2xl font-medium'>86<span className='text-[#8A38EE]'>M+</span></p>
                <p className='text-[#5F5270] text-sm lg:text-[16px] mt-2'>Availabe Jobs</p>
              </div>
              <div className='w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center'>
                <p className='lg:text-[40px] text-2xl font-medium'>256<span className='text-[#8A38EE]'>+</span></p>
                <p className='text-[#5F5270] text-sm lg:text-[16px] mt-2'>Free Course</p>
              </div>
              <div className='w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center'>
                <p className='lg:text-[40px] text-2xl font-medium'>5,7<span className='text-[#8A38EE]'>M+</span></p>
                <p className='text-[#5F5270] text-sm lg:text-[16px] text-center mt-2'>Alumni has worked</p>
              </div>
            </div>
          </div>
          <div>
            <p className='font-semibold text-[20px] text-center lg:text-left'>Jobs That Embrace Your Uniqueness.</p>
            <p className='mt-6 text-[20px] text-[#5F5270] text-center lg:text-left'>Empowering individuals to find workplaces that value diversity and uniqueness.</p>
          </div>
        </div>
      </section>



      <section className='mt-12'>
        <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <h2 className="lg:text-[48px] text-3xl font-medium mb-14">
        <span className="text-purple-600">Latest</span>{' '}
        <span className="text-gray-900">job opportunity</span>
      </h2>

      {/* Category Filters */}
      {/* <div className="flex flex-wrap w-full lg:gap-3 overflow-auto gap-2 mb-8 bg-[#F5F5F5] rounded-3xl px-2 py-2">
        {categories.map((category, index) => (
          <button
          onClick={()=> {setCategories(categories.map((cat, idx) => idx === index ? {...cat, active: true} : {...cat, active: false})); setSelectedCategory(category.name)}}
            key={index}
            className={`px-5 py-1 rounded-full font-medium transition-all ${
              category.active
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div> */}

      <div className="flex flex-nowrap lg:flex-wrap w-full gap-2 lg:gap-3 mb-8 bg-[#F5F5F5] rounded-3xl px-2 py-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
  {categories.map((category, index) => (
    <button
      onClick={() => {
        setCategories(categories.map((cat, idx) => idx === index ? {...cat, active: true} : {...cat, active: false})); 
        setSelectedCategory(category.name);
      }}
      key={index}
      className={`px-4 lg:px-5 py-1.5 lg:py-1 rounded-full font-medium text-sm lg:text-base whitespace-nowrap transition-all flex-shrink-0 ${
        category.active
          ? 'bg-purple-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {category.name}
    </button>
  ))}
</div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {jobs.slice(0,seeJobs).map((job, index) => (
          <div
            key={index}
            className={`rounded-3xl p-6 border transition-all hover:shadow-lg hover:text-white hover:bg-gradient-to-br from-purple-600 to-purple-500 border-[#B683F5] group`}
          >
            {/* Job Title & Location */}
            <div className="mb-4">
              <h3 className={`text-2xl font-bold mb-1 text-gray-900 group-hover:text-white`}>
                {job.title}
              </h3>
              <p className={`text-sm italic group-hover:text-purple-100 text-gray-500}`}>
                {job.location}
              </p>
            </div>

            {/* Job Details Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white bg-gray-100 text-gray-700`}>
                {job.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white bg-gray-100 text-gray-700`}>
                {job.experience}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white bg-gray-100 text-gray-700`}>
                {job.education}
              </span>
            </div>

            {/* Posted & Applicants */}
            <div className={`flex items-center gap-2 text-sm mb-6 group-hover:text-purple-100 text-gray-600`}>
              <span>{new Date(job.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
              <span>•</span>
              <span>{job?.applications?.length || 0} Aplicants</span>
            </div>

            {/* Apply Button & Salary */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-dashed border-gray-300">
              <button onClick={() => router.push(`/jobs/${job._id}`)} className={`lg:px-6 px-2 py-2 rounded-full font-semibold transition-all hover:scale-105 group-hover:bg-white group-hover:text-purple-600 hover:shadow-lg bg-purple-600 text-white`}>
                Apply Now
              </button>
              <div className={`lg:text-right group-hover:text-white flex items-center text-purple-600`}>
                <p>{getCurrencyIcon(job.salary.currency)}</p>
                <p className="text-lg font-bold">{`${formatSalary(job.salary)}`}</p>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex justify-center items-center group-hover:bg-white group-hover:bg-opacity-20 bg-gray-200`}>
                <img className={`${job?.company?.logo ? 'block' : 'hidden'} rounded-full`} src={job?.company?.logo} alt="company logo" />
              </div>
              <div>
                <p className={`font-semibold group-hover:text-white text-gray-900`}>
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
        <button onClick={()=>setSeeJobs(9)} className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all hover:shadow-lg">
          See More Jobs
          <ChevronDown className="w-5 h-5" />
        </button>
        ) : (
          <div>
            {seeJobs == 9 && (
              <button onClick={()=>setSeeJobs(6)} className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all hover:shadow-lg">
                See More Jobs
                 <ChevronUp className="w-5 h-5" />
              </button>
            )}
          </div>
        )} 
      </div>
    </div>
      </section>
      <section>
        <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <h2 className="lg:text-5xl text-3xl font-medium mb-14 leading-tight">
        <span className="text-purple-600">Discover</span>{' '}
        <span className="text-gray-900">Insights And<br />Tips For Your Future.</span>
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* Available Jobs Card */}
        <div className="lg:col-span-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 flex flex-col justify-between min-h-[400px]">
          <div className="bg-gray-300 rounded-2xl h-32 mb-6"></div>
          <div>
            <div className="text-5xl font-bold text-gray-800 mb-2">
              86<span className="text-purple-600">M+</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">Availabe Jobs</p>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-gray-700 text-sm font-medium mb-3">Free Create Resume</p>
              <button onClick={()=>router.push('/resume-builder')} className="w-full bg-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-purple-700 transition-all">
                Create
              </button>
            </div>
          </div>
        </div>

        {/* Mastering Cover Letter Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-purple-600 to-purple-500 rounded-3xl p-8 flex flex-col justify-between min-h-[400px] text-white">
          <div className="flex-1 flex items-center justify-center bg-white bg-opacity-10 rounded-2xl mb-6">
            {/* Placeholder for image */}
          </div>
          <div>
            <span className="inline-block bg-white bg-opacity-20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              Tips
            </span>
            <h3 className="text-3xl font-bold mb-4 leading-snug">
              Mastering the Art of the Cover Letter
            </h3>
            <button className="flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all">
              Learn more
              <div className="bg-white bg-opacity-20 rounded-full p-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Resume Tips Card */}
          <div className="bg-gray-100 rounded-3xl p-6 min-h-[190px]">
            <span className="inline-block bg-gray-700 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
              Tips
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
              How to Build a Resume That Stands Out
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Get tips for a strong resume: design, format, and highlight key achievements.
            </p>
            <button className="flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
              Learn more
              <div className="bg-purple-100 rounded-full p-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Networking Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white min-h-[190px] flex flex-col justify-between">
            <div>
              <span className="inline-block bg-white bg-opacity-20 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                Insight
              </span>
              <h3 className="text-2xl font-bold mb-4 leading-snug">
                How to Network Like a Pro in the Digital Age
              </h3>
            </div>
            <button className="flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all">
              Learn more
              <div className="bg-white bg-opacity-20 rounded-full p-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

        </div>

        {/* Tall Image Card */}
        {/* <div className="lg:col-span-3 lg:row-span-2 bg-gray-300 rounded-3xl min-h-[400px] lg:min-h-full"></div> */}
      </div>
    </div>
      </section>


      <section className='mt-16'>
        <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <p className="text-purple-600 font-semibold mb-4">Looking for a job?</p>
            <h2 className="lg:text-5xl text-3xl font-bold text-gray-900 mb-8 leading-tight">
              Browse<br />
              Verified Job<br />
              Listings Now!
            </h2>
            <button onClick={()=>router.push('/jobs')} className="flex items-center gap-3 bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all hover:scale-105">
              Find Your Job
              <div className="bg-white bg-opacity-20 rounded-full p-1">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center">
            {/* Image Placeholder */}
            <div className="w-full bg-gray-300 rounded-3xl h-80 mb-8"></div>

            {/* Stats Section */}
            <div className="w-full flex items-center justify-between">

              {/* Jobs Stats */}
              <div className="flex gap-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">
                    86<span className="text-purple-600">M+</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Availabe Jobs</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">
                    5,7<span className="text-purple-600">M+</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Alumni Has Worked</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="pt-16">
        <HomePage />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

