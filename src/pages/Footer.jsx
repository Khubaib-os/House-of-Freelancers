import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    navigate('/');
    scrollToTop();
  };

  // 6 Main Services Only
  const services = [
    { name: 'B2B Lead Generation', path: '/services' },
    { name: 'Data Entry & Processing', path: '/data-entry' },
    { name: 'Web-based Market Research', path: '/market-research' },
    { name: 'CRM Data Management', path: '/crm-management' },
    { name: 'Excel Data Processing', path: '/excel-processing' },
    { name: 'Data Conversion', path: '/data-conversion' }
  ];

  const companyLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <div className="bg-black w-full pt-12 pb-10 px-4">
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* Main Footer Container with 90% width on all devices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-[90%] bg-gradient-to-b from-gray-300 to-gray-400 rounded-2xl p-6 md:p-8 shadow-xl relative"
        style={{ marginBottom: '-30px' }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center mb-4 md:mb-5 cursor-pointer"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Home"
            >
              <img 
                src="/Hof-logo.png" 
                alt="Logo" 
                className="h-28 w-auto md:h-32"
              />
            </motion.div>
            <p className="text-gray-700 mb-4 md:mb-6 text-sm leading-relaxed text-justify hover:text-white transition-colors duration-300 cursor-default">
              Delivering accurate data, quality leads, and solutions that fuel business growth.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Social Links - Same Color */}
              {[
                {
                  name: 'LinkedIn',
                  href: '#',
                  icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.05-3.06-1.863-3.06-1.864 0-2.15 1.454-2.15 2.956v5.708h-3v-11h2.879v1.507h.04c.401-.757 1.379-1.557 2.835-1.557 3.03 0 3.587 1.996 3.587 4.592v6.458z"
                },
                {
                  name: 'Facebook',
                  href: '#',
                  icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                },
                {
                  name: 'Instagram',
                  href: '#',
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 h-10 w-10 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform"
                  aria-label={`Visit our ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}

              {/* Upwork CTA Button - Fixed */}
              <motion.a
                href="https://www.upwork.com/freelancers/~01abcdefghijklmno"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-green-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.406 0-2.545-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                </svg>
                Hire on Upwork
              </motion.a>
            </div>
          </div>

          {/* Services Section - 6 Services Only */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 md:mb-5 text-gray-800 border-b border-gray-500 pb-2 hover:text-white transition-colors duration-300 cursor-default">Our Services</h3>
            <ul className="space-y-2 md:space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={() => navigate(service.path)}
                    className="text-gray-700 hover:text-white transition-colors duration-300 text-sm flex items-center w-full text-left group"
                    aria-label={`Navigate to ${service.name}`}
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-white transition-colors duration-300"></span>
                    {service.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 md:mb-5 text-gray-800 border-b border-gray-500 pb-2 hover:text-white transition-colors duration-300 cursor-default">Company</h3>
            <ul className="space-y-2 md:space-y-3">
              {companyLinks.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={() => {
                      navigate(item.path);
                      if (item.path === '/') scrollToTop();
                    }}
                    className="text-gray-700 hover:text-white transition-colors duration-300 text-sm flex items-center w-full text-left group"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-white transition-colors duration-300"></span>
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 md:mb-5 text-gray-800 border-b border-gray-500 pb-2 hover:text-white transition-colors duration-300 cursor-default">Contact Us</h3>
            <div className="text-gray-700 text-sm space-y-3 md:space-y-4">
              <div className="flex items-start group hover:text-white transition-colors duration-300 cursor-default">
                <svg className="h-5 w-5 text-gray-600 mr-3 mt-1 flex-shrink-0 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="group-hover:text-white transition-colors duration-300">Khyaban E Ali Housing Society, Bahawalpur</p>
              </div>
              <div className="flex items-center group hover:text-white transition-colors duration-300 cursor-default">
                <svg className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="group-hover:text-white transition-colors duration-300">+92 321 1234567</p>
              </div>
              <div className="flex items-center group hover:text-white transition-colors duration-300 cursor-default">
                <svg className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="group-hover:text-white transition-colors duration-300">info@company.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-500 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-3 md:mb-0 hover:text-white transition-colors duration-300 cursor-default">
            Copyright © 2024 Company Name. All Right Reserved.
          </p>
          <div className="flex space-x-4 md:space-x-6">
            {["Privacy Policy", "Terms & Conditions", "FAQ"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.05, color: "#ffffff" }}
                className="text-gray-600 hover:text-white text-sm transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;