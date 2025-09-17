// components/UserDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  BellIcon, 
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import UserProfile from './UserProfile';
import UserJobs from './UserJobs';
import axios from 'axios';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const UserDashboard = () => {
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'jobs', name: 'Applied Jobs', icon: BriefcaseIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon, count: 12 },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
    { id: 'help', name: 'Help & Support', icon: QuestionMarkCircleIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'jobs':
        return <UserJobs />;
      case 'dashboard':
        return <DashboardOverview />;
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">JB</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">JobBoard</span>
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

        {/* Navigation */}
        <nav className="px-4 pb-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
                {item.count && (
                  <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.profile?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900">
                {user?.profile?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500">Job Seeker</div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
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

const DashboardOverview = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState(0);
  // const [recentActivity, setRecentActivity] = useState();
  const stats = [
    { label: 'Applications Sent', value: jobs},
    { label: 'Saved Jobs', value: 0}

  ];

    useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/user/my-applications`, {withCredentials: true});
      if (response.status === 200) {
        console.log(response.data);
        setJobs(response.data.length);
        // setRecentActivity(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch applied jobs:', error);
    }
  };


  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.profile?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Here&apos;s what&apos;s happening with your job search today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              {/* <div className="text-sm text-green-600">{stat.change}</div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Applied to Frontend Developer at Tech Corp', time: '2 hours ago' },
              { action: 'Profile viewed by Startup Inc', time: '1 day ago' },
              { action: 'Saved UX Designer position', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-gray-900">{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
