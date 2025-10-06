import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DataEntryProcessing = () => {
  const [activeSection, setActiveSection] = useState('expertise');

  const tabs = [
    { id: 'expertise', label: 'Our Expertise', icon: '💼' },
    { id: 'benefits', label: 'Why Choose Us', icon: '⭐' },
    { id: 'industries', label: 'Industries', icon: '🏢' }
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

  const expertiseServices = [
    {
      icon: "📝",
      title: "Data Entry Services",
      description: "We handle all types of data entry — from handwritten documents and spreadsheets to digital forms — ensuring accuracy, speed, and consistency.",
      features: ["Manual Data Entry", "Document Digitization", "Spreadsheet Management", "Real-time Data Updates"]
    },
    {
      icon: "⚡",
      title: "Data Processing Solutions",
      description: "Our experts clean, validate, and organize raw data into usable formats so you can make smarter, faster business decisions.",
      features: ["Data Transformation", "Format Standardization", "Quality Checks", "Process Automation"]
    },
    {
      icon: "🧹",
      title: "Data Cleaning & Validation",
      description: "We remove duplicates, correct inconsistencies, and verify information to maintain data integrity and reliability.",
      features: ["Duplicate Removal", "Error Correction", "Data Verification", "Quality Assurance"]
    },
    {
      icon: "🗄️",
      title: "Database Management",
      description: "We create, maintain, and update business databases with complete security and accessibility, ensuring seamless operations.",
      features: ["Database Design", "Regular Maintenance", "Security Management", "Performance Optimization"]
    },
    {
      icon: "📊",
      title: "Form Processing & Data Extraction",
      description: "From invoices and application forms to surveys and receipts, we extract and process data into structured digital formats.",
      features: ["Form Digitization", "OCR Processing", "Data Extraction", "Structured Output"]
    },
    {
      icon: "🔒",
      title: "Data Security & Confidentiality",
      description: "Your data's security is our top priority. We implement strict protocols to ensure complete confidentiality and protection.",
      features: ["Encryption", "Access Control", "Backup Systems", "Compliance Standards"]
    }
  ];

  const benefits = [
    "100% accuracy and confidentiality guaranteed",
    "Skilled and experienced data professionals",
    "Quick turnaround time and cost-effective pricing",
    "Use of advanced tools and automation technology",
    "Scalable solutions for businesses of all sizes",
    "24/7 customer support and dedicated account managers",
    "Customized workflows for specific business needs",
    "Regular quality audits and performance reports"
  ];

  const industries = [
    {
      name: "E-commerce",
      icon: "🛒",
      description: "Product data entry, inventory management, and customer data processing"
    },
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Patient records, medical billing, and research data management"
    },
    {
      name: "Finance",
      icon: "💰",
      description: "Financial reports, transaction processing, and compliance data"
    },
    {
      name: "Real Estate",
      icon: "🏠",
      description: "Property listings, client databases, and transaction records"
    },
    {
      name: "Education",
      icon: "🎓",
      description: "Student records, research data, and administrative documentation"
    },
    {
      name: "Logistics & Supply Chain",
      icon: "🚚",
      description: "Inventory tracking, shipment data, and supply chain analytics"
    }
  ];

  const stats = [
    { number: "99.8%", label: "Accuracy Rate" },
    { number: "50k+", label: "Records Processed Daily" },
    { number: "24/7", label: "Support Available" },
    { number: "200+", label: "Happy Clients" }
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
            Data Entry & <span className="text-yellow-500">Processing Services</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Accurate, Efficient, and Scalable Data Management Solutions
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            In the information-driven world of business, data accuracy and speed define success. Our Data Entry & Processing Services help organizations manage large volumes of information efficiently — delivering precision, reliability, and confidentiality.
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

        {/* Navigation Tabs - Centered on Desktop */}
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
          {/* Expertise Section */}
          {activeSection === 'expertise' && (
            <motion.div
              key="expertise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Our Data Expertise
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                  We turn complex data into structured, meaningful insights that empower better decision-making.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {expertiseServices.map((service, index) => (
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
                  Why Choose Our Data Services
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
                      <div className="text-3xl mb-3">🚀</div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Quality Assurance</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Every project undergoes multiple quality checks to ensure 100% accuracy and compliance with your specific requirements.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">3-Step</div>
                          <div className="text-gray-600 text-xs">Quality Check</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">99.8%</div>
                          <div className="text-gray-600 text-xs">Accuracy Rate</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Industries Section */}
          {activeSection === 'industries' && (
            <motion.div
              key="industries"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Industries We Serve
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {industries.map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-5 border border-gray-200 hover:border-yellow-300 transition-all duration-300 group text-center"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {industry.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{industry.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {industry.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Section - Single Button Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Streamline Your Data Operations Today
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Whether you need daily data entry support or full-scale data processing, our team is ready to deliver high-quality results. 
              Partner with us to transform your raw data into valuable business insights.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              📩 Get Free Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Contact us today to discover how we can simplify your data management process.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataEntryProcessing;