import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const B2BLeadGeneration = () => {
  const [activeSection, setActiveSection] = useState('importance');

  const tabs = [
    { id: 'importance', label: 'Strategic Importance', icon: '🎯' },
    { id: 'process', label: 'Our Methodology', icon: '🔄' },
    { id: 'benefits', label: 'Key Advantages', icon: '⭐' }
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

  const importancePoints = [
    {
      icon: "🎯",
      title: "Focused Growth Strategy",
      description: "B2B lead generation ensures your marketing efforts reach the right audience — CEOs, Managers, and key decision-makers who are genuinely interested in your services."
    },
    {
      icon: "📈",
      title: "Higher ROI & Better Conversions",
      description: "Instead of wasting time and budget on random outreach, you get data-driven and targeted leads that actually convert into paying clients."
    },
    {
      icon: "🌟",
      title: "Brand Visibility & Trust",
      description: "A consistent flow of leads builds credibility in the market and positions your company as an industry leader."
    },
    {
      icon: "🚀",
      title: "Strong & Predictable Sales Pipeline",
      description: "With continuous and quality leads, your business enjoys sales consistency and long-term profitability."
    }
  ];

  const processSteps = [
    {
      icon: "🔍",
      title: "In-Depth Market Research",
      description: "We analyze your target audience, industry trends, and competitor data to build a custom B2B lead generation strategy for your business."
    },
    {
      icon: "💎",
      title: "Smart Data Mining & Verification",
      description: "Our team uses premium tools and verified databases to extract authentic and accurate lead information — ensuring you connect only with real prospects."
    },
    {
      icon: "📡",
      title: "Multi-Channel Outreach Campaigns",
      description: "We combine LinkedIn, Email, and Cold Calling strategies to engage leads across platforms — boosting your conversion rate."
    },
    {
      icon: "💬",
      title: "Personalized Communication",
      description: "Every message is crafted specifically for your target clients — because personalization builds trust and accelerates conversions."
    },
    {
      icon: "📊",
      title: "Real-Time Monitoring & Optimization",
      description: "Every campaign is tracked, analyzed, and improved in real time for maximum performance and ROI."
    },
    {
      icon: "🛡️",
      title: "End-to-End Lead Management",
      description: "From prospect research to follow-up and appointment setting, we handle it all — allowing your sales team to focus on closing deals."
    }
  ];

  const benefits = [
    "Experienced and dedicated B2B marketing professionals",
    "100% verified and qualified leads",
    "Transparent process with detailed reports",
    "Tailored strategy for every business niche",
    "Proven success in scaling B2B companies"
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
            B2B <span className="text-yellow-500">Lead Generation</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Drive sustainable business growth with targeted, high-quality B2B leads that convert into long-term partnerships and revenue.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { number: "98%", label: "Lead Accuracy" },
            { number: "3.2x", label: "Higher Conversion" },
            { number: "24/7", label: "Lead Monitoring" },
            { number: "500+", label: "Happy Clients" }
          ].map((stat, index) => (
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
          {/* Why Important Section */}
          {activeSection === 'importance' && (
            <motion.div
              key="importance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Why Strategic Lead Generation Matters
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      In today's competitive B2B landscape, targeted lead generation isn't just an option—it's the foundation of sustainable business growth and market leadership.
                    </p>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h3 className="text-yellow-700 font-semibold text-lg mb-2">Expert Insight</h3>
                      <p className="text-gray-700 text-sm">
                        Companies with structured lead generation processes experience 133% higher revenue growth compared to industry averages.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {importancePoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-yellow-300 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-2xl group-hover:scale-110 transition-transform duration-300">{point.icon}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{point.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{point.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Process Section */}
          {activeSection === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  Our Proven 6-Step Methodology
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-6 max-w-2xl mx-auto">
                  A systematic approach that transforms your lead generation from random outreach to predictable revenue generation.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-yellow-300 transition-all duration-300 group shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </div>
                        <div className="text-xl">{step.icon}</div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
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
                  Why Choose Us as Your B2B Partner
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-6">
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
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Proven Track Record</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        We've empowered hundreds of businesses to achieve their growth targets through strategic B2B lead generation that delivers measurable ROI.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">4.9/5</div>
                          <div className="text-gray-600 text-xs">Client Rating</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">89%</div>
                          <div className="text-gray-600 text-xs">Retention Rate</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Section - Single Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Transform Your Lead Generation?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful businesses that have scaled their revenue with our proven B2B lead generation strategies.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              Book Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              No commitment required • 100% results-driven • Customized approach
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default B2BLeadGeneration;