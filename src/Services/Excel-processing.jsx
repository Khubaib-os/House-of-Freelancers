import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ExcelDataProcessing = () => {
  const [activeSection, setActiveSection] = useState('services');

  const tabs = [
    { id: 'services', label: 'Our Services', icon: '📊' },
    { id: 'benefits', label: 'Why Choose Us', icon: '⭐' },
    { id: 'features', label: 'Advanced Features', icon: '🚀' }
  ];

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(current => {
        const currentIndex = tabs.findIndex(tab => tab.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [tabs.length]);

  const excelServices = [
    {
      icon: "🧹",
      title: "Data Cleaning & Validation",
      description: "Remove duplicates, correct errors, and validate data to ensure accuracy and consistency.",
      features: ["Duplicate Removal", "Error Correction", "Data Validation", "Format Standardization"]
    },
    {
      icon: "📈",
      title: "Advanced Formulas & Functions",
      description: "Implement complex formulas, pivot tables, and advanced Excel functions for data analysis.",
      features: ["Complex Formulas", "Pivot Tables", "Macro Creation", "Data Analysis"]
    },
    {
      icon: "🔄",
      title: "Data Consolidation",
      description: "Merge multiple Excel files and sheets into unified, organized datasets.",
      features: ["Multi-file Merging", "Sheet Consolidation", "Data Mapping", "Conflict Resolution"]
    },
    {
      icon: "📊",
      title: "Report Generation",
      description: "Create comprehensive reports with charts, graphs, and automated dashboards.",
      features: ["Chart Creation", "Dashboard Design", "Automated Reports", "Visual Analytics"]
    },
    {
      icon: "⚡",
      title: "Automation & Macros",
      description: "Develop automated workflows and macros to streamline repetitive Excel tasks.",
      features: ["VBA Macros", "Workflow Automation", "Task Scheduling", "Process Optimization"]
    },
    {
      icon: "🔒",
      title: "Data Security & Protection",
      description: "Implement security measures, password protection, and access controls for sensitive data.",
      features: ["Password Protection", "Access Control", "Data Encryption", "Security Audits"]
    }
  ];

  const benefits = [
    "Expert Excel formula implementation",
    "Quick turnaround for large datasets",
    "100% accuracy in data processing",
    "Advanced automation solutions",
    "Customized reporting and dashboards",
    "Secure handling of sensitive data",
    "24/7 support for urgent projects",
    "Cost-effective bulk processing"
  ];

  const advancedFeatures = [
    {
      name: "Power Query Integration",
      icon: "🔌",
      description: "Advanced data transformation and integration using Power Query"
    },
    {
      name: "Power Pivot Modeling",
      icon: "📐",
      description: "Complex data modeling and analysis with Power Pivot"
    },
    {
      name: "VBA Automation",
      icon: "🤖",
      description: "Custom VBA scripts for automated workflows and tasks"
    },
    {
      name: "Data Visualization",
      icon: "📈",
      description: "Advanced charts, graphs, and interactive dashboards"
    },
    {
      name: "Conditional Formatting",
      icon: "🎨",
      description: "Smart formatting rules for data visualization and alerts"
    },
    {
      name: "Data Validation Rules",
      icon: "✅",
      description: "Custom validation rules and error checking systems"
    }
  ];

  const stats = [
    { number: "10k+", label: "Excel Files Processed" },
    { number: "100%", label: "Accuracy Guaranteed" },
    { number: "500+", label: "Complex Formulas" },
    { number: "24/7", label: "Processing Service" }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-[90%] max-w-4xl mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Excel <span className="text-yellow-500">Data Processing</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Advanced Excel Solutions for Complex Data Challenges
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transform your Excel data with our expert processing services. From simple cleaning to complex automation, we handle all your Excel needs with precision and efficiency.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-2 mb-12 w-full justify-center"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto min-w-0 ${
                activeSection === tab.id
                  ? 'bg-yellow-500 text-gray-900 border border-yellow-500 shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <span className="text-lg flex-shrink-0">{tab.icon}</span>
              <span className="text-sm sm:text-base whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Services Section */}
          {activeSection === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Our Excel Services
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                  Comprehensive Excel data processing solutions for businesses of all sizes.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {excelServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-5 border border-gray-200 hover:border-yellow-300 transition-all duration-300 group shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Benefits Section */}
          {activeSection === 'benefits' && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Why Choose Our Excel Services
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="grid gap-3">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-300 transition-all duration-300 group"
                        >
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                            ✓
                          </div>
                          <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 h-full"
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">⚡</div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Expert Excel Solutions</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Our certified Excel experts provide advanced solutions for complex data challenges, ensuring optimal performance and accuracy.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">100%</div>
                          <div className="text-gray-600 text-xs">Accuracy Guarantee</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">500+</div>
                          <div className="text-gray-600 text-xs">Complex Formulas</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Section */}
          {activeSection === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Advanced Excel Features
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {advancedFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-5 border border-gray-200 hover:border-yellow-300 transition-all duration-300 group text-center"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Optimize Your Excel Data Today
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Transform your Excel spreadsheets with our expert processing services. From data cleaning to advanced automation, we make your Excel data work smarter and more efficiently.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              📩 Get Free Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Contact us to revolutionize your Excel data processing.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExcelDataProcessing;