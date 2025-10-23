'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Briefcase, Calculator, CalendarDays, DatabaseIcon, Headphones, HomeIcon, Landmark, Megaphone, Monitor, Palette, RectangleHorizontal, Users } from 'lucide-react';
import Footer from '@/components/Footer';
import Image from 'next/image';
import SearchComponent from '@/components/SearchComponent';
import HomeJobs from '@/components/HomeJobs';
import {motion} from 'framer-motion'
import HomeGovtJobs from '@/components/HomeGovtJob';

export default function Home() {
  const router = useRouter();


  const partnerlogos = [
  "/Logo1.png",
  "/Logo2.png",
  "/Logo3.png",
  "/Logo.png",
  "/Logo4.png", 
  "/Logo3.png",
  "/Logo.png", // repeat for seamless loop
];

  const Categories = [
    {item: "Banking", icon: Landmark},
    {item: 'Work From Home', icon: HomeIcon},
    {item: 'Human Resources', icon: Users},
    {item: 'Sales', icon: Briefcase},
    {item: 'Accounting', icon: Calculator},
    {item: 'Customer Support', icon: Headphones},
    {item: 'Event Management', icon: CalendarDays},
    {item: 'IT', icon: Monitor},
    {item: 'SQL', icon: DatabaseIcon},
    {item: 'Oracle', icon: RectangleHorizontal},
    {item: 'Graphic Design', icon: Palette},
    {item: 'Digital Marketing', icon: Megaphone}
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut' as const,
    },
  },
} as const;


  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative lg:pt-20 pt-10 pb-16 px-4 overflow-hidden">
        <div className="relative max-w-7xl px-4 mx-auto flex md:flex-row flex-col gap-y-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show">
          <motion.div
            variants={fadeUp}
           className='font-medium text-[16px] flex items-center gap-x-6'>
            <Image src='/Metric Container.png' alt='Metric Container' width={38} height={38}/>
            Inclusive workplaces for all.
            </motion.div>
          <div className='lg:w-[676px] mt-6'>
            <motion.div variants={fadeUp} className='lg:text-[64px] text-4xl text-center lg:text-left font-semibold leading-tight'><span className='text-[#8A38EE]'>Job Finder</span> with Diversity Focus</motion.div>
          </div>
        <motion.div variants={fadeUp} className='lg:w-[27rem] text-[#5F5270] text-[20px] mt-8'>
          <p className='text-center lg:text-left'>Find jobs at companies focused on diversity and inclusion that match your values.</p>
        </motion.div>
        <motion.div variants={fadeUp}>
        <SearchComponent/>
        </motion.div>
    </motion.div>

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

      <section>
        <div className='max-w-6xl mx-auto mt-24'>
          <h2 className='text-3xl font-semibold'>Popular Categories</h2>
          <div className='overflow-x-auto mt-6'>
          <div className='grid grid-cols-6 gap-4 min-w-max'>
            {Categories.map((category, index)=> (
              <button key={index} onClick={()=>router.push(`jobs/search/${category.item.replace(/\s+/g, '-').toLowerCase() +' jobs'.replace(/\s+/g, '-')}`)} className='border flex items-center h-12 px-1 py-1 text-sm rounded-lg whitespace-nowrap text-left'>
                <div className='bg-purple-100 mr-2 w-8 flex justify-center items-center rounded-md h-full'>
                  <category.icon className='text-purple-600'/>
                </div>
                {category.item}
              </button>
            ))}
          </div>
          </div>
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


      <HomeJobs />

      <HomeGovtJobs/>

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

