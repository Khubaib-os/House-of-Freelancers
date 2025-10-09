// src/dashboard/DashboardLayout.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Overview from './Overview';
import ProjectManagement from './ProjectManagement';
import PortfolioManagement from './PortfolioManagement';
import TeamManagement from './TeamManagement';
import BlogManagement from './BlogManagement';
import ContactManagement from './ContactManagement';
import ProtectedRoute from './ProtectedRoute';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          <main className="p-4 sm:p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="project-management" element={<ProjectManagement />} />
              <Route path="portfolio-management" element={<PortfolioManagement/>} />
              <Route path="team-management" element={<TeamManagement/>} />
              <Route path="contact-management" element={<ContactManagement/>} />
              <Route path="blog" element={<BlogManagement/>} />
            </Routes>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;