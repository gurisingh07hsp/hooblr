'use client'

import React from 'react';
import { 
  FileText, 
  Video, 
  Download, 
  Users, 
  TrendingUp,
  Award,
  Target,
  ArrowRight,
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  Sparkles,
  Heart,
  Share2
} from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "Complete Resume Writing Guide",
      description: "Learn how to create a compelling resume that gets you noticed by employers and passes ATS systems.",
      type: "Guide",
      category: "Resume",
      readTime: "15 min read",
      rating: 4.8,
      downloads: 12500,
      icon: FileText,
      featured: true,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Interview Preparation Masterclass",
      description: "Master the art of interviewing with our comprehensive video course covering common questions and techniques.",
      type: "Video Course",
      category: "Interview",
      readTime: "2 hours",
      rating: 4.9,
      downloads: 8900,
      icon: Video,
      featured: true,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Government Job Application Toolkit",
      description: "Everything you need to know about applying for government positions, including forms and requirements.",
      type: "Toolkit",
      category: "Government Jobs",
      readTime: "30 min read",
      rating: 4.7,
      downloads: 6700,
      icon: Award,
      color: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      title: "Salary Negotiation Strategies",
      description: "Learn proven techniques to negotiate better compensation packages and advance your career.",
      type: "Guide",
      category: "Career Growth",
      readTime: "20 min read",
      rating: 4.6,
      downloads: 9200,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      title: "LinkedIn Profile Optimization",
      description: "Optimize your LinkedIn profile to attract recruiters and build your professional network.",
      type: "Checklist",
      category: "Networking",
      readTime: "10 min read",
      rating: 4.5,
      downloads: 11300,
      icon: Users,
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 6,
      title: "Career Change Roadmap",
      description: "Step-by-step guide to successfully transition to a new career field or industry.",
      type: "Roadmap",
      category: "Career Change",
      readTime: "25 min read",
      rating: 4.8,
      downloads: 5400,
      icon: Target,
      color: "from-pink-500 to-rose-600"
    }
  ];

  const categories = [
    { name: "All Resources", count: resources.length, icon: BookOpen },
    { name: "Resume", count: resources.filter(r => r.category === "Resume").length, icon: FileText },
    { name: "Interview", count: resources.filter(r => r.category === "Interview").length, icon: Video },
    { name: "Government Jobs", count: resources.filter(r => r.category === "Government Jobs").length, icon: Award },
    { name: "Career Growth", count: resources.filter(r => r.category === "Career Growth").length, icon: TrendingUp },
    { name: "Networking", count: resources.filter(r => r.category === "Networking").length, icon: Users },
    { name: "Career Change", count: resources.filter(r => r.category === "Career Change").length, icon: Target }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All Resources");
  const [filteredResources, setFilteredResources] = React.useState(resources);

  React.useEffect(() => {
    if (selectedCategory === "All Resources") {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(resource => resource.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Free Career Resources</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Accelerate Your Career
            </h1>
            <p className="text-lg mb-6 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Free guides, templates, and tools to help you land your dream job and advance your career
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-purple-200 text-sm">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">100K+</div>
                <div className="text-purple-200 text-sm">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.8★</div>
                <div className="text-purple-200 text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Featured Resources</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Our most popular and highly-rated resources to kickstart your career journey
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {resources.filter(resource => resource.featured).map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div key={resource.id} className="group bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-6 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">
                          {resource.type}
                        </span>
                        <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{resource.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-purple-600" />
                            {resource.readTime}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                            {resource.rating}
                          </div>
                          <div className="flex items-center">
                            <Download className="w-3 h-3 mr-1 text-purple-600" />
                            {resource.downloads.toLocaleString()}
                          </div>
                        </div>
                        <button className="bg-[#9333E9] text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center transform hover:-translate-y-1 text-sm">
                          Access Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories and Resources */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        selectedCategory === category.name
                          ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 font-semibold shadow-md'
                          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <CategoryIcon className="w-4 h-4 mr-3" />
                        <span>{category.name}</span>
                      </div>
                      <span className={`text-sm ${selectedCategory === category.name ? 'text-purple-600' : 'text-gray-400'}`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory} ({filteredResources.length})
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Most Recent</option>
                <option>Most Downloaded</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <div key={resource.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 p-6 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full">
                            {resource.type}
                          </span>
                          <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
                            {resource.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-purple-600" />
                              {resource.readTime}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                              {resource.rating}
                            </div>
                            <div className="flex items-center">
                              <Download className="w-3 h-3 mr-1 text-purple-600" />
                              {resource.downloads.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                              <Heart className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center transition-colors">
                              Access
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              <span>Personalized Guidance</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Personalized Career Guidance?</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Get one-on-one career coaching from industry experts and accelerate your career growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Book a Session
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}