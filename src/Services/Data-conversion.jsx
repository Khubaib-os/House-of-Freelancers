import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DataConversion = () => {
  const [activeSection, setActiveSection] = useState('services');

  const tabs = [
    { id: 'services', label: 'Our Services', icon: '🔄' },
    { id: 'benefits', label: 'Why Choose Us', icon: '⭐' },
    { id: 'formats', label: 'File Formats', icon: '📁' }
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

  const conversionServices = [
    {
      icon: "📄",
      title: "PDF to Excel/Word",
      description: "Convert PDF documents to editable Excel spreadsheets or Word documents with perfect formatting.",
      features: ["Table Extraction", "Format Preservation", "OCR Technology", "Batch Processing"]
    },
    {
      icon: "📊",
      title: "Excel to Database",
      description: "Migrate Excel data to various database formats like SQL, MySQL, Access, and more.",
      features: ["Data Mapping", "Relationship Setup", "Validation Rules", "Bulk Import"]
    },
    {
      icon: "🔄",
      title: "CSV/TSV Conversion",
      description: "Convert between CSV, TSV, and other delimited formats with custom separators and encoding.",
      features: ["Encoding Conversion", "Delimiter Changes", "Data Cleaning", "Format Optimization"]
    },
    {
      icon: "📋",
      title: "XML/JSON Conversion",
      description: "Convert between XML, JSON, and other structured data formats with schema validation.",
      features: ["Schema Mapping", "Data Validation", "Nested Structure", "API Integration"]
    },
    {
      icon: "🖼️",
      title: "Image to Text",
      description: "Extract text from images, scanned documents, and screenshots using advanced OCR technology.",
      features: ["OCR Processing", "Format Retention", "Multi-language Support", "Quality Assurance"]
    },
    {
      icon: "💾",
      title: "Legacy Format Conversion",
      description: "Convert data from legacy systems and outdated formats to modern, accessible formats.",
      features: ["Old Format Support", "Data Recovery", "Modernization", "Compatibility Testing"]
    }
  ];

  const benefits = [
    "100% accuracy in data conversion",
    "Preservation of original formatting and structure",
    "Quick turnaround time for urgent projects",
    "Support for rare and complex file formats",
    "Data validation and quality checks",
    "Secure and confidential data handling",
    "Bulk conversion capabilities",
    "24/7 customer support"
  ];

  const formats = [
    {
      name: "PDF Documents",
      icon: "📄",
      description: "PDF to Excel, Word, PowerPoint, and other formats"
    },
    {
      name: "Spreadsheets",
      icon: "📊",
      description: "Excel, CSV, TSV, Google Sheets, and OpenOffice"
    },
    {
      name: "Databases",
      icon: "🗄️",
      description: "SQL, MySQL, Access, SQLite, and other databases"
    },
    {
      name: "Text Formats",
      icon: "📝",
      description: "TXT, RTF, DOC, DOCX, and other text formats"
    },
    {
      name: "Structured Data",
      icon: "🔷",
      description: "XML, JSON, YAML, and other structured formats"
    },
    {
      name: "Images & Scans",
      icon: "🖼️",
      description: "JPG, PNG, TIFF, and scanned document conversion"
    }
  ];

  const stats = [
    { number: "50k+", label: "Files Converted" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "100+", label: "File Formats" },
    { number: "24/7", label: "Conversion Service" }
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
            Data <span className="text-yellow-500">Conversion Services</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Seamless Format Transformation with 100% Accuracy
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transform your data between any format with our expert conversion services. We ensure perfect accuracy, preserved formatting, and quick turnaround for all your data conversion needs.
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
                  Our Conversion Services
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                  Comprehensive data conversion solutions for all your format transformation needs.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {conversionServices.map((service, index) => (
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
                  Why Choose Our Conversion Services
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
                      <div className="text-3xl mb-3">🔒</div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Secure & Accurate</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        We ensure 100% data accuracy and complete security throughout the conversion process. Your data is always protected.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">100%</div>
                          <div className="text-gray-600 text-xs">Data Security</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">99.9%</div>
                          <div className="text-gray-600 text-xs">Accuracy Rate</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Formats Section */}
          {activeSection === 'formats' && (
            <motion.div
              key="formats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Supported File Formats
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formats.map((format, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-5 border border-gray-200 hover:border-yellow-300 transition-all duration-300 group text-center"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {format.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{format.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {format.description}
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
              Convert Your Data Seamlessly
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Transform your data between any format with 100% accuracy and preserved formatting. Our expert conversion services ensure your data works perfectly in its new format.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              📩 Get Free Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Contact us to convert your data with precision and speed.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataConversion;