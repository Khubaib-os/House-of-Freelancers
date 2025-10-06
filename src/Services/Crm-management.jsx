import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CRMDataManagement = () => {
  const [activeSection, setActiveSection] = useState('services');

  const tabs = [
    { id: 'services', label: 'Our Services', icon: '🔄' },
    { id: 'benefits', label: 'Why Choose Us', icon: '⭐' },
    { id: 'platforms', label: 'CRM Platforms', icon: '💻' }
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

  const crmServices = [
    {
      icon: "📥",
      title: "CRM Data Migration",
      description: "Seamless transfer of customer data between CRM systems with zero data loss and complete integrity.",
      features: ["Data Mapping", "Field Alignment", "Validation Checks", "Post-Migration Support"]
    },
    {
      icon: "🧹",
      title: "Data Cleaning & Deduplication",
      description: "Identify and remove duplicate records, correct errors, and standardize data formats.",
      features: ["Duplicate Removal", "Error Correction", "Format Standardization", "Quality Assurance"]
    },
    {
      icon: "🔄",
      title: "Data Integration",
      description: "Integrate CRM with other business systems for unified customer view and streamlined operations.",
      features: ["API Integration", "Data Synchronization", "Real-time Updates", "System Compatibility"]
    },
    {
      icon: "📊",
      title: "CRM Customization",
      description: "Customize CRM fields, workflows, and reports to match your specific business processes.",
      features: ["Custom Fields", "Workflow Design", "Report Customization", "User Training"]
    },
    {
      icon: "🛡️",
      title: "Data Security & Backup",
      description: "Implement robust security measures and regular backups to protect your customer data.",
      features: ["Access Control", "Data Encryption", "Regular Backups", "Security Audits"]
    },
    {
      icon: "📈",
      title: "Performance Optimization",
      description: "Optimize CRM performance for faster data access and improved user experience.",
      features: ["Database Optimization", "Query Performance", "System Monitoring", "Performance Reports"]
    }
  ];

  const benefits = [
    "Improved data accuracy and reliability",
    "Enhanced customer relationship management",
    "Streamlined sales and marketing processes",
    "Better decision-making with clean data",
    "Increased team productivity and efficiency",
    "Reduced operational costs",
    "Scalable solutions for business growth",
    "24/7 technical support and maintenance"
  ];

  const platforms = [
    {
      name: "Salesforce",
      icon: "☁️",
      description: "Complete Salesforce implementation, customization, and management"
    },
    {
      name: "HubSpot",
      icon: "🔄",
      description: "HubSpot CRM setup, integration, and optimization services"
    },
    {
      name: "Zoho CRM",
      icon: "🔧",
      description: "Zoho CRM customization, migration, and support"
    },
    {
      name: "Microsoft Dynamics",
      icon: "💼",
      description: "Dynamics 365 implementation and enterprise solutions"
    },
    {
      name: "Pipedrive",
      icon: "📈",
      description: "Pipedrive setup, customization, and sales pipeline management"
    },
    {
      name: "Freshsales",
      icon: "🎯",
      description: "Freshsales implementation and sales automation"
    }
  ];

  const stats = [
    { number: "1000+", label: "CRM Migrations" },
    { number: "99.9%", label: "Data Accuracy" },
    { number: "24/7", label: "Support" },
    { number: "50+", label: "CRM Platforms" }
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
            CRM <span className="text-yellow-500">Data Management</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Streamline Your Customer Relationships with Expert CRM Solutions
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transform your customer relationship management with our comprehensive CRM data services. We ensure your customer data is accurate, accessible, and actionable across all platforms.
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
                  Our CRM Services
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                  Comprehensive CRM data management solutions to optimize your customer relationships and business processes.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crmServices.map((service, index) => (
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
                  Why Choose Our CRM Services
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
                      <div className="text-3xl mb-3">🔄</div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Expert CRM Management</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Our certified CRM experts ensure your system runs smoothly with optimized performance and maximum efficiency.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">1000+</div>
                          <div className="text-gray-600 text-xs">Successful Migrations</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">99.9%</div>
                          <div className="text-gray-600 text-xs">Data Accuracy</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Platforms Section */}
          {activeSection === 'platforms' && (
            <motion.div
              key="platforms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Supported CRM Platforms
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platforms.map((platform, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-5 border border-gray-200 hover:border-yellow-300 transition-all duration-300 group text-center"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {platform.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{platform.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {platform.description}
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
              Optimize Your CRM Today
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Transform your customer relationship management with our expert CRM data services. Get clean, organized, and actionable customer data that drives business growth.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              📩 Get Free Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Contact us to streamline your CRM and enhance customer relationships.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CRMDataManagement;