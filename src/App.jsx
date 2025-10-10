// App.jsx (updated)
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './components/Home';
import Excellence from './components/Excellence';
import Expertise from './components/Expertise';
import TopProjects from './components/TopProjects';
import SuccessStories from './components/SuccessStories';
import VisionFuture from './components/VisionFuture';
import Testimonials from './components/Testimonials';
import Footer from './pages/Footer';
import Portfolio from './pages/Portfolio';
import B2BLeadGeneration from './Services/b2b.jsx';
import DataEntryProcessing from './Services/DataEntry';
import WebMarketResearch from './Services/Web-based';
import CRMDataManagement from './Services/Crm-management';
import DataConversion from './Services/Data-conversion';
import ExcelDataProcessing from './Services/Excel-processing';
import VirtualAssistance from './Services/VA';
import ProductListing from './Services/ProductListing';
import ContactUs from './pages/ContactUs';
import Blogs from './pages/Blogs';
import AboutUsPage from './pages/About';
import Login from './dashboard/Login';
import DashboardLayout from './dashboard/DashboardLayout';
import ProtectedRoute from './dashboard/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();

  // Check if current route is dashboard or login
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || location.pathname === '/HofLogin';

  return (
    <>
      <ScrollToTop />
      
      {!isDashboardRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Excellence/>
            <Expertise/>
            <TopProjects/>
            <VisionFuture/>
            <SuccessStories/>
            <Testimonials/>
          </>
        } />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/b2b" element={<B2BLeadGeneration />} />
        <Route path="/data-entry" element={<DataEntryProcessing />} />
        <Route path="/Web-based" element={<WebMarketResearch />} />
        <Route path="/crm-management" element={<CRMDataManagement />} />
        <Route path="/excel-processing" element={<ExcelDataProcessing />} />
        <Route path="/data-conversion" element={<DataConversion />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/virtual-assistance" element={<VirtualAssistance />} />
        
        {/* Dashboard Routes - No Navbar/Footer */}
        <Route path="/HofLogin" element={<Login />} />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } />
        
        {/* 404 Page - Add this for better routing */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600 mb-4">Page not found</p>
              <a href="/" className="text-yellow-600 hover:text-yellow-700">Go back home</a>
            </div>
          </div>
        } />
      </Routes>
      
      {!isDashboardRoute && <Footer/>}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;