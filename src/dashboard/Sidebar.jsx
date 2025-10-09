// src/dashboard/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-6 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 z-50 md:sticky md:top-0 md:h-screen flex flex-col`}
    >
      {/* Logo Section - Only Logo with full size and no background */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center">
            <img 
              src="/dashboard.png" 
              alt="House of Freelancers" 
              className="w-48 h-36 object-contain" // Increased size and removed background
            />
          </div>
          {/* Text removed from here */}
        </div>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-50 text-yellow-600 border-r-2 border-yellow-600 font-semibold'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`
              }
              onClick={toggleSidebar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Overview</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/dashboard/project-management"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-50 text-yellow-600 border-r-2 border-yellow-600 font-semibold'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`
              }
              onClick={toggleSidebar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Projects</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/portfolio-management"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-50 text-yellow-600 border-r-2 border-yellow-600 font-semibold'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`
              }
              onClick={toggleSidebar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Portfolio</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/contact-management"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-50 text-yellow-600 border-r-2 border-yellow-600 font-semibold'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`
              }
              onClick={toggleSidebar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Management</span>
            </NavLink>
          </li>

           <li>
            <NavLink
              to="/dashboard/team-management"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-50 text-yellow-600 border-r-2 border-yellow-600 font-semibold'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`
              }
              onClick={toggleSidebar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Team</span>
            </NavLink>
          </li>

             <li>
            <NavLink
              to="/dashboard/blog"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-50 text-yellow-600 border-r-2 border-yellow-600 font-semibold'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`
              }
              onClick={toggleSidebar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Blogs</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer Section - Removed text */}
      <div className="pt-4 border-t border-gray-100">
        <div className="text-center text-xs text-gray-500">
          <p>v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;