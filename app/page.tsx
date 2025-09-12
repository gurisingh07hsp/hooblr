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
  ArrowUpRight
} from 'lucide-react';

// import AuthModal from '@/components/AuthModal';
// import AdminLoginModal from '@/components/AdminLoginModal';
// import AdminPanel from '@/components/AdminPanel';
// import PostJobModal from '@/components/PostJobModal';
import Footer from '@/components/Footer';

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

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
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
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-4xl mx-auto mb-8 border border-purple-200">
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
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 bg-white">
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
                <p className="text-gray-600 mb-4 text-sm">{category.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-semibold">{category.count}</span>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
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
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-600">
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

