// App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import B2BLeadGeneration from './services/B2B';
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

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <Navbar /> 
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
        <Route path="/B2B" element={<B2BLeadGeneration />} />
        <Route path="/data-entry" element={<DataEntryProcessing />} />
        <Route path="/Web-based" element={<WebMarketResearch />} />
        <Route path="/crm-management" element={<CRMDataManagement />} />
        <Route path="/excel-processing" element={<ExcelDataProcessing />} />
        <Route path="/data-conversion" element={<DataConversion />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/virtual-assistance" element={<VirtualAssistance />} />

      </Routes>
      <Footer/>
    </>
  )
}

export default App