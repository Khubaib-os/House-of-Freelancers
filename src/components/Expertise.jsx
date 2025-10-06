import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Expertise = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      category: "Lead Generation & Research",
      items: [
        "Strategic B2B Lead Generation & Targeted Prospecting",
        "Comprehensive Market & Competitor Intelligence Research",
        "Industry-Focused Research (Real Estate, SaaS, Retail, E-commerce)"
      ],
      description: "Drive your business growth with data-driven lead generation and comprehensive market research strategies."
    },
    {
      category: "Data Management",
      items: [
        "Precision Data Entry, Cleaning & Formatting",
        "Seamless CRM Management & Data Migration",
        "Professional File & Document Conversion (Word, PDF, CSV, Excel)"
      ],
      description: "Transform your raw data into actionable insights with our meticulous data management solutions."
    },
    {
      category: "Business Tools & Automation",
      items: [
        "Advanced Excel & Google Sheets Solutions (Formulas, Macros, Pivot Tables)",
        "Enterprise Tool Automation (CRM, Sales Navigator, Apollo, n8n, QuickBooks)",
        "Comprehensive Product Listing & E-commerce Management"
      ],
      description: "Streamline your operations with cutting-edge automation and powerful business tool integrations."
    },
    {
      category: "Virtual Assistance",
      items: [
        "Professional Virtual Assistance (Calendar Management, Email Handling)",
        "Efficient Document Management & Digital Organization",
        "Comprehensive Administrative & Operational Support"
      ],
      description: "Enhance your productivity with dedicated virtual assistance and professional administrative support."
    }
  ];

  const slogans = [
    "Transforming Businesses with Precision & Excellence",
    "Your Success is Our Ultimate Goal",
    "Driving Growth Through Expert Solutions",
    "Where Quality Meets Innovation"
  ];

  // Auto-rotate services every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [services.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    active: {
      scale: 1.05,
      backgroundColor: "#f59e0b",
      color: "#1f2937",
      transition: { duration: 0.3 }
    },
    inactive: {
      scale: 1,
      backgroundColor: "#e5e7eb",
      color: "#374151",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Professional Expertise
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Elevate your business with our comprehensive suite of professional services designed to drive growth and efficiency.
          </p>
        </motion.section>

        {/* Service Navigation */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {services.map((service, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setActiveService(index)}
                variants={buttonVariants}
                animate={activeService === index ? "active" : "inactive"}
                className="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                {service.category.split(' ')[0]}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Active Service Display */}
        <section className="mb-8 sm:mb-12 md:mb-16">
          <motion.div
            key={activeService}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white p-6 sm:p-8 rounded-lg border border-gray-300 shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              {services[activeService].category}
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {services[activeService].description}
            </p>
            <div className="space-y-3">
              {services[activeService].items.map((item, itemIndex) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Tools Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-800 mb-4 sm:mb-6 md:mb-8">
            Advanced Tools & Technologies
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            Leveraging industry-leading platforms to deliver exceptional results
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[
              "CRM Systems", "Sales Navigator", "Apollo", "n8n",
              "QuickBooks", "Excel/Sheets", "Data Analytics", "Web Research"
            ].map((tool, index) => (
              <motion.div
                key={tool}
                variants={cardVariants}
                transition={{ delay: 0.5 + (index * 0.05) }}
                className="bg-white p-2 sm:p-3 md:p-4 rounded border border-gray-300 text-center hover:border-yellow-400 hover:shadow-md transition-all duration-300"
              >
                <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
                  {tool}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dark Theme Slogan Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 sm:p-8 md:p-12 text-center text-white mb-6 sm:mb-8 shadow-xl"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8"
            >
              {slogans[0]}
            </motion.div>
            
            {/* Portfolio Button in Dark Theme */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portfolio')}
              className="bg-yellow-500 text-gray-900 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 border-2 border-yellow-500 hover:border-yellow-400 text-sm sm:text-base"
            >
              View Our Portfolio
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Expertise;