import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductListing = () => {
  const [activeSection, setActiveSection] = useState('services');

  const tabs = [
    { id: 'services', label: 'Our Services', icon: '📦' },
    { id: 'benefits', label: 'Why Choose Us', icon: '⭐' },
    { id: 'platforms', label: 'E-commerce Platforms', icon: '🛒' }
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

  const listingServices = [
    {
      icon: "📝",
      title: "Product Data Entry",
      description: "Comprehensive product listing creation with detailed descriptions, specifications, and features.",
      features: ["Product Descriptions", "Specification Entry", "Feature Listing", "Category Assignment"]
    },
    {
      icon: "🖼️",
      title: "Image Optimization",
      description: "Professional image editing, resizing, and optimization for better visual appeal and SEO.",
      features: ["Image Editing", "Background Removal", "Size Optimization", "Alt Text Creation"]
    },
    {
      icon: "💰",
      title: "Pricing & Inventory",
      description: "Accurate pricing setup, inventory management, and stock level tracking.",
      features: ["Price Setting", "Inventory Tracking", "Stock Updates", "Discount Management"]
    },
    {
      icon: "🔍",
      title: "SEO Optimization",
      description: "Search engine optimized product titles, descriptions, and metadata for better visibility.",
      features: ["Keyword Research", "SEO Titles", "Meta Descriptions", "Search Ranking"]
    },
    {
      icon: "📊",
      title: "Bulk Listing Management",
      description: "Efficient bulk upload and management of multiple products across various platforms.",
      features: ["Bulk Uploads", "Template Management", "Data Validation", "Error Handling"]
    },
    {
      icon: "🔄",
      title: "Catalog Management",
      description: "Complete catalog organization, category management, and product relationship setup.",
      features: ["Category Creation", "Product Grouping", "Cross-selling Setup", "Catalog Organization"]
    }
  ];

  const benefits = [
    "Increased product visibility and sales",
    "Professional and appealing product presentations",
    "SEO-optimized listings for better search rankings",
    "Accurate and consistent product information",
    "Quick turnaround for large product catalogs",
    "Multi-platform listing capabilities",
    "Regular inventory and price updates",
    "Detailed analytics and performance tracking"
  ];

  const platforms = [
    {
      name: "Amazon",
      icon: "📦",
      description: "Complete Amazon seller central management and optimization"
    },
    {
      name: "Shopify",
      icon: "🛍️",
      description: "Shopify store product listing and management services"
    },
    {
      name: "eBay",
      icon: "🏪",
      description: "eBay product listing optimization and management"
    },
    {
      name: "WooCommerce",
      icon: "🛒",
      description: "WooCommerce product catalog setup and management"
    },
    {
      name: "Etsy",
      icon: "🎨",
      description: "Etsy handmade and vintage product listings"
    },
    {
      name: "Walmart",
      icon: "🏬",
      description: "Walmart marketplace product listing services"
    }
  ];

  const stats = [
    { number: "10k+", label: "Products Listed" },
    { number: "40%", label: "Sales Increase" },
    { number: "15+", label: "Platforms Supported" },
    { number: "99%", label: "Accuracy Rate" }
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
            Product <span className="text-yellow-500">Listing Services</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Professional E-commerce Product Management & Optimization
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Boost your e-commerce sales with our expert product listing services. We create compelling, SEO-optimized product listings that attract customers and drive conversions across all major platforms.
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
                  Our Product Listing Services
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                  Comprehensive product listing solutions to maximize your e-commerce success.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listingServices.map((service, index) => (
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
                  Why Choose Our Listing Services
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
                      <div className="text-3xl mb-3">📈</div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Sales Growth</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Our optimized product listings typically result in 40% increase in sales and improved customer engagement.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">40%</div>
                          <div className="text-gray-600 text-xs">Sales Increase</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">99%</div>
                          <div className="text-gray-600 text-xs">Accuracy Rate</div>
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
                  Supported E-commerce Platforms
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
              Boost Your E-commerce Sales Today
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Transform your product listings into sales magnets with our professional optimization services. Get more visibility, better conversions, and increased revenue.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              📩 Get Free Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Contact us to optimize your product listings and increase sales.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductListing;