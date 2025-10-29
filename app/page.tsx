"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  Calculator,
  CalendarDays,
  DatabaseIcon,
  Headphones,
  HomeIcon,
  Landmark,
  Megaphone,
  Monitor,
  Palette,
  RectangleHorizontal,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";
import SearchComponent from "@/components/SearchComponent";
import HomeJobs from "@/components/HomeJobs";
import { motion } from "framer-motion";
import HomeGovtJobs from "@/components/HomeGovtJob";

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
    { item: "Banking", icon: Landmark },
    { item: "Work From Home", icon: HomeIcon },
    { item: "Human Resources", icon: Users },
    { item: "Sales", icon: Briefcase },
    { item: "Accounting", icon: Calculator },
    { item: "Customer Support", icon: Headphones },
    { item: "Event Management", icon: CalendarDays },
    { item: "IT", icon: Monitor },
    { item: "SQL", icon: DatabaseIcon },
    { item: "Oracle", icon: RectangleHorizontal },
    { item: "Graphic Design", icon: Palette },
    { item: "Digital Marketing", icon: Megaphone },
  ];

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
        ease: "easeOut" as const,
      },
    },
  } as const;

  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[520px] z-30 lg:pt-14 pt-10 pb-8 px-4 overflow-hidden">
        <div className=" max-w-7xl px-4 mx-auto flex flex-col items-center gap-y-8">
          <motion.div variants={container} initial="hidden" animate="show">
            <div className="lg:w-[800px] mt-6">
              <motion.div
                variants={fadeUp}
                className="lg:text-[60px] text-3xl text-center font-semibold leading-tight"
              >
                <span className="text-[#8A38EE]">Find Jobs</span> That Match
                Your Ambition And Values
              </motion.div>
            </div>
            <motion.div
              variants={fadeUp}
              className="lg:w-[500px] mx-auto text-[#5F5270] text-[20px] mt-8"
            >
              <p className="text-center">
                Connect with employers who put diversity, equality, and
                belonging at the heart of their culture.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}></motion.div>
          </motion.div>

          <div className="w-full">
            <SearchComponent />
          </div>
        </div>
      </section>

      <section className="mt-2 overflow-hidden">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeUp} className="lg:w-[45%] lg:text-[46px] px-2 lg:px-0 text-3xl lg:leading-relaxed font-medium text-center mx-auto">
            Trusted <span className="text-[#8A38EE]">1000+</span> Company Find
            Best Jobseeker
          </motion.h2>
        </motion.div>
        <div className="flex mt-20 animate-scroll-infinite overflow-hidden">
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
        <div className="max-w-6xl mx-auto mt-24 px-4 lg:px-0">
          <h2 className="text-3xl font-semibold">Popular Categories</h2>
          <div className="overflow-x-auto mt-6 scrollbar-hide">
            <div className="grid grid-cols-6 gap-4 min-w-max">
              {Categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() =>
                    router.push(
                      `jobs/search/${
                        category.item.replace(/\s+/g, "-").toLowerCase() +
                        " jobs".replace(/\s+/g, "-")
                      }`
                    )
                  }
                  className="border flex items-center h-12 px-1 py-1 text-sm rounded-lg whitespace-nowrap text-left"
                >
                  <div className="bg-purple-100 mr-2 w-8 flex justify-center items-center rounded-md h-full">
                    <category.icon className="text-purple-600" />
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
            <p className="text-[#8A38EE] font-medium text-[20px]">About us</p>
            <p className="lg:text-[48px] text-3xl lg:leading-tight font-medium lg:w-[90%]">
              Opportunities That Reflect Modern Workplace Values
            </p>
            <div className="flex gap-x-4 mt-10">
              <div className="w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center">
                <p className="lg:text-[40px] text-2xl font-medium">
                  10<span className="text-[#8A38EE]">K+</span>
                </p>
                <p className="text-[#5F5270] text-center text-sm lg:text-[16px] mt-2">
                  Availabe Jobs
                </p>
              </div>
              <div className="w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center">
                <p className="lg:text-[40px] text-2xl font-medium">
                  256<span className="text-[#8A38EE]">+</span>
                </p>
                <p className="text-[#5F5270] text-center text-sm lg:text-[16px] mt-2">
                  Hiring Partners
                </p>
              </div>
              <div className="w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center">
                <p className="lg:text-[40px] text-2xl font-medium">
                  1<span className="text-[#8A38EE]">K+</span>
                </p>
                <p className="text-[#5F5270] text-sm lg:text-[16px] text-center mt-2">
                  Success Stories
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-[1000px]">
            <p className="mt-6 text-[20px] text-[#5F5270] text-center lg:text-left">
              At Hooblr, we simplify your job search by connecting you to the
              best career opportunities across industries. From leading private
              organizations to government sectors, we bring verified job
              listings to one reliable platform. Our mission is to empower
              professionals by giving them access to inclusive workplaces,
              transparent job details, and real opportunities that match their
              skills and values. Whether looking for your next corporate role or
              a stable government position, Hooblr helps you find the right fit
              faster and smarter.
            </p>
          </div>
        </div>
      </section>

      <HomeJobs />

      <HomeGovtJobs />

      <section className="mt-16">
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <p className="text-purple-600 font-semibold mb-4">
                  Ready to Grow Your Career?
                </p>
                <h2 className="lg:text-5xl text-3xl font-bold text-gray-900 mb-8 leading-tight">
                  Thousands
                  <br />
                  Of Verified Jobs,
                  <br />
                  All In One Place.
                </h2>
                <button
                  onClick={() => router.push("/jobs")}
                  className="flex items-center gap-3 bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all hover:scale-105"
                >
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
                        10<span className="text-purple-600">K+</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        Availabe Jobs
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">
                        1<span className="text-purple-600">K+</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        Success Stories
                      </p>
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
