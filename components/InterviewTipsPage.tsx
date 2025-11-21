'use client';
import React, { useState } from 'react'
import Footer from '@/components/Footer';
import { 
  Search,
  Clock,
  Lightbulb,
  BookOpen,
  FileText,
  Users,
  Target,
  Star
} from 'lucide-react';
const InterviewTips = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
      const tips = [
        {
          id: '1',
          title: 'Research the Company Thoroughly',
          category: 'Preparation',
          difficulty: 'Easy',
          time: '30 min',
          description: 'Learn about the company\'s mission, values, recent news, and the role you\'re applying for.',
          content: `
            <h3>What to Research:</h3>
            <ul>
              <li>Company mission and values</li>
              <li>Recent news and press releases</li>
              <li>Company culture and work environment</li>
              <li>Products or services offered</li>
              <li>Key leadership and team structure</li>
              <li>Industry trends and challenges</li>
            </ul>
            <h3>How to Use This Information:</h3>
            <ul>
              <li>Prepare questions that show genuine interest</li>
              <li>Connect your experience to their needs</li>
              <li>Demonstrate understanding of their challenges</li>
            </ul>
          `,
          icon: BookOpen,
          color: 'bg-blue-500'
        },
        {
          id: '2',
          title: 'Practice the STAR Method',
          category: 'Technique',
          difficulty: 'Medium',
          time: '45 min',
          description: 'Structure your responses using Situation, Task, Action, Result format for behavioral questions.',
          content: `
            <h3>STAR Method Breakdown:</h3>
            <ul>
              <li><strong>Situation:</strong> Describe the context and background</li>
              <li><strong>Task:</strong> Explain your responsibility and goal</li>
              <li><strong>Action:</strong> Detail the steps you took</li>
              <li><strong>Result:</strong> Share the outcome and impact</li>
            </ul>
            <h3>Example Response:</h3>
            <p>In my previous role, our team was struggling with project deadlines (Situation). I was tasked with improving our workflow efficiency (Task). I implemented a new project management system and held weekly check-ins (Action). This resulted in 25% faster project completion and improved team satisfaction (Result).</p>
          `,
          icon: Target,
          color: 'bg-green-500'
        },
        {
          id: '3',
          title: 'Prepare for Common Questions',
          category: 'Preparation',
          difficulty: 'Easy',
          time: '60 min',
          description: 'Practice answers to frequently asked interview questions.',
          content: `
            <h3>Common Questions to Prepare For:</h3>
            <ul>
              <li>Tell me about yourself</li>
              <li>Why do you want to work here?</li>
              <li>What are your strengths and weaknesses?</li>
              <li>Where do you see yourself in 5 years?</li>
              <li>Why should we hire you?</li>
              <li>Describe a challenging situation you overcame</li>
            </ul>
            <h3>Tips for Answering:</h3>
            <ul>
              <li>Keep responses concise (1-2 minutes)</li>
              <li>Use specific examples</li>
              <li>Show enthusiasm and energy</li>
              <li>Practice out loud</li>
            </ul>
          `,
          icon: Users,
          color: 'bg-purple-500'
        },
        {
          id: '4',
          title: 'Dress Professionally',
          category: 'Presentation',
          difficulty: 'Easy',
          time: '15 min',
          description: 'Choose appropriate attire that reflects the company culture and position level.',
          content: `
            <h3>General Guidelines:</h3>
            <ul>
              <li>Research the company dress code</li>
              <li>When in doubt, dress one level up</li>
              <li>Ensure clothes are clean and pressed</li>
              <li>Pay attention to grooming and hygiene</li>
            </ul>
            <h3>What to Wear:</h3>
            <ul>
              <li><strong>Conservative:</strong> Suit and tie for men, business suit for women</li>
              <li><strong>Business Casual:</strong> Dress shirt and slacks, professional dress</li>
              <li><strong>Creative:</strong> Smart casual with professional touches</li>
            </ul>
          `,
          icon: Star,
          color: 'bg-yellow-500'
        },
        {
          id: '5',
          title: 'Ask Thoughtful Questions',
          category: 'Engagement',
          difficulty: 'Medium',
          time: '30 min',
          description: 'Prepare intelligent questions that demonstrate your interest and knowledge.',
          content: `
            <h3>Questions to Ask:</h3>
            <ul>
              <li>What are the biggest challenges facing this role?</li>
              <li>How would you describe the ideal candidate?</li>
              <li>What does success look like in this position?</li>
              <li>How does the team collaborate on projects?</li>
              <li>What opportunities for growth are available?</li>
            </ul>
            <h3>Questions to Avoid:</h3>
            <ul>
              <li>Salary and benefits (unless they bring it up)</li>
              <li>Vacation time and time off</li>
              <li>Questions easily answered by research</li>
            </ul>
          `,
          icon: Lightbulb,
          color: 'bg-orange-500'
        },
        {
          id: '6',
          title: 'Follow Up After the Interview',
          category: 'Follow-up',
          difficulty: 'Easy',
          time: '20 min',
          description: 'Send a thank-you email within 24 hours to express appreciation and reinforce interest.',
          content: `
            <h3>Thank-You Email Structure:</h3>
            <ul>
              <li>Express gratitude for the opportunity</li>
              <li>Reinforce your interest in the position</li>
              <li>Mention a specific point from the interview</li>
              <li>Include your contact information</li>
              <li>Keep it concise and professional</li>
            </ul>
            <h3>Sample Email:</h3>
            <p>Dear [Interviewer Name],</p>
            <p>Thank you for taking the time to meet with me today to discuss the [Position] role. I enjoyed learning more about [Company Name] and the team's work on [specific project/topic discussed].</p>
            <p>I'm very excited about the opportunity to contribute to [specific aspect of the role] and believe my experience in [relevant skill] would be valuable to your team.</p>
            <p>I look forward to hearing from you about next steps.</p>
            <p>Best regards,<br>[Your Name]</p>
          `,
          icon: FileText,
          color: 'bg-red-500'
        }
      ];
    
      const filteredTips = tips.filter(tip =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">Interview Tips & Strategies</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the art of interviewing with our comprehensive collection of tips, techniques, and strategies to help you succeed in any interview situation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search interview tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => {
              const IconComponent = tip.icon;
              return (
                <div key={tip.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${tip.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                            {tip.category}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {tip.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{tip.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {tip.time}
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tips found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse all categories.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default InterviewTips
