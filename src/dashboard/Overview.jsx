// src/dashboard/Overview.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Manage Projects',
      description: 'Add, edit and track all your projects',
      path: '/dashboard/project-management'
    },
    {
      title: 'Update Portfolio',
      description: 'Manage your work portfolio',
      path: '/dashboard/portfolio-management'
    },
    {
      title: 'Contact Management',
      description: 'Handle client inquiries and messages',
      path: '/dashboard/contact-management'
    },
    {
      title: 'Team Management',
      description: 'Organize team members and tasks',
      path: '/dashboard/team-management'
    },
    {
      title: 'Blog Management',
      description: 'Create and publish blog content',
      path: '/dashboard/blog'
    }
  ];

  const stats = [
    { number: '1,000+', label: 'Projects Completed' },
    { number: '50+', label: 'Active Clients' },
    { number: '100%', label: 'Success Rate' },
    { number: '24/7', label: 'Support' }
  ];

  const handleQuickAction = (path) => {
    navigate(path);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-sm text-gray-600">
          Manage your business operations efficiently from one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-base font-semibold text-gray-900">{stat.number}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.path)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Guide */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">How to Use This Dashboard</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">1. Project Management</h3>
            <p className="text-xs text-gray-600">
              Go to Projects section to create new projects, update status, and track progress. Keep project details updated regularly.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">2. Portfolio Management</h3>
            <p className="text-xs text-gray-600">
              Use Portfolio section to showcase your work. Add project images, descriptions, and case studies.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">3. Contact Management</h3>
            <p className="text-xs text-gray-600">
              Check Contact section regularly for new inquiries. Respond to clients promptly.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">4. Team Management</h3>
            <p className="text-xs text-gray-600">
              Manage team members, assign tasks, and track team performance in Team section.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">5. Blog Management</h3>
            <p className="text-xs text-gray-600">
              Create and publish blog posts to share insights and updates with your audience.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Update project status daily to keep clients informed
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Respond to client messages within 24 hours
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Keep portfolio updated with latest projects
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Use quick actions for faster navigation
            </p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Need Help?</h2>
        <p className="text-xs text-gray-600 mb-3">
          Contact support if you need assistance with any dashboard feature.
        </p>
        <button className="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded border border-gray-300 hover:bg-gray-200">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Overview;