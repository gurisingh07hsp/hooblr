// components/CompanyDashboard.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  BriefcaseIcon, 
  UserGroupIcon,
  ChartBarIcon,
  BellIcon, 
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import CompanyProfile from './CompanyProfile';
import CompanyJobs from './CompanyJobs';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const CompanyDashboard = () => {
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'jobs', name: 'Jobs', icon: BriefcaseIcon, count: 3 },
    { id: 'profile', name: 'Company Profile', icon: BuildingOfficeIcon },
    { id: 'candidates', name: 'Candidates', icon: UserGroupIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon, count: 12 },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
    { id: 'help', name: 'Help & Support', icon: QuestionMarkCircleIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <CompanyProfile />;
      case 'jobs':
        return <CompanyJobs />;
      case 'dashboard':
        return <CompanyDashboardOverview />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This feature is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {/* {user?.company?.name?.charAt(0)?.toUpperCase() || 'C'} */}
              </span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">
              {/* {user?.company?.name || 'Company'} */}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const CompanyDashboardOverview = () => {
  const { user } = useUser();

  const stats = [
    { label: 'Active Jobs', value: '12', change: '+2 this month' },
    { label: 'Total Applications', value: '248', change: '+18% this week' },
    { label: 'Interviews Scheduled', value: '15', change: '5 this week' },
    { label: 'Hired This Month', value: '4', change: '+1 from last month' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {/* Welcome back to {user?.company?.name || 'Your Company'}! */}
        </h1>
        <p className="text-gray-600">Here&apos;s your recruitment overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { candidate: 'Sarah Johnson', position: 'Frontend Developer', time: '2 hours ago', status: 'New' },
                { candidate: 'Mike Chen', position: 'Product Manager', time: '5 hours ago', status: 'Reviewed' },
                { candidate: 'Emily Davis', position: 'UX Designer', time: '1 day ago', status: 'Shortlisted' },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{application.candidate}</div>
                    <div className="text-sm text-gray-500">{application.position}</div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      application.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {application.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{application.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Performing Jobs</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { title: 'Senior React Developer', applications: 45, views: 234 },
                { title: 'Product Manager', applications: 32, views: 189 },
                { title: 'UX/UI Designer', applications: 28, views: 156 },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.views} views</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{job.applications}</div>
                    <div className="text-xs text-gray-500">applications</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
