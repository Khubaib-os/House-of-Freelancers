import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeAllDropdowns();
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      navigate('/');
      // Small delay to ensure navigation completes before scrolling
      setTimeout(scrollToTop, 100);
    }
  };

  // Updated Services Data - Top 8 from your list
  const services = [
    { name: 'B2B Lead Generation', path: '/B2B' },
    { name: 'Data Entry & Processing', path: '/data-entry' },
    { name: 'Web-based Market Research', path: '/Web-based' },
    { name: 'CRM Data Management', path: '/crm-management' },
    { name: 'Excel Data Processing', path: '/excel-processing' },
    { name: 'Data Conversion', path: '/data-conversion' },
    { name: 'Product Listing', path: '/product-listing' },
    { name: 'Virtual Assistance', path: '/virtual-assistance' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full"
    >
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full relative z-10">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <motion.button
              onClick={handleLogoClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer group"
            >
              <img 
                src="/Hof-logo.png" 
                alt="Logo" 
                className="h-20 w-auto sm:h-24 md:h-28 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.button>
          </div>
          
          {/* Middle - Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 xl:space-x-3">
            <Link to="/" onClick={closeAllDropdowns}>
              <motion.span
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                Home
              </motion.span>
            </Link>

           <Link to="/portfolio" onClick={closeAllDropdowns}>
              <motion.span
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                Portfolio
              </motion.span>
            </Link>

            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.button
                onClick={() => toggleDropdown('services')}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeDropdown === 'services' ? 'text-gray-900 bg-gray-100' : ''
                }`}
              >
                Services
                <motion.svg
                  className="ml-1 h-4 w-4"
                  animate={{ rotate: activeDropdown === 'services' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 mt-1 w-64 bg-white border border-gray-200 rounded-lg py-3 shadow-xl"
                  >
                    {services.map((item, index) => (
                      <Link key={item.name} to={item.path} onClick={closeAllDropdowns}>
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-amber-400/10 transition-colors duration-200 flex items-center gap-3 cursor-pointer group"
                        >
                          <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></span>
                          <span className="truncate group-hover:text-amber-600 transition-colors duration-200">{item.name}</span>
                        </motion.span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" onClick={closeAllDropdowns}>
              <motion.span
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                About Us
              </motion.span>
            </Link>
             

            <Link to="/blogs" onClick={closeAllDropdowns}>
              <motion.span
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                Blogs
              </motion.span>
            </Link>
          </div>

          
          
          {/* Right Side - Contact Us Button */}
          <div className="hidden md:flex items-center ml-4">
            <Link to="/contact-us" onClick={closeAllDropdowns}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03, backgroundColor: "#f59e0b" }}
                className="bg-amber-400 text-gray-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-500 transition-all duration-200 whitespace-nowrap border border-amber-300"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 w-full"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" onClick={closeAllDropdowns}>
                <motion.span
                  whileTap={{ scale: 0.98 }}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                >
                  Home
                </motion.span>
              </Link>

              <Link to="/portfolio" onClick={closeAllDropdowns}>
                <motion.span
                  whileTap={{ scale: 0.98 }}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                >
                  Portfolio
                </motion.span>
              </Link>

              <Link to="/blogs" onClick={closeAllDropdowns}>
                <motion.span
                  whileTap={{ scale: 0.98 }}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                >
                  Blogs
                </motion.span>
              </Link>

              <Link to="/about" onClick={closeAllDropdowns}>
                <motion.span
                  whileTap={{ scale: 0.98 }}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                >
                  About Us
                </motion.span>
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => toggleDropdown('services-mobile')}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                >
                  <span>Services</span>
                  <motion.svg
                    className="h-4 w-4"
                    animate={{ rotate: activeDropdown === 'services-mobile' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </motion.button>
                <AnimatePresence>
                  {activeDropdown === 'services-mobile' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-5 mt-1 space-y-1"
                    >
                      {services.map((item, index) => (
                        <Link key={item.name} to={item.path} onClick={closeAllDropdowns}>
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileTap={{ scale: 0.98 }}
                            className="block px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></span>
                              {item.name}
                            </div>
                          </motion.span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link to="/contact-us" onClick={closeAllDropdowns}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-bold text-gray-900 bg-amber-400 hover:bg-amber-500 transition-all duration-200 cursor-pointer border border-amber-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;