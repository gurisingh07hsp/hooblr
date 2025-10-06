'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  // Menu, 
  // X, 
  Search, 
  MapPin, 
  Briefcase, 
  Users, 
  FileText, 
  PenTool, 
  Shield,
  User,
  CheckCircle,
  Award,
  Target,
  Zap,
  ArrowUpRight,
  DiscAlbum,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

// import AuthModal from '@/components/AuthModal';
// import AdminLoginModal from '@/components/AdminLoginModal';
// import AdminPanel from '@/components/AdminPanel';
// import PostJobModal from '@/components/PostJobModal';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // // eslint-disable-next-line no-unused-vars
  // const [user, setUser] = useState<any>(null);

  // const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  // const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);


  // const handlePostJob = (jobData: any) => {
  //   console.log('Job posted:', jobData);
  //   // In a real app, this would send data to an API
  // };

  // Mock blog posts data - used in BlogPage component
  // eslint-disable-next-line no-unused-vars
  // const mockBlogPosts = [
  //   {
  //     id: '1',
  //     title: 'Interview Tips for 2024: Master the Art of Job Interviews',
  //     author: 'Sarah Johnson',
  //     category: 'Interview Tips',
  //     status: 'published' as const,
  //     published: '2024-01-15',
  //     views: 1247,
  //     likes: 89,
  //     content: '<h2>Mastering Job Interviews in 2024</h2><p>This comprehensive guide covers everything you need to know about acing job interviews in 2024. From preparation strategies to common questions and answers, we\'ve got you covered.</p><h3>Preparation is Key</h3><p>Start by researching the company thoroughly. Understand their mission, values, and recent news. This will help you tailor your responses and show genuine interest.</p><h3>Common Questions to Prepare For</h3><ul><li>Tell me about yourself</li><li>Why do you want to work here?</li><li>What are your strengths and weaknesses?</li><li>Where do you see yourself in 5 years?</li></ul>',
  //     excerpt: 'Master the art of job interviews with our comprehensive guide covering preparation strategies, common questions, and expert tips for 2024.',
  //     tags: ['interview', 'career', 'tips', '2024', 'preparation'],
  //     featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  //   },
  //   {
  //     id: '2',
  //     title: 'Remote Work Best Practices: Thriving in the Digital Workplace',
  //     author: 'Mike Chen',
  //     category: 'Workplace',
  //     status: 'published' as const,
  //     published: '2024-01-12',
  //     views: 892,
  //     likes: 67,
  //     content: '<h2>Thriving in Remote Work</h2><p>Learn the essential best practices for remote work success. From setting up your home office to maintaining work-life balance, discover how to thrive in a remote work environment.</p><h3>Setting Up Your Workspace</h3><p>Create a dedicated workspace that minimizes distractions and promotes productivity. Invest in ergonomic furniture and proper lighting.</p><h3>Maintaining Work-Life Balance</h3><p>Set clear boundaries between work and personal time. Use time-blocking techniques and take regular breaks to avoid burnout.</p>',
  //     excerpt: 'Discover essential strategies for remote work success, from home office setup to maintaining work-life balance.',
  //     tags: ['remote-work', 'workplace', 'productivity', 'work-life-balance'],
  //     featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
  //   },
  //   {
  //     id: '3',
  //     title: 'Government Job Application Guide: Your Complete Roadmap',
  //     author: 'Lisa Rodriguez',
  //     category: 'Government Jobs',
  //     status: 'published' as const,
  //     published: '2024-01-10',
  //     views: 567,
  //     likes: 34,
  //     content: '<h2>Navigating Government Job Applications</h2><p>A step-by-step guide to applying for government positions. Learn about the application process, required documents, and tips for standing out in government job applications.</p><h3>Understanding the Process</h3><p>Government job applications often have specific requirements and longer processing times. Be prepared for detailed forms and background checks.</p><h3>Required Documents</h3><ul><li>Resume tailored to government format</li><li>Cover letter addressing key qualifications</li><li>Transcripts and certifications</li><li>References and background information</li></ul>',
  //     excerpt: 'Navigate the government job application process with our step-by-step guide and expert tips.',
  //     tags: ['government', 'application', 'career', 'public-sector'],
  //     featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  //   },
  //   {
  //     id: '4',
  //     title: 'Salary Negotiation Strategies: Get the Compensation You Deserve',
  //     author: 'David Park',
  //     category: 'Career Growth',
  //     status: 'published' as const,
  //     published: '2024-01-08',
  //     views: 1234,
  //     likes: 156,
  //     content: '<h2>Getting the Salary You Deserve</h2><p>Master the art of salary negotiation with proven strategies that help you get the compensation you deserve without damaging relationships.</p><h3>Research and Preparation</h3><p>Before entering negotiations, research industry standards and company salary ranges. Know your worth and be prepared to articulate your value.</p><h3>Negotiation Techniques</h3><ul><li>Start with a higher anchor point</li><li>Focus on value, not just salary</li><li>Practice your pitch</li><li>Be prepared to walk away</li></ul>',
  //     excerpt: 'Master salary negotiation with proven strategies to get the compensation you deserve.',
  //     tags: ['salary', 'negotiation', 'career', 'compensation'],
  //     featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'
  //   },
  //   {
  //     id: '5',
  //     title: 'Building Your Professional Network in the Digital Age',
  //     author: 'Emily Thompson',
  //     category: 'Networking',
  //     status: 'published' as const,
  //     published: '2024-01-05',
  //     views: 789,
  //     likes: 89,
  //     content: '<h2>Networking in the Digital Age</h2><p>Networking has evolved beyond business cards and conferences. Learn how to build meaningful professional relationships online and offline.</p><h3>Online Networking</h3><p>Platforms like LinkedIn have revolutionized professional networking. Create a compelling profile and engage with industry leaders.</p><h3>Offline Networking</h3><p>Attend industry events, join professional associations, and participate in local meetups to expand your network.</p>',
  //     excerpt: 'Build meaningful professional relationships in the digital age with effective networking strategies.',
  //     tags: ['networking', 'linkedin', 'professional', 'relationships'],
  //     featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  //   }
  // ];

    const categories = [
    { name: 'IT & Technology', active: true },
    { name: 'Marketing', active: false },
    { name: 'Finance', active: false },
    { name: 'Healthcare', active: false },
    { name: 'Education', active: false },
    { name: 'Creative & Media', active: false },
    { name: 'Retail', active: false },
    { name: 'Human Resources', active: false },
  ];

  const jobs = [
    {
      title: 'Data Scientist',
      location: 'Jakarta, Indonesia',
      type: 'Full Time',
      mode: 'Onsite',
      experience: '2-4 Years',
      posted: '3 day ago',
      applicants: '85 Aplicants',
      salary: '$2,3K-$5K',
      company: 'Picave',
      employees: '2,360-5,468',
      highlighted: false,
    },
    {
      title: 'Cybersecurity',
      location: 'Surabaya, Indonesia',
      type: 'Full Time',
      mode: 'WFH',
      experience: '3-4 Years',
      posted: '3 day ago',
      applicants: '145 Aplicants',
      salary: '$2,3-$5K',
      company: 'Devkala',
      employees: '1,560-2,468',
      highlighted: true,
    },
    {
      title: 'AI Consultant',
      location: 'Jakarta, Indonesia',
      type: 'Full Time',
      mode: 'Onsite',
      experience: '2-4 Years',
      posted: '4 day ago',
      applicants: '245 Aplicants',
      salary: '$3,5-$8K',
      company: 'Alsix',
      employees: '1,360-7,468',
      highlighted: false,
    },
    {
      title: 'Full Stack',
      location: 'Jakarta, Indonesia',
      type: 'Full Time',
      mode: 'Onsite',
      experience: '2-4 Years',
      posted: '5 day ago',
      applicants: '63 Aplicants',
      salary: '$3,9-$8K',
      company: 'Devvy.co',
      employees: '360-968',
      highlighted: false,
    },
    {
      title: 'Cloud Engineer',
      location: 'Jakarta, Indonesia',
      type: 'Full Time',
      mode: 'Onsite',
      experience: '2-4 Years',
      posted: '6 day ago',
      applicants: '296 Aplicants',
      salary: '$2,6-$5,2K',
      company: 'Coudo',
      employees: '360-568',
      highlighted: false,
    },
    {
      title: 'Machine Learning',
      location: 'Jakarta, Indonesia',
      type: 'Full Time',
      mode: 'Onsite',
      experience: '2-4 Years',
      posted: '7 day ago',
      applicants: '521 Aplicants',
      salary: '$3,4-$9,2K',
      company: 'Mech.io',
      employees: '620-1,468',
      highlighted: false,
    },
  ];

  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div> */}
        
        {/* <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Trusted by 500+ Government Agencies</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your Dream
            <span className="text-purple-600 block">Government Job</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of government job opportunities across all departments and levels. 
            Start your career in public service and make a difference in your community.
          </p> */}
          
          {/* Search Bar */}
          {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-4xl mx-auto mb-8 border border-purple-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or department"
                  className="w-full pl-10 pr-4 py-3 text-base border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="w-full pl-10 pr-4 py-3 text-base border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                />
              </div>
              <button 
                onClick={() => router.push('/jobs')}
                className="bg-[#9333E9] text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold text-base transform hover:-translate-y-1"
              >
                Search Jobs
              </button>
            </div>
          </div> */}

          {/* Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">50,000+</div>
              <div className="text-sm text-gray-600 font-medium">Active Job Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">500+</div>
              <div className="text-sm text-gray-600 font-medium">Government Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">1M+</div>
              <div className="text-sm text-gray-600 font-medium">Successful Placements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
              <div className="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div> */}
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
        
        <div className="flex border-2 lg:w-[33rem] mt-12 items-center px-2 lg:gap-x-4 gap-x-2 h-[74px] rounded-[37px] bg-[#F5F5F5]">
      {/* Find Your Job Button */}
      <button className="flex items-center lg:gap-3 gap-1 bg-[#8A38EE] text-white lg:px-5 py-4 rounded-[46px] font-semibold shadow-lg shadow-purple-300">
        <span className="lg:text-[16px] text-[10px] lg:w-full w-20">Find Your Job</span>
        <div className="hidden w-[20px] h-[20px] border border-white rounded-full lg:flex justify-center items-center">
          <Search className="w-4 h-3" />
        </div>
      </button>

      {/* Search Input */}
      <div className="border-r">
        <input
          type="text"
          placeholder="ex. graphic designer"
          className="lg:px-2 bg-[#F5F5F5] lg:w-48 w-36 border-none placeholder:text-sm placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Country Dropdown */}
      <div className="relative">
        <button className="flex items-center lg:gap-3 rounded-full text-purple-600 lg:font-medium transition-all duration-300">
          <span className='text-[12px] lg:text-[16px]'>Country</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
    </div>

    <div className='flex relative w-full'>
      <div className='absolute z-30'>
        <svg width="254" height="550" viewBox="0 0 254 603" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M139.651 1.86913C10.5822 155.162 -52.4549 386.089 78.3089 420.73C241.764 464.031 195.595 53.5036 34.3448 293.366C-32.4924 392.788 -6.86653 601.733 253.636 599.831" stroke="url(#paint0_linear_2_22)" stroke-width="5"/>
          <defs>
            <linearGradient id="paint0_linear_2_22" x1="238.966" y1="571.415" x2="-94.6817" y2="221.974" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0"/>
              <stop offset="0.2" stop-color="#00B3FF"/>
              <stop offset="0.4" stop-color="#8A38EE"/>
              <stop offset="0.6" stop-color="#FF0004"/>
              <stop offset="0.8" stop-color="#FF8000"/>
              <stop offset="1" stop-color="white" stop-opacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className='w-[65%] h-[470px] absolute bottom-0 right-20 bg-[#C4C4C4]'>
            <div className='bg-white absolute top-20 left-10 w-36 h-28 rounded-[20px] flex flex-col gap-y-1 justify-center items-center'>
              <p className='text-center font-medium'><span className='text-[#8A38EE]'>Free</span> Create Resume</p>
              <button className='px-4 py-1 bg-[#8A38EE] text-white rounded-2xl cursor-pointer'>Create</button>
            </div>

            <div className='bg-white flex items-center absolute bottom-28 right-5 gap-3 w-48 rounded-3xl px-4 py-2'>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#FF8000"/>
                <path d="M14.3462 23H16.6538M8 14.4544C8.00062 13.3883 8.26254 12.3377 8.76412 11.3893C9.2657 10.4409 9.99254 9.62188 10.8846 9M23 14.4544C22.9994 13.3883 22.7375 12.3377 22.2359 11.3893C21.7343 10.4409 21.0075 9.62188 20.1154 9M20.1154 14.6C20.1154 13.4118 19.6291 12.2723 18.7636 11.4322C17.898 10.592 16.7241 10.12 15.5 10.12C14.2759 10.12 13.102 10.592 12.2364 11.4322C11.3709 12.2723 10.8846 13.4118 10.8846 14.6V18.52C10.8846 18.9656 10.7023 19.3929 10.3777 19.7079C10.0531 20.023 9.61287 20.2 9.15385 20.2H21.8462C21.3871 20.2 20.9469 20.023 20.6223 19.7079C20.2977 19.3929 20.1154 18.9656 20.1154 18.52V14.6Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p>Job available</p>
            </div>
      </div>

      <div className='w-[70%] h-[550px] ms-44 bg-[#8A38EE] rounded-[30px]'></div>

    </div>
  </div>
      </section>



      <section className='mt-10'>
        <div className="max-w-7xl mx-auto">
            <h2 className='lg:w-[45%] lg:text-[46px] text-3xl lg:leading-relaxed font-medium text-center mx-auto'>Trusted <span className='text-[#8A38EE]'>1000+</span> company find best jobseeker</h2>
        </div>
        <svg className='mt-16 lg:block hidden' width="1512" height="36" viewBox="0 0 1512 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-89.9932 26.6547H-92V11.5849H-89.1862L-79.6431 21.9349V11.5849H-77.6472V26.6547H-80.4611L-89.9932 16.3151V26.6547Z" fill="#212121"/>
          <path d="M-70.5908 11.6477C-70.5908 11.9128 -70.6454 12.164 -70.7544 12.4012C-70.8562 12.6384 -70.998 12.8442 -71.1798 13.0186C-71.3615 13.193 -71.576 13.3326 -71.8232 13.4372C-72.0705 13.5349 -72.3322 13.5837 -72.6085 13.5837C-72.8848 13.5837 -73.1465 13.5349 -73.3938 13.4372C-73.6337 13.3326 -73.8446 13.193 -74.0263 13.0186C-74.2081 12.8442 -74.3535 12.6384 -74.4626 12.4012C-74.5644 12.164 -74.6153 11.9128 -74.6153 11.6477C-74.6153 11.3826 -74.5644 11.1349 -74.4626 10.9047C-74.3535 10.6674 -74.2081 10.4616 -74.0263 10.2872C-73.8446 10.1128 -73.6337 9.97674 -73.3938 9.87907C-73.1465 9.77442 -72.8848 9.72209 -72.6085 9.72209C-72.3322 9.72209 -72.0705 9.77442 -71.8232 9.87907C-71.576 9.97674 -71.3615 10.1128 -71.1798 10.2872C-70.998 10.4616 -70.8562 10.6674 -70.7544 10.9047C-70.6454 11.1349 -70.5908 11.3826 -70.5908 11.6477ZM-70.7544 26.6547H-74.4517V14.5779H-70.7544V26.6547Z" fill="#212121"/>
          <path d="M-56.8161 22.793C-56.8161 23.3233 -56.8961 23.7942 -57.056 24.2058C-57.216 24.6174 -57.4341 24.9767 -57.7104 25.2837C-57.9867 25.5837 -58.3139 25.8384 -58.692 26.0477C-59.0701 26.25 -59.4772 26.414 -59.9135 26.5395C-60.3425 26.6651 -60.7933 26.7558 -61.2659 26.8116C-61.7385 26.8674 -62.2075 26.8953 -62.6728 26.8953C-63.2981 26.8953 -63.8507 26.857 -64.3306 26.7802C-64.8105 26.7035 -65.2685 26.5814 -65.7048 26.414C-66.141 26.2395 -66.5773 26.0163 -67.0135 25.7442C-67.4425 25.4721 -67.9224 25.1407 -68.4532 24.75L-66.3046 23.0651C-66.1083 23.4209 -65.8502 23.7453 -65.5303 24.0384C-65.2031 24.3244 -64.865 24.5721 -64.516 24.7814C-64.167 24.9907 -63.8289 25.1512 -63.5017 25.2628C-63.1745 25.3744 -62.9091 25.4302 -62.7055 25.4302C-62.5383 25.4302 -62.3493 25.4267 -62.1384 25.4198C-61.9275 25.4058 -61.7131 25.3849 -61.4949 25.357C-61.2768 25.3221 -61.0623 25.2733 -60.8514 25.2105C-60.6406 25.1477 -60.4552 25.064 -60.2952 24.9593C-60.128 24.8477 -59.9971 24.7116 -59.9026 24.5512C-59.8008 24.3837 -59.7499 24.1849 -59.7499 23.9547C-59.7499 23.7174 -59.8153 23.5116 -59.9462 23.3372C-60.0698 23.1558 -60.2334 22.9988 -60.437 22.8663C-60.6406 22.7337 -60.8733 22.6221 -61.135 22.5314C-61.3968 22.4407 -61.6622 22.3605 -61.9312 22.2907C-62.1929 22.2209 -62.4474 22.1616 -62.6946 22.1128C-62.9418 22.057 -63.1563 22.0047 -63.3381 21.9558C-63.6726 21.8651 -64.0252 21.7744 -64.396 21.6837C-64.7668 21.586 -65.134 21.4779 -65.4976 21.3593C-65.8611 21.2337 -66.2101 21.0872 -66.5446 20.9198C-66.8718 20.7523 -67.1626 20.5535 -67.4171 20.3233C-67.6643 20.086 -67.8642 19.8105 -68.0169 19.4965C-68.1623 19.1756 -68.2351 18.8023 -68.2351 18.3767C-68.2351 17.5953 -68.0751 16.943 -67.7552 16.4198C-67.428 15.8895 -66.999 15.4674 -66.4682 15.1535C-65.9374 14.8326 -65.334 14.6058 -64.6578 14.4733C-63.9816 14.3407 -63.2945 14.2744 -62.5965 14.2744C-62.1166 14.2744 -61.6113 14.3233 -61.0805 14.4209C-60.5497 14.5116 -60.0335 14.6512 -59.5318 14.8395C-59.0301 15.0209 -58.5611 15.2442 -58.1249 15.5093C-57.6886 15.7744 -57.3251 16.0779 -57.0342 16.4198L-59.1828 18.1151C-59.3427 17.6965 -59.5536 17.3372 -59.8153 17.0372C-60.0698 16.7372 -60.3498 16.493 -60.6551 16.3047C-60.9532 16.1093 -61.2623 15.9663 -61.5822 15.8756C-61.8948 15.7849 -62.1857 15.7395 -62.4547 15.7395C-62.7164 15.7395 -63.0109 15.75 -63.3381 15.7709C-63.6653 15.7919 -63.9743 15.8512 -64.2651 15.9488C-64.5487 16.0465 -64.7923 16.1965 -64.9959 16.3988C-65.1922 16.5942 -65.2903 16.8663 -65.2903 17.2151C-65.2903 17.4663 -65.2322 17.6826 -65.1158 17.864C-64.9922 18.0384 -64.8323 18.1919 -64.636 18.3244C-64.4396 18.45 -64.2179 18.5581 -63.9707 18.6488C-63.7162 18.7326 -63.4581 18.8093 -63.1963 18.8791C-62.9346 18.9419 -62.6801 18.9977 -62.4329 19.0465C-62.1857 19.0953 -61.9639 19.1477 -61.7676 19.2035C-61.4331 19.2942 -61.0805 19.3884 -60.7097 19.486C-60.3316 19.5767 -59.9608 19.6849 -59.5972 19.8105C-59.2337 19.9291 -58.8847 20.0721 -58.5502 20.2395C-58.2085 20.4 -57.9104 20.5988 -57.6559 20.836C-57.4014 21.0733 -57.1978 21.3523 -57.0451 21.6733C-56.8924 21.9872 -56.8161 22.3605 -56.8161 22.793Z" fill="#212121"/>
          <path d="M-42.856 17.5605L-44.4483 18.1674C-44.7028 17.4 -45.1281 16.8105 -45.7243 16.3988C-46.3205 15.9872 -47.0367 15.7814 -47.8729 15.7814C-48.3237 15.7814 -48.7272 15.8512 -49.0835 15.9907C-49.4325 16.1233 -49.7415 16.3081 -50.0105 16.5453C-50.2723 16.7826 -50.4977 17.0581 -50.6867 17.3721C-50.8685 17.686 -51.0176 18.0209 -51.1339 18.3767C-51.2502 18.7326 -51.3338 19.1023 -51.3847 19.486C-51.4356 19.8628 -51.4611 20.2291 -51.4611 20.5849C-51.4611 20.9686 -51.4393 21.3558 -51.3956 21.7465C-51.352 22.1372 -51.2793 22.514 -51.1775 22.8767C-51.0684 23.2326 -50.9267 23.5674 -50.7522 23.8814C-50.5777 24.1884 -50.3595 24.457 -50.0978 24.6872C-49.8288 24.9174 -49.5125 25.0988 -49.1489 25.2314C-48.7781 25.364 -48.3528 25.4302 -47.8729 25.4302C-47.4875 25.4302 -47.1203 25.3744 -46.7713 25.2628C-46.4223 25.1512 -46.1024 24.9942 -45.8116 24.7919C-45.5207 24.5895 -45.2626 24.3488 -45.0372 24.0698C-44.8118 23.7907 -44.6337 23.4802 -44.5028 23.1384L-42.8996 23.7035C-43.1395 24.2547 -43.4594 24.7326 -43.8593 25.1372C-44.252 25.5349 -44.6991 25.8663 -45.2008 26.1314C-45.7025 26.3895 -46.2406 26.5814 -46.815 26.707C-47.3894 26.8326 -47.971 26.8953 -48.56 26.8953C-49.5125 26.8953 -50.3959 26.7419 -51.2102 26.4349C-52.0246 26.1209 -52.7299 25.6849 -53.3261 25.1267C-53.915 24.5616 -54.3767 23.8953 -54.7112 23.1279C-55.0456 22.3535 -55.2129 21.5058 -55.2129 20.5849C-55.2129 19.657 -55.0493 18.8058 -54.7221 18.0314C-54.3876 17.257 -53.9259 16.5907 -53.337 16.0326C-52.748 15.4744 -52.0464 15.0419 -51.232 14.7349C-50.4177 14.4279 -49.527 14.2744 -48.56 14.2744C-47.9492 14.2744 -47.353 14.3407 -46.7713 14.4733C-46.1897 14.5988 -45.6516 14.7977 -45.1572 15.0698C-44.6555 15.3349 -44.2084 15.6733 -43.8157 16.0849C-43.4158 16.4965 -43.0959 16.9884 -42.856 17.5605Z" fill="#212121"/>
          <path d="M-27.9906 26.6547H-31.6769V25.2105C-32.1132 25.7826 -32.6403 26.2081 -33.2584 26.4872C-33.8691 26.7593 -34.5417 26.8953 -35.276 26.8953C-36.2358 26.8953 -37.0938 26.7314 -37.8499 26.4035C-38.6061 26.0756 -39.246 25.6291 -39.7695 25.064C-40.293 24.4919 -40.6929 23.8221 -40.9692 23.0547C-41.2455 22.2872 -41.3836 21.464 -41.3836 20.5849C-41.3836 19.7058 -41.2455 18.8826 -40.9692 18.1151C-40.6929 17.3477 -40.293 16.6814 -39.7695 16.1163C-39.246 15.5442 -38.6061 15.0942 -37.8499 14.7663C-37.0938 14.4384 -36.2358 14.2744 -35.276 14.2744C-34.7889 14.2744 -34.3272 14.3442 -33.8909 14.4837C-33.4474 14.6233 -33.0439 14.8221 -32.6803 15.0802C-32.3095 15.3314 -31.986 15.6384 -31.7097 16.0012C-31.4261 16.357 -31.2043 16.7547 -31.0444 17.1942L-29.4084 14.5674H-27.9906V26.6547ZM-31.6988 20.5849C-31.6988 20.2709 -31.7169 19.9395 -31.7533 19.5907C-31.7824 19.2419 -31.8369 18.8965 -31.9169 18.5547C-31.9969 18.2128 -32.1096 17.8884 -32.255 17.5814C-32.3931 17.2674 -32.5749 16.9919 -32.8003 16.7547C-33.0184 16.5105 -33.2838 16.3186 -33.5965 16.1791C-33.9091 16.0395 -34.2727 15.9698 -34.6871 15.9698C-35.1015 15.9698 -35.4615 16.043 -35.7668 16.1895C-36.0722 16.3291 -36.334 16.5209 -36.5521 16.7651C-36.7702 17.0023 -36.952 17.2779 -37.0974 17.5919C-37.2356 17.9058 -37.3446 18.2337 -37.4246 18.5756C-37.5046 18.9174 -37.5627 19.2628 -37.5991 19.6116C-37.6282 19.9535 -37.6427 20.2779 -37.6427 20.5849C-37.6427 20.8919 -37.6282 21.2198 -37.5991 21.5686C-37.5627 21.9174 -37.5046 22.2628 -37.4246 22.6047C-37.3446 22.9465 -37.2356 23.2744 -37.0974 23.5884C-36.952 23.9023 -36.7702 24.1814 -36.5521 24.4256C-36.334 24.6628 -36.0722 24.8547 -35.7668 25.0012C-35.4615 25.1407 -35.1015 25.2105 -34.6871 25.2105C-34.309 25.2105 -33.9746 25.1372 -33.6837 24.9907C-33.3856 24.8372 -33.1275 24.6349 -32.9094 24.3837C-32.684 24.1326 -32.4949 23.8465 -32.3422 23.5256C-32.1895 23.2047 -32.0659 22.8733 -31.9714 22.5314C-31.8769 22.1895 -31.8078 21.8512 -31.7642 21.5163C-31.7206 21.1744 -31.6988 20.864 -31.6988 20.5849Z" fill="#212121"/>
          <path d="M-21.2178 26.6547H-24.9041V9H-23.4863L-21.2178 12.6733V26.6547Z" fill="#212121"/>
          <path d="M-5.45806 26.6547H-9.14442V25.2105C-9.58067 25.7826 -10.1078 26.2081 -10.7258 26.4872C-11.3366 26.7593 -12.0092 26.8953 -12.7435 26.8953C-13.7033 26.8953 -14.5612 26.7314 -15.3174 26.4035C-16.0736 26.0756 -16.7134 25.6291 -17.2369 25.064C-17.7604 24.4919 -18.1603 23.8221 -18.4366 23.0547C-18.7129 22.2872 -18.8511 21.464 -18.8511 20.5849C-18.8511 19.7058 -18.7129 18.8826 -18.4366 18.1151C-18.1603 17.3477 -17.7604 16.6814 -17.2369 16.1163C-16.7134 15.5442 -16.0736 15.0942 -15.3174 14.7663C-14.5612 14.4384 -13.7033 14.2744 -12.7435 14.2744C-12.2564 14.2744 -11.7947 14.3442 -11.3584 14.4837C-10.9149 14.6233 -10.5113 14.8221 -10.1478 15.0802C-9.77699 15.3314 -9.45343 15.6384 -9.17713 16.0012C-8.89357 16.357 -8.67181 16.7547 -8.51185 17.1942L-6.87589 14.5674H-5.45806V26.6547ZM-9.16623 20.5849C-9.16623 20.2709 -9.18441 19.9395 -9.22076 19.5907C-9.24985 19.2419 -9.30437 18.8965 -9.38435 18.5547C-9.46434 18.2128 -9.57703 17.8884 -9.72245 17.5814C-9.8606 17.2674 -10.0424 16.9919 -10.2678 16.7547C-10.4859 16.5105 -10.7513 16.3186 -11.0639 16.1791C-11.3766 16.0395 -11.7401 15.9698 -12.1546 15.9698C-12.569 15.9698 -12.9289 16.043 -13.2343 16.1895C-13.5397 16.3291 -13.8014 16.5209 -14.0196 16.7651C-14.2377 17.0023 -14.4195 17.2779 -14.5649 17.5919C-14.703 17.9058 -14.8121 18.2337 -14.8921 18.5756C-14.972 18.9174 -15.0302 19.2628 -15.0666 19.6116C-15.0956 19.9535 -15.1102 20.2779 -15.1102 20.5849C-15.1102 20.8919 -15.0956 21.2198 -15.0666 21.5686C-15.0302 21.9174 -14.972 22.2628 -14.8921 22.6047C-14.8121 22.9465 -14.703 23.2744 -14.5649 23.5884C-14.4195 23.9023 -14.2377 24.1814 -14.0196 24.4256C-13.8014 24.6628 -13.5397 24.8547 -13.2343 25.0012C-12.9289 25.1407 -12.569 25.2105 -12.1546 25.2105C-11.7765 25.2105 -11.442 25.1372 -11.1512 24.9907C-10.8531 24.8372 -10.595 24.6349 -10.3768 24.3837C-10.1514 24.1326 -9.96239 23.8465 -9.8097 23.5256C-9.65701 23.2047 -9.53341 22.8733 -9.43889 22.5314C-9.34437 22.1895 -9.27529 21.8512 -9.23167 21.5163C-9.18804 21.1744 -9.16623 20.864 -9.16623 20.5849Z" fill="#212121"/>
          <path d="M1.20571 25.0849C1.20571 25.35 1.15482 25.6012 1.05302 25.8384C0.951233 26.0686 0.809448 26.2709 0.627678 26.4453C0.445908 26.6128 0.235054 26.7453 -0.00489044 26.843C-0.244827 26.9477 -0.502953 27 -0.779243 27C-1.05554 27 -1.31365 26.9477 -1.5536 26.843C-1.79353 26.7453 -2.00439 26.6128 -2.18616 26.4453C-2.36793 26.2709 -2.50972 26.0686 -2.61151 25.8384C-2.7133 25.6012 -2.7642 25.35 -2.7642 25.0849C-2.7642 24.8267 -2.7133 24.5826 -2.61151 24.3523C-2.50972 24.1151 -2.36793 23.9128 -2.18616 23.7453C-2.00439 23.5709 -1.79353 23.4349 -1.5536 23.3372C-1.31365 23.2326 -1.05554 23.1802 -0.779243 23.1802C-0.502953 23.1802 -0.244827 23.2326 -0.00489044 23.3372C0.235054 23.4349 0.445908 23.5709 0.627678 23.7453C0.809448 23.9128 0.951233 24.1151 1.05302 24.3523C1.15482 24.5826 1.20571 24.8267 1.20571 25.0849Z" fill="#212121"/>
          <path d="M7.76043 11.6477C7.76043 11.9128 7.7059 12.164 7.59684 12.4012C7.49505 12.6384 7.35326 12.8442 7.17149 13.0186C6.98972 13.193 6.77522 13.3326 6.52802 13.4372C6.2808 13.5349 6.01906 13.5837 5.74276 13.5837C5.46647 13.5837 5.20471 13.5349 4.9575 13.4372C4.71756 13.3326 4.50671 13.193 4.32494 13.0186C4.14316 12.8442 3.99774 12.6384 3.88868 12.4012C3.78689 12.164 3.73599 11.9128 3.73599 11.6477C3.73599 11.3826 3.78689 11.1349 3.88868 10.9047C3.99774 10.6674 4.14316 10.4616 4.32494 10.2872C4.50671 10.1128 4.71756 9.97674 4.9575 9.87907C5.20471 9.77442 5.46647 9.72209 5.74276 9.72209C6.01906 9.72209 6.2808 9.77442 6.52802 9.87907C6.77522 9.97674 6.98972 10.1128 7.17149 10.2872C7.35326 10.4616 7.49505 10.6674 7.59684 10.9047C7.7059 11.1349 7.76043 11.3826 7.76043 11.6477ZM7.59684 26.6547H3.89958V14.5779H7.59684V26.6547Z" fill="#FF0004"/>
          <path d="M24 20.5849C24 21.2128 23.9127 21.8023 23.7382 22.3535C23.5637 22.9047 23.3202 23.414 23.0075 23.8814C22.7021 24.3488 22.3313 24.7709 21.8951 25.1477C21.4588 25.5174 20.9789 25.8314 20.4554 26.0895C19.9392 26.3477 19.383 26.5465 18.7868 26.686C18.1978 26.8256 17.5907 26.8953 16.9654 26.8953C16.3401 26.8953 15.733 26.8256 15.144 26.686C14.5551 26.5465 13.9989 26.3477 13.4754 26.0895C12.9591 25.8314 12.4829 25.5174 12.0466 25.1477C11.6104 24.7709 11.2359 24.3488 10.9233 23.8814C10.6179 23.414 10.378 22.9047 10.2035 22.3535C10.029 21.7953 9.9417 21.2058 9.9417 20.5849C9.9417 19.964 10.029 19.3779 10.2035 18.8267C10.378 18.2686 10.6179 17.7558 10.9233 17.2884C11.2359 16.8209 11.6104 16.4023 12.0466 16.0326C12.4829 15.6558 12.9591 15.3384 13.4754 15.0802C13.9989 14.8221 14.5551 14.6233 15.144 14.4837C15.733 14.3442 16.3401 14.2744 16.9654 14.2744C17.5907 14.2744 18.1978 14.3442 18.7868 14.4837C19.383 14.6233 19.9392 14.8221 20.4554 15.0802C20.9789 15.3384 21.4588 15.6558 21.8951 16.0326C22.3313 16.4023 22.7021 16.8209 23.0075 17.2884C23.3202 17.7558 23.5637 18.2686 23.7382 18.8267C23.9127 19.3779 24 19.964 24 20.5849ZM20.2482 20.5849C20.2482 20.25 20.2264 19.8977 20.1828 19.5279C20.1464 19.1512 20.081 18.7849 19.9865 18.4291C19.8919 18.0663 19.7611 17.7209 19.5938 17.393C19.4339 17.0581 19.2339 16.7686 18.994 16.5244C18.754 16.2733 18.4668 16.0744 18.1324 15.9279C17.7979 15.7744 17.4089 15.6977 16.9654 15.6977C16.5437 15.6977 16.1692 15.7744 15.842 15.9279C15.5149 16.0814 15.2277 16.2872 14.9804 16.5453C14.7405 16.7965 14.5369 17.0895 14.3697 17.4244C14.2097 17.7593 14.0788 18.1081 13.9771 18.4709C13.8753 18.8267 13.8026 19.1895 13.7589 19.5593C13.7153 19.9221 13.6935 20.264 13.6935 20.5849C13.6935 20.9058 13.7153 21.2512 13.7589 21.6209C13.8026 21.9837 13.8753 22.3465 13.9771 22.7093C14.0788 23.0721 14.2097 23.4209 14.3697 23.7558C14.5369 24.0837 14.7405 24.3767 14.9804 24.6349C15.2277 24.886 15.5149 25.0884 15.842 25.2419C16.1692 25.3953 16.5437 25.4721 16.9654 25.4721C17.4017 25.4721 17.787 25.3988 18.1215 25.2523C18.4559 25.0988 18.7431 24.8965 18.9831 24.6453C19.2303 24.3942 19.4339 24.1047 19.5938 23.7767C19.7538 23.4488 19.881 23.1035 19.9756 22.7407C20.0773 22.3779 20.1464 22.0116 20.1828 21.6419C20.2264 21.2721 20.2482 20.9198 20.2482 20.5849Z" fill="#FF0004"/>
          <path d="M109.4 26C103.545 26 100.182 24.5377 100 20.5536H104.943C104.943 21.6556 106.037 22.3974 109.197 22.3974C112.418 22.3974 113.026 21.9311 113.026 21.1258C113.026 20.1934 112.479 20.0026 108.954 19.7695L108.245 19.7272C102.674 19.3881 100.223 17.947 100.223 14.6834C100.223 11.5682 103.403 10 108.407 10C114.12 10 117.179 11.8225 117.361 15.1921H112.418C112.418 14.0265 111.102 13.6026 108.367 13.6026C105.794 13.6026 105.166 14.0265 105.166 14.6834C105.166 15.4675 105.713 15.7642 108.974 15.9974L109.805 16.0609C114.768 16.4636 117.969 17.0146 117.969 20.9351C117.969 24.7709 114.768 26 109.4 26Z" fill="#00B3FF"/>
          <path d="M118.339 25.5762L125.794 10.3603H131.872L139.307 25.5762H134.222L132.945 22.7576H124.7L123.404 25.5762H118.339ZM126.321 19.1762H131.305L128.813 13.7298L126.321 19.1762Z" fill="#00B3FF"/>
          <path d="M140.917 25.5762V10.3603H148.352L152.667 19.8331L156.962 10.3603H164.376V25.5762H159.615V15.0861L154.875 25.5762H150.438L145.678 15.0861V25.5762H140.917Z" fill="#00B3FF"/>
          <path d="M166.393 14.5563V10.3603H183.694V14.5563H177.434V25.5762H172.673V14.5563H166.393Z" fill="#00B3FF"/>
          <path d="M185.687 25.5762V10.3603H190.448V25.5762H185.687Z" fill="#00B3FF"/>
          <path d="M199.103 25.5762L192.033 10.3603H197.097L202.506 22.2066L207.915 10.3603H213L205.889 25.5762H199.103Z" fill="#00B3FF"/>
          <path d="M316 15.1886H304.012L311.607 8.10052L309.477 6.11249L301 14.0243V4H297.988V15.1886L290.393 8.10052L288.263 10.0883L296.74 18.0001H286V20.8114H297.988L290.393 27.8995L292.523 29.8875L301 21.9759V32H304.012V20.8114L311.607 27.8995L313.737 25.9117L305.26 18.0001H316V15.1886Z" fill="#8A38EE"/>
          <path d="M324 26V10H326.722V26H324Z" fill="#212121"/>
          <path d="M330.13 26V10H344.309V12.3244H332.852V16.9055H343.903V19.0719H332.852V23.653H344.309V26H330.13Z" fill="#212121"/>
          <path d="M346.808 26L354.792 10H358.245L366.188 26H363.283L361.516 22.3441H351.501L349.734 26H346.808ZM352.598 20.0874H360.419L356.518 11.9859L352.598 20.0874Z" fill="#212121"/>
          <path d="M368.811 26V23.2243H372V26H368.811Z" fill="#212121"/>
          <path d="M452 17.9999C452 16.2554 453.397 14.8039 455.548 14.0551C456.203 11.5965 457.474 10 459 10C460.527 10 461.797 11.5965 462.452 14.0551C464.603 14.8039 466 16.2556 466 17.9999C466 19.7442 464.603 21.1961 462.452 21.9449C461.797 24.4037 460.526 26 459 26C457.474 26 456.204 24.4035 455.548 21.9449C453.397 21.1961 452 19.7446 452 17.9999ZM459 11.97C458.537 11.97 457.983 12.5484 457.546 13.5965C458.012 13.538 458.498 13.5074 459 13.5074C459.502 13.5074 459.988 13.538 460.454 13.5965C460.017 12.5482 459.463 11.97 459 11.97ZM456.793 17.9999C456.793 18.8502 456.86 19.6248 456.974 20.3157C457.578 20.4457 458.256 20.5223 459 20.5223C459.744 20.5223 460.422 20.4457 461.026 20.3157C461.14 19.6248 461.207 18.8502 461.207 17.9999C461.207 17.1496 461.14 16.375 461.026 15.6841C460.422 15.5541 459.744 15.4775 459 15.4775C458.256 15.4775 457.578 15.5541 456.974 15.6841C456.86 16.375 456.793 17.1496 456.793 17.9999ZM464.276 17.9999C464.276 17.4711 463.77 16.8378 462.853 16.338C462.904 16.8713 462.931 17.4266 462.931 17.9999C462.931 18.5732 462.904 19.1287 462.853 19.662C463.77 19.1622 464.276 18.5287 464.276 17.9999ZM459 24.03C459.463 24.03 460.017 23.4518 460.454 22.4035C459.988 22.462 459.502 22.4926 459 22.4926C458.498 22.4926 458.012 22.462 457.546 22.4035C457.983 23.4518 458.537 24.03 459 24.03ZM455.147 19.662C455.096 19.1287 455.069 18.5734 455.069 17.9999C455.069 17.4264 455.096 16.8713 455.147 16.338C454.23 16.8378 453.724 17.4711 453.724 17.9999C453.724 18.5287 454.23 19.162 455.147 19.662Z" fill="#FF8000"/>
          <path d="M481.05 10.2394V19.9519C481.05 20.7846 481.014 21.4995 480.942 22.0963C480.877 22.6931 480.756 23.224 480.579 23.689C480.402 24.147 480.179 24.5218 479.911 24.8133C479.649 25.0978 479.302 25.3338 478.87 25.5211C478.444 25.7016 477.966 25.8265 477.436 25.8959C476.905 25.9653 476.263 26 475.51 26C474.784 26 474.165 25.9688 473.654 25.9063C473.143 25.8439 472.672 25.7293 472.24 25.5628C471.807 25.3893 471.457 25.1637 471.189 24.8861C470.927 24.6016 470.701 24.2338 470.511 23.7827C470.321 23.3247 470.187 22.7868 470.108 22.1692C470.036 21.5515 470 20.8124 470 19.9519V10.2394H471.994V20.2225C471.994 20.7985 471.994 21.2149 471.994 21.4717C472.001 21.7285 472.02 22.0442 472.053 22.419C472.086 22.7868 472.128 23.0401 472.181 23.1789C472.233 23.3108 472.318 23.4773 472.436 23.6786C472.56 23.8799 472.698 24.0082 472.849 24.0638C473.006 24.1123 473.219 24.1748 473.487 24.2511C473.755 24.3275 474.044 24.3726 474.351 24.3865C474.666 24.3934 475.055 24.3969 475.52 24.3969C476.07 24.3969 476.529 24.3795 476.895 24.3448C477.269 24.3101 477.593 24.2407 477.868 24.1366C478.143 24.0325 478.352 23.9146 478.496 23.7827C478.647 23.6439 478.765 23.4426 478.85 23.1789C478.942 22.9152 479.001 22.6411 479.027 22.3565C479.053 22.072 479.066 21.6938 479.066 21.2219L479.056 10.2394H481.05Z" fill="#212121"/>
          <path d="M494.979 25.7502H492.906L485.932 13.4977V25.7502H484.184V10.2394H486.197L493.23 22.6584V10.2394H494.979V25.7502Z" fill="#212121"/>
          <path d="M500.302 25.7502H498.308V10.2394H500.302V25.7502Z" fill="#212121"/>
          <path d="M512.237 20.9408L513.946 21.2115C513.913 21.8777 513.857 22.4468 513.779 22.9187C513.7 23.3836 513.582 23.8 513.425 24.1679C513.275 24.5357 513.088 24.8341 512.865 25.0631C512.643 25.2852 512.355 25.4691 512.001 25.6148C511.654 25.7606 511.261 25.8612 510.822 25.9167C510.39 25.9722 509.866 26 509.251 26C508.661 26 508.134 25.9826 507.669 25.948C507.204 25.9202 506.779 25.8543 506.392 25.7502C506.013 25.6391 505.679 25.535 505.39 25.4379C505.109 25.3338 504.857 25.1637 504.634 24.9278C504.418 24.6918 504.235 24.4802 504.084 24.2928C503.94 24.1054 503.816 23.8209 503.711 23.4392C503.613 23.0505 503.537 22.7105 503.485 22.419C503.433 22.1275 503.39 21.7042 503.357 21.149C503.331 20.5938 503.315 20.108 503.308 19.6916C503.302 19.2752 503.298 18.6992 503.298 17.9636C503.298 17.1863 503.302 16.5617 503.308 16.0898C503.315 15.6179 503.334 15.1043 503.367 14.5491C503.4 13.9939 503.439 13.5637 503.485 13.2583C503.537 12.9529 503.616 12.6198 503.721 12.2589C503.832 11.8911 503.956 11.6205 504.094 11.447C504.231 11.2665 504.412 11.0722 504.634 10.864C504.857 10.6558 505.099 10.5136 505.361 10.4372C505.63 10.3539 505.954 10.2707 506.333 10.1874C506.713 10.1041 507.119 10.052 507.551 10.0312C507.99 10.0104 508.498 10 509.074 10C509.67 10 510.177 10.0243 510.596 10.0729C511.016 10.1145 511.408 10.2013 511.775 10.3331C512.142 10.458 512.443 10.6281 512.679 10.8432C512.915 11.0514 513.121 11.3255 513.298 11.6656C513.481 12.0056 513.622 12.4082 513.72 12.8731C513.818 13.3312 513.89 13.8829 513.936 14.5283L512.217 14.8822C512.184 14.5283 512.155 14.2334 512.129 13.9974C512.103 13.7614 512.063 13.529 512.011 13.2999C511.965 13.0709 511.926 12.887 511.893 12.7482C511.867 12.6025 511.808 12.4637 511.716 12.3318C511.625 12.193 511.549 12.0889 511.49 12.0195C511.438 11.9501 511.336 11.8842 511.186 11.8217C511.035 11.7593 510.907 11.7176 510.803 11.6968C510.704 11.6691 510.537 11.6448 510.302 11.6239C510.073 11.6031 509.873 11.5927 509.703 11.5927C509.532 11.5927 509.283 11.5927 508.956 11.5927C508.498 11.5927 508.121 11.5997 507.826 11.6135C507.538 11.6205 507.247 11.6448 506.952 11.6864C506.664 11.7211 506.435 11.7766 506.265 11.853C506.101 11.9224 505.947 12.0195 505.803 12.1444C505.659 12.2624 505.554 12.4116 505.489 12.5921C505.43 12.7656 505.394 12.9772 505.381 13.2271C505.322 15.0592 505.292 16.9295 505.292 18.838C505.292 20.1705 505.322 21.4717 505.381 22.7417C505.413 23.1373 505.518 23.4461 505.695 23.6682C505.878 23.8903 506.229 24.0672 506.746 24.1991C507.27 24.3309 508.01 24.3969 508.966 24.3969C509.477 24.3969 509.906 24.383 510.253 24.3552C510.6 24.3205 510.891 24.2477 511.127 24.1366C511.363 24.0187 511.543 23.9146 511.667 23.8243C511.791 23.7272 511.89 23.5433 511.962 23.2726C512.04 23.002 512.089 22.7764 512.109 22.596C512.135 22.4086 512.161 22.0928 512.188 21.6487C512.194 21.5515 512.197 21.4752 512.197 21.4196C512.204 21.3641 512.211 21.2913 512.217 21.201C512.224 21.1039 512.23 21.0171 512.237 20.9408Z" fill="#212121"/>
          <path d="M527 25.7502H524.977L523.867 21.784H518.454L517.384 25.7502H515.468L519.957 10.2394H522.619L527 25.7502ZM523.454 20.285L522.216 15.6318L521.195 11.8217C520.815 13.2583 520.481 14.4936 520.193 15.5277L518.877 20.285H523.454Z" fill="#212121"/>
          <path d="M612 9H618.351V27H612V9Z" fill="#00B3FF"/>
          <path d="M621.527 9H624.703V27H621.527V9Z" fill="#00B3FF"/>
          <path d="M642.747 18.585C645.16 18.585 646.367 19.31 646.367 20.76C646.367 21.44 646.203 22.02 645.875 22.5C645.546 22.97 644.959 23.34 644.112 23.61C643.265 23.87 642.09 24 640.587 24H633.442C633.526 22.06 633.569 20.245 633.569 18.555C633.569 16.865 633.526 15.05 633.442 13.11H637.173V13.125H640.555C641.868 13.125 642.9 13.23 643.652 13.44C644.414 13.64 644.948 13.935 645.255 14.325C645.573 14.715 645.732 15.21 645.732 15.81C645.732 16.42 645.504 16.965 645.049 17.445C644.604 17.915 643.837 18.295 642.747 18.585ZM637.173 15.855V17.25H640.222C640.878 17.25 641.333 17.195 641.587 17.085C641.852 16.975 641.984 16.775 641.984 16.485C641.984 16.255 641.847 16.095 641.572 16.005C641.307 15.905 640.857 15.855 640.222 15.855H637.173ZM640.222 21.255C640.772 21.255 641.19 21.235 641.476 21.195C641.773 21.145 641.984 21.065 642.111 20.955C642.238 20.835 642.302 20.675 642.302 20.475C642.302 20.215 642.148 20.03 641.841 19.92C641.545 19.8 641.005 19.74 640.222 19.74H637.173V21.255H640.222Z" fill="#212121"/>
          <path d="M654.696 24.15C652.272 24.15 650.488 23.655 649.345 22.665C648.202 21.665 647.63 20.265 647.63 18.465C647.63 16.685 648.196 15.295 649.329 14.295C650.472 13.295 652.261 12.795 654.696 12.795C657.141 12.795 658.93 13.295 660.063 14.295C661.206 15.295 661.778 16.685 661.778 18.465C661.778 20.275 661.212 21.675 660.079 22.665C658.946 23.655 657.152 24.15 654.696 24.15ZM654.696 21.09C655.871 21.09 656.718 20.88 657.237 20.46C657.755 20.03 658.015 19.365 658.015 18.465C658.015 17.585 657.755 16.93 657.237 16.5C656.718 16.07 655.871 15.855 654.696 15.855C653.532 15.855 652.69 16.07 652.171 16.5C651.653 16.93 651.393 17.585 651.393 18.465C651.393 19.355 651.653 20.015 652.171 20.445C652.69 20.875 653.532 21.09 654.696 21.09Z" fill="#212121"/>
          <path d="M671.332 24C670.835 23.15 670.009 21.85 668.855 20.1L666.997 21.84V24H663.043C663.128 22.06 663.17 20.245 663.17 18.555C663.17 16.865 663.128 15.05 663.043 13.11H666.997V17.505C668.945 15.685 670.332 14.22 671.157 13.11H676.302L671.3 17.79C672.041 18.77 672.872 19.835 673.793 20.985C674.725 22.135 675.566 23.14 676.318 24H671.332Z" fill="#212121"/>
          <path d="M686.814 16.095C685.554 16.035 684.623 16 684.019 15.99V21.12C684.633 21.11 685.565 21.075 686.814 21.015V24H677.588V21.015C678.806 21.075 679.732 21.11 680.367 21.12V15.99C679.732 16 678.806 16.035 677.588 16.095V13.11H686.814V16.095Z" fill="#212121"/>
          <path d="M701.408 13.125C701.334 14.815 701.297 16.625 701.297 18.555C701.297 20.495 701.334 22.31 701.408 24H695.724L691.881 15.81L692.167 24H688.086C688.171 22.06 688.213 20.245 688.213 18.555C688.213 16.875 688.171 15.065 688.086 13.125H693.93L697.788 21.54L697.518 13.125H701.408Z" fill="#212121"/>
          <path d="M709.22 17.79H716V24H713.205L712.872 21.345C712.554 22.295 711.988 23 711.173 23.46C710.358 23.92 709.363 24.15 708.188 24.15C707.119 24.15 706.166 23.925 705.33 23.475C704.504 23.025 703.853 22.38 703.377 21.54C702.911 20.7 702.678 19.72 702.678 18.6C702.678 16.81 703.244 15.395 704.377 14.355C705.51 13.315 707.272 12.795 709.664 12.795C711.03 12.795 712.231 13.005 713.269 13.425C714.317 13.845 715.206 14.495 715.936 15.375C715.46 15.605 714.529 16.065 713.142 16.755L712.745 16.965C712.332 16.575 711.85 16.285 711.3 16.095C710.749 15.895 710.167 15.795 709.553 15.795C708.537 15.795 707.78 16.05 707.283 16.56C706.785 17.06 706.536 17.68 706.536 18.42C706.536 19.22 706.801 19.865 707.33 20.355C707.87 20.845 708.691 21.09 709.791 21.09C710.268 21.09 710.728 21.025 711.173 20.895C711.628 20.765 712.009 20.54 712.316 20.22H709.22V17.79Z" fill="#212121"/>
          <path d="M796.007 26.6547H794V11.5849H796.814L806.357 21.9349V11.5849H808.353V26.6547H805.539L796.007 16.3151V26.6547Z" fill="#212121"/>
          <path d="M815.409 11.6477C815.409 11.9128 815.355 12.164 815.246 12.4012C815.144 12.6384 815.002 12.8442 814.82 13.0186C814.638 13.193 814.424 13.3326 814.177 13.4372C813.93 13.5349 813.668 13.5837 813.392 13.5837C813.115 13.5837 812.853 13.5349 812.606 13.4372C812.366 13.3326 812.155 13.193 811.974 13.0186C811.792 12.8442 811.646 12.6384 811.537 12.4012C811.436 12.164 811.385 11.9128 811.385 11.6477C811.385 11.3826 811.436 11.1349 811.537 10.9047C811.646 10.6674 811.792 10.4616 811.974 10.2872C812.155 10.1128 812.366 9.97674 812.606 9.87907C812.853 9.77442 813.115 9.72209 813.392 9.72209C813.668 9.72209 813.93 9.77442 814.177 9.87907C814.424 9.97674 814.638 10.1128 814.82 10.2872C815.002 10.4616 815.144 10.6674 815.246 10.9047C815.355 11.1349 815.409 11.3826 815.409 11.6477ZM815.246 26.6547H811.548V14.5779H815.246V26.6547Z" fill="#212121"/>
          <path d="M829.184 22.793C829.184 23.3233 829.104 23.7942 828.944 24.2058C828.784 24.6174 828.566 24.9767 828.29 25.2837C828.013 25.5837 827.686 25.8384 827.308 26.0477C826.93 26.25 826.523 26.414 826.086 26.5395C825.658 26.6651 825.207 26.7558 824.734 26.8116C824.262 26.8674 823.793 26.8953 823.327 26.8953C822.702 26.8953 822.149 26.857 821.669 26.7802C821.19 26.7035 820.731 26.5814 820.295 26.414C819.859 26.2395 819.423 26.0163 818.986 25.7442C818.557 25.4721 818.078 25.1407 817.547 24.75L819.695 23.0651C819.892 23.4209 820.15 23.7453 820.47 24.0384C820.797 24.3244 821.135 24.5721 821.484 24.7814C821.833 24.9907 822.171 25.1512 822.498 25.2628C822.825 25.3744 823.091 25.4302 823.294 25.4302C823.462 25.4302 823.651 25.4267 823.862 25.4198C824.072 25.4058 824.287 25.3849 824.505 25.357C824.723 25.3221 824.938 25.2733 825.149 25.2105C825.359 25.1477 825.545 25.064 825.705 24.9593C825.872 24.8477 826.003 24.7116 826.097 24.5512C826.199 24.3837 826.25 24.1849 826.25 23.9547C826.25 23.7174 826.185 23.5116 826.054 23.3372C825.93 23.1558 825.767 22.9988 825.563 22.8663C825.359 22.7337 825.127 22.6221 824.865 22.5314C824.603 22.4407 824.338 22.3605 824.069 22.2907C823.807 22.2209 823.553 22.1616 823.305 22.1128C823.058 22.057 822.844 22.0047 822.662 21.9558C822.327 21.8651 821.975 21.7744 821.604 21.6837C821.233 21.586 820.866 21.4779 820.502 21.3593C820.139 21.2337 819.79 21.0872 819.455 20.9198C819.128 20.7523 818.837 20.5535 818.583 20.3233C818.336 20.086 818.136 19.8105 817.983 19.4965C817.838 19.1756 817.765 18.8023 817.765 18.3767C817.765 17.5953 817.925 16.943 818.245 16.4198C818.572 15.8895 819.001 15.4674 819.532 15.1535C820.063 14.8326 820.666 14.6058 821.342 14.4733C822.018 14.3407 822.706 14.2744 823.404 14.2744C823.883 14.2744 824.389 14.3233 824.92 14.4209C825.45 14.5116 825.967 14.6512 826.468 14.8395C826.97 15.0209 827.439 15.2442 827.875 15.5093C828.311 15.7744 828.675 16.0779 828.966 16.4198L826.817 18.1151C826.657 17.6965 826.446 17.3372 826.185 17.0372C825.93 16.7372 825.65 16.493 825.345 16.3047C825.047 16.1093 824.738 15.9663 824.418 15.8756C824.105 15.7849 823.814 15.7395 823.545 15.7395C823.284 15.7395 822.989 15.75 822.662 15.7709C822.335 15.7919 822.026 15.8512 821.735 15.9488C821.451 16.0465 821.208 16.1965 821.004 16.3988C820.808 16.5942 820.71 16.8663 820.71 17.2151C820.71 17.4663 820.768 17.6826 820.884 17.864C821.008 18.0384 821.168 18.1919 821.364 18.3244C821.56 18.45 821.782 18.5581 822.029 18.6488C822.284 18.7326 822.542 18.8093 822.804 18.8791C823.065 18.9419 823.32 18.9977 823.567 19.0465C823.814 19.0953 824.036 19.1477 824.232 19.2035C824.567 19.2942 824.92 19.3884 825.29 19.486C825.668 19.5767 826.039 19.6849 826.403 19.8105C826.766 19.9291 827.115 20.0721 827.45 20.2395C827.792 20.4 828.09 20.5988 828.344 20.836C828.599 21.0733 828.802 21.3523 828.955 21.6733C829.108 21.9872 829.184 22.3605 829.184 22.793Z" fill="#212121"/>
          <path d="M843.144 17.5605L841.552 18.1674C841.297 17.4 840.872 16.8105 840.276 16.3988C839.679 15.9872 838.963 15.7814 838.127 15.7814C837.676 15.7814 837.273 15.8512 836.917 15.9907C836.568 16.1233 836.258 16.3081 835.989 16.5453C835.728 16.7826 835.502 17.0581 835.313 17.3721C835.132 17.686 834.982 18.0209 834.866 18.3767C834.75 18.7326 834.666 19.1023 834.615 19.486C834.564 19.8628 834.539 20.2291 834.539 20.5849C834.539 20.9686 834.561 21.3558 834.604 21.7465C834.648 22.1372 834.721 22.514 834.822 22.8767C834.932 23.2326 835.073 23.5674 835.248 23.8814C835.422 24.1884 835.64 24.457 835.902 24.6872C836.171 24.9174 836.488 25.0988 836.851 25.2314C837.222 25.364 837.647 25.4302 838.127 25.4302C838.512 25.4302 838.88 25.3744 839.229 25.2628C839.578 25.1512 839.898 24.9942 840.188 24.7919C840.479 24.5895 840.737 24.3488 840.963 24.0698C841.188 23.7907 841.366 23.4802 841.497 23.1384L843.1 23.7035C842.86 24.2547 842.541 24.7326 842.141 25.1372C841.748 25.5349 841.301 25.8663 840.799 26.1314C840.297 26.3895 839.759 26.5814 839.185 26.707C838.611 26.8326 838.029 26.8953 837.44 26.8953C836.488 26.8953 835.604 26.7419 834.79 26.4349C833.975 26.1209 833.27 25.6849 832.674 25.1267C832.085 24.5616 831.623 23.8953 831.289 23.1279C830.954 22.3535 830.787 21.5058 830.787 20.5849C830.787 19.657 830.951 18.8058 831.278 18.0314C831.612 17.257 832.074 16.5907 832.663 16.0326C833.252 15.4744 833.954 15.0419 834.768 14.7349C835.582 14.4279 836.473 14.2744 837.44 14.2744C838.051 14.2744 838.647 14.3407 839.229 14.4733C839.81 14.5988 840.348 14.7977 840.843 15.0698C841.344 15.3349 841.792 15.6733 842.184 16.0849C842.584 16.4965 842.904 16.9884 843.144 17.5605Z" fill="#212121"/>
          <path d="M858.009 26.6547H854.323V25.2105C853.887 25.7826 853.36 26.2081 852.742 26.4872C852.131 26.7593 851.458 26.8953 850.724 26.8953C849.764 26.8953 848.906 26.7314 848.15 26.4035C847.394 26.0756 846.754 25.6291 846.231 25.064C845.707 24.4919 845.307 23.8221 845.031 23.0547C844.755 22.2872 844.616 21.464 844.616 20.5849C844.616 19.7058 844.755 18.8826 845.031 18.1151C845.307 17.3477 845.707 16.6814 846.231 16.1163C846.754 15.5442 847.394 15.0942 848.15 14.7663C848.906 14.4384 849.764 14.2744 850.724 14.2744C851.211 14.2744 851.673 14.3442 852.109 14.4837C852.553 14.6233 852.956 14.8221 853.32 15.0802C853.69 15.3314 854.014 15.6384 854.29 16.0012C854.574 16.357 854.796 16.7547 854.956 17.1942L856.592 14.5674H858.009V26.6547ZM854.301 20.5849C854.301 20.2709 854.283 19.9395 854.247 19.5907C854.218 19.2419 854.163 18.8965 854.083 18.5547C854.003 18.2128 853.89 17.8884 853.745 17.5814C853.607 17.2674 853.425 16.9919 853.2 16.7547C852.982 16.5105 852.716 16.3186 852.404 16.1791C852.091 16.0395 851.727 15.9698 851.313 15.9698C850.898 15.9698 850.539 16.043 850.233 16.1895C849.928 16.3291 849.666 16.5209 849.448 16.7651C849.23 17.0023 849.048 17.2779 848.903 17.5919C848.764 17.9058 848.655 18.2337 848.575 18.5756C848.495 18.9174 848.437 19.2628 848.401 19.6116C848.372 19.9535 848.357 20.2779 848.357 20.5849C848.357 20.8919 848.372 21.2198 848.401 21.5686C848.437 21.9174 848.495 22.2628 848.575 22.6047C848.655 22.9465 848.764 23.2744 848.903 23.5884C849.048 23.9023 849.23 24.1814 849.448 24.4256C849.666 24.6628 849.928 24.8547 850.233 25.0012C850.539 25.1407 850.898 25.2105 851.313 25.2105C851.691 25.2105 852.025 25.1372 852.316 24.9907C852.614 24.8372 852.873 24.6349 853.091 24.3837C853.316 24.1326 853.505 23.8465 853.658 23.5256C853.81 23.2047 853.934 22.8733 854.029 22.5314C854.123 22.1895 854.192 21.8512 854.236 21.5163C854.279 21.1744 854.301 20.864 854.301 20.5849Z" fill="#212121"/>
          <path d="M864.782 26.6547H861.096V9H862.514L864.782 12.6733V26.6547Z" fill="#212121"/>
          <path d="M880.542 26.6547H876.856V25.2105C876.419 25.7826 875.892 26.2081 875.274 26.4872C874.663 26.7593 873.991 26.8953 873.256 26.8953C872.297 26.8953 871.439 26.7314 870.683 26.4035C869.926 26.0756 869.287 25.6291 868.763 25.064C868.24 24.4919 867.84 23.8221 867.563 23.0547C867.287 22.2872 867.149 21.464 867.149 20.5849C867.149 19.7058 867.287 18.8826 867.563 18.1151C867.84 17.3477 868.24 16.6814 868.763 16.1163C869.287 15.5442 869.926 15.0942 870.683 14.7663C871.439 14.4384 872.297 14.2744 873.256 14.2744C873.744 14.2744 874.205 14.3442 874.642 14.4837C875.085 14.6233 875.489 14.8221 875.852 15.0802C876.223 15.3314 876.547 15.6384 876.823 16.0012C877.106 16.357 877.328 16.7547 877.488 17.1942L879.124 14.5674H880.542V26.6547ZM876.834 20.5849C876.834 20.2709 876.816 19.9395 876.779 19.5907C876.75 19.2419 876.696 18.8965 876.616 18.5547C876.536 18.2128 876.423 17.8884 876.278 17.5814C876.139 17.2674 875.958 16.9919 875.732 16.7547C875.514 16.5105 875.249 16.3186 874.936 16.1791C874.623 16.0395 874.26 15.9698 873.845 15.9698C873.431 15.9698 873.071 16.043 872.766 16.1895C872.46 16.3291 872.199 16.5209 871.98 16.7651C871.762 17.0023 871.581 17.2779 871.435 17.5919C871.297 17.9058 871.188 18.2337 871.108 18.5756C871.028 18.9174 870.97 19.2628 870.933 19.6116C870.904 19.9535 870.89 20.2779 870.89 20.5849C870.89 20.8919 870.904 21.2198 870.933 21.5686C870.97 21.9174 871.028 22.2628 871.108 22.6047C871.188 22.9465 871.297 23.2744 871.435 23.5884C871.581 23.9023 871.762 24.1814 871.98 24.4256C872.199 24.6628 872.46 24.8547 872.766 25.0012C873.071 25.1407 873.431 25.2105 873.845 25.2105C874.224 25.2105 874.558 25.1372 874.849 24.9907C875.147 24.8372 875.405 24.6349 875.623 24.3837C875.849 24.1326 876.038 23.8465 876.19 23.5256C876.343 23.2047 876.467 22.8733 876.561 22.5314C876.656 22.1895 876.725 21.8512 876.768 21.5163C876.812 21.1744 876.834 20.864 876.834 20.5849Z" fill="#212121"/>
          <path d="M887.206 25.0849C887.206 25.35 887.155 25.6012 887.053 25.8384C886.951 26.0686 886.809 26.2709 886.628 26.4453C886.446 26.6128 886.235 26.7453 885.995 26.843C885.755 26.9477 885.497 27 885.221 27C884.944 27 884.686 26.9477 884.446 26.843C884.206 26.7453 883.996 26.6128 883.814 26.4453C883.632 26.2709 883.49 26.0686 883.388 25.8384C883.287 25.6012 883.236 25.35 883.236 25.0849C883.236 24.8267 883.287 24.5826 883.388 24.3523C883.49 24.1151 883.632 23.9128 883.814 23.7453C883.996 23.5709 884.206 23.4349 884.446 23.3372C884.686 23.2326 884.944 23.1802 885.221 23.1802C885.497 23.1802 885.755 23.2326 885.995 23.3372C886.235 23.4349 886.446 23.5709 886.628 23.7453C886.809 23.9128 886.951 24.1151 887.053 24.3523C887.155 24.5826 887.206 24.8267 887.206 25.0849Z" fill="#212121"/>
          <path d="M893.76 11.6477C893.76 11.9128 893.706 12.164 893.597 12.4012C893.495 12.6384 893.353 12.8442 893.171 13.0186C892.99 13.193 892.775 13.3326 892.528 13.4372C892.281 13.5349 892.019 13.5837 891.743 13.5837C891.466 13.5837 891.205 13.5349 890.957 13.4372C890.718 13.3326 890.507 13.193 890.325 13.0186C890.143 12.8442 889.998 12.6384 889.889 12.4012C889.787 12.164 889.736 11.9128 889.736 11.6477C889.736 11.3826 889.787 11.1349 889.889 10.9047C889.998 10.6674 890.143 10.4616 890.325 10.2872C890.507 10.1128 890.718 9.97674 890.957 9.87907C891.205 9.77442 891.466 9.72209 891.743 9.72209C892.019 9.72209 892.281 9.77442 892.528 9.87907C892.775 9.97674 892.99 10.1128 893.171 10.2872C893.353 10.4616 893.495 10.6674 893.597 10.9047C893.706 11.1349 893.76 11.3826 893.76 11.6477ZM893.597 26.6547H889.9V14.5779H893.597V26.6547Z" fill="#FF0004"/>
          <path d="M910 20.5849C910 21.2128 909.913 21.8023 909.738 22.3535C909.564 22.9047 909.32 23.414 909.008 23.8814C908.702 24.3488 908.331 24.7709 907.895 25.1477C907.459 25.5174 906.979 25.8314 906.455 26.0895C905.939 26.3477 905.383 26.5465 904.787 26.686C904.198 26.8256 903.591 26.8953 902.965 26.8953C902.34 26.8953 901.733 26.8256 901.144 26.686C900.555 26.5465 899.999 26.3477 899.475 26.0895C898.959 25.8314 898.483 25.5174 898.047 25.1477C897.61 24.7709 897.236 24.3488 896.923 23.8814C896.618 23.414 896.378 22.9047 896.203 22.3535C896.029 21.7953 895.942 21.2058 895.942 20.5849C895.942 19.964 896.029 19.3779 896.203 18.8267C896.378 18.2686 896.618 17.7558 896.923 17.2884C897.236 16.8209 897.61 16.4023 898.047 16.0326C898.483 15.6558 898.959 15.3384 899.475 15.0802C899.999 14.8221 900.555 14.6233 901.144 14.4837C901.733 14.3442 902.34 14.2744 902.965 14.2744C903.591 14.2744 904.198 14.3442 904.787 14.4837C905.383 14.6233 905.939 14.8221 906.455 15.0802C906.979 15.3384 907.459 15.6558 907.895 16.0326C908.331 16.4023 908.702 16.8209 909.008 17.2884C909.32 17.7558 909.564 18.2686 909.738 18.8267C909.913 19.3779 910 19.964 910 20.5849ZM906.248 20.5849C906.248 20.25 906.226 19.8977 906.183 19.5279C906.146 19.1512 906.081 18.7849 905.986 18.4291C905.892 18.0663 905.761 17.7209 905.594 17.393C905.434 17.0581 905.234 16.7686 904.994 16.5244C904.754 16.2733 904.467 16.0744 904.132 15.9279C903.798 15.7744 903.409 15.6977 902.965 15.6977C902.544 15.6977 902.169 15.7744 901.842 15.9279C901.515 16.0814 901.228 16.2872 900.98 16.5453C900.741 16.7965 900.537 17.0895 900.37 17.4244C900.21 17.7593 900.079 18.1081 899.977 18.4709C899.875 18.8267 899.803 19.1895 899.759 19.5593C899.715 19.9221 899.693 20.264 899.693 20.5849C899.693 20.9058 899.715 21.2512 899.759 21.6209C899.803 21.9837 899.875 22.3465 899.977 22.7093C900.079 23.0721 900.21 23.4209 900.37 23.7558C900.537 24.0837 900.741 24.3767 900.98 24.6349C901.228 24.886 901.515 25.0884 901.842 25.2419C902.169 25.3953 902.544 25.4721 902.965 25.4721C903.402 25.4721 903.787 25.3988 904.121 25.2523C904.456 25.0988 904.743 24.8965 904.983 24.6453C905.23 24.3942 905.434 24.1047 905.594 23.7767C905.754 23.4488 905.881 23.1035 905.976 22.7407C906.077 22.3779 906.146 22.0116 906.183 21.6419C906.226 21.2721 906.248 20.9198 906.248 20.5849Z" fill="#FF0004"/>
          <path d="M995.4 26C989.545 26 986.182 24.5377 986 20.5536H990.943C990.943 21.6556 992.037 22.3974 995.197 22.3974C998.418 22.3974 999.026 21.9311 999.026 21.1258C999.026 20.1934 998.479 20.0026 994.954 19.7695L994.245 19.7272C988.674 19.3881 986.223 17.947 986.223 14.6834C986.223 11.5682 989.403 10 994.407 10C1000.12 10 1003.18 11.8225 1003.36 15.1921H998.418C998.418 14.0265 997.102 13.6026 994.367 13.6026C991.794 13.6026 991.166 14.0265 991.166 14.6834C991.166 15.4675 991.713 15.7642 994.974 15.9974L995.805 16.0609C1000.77 16.4636 1003.97 17.0146 1003.97 20.9351C1003.97 24.7709 1000.77 26 995.4 26Z" fill="#00B3FF"/>
          <path d="M1004.34 25.5762L1011.79 10.3603H1017.87L1025.31 25.5762H1020.22L1018.95 22.7576H1010.7L1009.4 25.5762H1004.34ZM1012.32 19.1762H1017.3L1014.81 13.7298L1012.32 19.1762Z" fill="#00B3FF"/>
          <path d="M1026.92 25.5762V10.3603H1034.35L1038.67 19.8331L1042.96 10.3603H1050.38V25.5762H1045.62V15.0861L1040.87 25.5762H1036.44L1031.68 15.0861V25.5762H1026.92Z" fill="#00B3FF"/>
          <path d="M1052.39 14.5563V10.3603H1069.69V14.5563H1063.43V25.5762H1058.67V14.5563H1052.39Z" fill="#00B3FF"/>
          <path d="M1071.69 25.5762V10.3603H1076.45V25.5762H1071.69Z" fill="#00B3FF"/>
          <path d="M1085.1 25.5762L1078.03 10.3603H1083.1L1088.51 22.2066L1093.92 10.3603H1099L1091.89 25.5762H1085.1Z" fill="#00B3FF"/>
          <path d="M1202 15.1886H1190.01L1197.61 8.10052L1195.48 6.11249L1187 14.0243V4H1183.99V15.1886L1176.39 8.10052L1174.26 10.0883L1182.74 18.0001H1172V20.8114H1183.99L1176.39 27.8995L1178.52 29.8875L1187 21.9759V32H1190.01V20.8114L1197.61 27.8995L1199.74 25.9117L1191.26 18.0001H1202V15.1886Z" fill="#8A38EE"/>
          <path d="M1210 26V10H1212.72V26H1210Z" fill="#212121"/>
          <path d="M1216.13 26V10H1230.31V12.3244H1218.85V16.9055H1229.9V19.0719H1218.85V23.653H1230.31V26H1216.13Z" fill="#212121"/>
          <path d="M1232.81 26L1240.79 10H1244.25L1252.19 26H1249.28L1247.52 22.3441H1237.5L1235.73 26H1232.81ZM1238.6 20.0874H1246.42L1242.52 11.9859L1238.6 20.0874Z" fill="#212121"/>
          <path d="M1254.81 26V23.2243H1258V26H1254.81Z" fill="#212121"/>
          <path d="M1338 17.9999C1338 16.2554 1339.4 14.8039 1341.55 14.0551C1342.2 11.5965 1343.47 10 1345 10C1346.53 10 1347.8 11.5965 1348.45 14.0551C1350.6 14.8039 1352 16.2556 1352 17.9999C1352 19.7442 1350.6 21.1961 1348.45 21.9449C1347.8 24.4037 1346.53 26 1345 26C1343.47 26 1342.2 24.4035 1341.55 21.9449C1339.4 21.1961 1338 19.7446 1338 17.9999ZM1345 11.97C1344.54 11.97 1343.98 12.5484 1343.55 13.5965C1344.01 13.538 1344.5 13.5074 1345 13.5074C1345.5 13.5074 1345.99 13.538 1346.45 13.5965C1346.02 12.5482 1345.46 11.97 1345 11.97ZM1342.79 17.9999C1342.79 18.8502 1342.86 19.6248 1342.97 20.3157C1343.58 20.4457 1344.26 20.5223 1345 20.5223C1345.74 20.5223 1346.42 20.4457 1347.03 20.3157C1347.14 19.6248 1347.21 18.8502 1347.21 17.9999C1347.21 17.1496 1347.14 16.375 1347.03 15.6841C1346.42 15.5541 1345.74 15.4775 1345 15.4775C1344.26 15.4775 1343.58 15.5541 1342.97 15.6841C1342.86 16.375 1342.79 17.1496 1342.79 17.9999ZM1350.28 17.9999C1350.28 17.4711 1349.77 16.8378 1348.85 16.338C1348.9 16.8713 1348.93 17.4266 1348.93 17.9999C1348.93 18.5732 1348.9 19.1287 1348.85 19.662C1349.77 19.1622 1350.28 18.5287 1350.28 17.9999ZM1345 24.03C1345.46 24.03 1346.02 23.4518 1346.45 22.4035C1345.99 22.462 1345.5 22.4926 1345 22.4926C1344.5 22.4926 1344.01 22.462 1343.55 22.4035C1343.98 23.4518 1344.54 24.03 1345 24.03ZM1341.15 19.662C1341.1 19.1287 1341.07 18.5734 1341.07 17.9999C1341.07 17.4264 1341.1 16.8713 1341.15 16.338C1340.23 16.8378 1339.72 17.4711 1339.72 17.9999C1339.72 18.5287 1340.23 19.162 1341.15 19.662Z" fill="#FF8000"/>
          <path d="M1367.05 10.2394V19.9519C1367.05 20.7846 1367.01 21.4995 1366.94 22.0963C1366.88 22.6931 1366.76 23.224 1366.58 23.689C1366.4 24.147 1366.18 24.5218 1365.91 24.8133C1365.65 25.0978 1365.3 25.3338 1364.87 25.5211C1364.44 25.7016 1363.97 25.8265 1363.44 25.8959C1362.91 25.9653 1362.26 26 1361.51 26C1360.78 26 1360.16 25.9688 1359.65 25.9063C1359.14 25.8439 1358.67 25.7293 1358.24 25.5628C1357.81 25.3893 1357.46 25.1637 1357.19 24.8861C1356.93 24.6016 1356.7 24.2338 1356.51 23.7827C1356.32 23.3247 1356.19 22.7868 1356.11 22.1692C1356.04 21.5515 1356 20.8124 1356 19.9519V10.2394H1357.99V20.2225C1357.99 20.7985 1357.99 21.2149 1357.99 21.4717C1358 21.7285 1358.02 22.0442 1358.05 22.419C1358.09 22.7868 1358.13 23.0401 1358.18 23.1789C1358.23 23.3108 1358.32 23.4773 1358.44 23.6786C1358.56 23.8799 1358.7 24.0082 1358.85 24.0638C1359.01 24.1123 1359.22 24.1748 1359.49 24.2511C1359.76 24.3275 1360.04 24.3726 1360.35 24.3865C1360.67 24.3934 1361.06 24.3969 1361.52 24.3969C1362.07 24.3969 1362.53 24.3795 1362.9 24.3448C1363.27 24.3101 1363.59 24.2407 1363.87 24.1366C1364.14 24.0325 1364.35 23.9146 1364.5 23.7827C1364.65 23.6439 1364.76 23.4426 1364.85 23.1789C1364.94 22.9152 1365 22.6411 1365.03 22.3565C1365.05 22.072 1365.07 21.6938 1365.07 21.2219L1365.06 10.2394H1367.05Z" fill="#212121"/>
          <path d="M1380.98 25.7502H1378.91L1371.93 13.4977V25.7502H1370.18V10.2394H1372.2L1379.23 22.6584V10.2394H1380.98V25.7502Z" fill="#212121"/>
          <path d="M1386.3 25.7502H1384.31V10.2394H1386.3V25.7502Z" fill="#212121"/>
          <path d="M1398.24 20.9408L1399.95 21.2115C1399.91 21.8777 1399.86 22.4468 1399.78 22.9187C1399.7 23.3836 1399.58 23.8 1399.43 24.1679C1399.27 24.5357 1399.09 24.8341 1398.87 25.0631C1398.64 25.2852 1398.35 25.4691 1398 25.6148C1397.65 25.7606 1397.26 25.8612 1396.82 25.9167C1396.39 25.9722 1395.87 26 1395.25 26C1394.66 26 1394.13 25.9826 1393.67 25.948C1393.2 25.9202 1392.78 25.8543 1392.39 25.7502C1392.01 25.6391 1391.68 25.535 1391.39 25.4379C1391.11 25.3338 1390.86 25.1637 1390.63 24.9278C1390.42 24.6918 1390.23 24.4802 1390.08 24.2928C1389.94 24.1054 1389.82 23.8209 1389.71 23.4392C1389.61 23.0505 1389.54 22.7105 1389.48 22.419C1389.43 22.1275 1389.39 21.7042 1389.36 21.149C1389.33 20.5938 1389.31 20.108 1389.31 19.6916C1389.3 19.2752 1389.3 18.6992 1389.3 17.9636C1389.3 17.1863 1389.3 16.5617 1389.31 16.0898C1389.31 15.6179 1389.33 15.1043 1389.37 14.5491C1389.4 13.9939 1389.44 13.5637 1389.48 13.2583C1389.54 12.9529 1389.62 12.6198 1389.72 12.2589C1389.83 11.8911 1389.96 11.6205 1390.09 11.447C1390.23 11.2665 1390.41 11.0722 1390.63 10.864C1390.86 10.6558 1391.1 10.5136 1391.36 10.4372C1391.63 10.3539 1391.95 10.2707 1392.33 10.1874C1392.71 10.1041 1393.12 10.052 1393.55 10.0312C1393.99 10.0104 1394.5 10 1395.07 10C1395.67 10 1396.18 10.0243 1396.6 10.0729C1397.02 10.1145 1397.41 10.2013 1397.78 10.3331C1398.14 10.458 1398.44 10.6281 1398.68 10.8432C1398.91 11.0514 1399.12 11.3255 1399.3 11.6656C1399.48 12.0056 1399.62 12.4082 1399.72 12.8731C1399.82 13.3312 1399.89 13.8829 1399.94 14.5283L1398.22 14.8822C1398.18 14.5283 1398.15 14.2334 1398.13 13.9974C1398.1 13.7614 1398.06 13.529 1398.01 13.2999C1397.97 13.0709 1397.93 12.887 1397.89 12.7482C1397.87 12.6025 1397.81 12.4637 1397.72 12.3318C1397.62 12.193 1397.55 12.0889 1397.49 12.0195C1397.44 11.9501 1397.34 11.8842 1397.19 11.8217C1397.04 11.7593 1396.91 11.7176 1396.8 11.6968C1396.7 11.6691 1396.54 11.6448 1396.3 11.6239C1396.07 11.6031 1395.87 11.5927 1395.7 11.5927C1395.53 11.5927 1395.28 11.5927 1394.96 11.5927C1394.5 11.5927 1394.12 11.5997 1393.83 11.6135C1393.54 11.6205 1393.25 11.6448 1392.95 11.6864C1392.66 11.7211 1392.43 11.7766 1392.26 11.853C1392.1 11.9224 1391.95 12.0195 1391.8 12.1444C1391.66 12.2624 1391.55 12.4116 1391.49 12.5921C1391.43 12.7656 1391.39 12.9772 1391.38 13.2271C1391.32 15.0592 1391.29 16.9295 1391.29 18.838C1391.29 20.1705 1391.32 21.4717 1391.38 22.7417C1391.41 23.1373 1391.52 23.4461 1391.69 23.6682C1391.88 23.8903 1392.23 24.0672 1392.75 24.1991C1393.27 24.3309 1394.01 24.3969 1394.97 24.3969C1395.48 24.3969 1395.91 24.383 1396.25 24.3552C1396.6 24.3205 1396.89 24.2477 1397.13 24.1366C1397.36 24.0187 1397.54 23.9146 1397.67 23.8243C1397.79 23.7272 1397.89 23.5433 1397.96 23.2726C1398.04 23.002 1398.09 22.7764 1398.11 22.596C1398.14 22.4086 1398.16 22.0928 1398.19 21.6487C1398.19 21.5515 1398.2 21.4752 1398.2 21.4196C1398.2 21.3641 1398.21 21.2913 1398.22 21.201C1398.22 21.1039 1398.23 21.0171 1398.24 20.9408Z" fill="#212121"/>
          <path d="M1413 25.7502H1410.98L1409.87 21.784H1404.45L1403.38 25.7502H1401.47L1405.96 10.2394H1408.62L1413 25.7502ZM1409.45 20.285L1408.22 15.6318L1407.19 11.8217C1406.82 13.2583 1406.48 14.4936 1406.19 15.5277L1404.88 20.285H1409.45Z" fill="#212121"/>
          <path d="M1498 9H1504.35V27H1498V9Z" fill="#00B3FF"/>
          <path d="M1507.53 9H1510.7V27H1507.53V9Z" fill="#00B3FF"/>
          <path d="M1528.75 18.585C1531.16 18.585 1532.37 19.31 1532.37 20.76C1532.37 21.44 1532.2 22.02 1531.87 22.5C1531.55 22.97 1530.96 23.34 1530.11 23.61C1529.27 23.87 1528.09 24 1526.59 24H1519.44C1519.53 22.06 1519.57 20.245 1519.57 18.555C1519.57 16.865 1519.53 15.05 1519.44 13.11H1523.17V13.125H1526.56C1527.87 13.125 1528.9 13.23 1529.65 13.44C1530.41 13.64 1530.95 13.935 1531.26 14.325C1531.57 14.715 1531.73 15.21 1531.73 15.81C1531.73 16.42 1531.5 16.965 1531.05 17.445C1530.6 17.915 1529.84 18.295 1528.75 18.585ZM1523.17 15.855V17.25H1526.22C1526.88 17.25 1527.33 17.195 1527.59 17.085C1527.85 16.975 1527.98 16.775 1527.98 16.485C1527.98 16.255 1527.85 16.095 1527.57 16.005C1527.31 15.905 1526.86 15.855 1526.22 15.855H1523.17ZM1526.22 21.255C1526.77 21.255 1527.19 21.235 1527.48 21.195C1527.77 21.145 1527.98 21.065 1528.11 20.955C1528.24 20.835 1528.3 20.675 1528.3 20.475C1528.3 20.215 1528.15 20.03 1527.84 19.92C1527.55 19.8 1527.01 19.74 1526.22 19.74H1523.17V21.255H1526.22Z" fill="#212121"/>
          <path d="M1540.7 24.15C1538.27 24.15 1536.49 23.655 1535.34 22.665C1534.2 21.665 1533.63 20.265 1533.63 18.465C1533.63 16.685 1534.2 15.295 1535.33 14.295C1536.47 13.295 1538.26 12.795 1540.7 12.795C1543.14 12.795 1544.93 13.295 1546.06 14.295C1547.21 15.295 1547.78 16.685 1547.78 18.465C1547.78 20.275 1547.21 21.675 1546.08 22.665C1544.95 23.655 1543.15 24.15 1540.7 24.15ZM1540.7 21.09C1541.87 21.09 1542.72 20.88 1543.24 20.46C1543.76 20.03 1544.01 19.365 1544.01 18.465C1544.01 17.585 1543.76 16.93 1543.24 16.5C1542.72 16.07 1541.87 15.855 1540.7 15.855C1539.53 15.855 1538.69 16.07 1538.17 16.5C1537.65 16.93 1537.39 17.585 1537.39 18.465C1537.39 19.355 1537.65 20.015 1538.17 20.445C1538.69 20.875 1539.53 21.09 1540.7 21.09Z" fill="#212121"/>
          <path d="M1557.33 24C1556.83 23.15 1556.01 21.85 1554.85 20.1L1553 21.84V24H1549.04C1549.13 22.06 1549.17 20.245 1549.17 18.555C1549.17 16.865 1549.13 15.05 1549.04 13.11H1553V17.505C1554.94 15.685 1556.33 14.22 1557.16 13.11H1562.3L1557.3 17.79C1558.04 18.77 1558.87 19.835 1559.79 20.985C1560.72 22.135 1561.57 23.14 1562.32 24H1557.33Z" fill="#212121"/>
          <path d="M1572.81 16.095C1571.55 16.035 1570.62 16 1570.02 15.99V21.12C1570.63 21.11 1571.56 21.075 1572.81 21.015V24H1563.59V21.015C1564.81 21.075 1565.73 21.11 1566.37 21.12V15.99C1565.73 16 1564.81 16.035 1563.59 16.095V13.11H1572.81V16.095Z" fill="#212121"/>
          <path d="M1587.41 13.125C1587.33 14.815 1587.3 16.625 1587.3 18.555C1587.3 20.495 1587.33 22.31 1587.41 24H1581.72L1577.88 15.81L1578.17 24H1574.09C1574.17 22.06 1574.21 20.245 1574.21 18.555C1574.21 16.875 1574.17 15.065 1574.09 13.125H1579.93L1583.79 21.54L1583.52 13.125H1587.41Z" fill="#212121"/>
          <path d="M1595.22 17.79H1602V24H1599.21L1598.87 21.345C1598.55 22.295 1597.99 23 1597.17 23.46C1596.36 23.92 1595.36 24.15 1594.19 24.15C1593.12 24.15 1592.17 23.925 1591.33 23.475C1590.5 23.025 1589.85 22.38 1589.38 21.54C1588.91 20.7 1588.68 19.72 1588.68 18.6C1588.68 16.81 1589.24 15.395 1590.38 14.355C1591.51 13.315 1593.27 12.795 1595.66 12.795C1597.03 12.795 1598.23 13.005 1599.27 13.425C1600.32 13.845 1601.21 14.495 1601.94 15.375C1601.46 15.605 1600.53 16.065 1599.14 16.755L1598.74 16.965C1598.33 16.575 1597.85 16.285 1597.3 16.095C1596.75 15.895 1596.17 15.795 1595.55 15.795C1594.54 15.795 1593.78 16.05 1593.28 16.56C1592.79 17.06 1592.54 17.68 1592.54 18.42C1592.54 19.22 1592.8 19.865 1593.33 20.355C1593.87 20.845 1594.69 21.09 1595.79 21.09C1596.27 21.09 1596.73 21.025 1597.17 20.895C1597.63 20.765 1598.01 20.54 1598.32 20.22H1595.22V17.79Z" fill="#212121"/>
        </svg>
      </section>

      <section className="py-20 px-4 bg-white mt-14">
        <div className="max-w-6xl mx-auto flex lg:flex-row flex-col gap-y-8">
          <div>
            <p className='text-[#8A38EE] font-medium text-[20px]'>About us</p>
            <p className='lg:text-[48px] text-3xl lg:leading-relaxed font-medium lg:w-[90%]'>Inclusive Opportunities, Tailored for You.</p>
            <div className='flex gap-x-4 mt-10'>
              <div className='w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center'>
                <p className='lg:text-[40px] text-2xl font-medium'>86<span className='text-[#8A38EE]'>M+</span></p>
                <p className='text-[#5F5270] text-sm lg:text-[16px]'>Availabe Jobs</p>
              </div>
              <div className='w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center'>
                <p className='lg:text-[40px] text-2xl font-medium'>256<span className='text-[#8A38EE]'>+</span></p>
                <p className='text-[#5F5270] text-sm lg:text-[16px]'>Free Course</p>
              </div>
              <div className='w-40 h-28 bg-[#F5F5F5] rounded-2xl flex flex-col justify-center items-center'>
                <p className='lg:text-[40px] text-2xl font-medium'>5,7<span className='text-[#8A38EE]'>M+</span></p>
                <p className='text-[#5F5270] text-sm lg:text-[16px] text-center'>Alumni has worked</p>
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
      {/* Header */}
      <h2 className="lg:text-[48px] text-3xl font-medium ms-14 mb-8 mt-10">
        <span className="text-purple-600">Latest</span>{' '}
        <span className="text-gray-900">job opportunity</span>
      </h2>
        <div className="max-w-7xl mx-auto px-8 py-12">

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8 bg-[#F5F5F5] rounded-3xl px-2 py-2">
        {categories.map((category, index) => (
          <button
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
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {jobs.map((job, index) => (
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
                {job.mode}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white bg-gray-100 text-gray-700`}>
                {job.experience}
              </span>
            </div>

            {/* Posted & Applicants */}
            <div className={`flex items-center gap-2 text-sm mb-6 group-hover:text-purple-100 text-gray-600`}>
              <span>{job.posted}</span>
              <span>•</span>
              <span>{job.applicants}</span>
            </div>

            {/* Apply Button & Salary */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-dashed border-gray-300">
              <button className={`px-6 py-2 rounded-full font-semibold transition-all hover:scale-105 group-hover:bg-white group-hover:text-purple-600 hover:shadow-lg bg-purple-600 text-white`}>
                Apply Now
              </button>
              <div className={`text-right group-hover:text-white text-purple-600`}>
                <span className="text-lg font-bold">{job.salary}</span>
                <span className="text-sm">/m</span>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full group-hover:bg-white group-hover:bg-opacity-20 bg-gray-200`}></div>
              <div>
                <p className={`font-semibold group-hover:text-white text-gray-900`}>
                  {job.company}
                </p>
                <p className={`text-sm group-hover:text-purple-100 text-gray-500`}>
                  {job.employees}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all hover:shadow-lg">
          See More Jobs
          <ChevronDown className="w-5 h-5" />
        </button>
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
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-purple-700 transition-all">
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
            <button className="flex items-center gap-3 bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all hover:scale-105">
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
              
              {/* People Join */}
              {/* <div className="flex items-center gap-4">
                <p className="text-purple-600 font-semibold text-sm">&gt;100K+ People Join</p>
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-4 border-white"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-4 border-white"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-4 border-white"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-4 border-white"></div>
                </div>
              </div> */}

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




      {/* Featured Categories */}
      {/* <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Job Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore opportunities across various government departments and find your perfect role
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {(() => {
              const categories = [
                { icon: Shield, title: 'Government Jobs', count: '15,000+ jobs', color: 'bg-indigo-500', desc: 'Federal, state, local positions', category: 'government' },
                { icon: Shield, title: 'Law Enforcement', count: '2,500+ jobs', color: 'bg-red-500', desc: 'Police, FBI, Homeland Security', category: 'law-enforcement' },
                { icon: FileText, title: 'Administration', count: '8,200+ jobs', color: 'bg-blue-500', desc: 'Office management, clerical', category: 'administration' },
                { icon: Users, title: 'Healthcare', count: '3,100+ jobs', color: 'bg-green-500', desc: 'Medical, nursing, public health', category: 'healthcare' },
                { icon: PenTool, title: 'Education', count: '4,800+ jobs', color: 'bg-purple-500', desc: 'Teaching, administration, research', category: 'education' },
              ];
              console.log('Rendering categories:', categories.length, categories.map(c => c.title));
              return categories;
            })().map((category, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
                onClick={() => {
                  if (category.title === 'Government Jobs') {
                    router.push('/government-jobs');
                  } else {
                    router.push(`/jobs?category=${category.category}`);
                  }
                }}
              >
                <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">{category.title}</h3>
                <div className="flex bg-purple-600 p-2 rounded-lg items-center justify-center">
                  <span className="text-white font-semibold">{category.count}</span>
                  <ArrowUpRight className="w-5 h-5 text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works */}
      {/* <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your journey to a government career made simple and straightforward
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-[#9333E9] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Your Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Build a comprehensive profile highlighting your skills, experience, and career goals. 
                Our AI-powered matching system will connect you with the perfect opportunities.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-[#9333E9] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Search & Apply</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse thousands of government jobs and apply directly through our platform. 
                Get instant notifications for new opportunities that match your profile.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-[#9333E9] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Hired</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with hiring managers and land your dream government position. 
                Start making a difference in public service with competitive benefits and job security.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hooblr?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most trusted platform for government careers with exclusive features designed for public service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Verified Jobs', desc: 'All listings are verified by government agencies' },
              { icon: Zap, title: 'Instant Alerts', desc: 'Get notified immediately when new jobs match your profile' },
              { icon: Award, title: 'Career Guidance', desc: 'Expert advice and resources to advance your career' },
              { icon: Shield, title: 'Nationwide Coverage', desc: 'Jobs from federal, state, and local governments' },
              { icon: Target, title: 'Smart Matching', desc: 'AI-powered job recommendations based on your skills' },
              { icon: CheckCircle, title: 'Application Tracking', desc: 'Track your applications and interview status' },
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Government Career?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who have found their perfect government job through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg">
              Get Started Today
            </button>
            <button 
              onClick={() => router.push('/jobs')}
              className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-purple-600 transition-colors font-semibold text-lg"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </section> */}
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

