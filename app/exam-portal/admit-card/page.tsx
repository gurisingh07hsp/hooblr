'use client';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AdmitCardListPage = () => {
  const router = useRouter();
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
    const params: Record<string, any> = {};

    params.type = 'Admit Card';
    // params.limit = ;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exam`,{params});
      const data = await response.data.exams;

      setTimeout(() => {
        setExams(data);
      }, 500);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div>
          <div className="max-w-7xl mx-auto mt-24">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Latest Notifications</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest admit card and result announcements
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exams.map((exam, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 lg:p-6 p-3 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="space-x-4">
                    <div className='flex gap-2'>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`bg-gradient-to-r ${exam.type == 'Admit Card' ? "from-purple-100 to-indigo-100 text-purple-800" : "from-blue-100 to-indigo-100 text-blue-800"} text-xs font-bold px-2.5 py-1 rounded-full`}>
                            {exam.admitCardLink ? 'Admit Card' : 'Result'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8A38EE] transition-colors">{exam.title}</h3>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{new Date(exam.createdAt).toLocaleDateString()}</p>
                      <button 
                        onClick={() => router.push(`/exam-portal/admit-card/${exam.slug}`)}
                        className="text-[#8A38EE] hover:text-purple-700 font-semibold text-sm flex items-center transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}

export default AdmitCardListPage
