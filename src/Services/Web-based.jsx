import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WebMarketResearch = () => {
  const [activeSection, setActiveSection] = useState('services');

  const tabs = [
    { id: 'services', label: 'Our Services', icon: '🔍' },
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

  const researchServices = [
    {
      icon: "📊",
      title: "Competitor Analysis",
      description: "In-depth analysis of your competitors' strategies, market positioning, and customer engagement tactics.",
      features: ["SWOT Analysis", "Market Share Tracking", "Strategy Mapping", "Performance Benchmarking"]
    },
    {
      icon: "🎯",
      title: "Market Intelligence",
      description: "Comprehensive market insights including trends, opportunities, and potential threats in your industry.",
      features: ["Trend Analysis", "Opportunity Mapping", "Risk Assessment", "Growth Projections"]
    },
    {
      icon: "👥",
      title: "Customer Research",
      description: "Understand your target audience's behavior, preferences, and purchasing patterns.",
      features: ["Demographic Analysis", "Behavioral Patterns", "Needs Assessment", "Satisfaction Metrics"]
    },
    {
      icon: "📈",
      title: "Industry Reports",
      description: "Detailed industry-specific reports with actionable insights and strategic recommendations.",
      features: ["Market Size Analysis", "Growth Indicators", "Regulatory Impact", "Future Outlook"]
    },
    {
      icon: "🔎",
      title: "Online Data Mining",
      description: "Extract valuable insights from web sources, social media, and digital platforms.",
      features: ["Social Media Analysis", "Web Scraping", "Sentiment Analysis", "Data Aggregation"]
    },
    {
      icon: "📋",
      title: "Survey & Feedback Analysis",
      description: "Design and analyze surveys to gather customer feedback and market opinions.",
      features: ["Survey Design", "Response Analysis", "Insight Generation", "Actionable Recommendations"]
    }
  ];

  const benefits = [
    "Actionable insights for strategic decision-making",
    "Real-time market monitoring and trend analysis",
    "Comprehensive competitor intelligence",
    "Customized research methodologies",
    "Expert analysis from experienced researchers",
    "Quick turnaround with accurate data",
    "Cost-effective research solutions",
    "Confidential and secure data handling"
  ];

  const industries = [
    {
      name: "Technology",
      icon: "💻",
      description: "Tech trends, competitor analysis, and innovation tracking"
    },
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Medical trends, patient insights, and regulatory changes"
    },
    {
      name: "E-commerce",
      icon: "🛒",
      description: "Consumer behavior, market trends, and competitor strategies"
    },
    {
      name: "Finance",
      icon: "💰",
      description: "Market trends, investment insights, and regulatory analysis"
    },
    {
      name: "Manufacturing",
      icon: "🏭",
      description: "Industry trends, supply chain analysis, and market opportunities"
    },
    {
      name: "Education",
      icon: "🎓",
      description: "Learning trends, institutional analysis, and market needs"
    }
  ];

  const stats = [
    { number: "500+", label: "Research Projects" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "48h", label: "Quick Delivery" },
    { number: "50+", label: "Industries Covered" }
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
            Web-based <span className="text-yellow-500">Market Research</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Data-Driven Insights for Strategic Business Decisions
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of comprehensive market intelligence with our web-based research services. We transform raw data into actionable insights that drive your business growth and competitive advantage.
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
                  Our Research Services
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                  Comprehensive market research solutions tailored to your specific business needs and objectives.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {researchServices.map((service, index) => (
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
                  Why Choose Our Research Services
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
                      <div className="text-3xl mb-3">📊</div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Expert Analysis</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Our team of experienced researchers provides deep insights and strategic recommendations based on comprehensive data analysis.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">24/7</div>
                          <div className="text-gray-600 text-xs">Market Monitoring</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">95%</div>
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Make Data-Driven Decisions?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Transform your business strategy with actionable market insights. Our comprehensive research services provide the intelligence you need to stay ahead of the competition.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              📩 Get Free Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Contact us today to discover how our research can drive your business growth.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebMarketResearch;