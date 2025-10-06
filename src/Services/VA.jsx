import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VirtualAssistance = () => {
  const [activeSection, setActiveSection] = useState('services');

  const tabs = [
    { id: 'services', label: 'Our Services', icon: '💼' },
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

  const vaServices = [
    {
      icon: "📧",
      title: "Email Management",
      description: "Professional email handling, filtering, prioritization, and response management.",
      features: ["Inbox Organization", "Priority Sorting", "Template Responses", "Spam Management"]
    },
    {
      icon: "📅",
      title: "Calendar Management",
      description: "Schedule management, appointment setting, and calendar optimization for better time management.",
      features: ["Appointment Scheduling", "Meeting Coordination", "Reminder Setup", "Time Zone Management"]
    },
    {
      icon: "📞",
      title: "Customer Support",
      description: "24/7 customer service, query resolution, and support ticket management.",
      features: ["Live Chat Support", "Ticket Management", "Query Resolution", "Customer Follow-ups"]
    },
    {
      icon: "📊",
      title: "Data Entry & Research",
      description: "Comprehensive data entry, market research, and information gathering services.",
      features: ["Online Research", "Data Collection", "Market Analysis", "Competitor Research"]
    },
    {
      icon: "💬",
      title: "Social Media Management",
      description: "Social media posting, engagement monitoring, and content scheduling across platforms.",
      features: ["Content Scheduling", "Engagement Monitoring", "Analytics Tracking", "Community Management"]
    },
    {
      icon: "📋",
      title: "Administrative Tasks",
      description: "Document preparation, presentation creation, and general administrative support.",
      features: ["Document Creation", "Presentation Design", "Report Preparation", "File Organization"]
    }
  ];

  const benefits = [
    "Cost-effective compared to full-time employees",
    "24/7 availability across different time zones",
    "Quick scalability based on business needs",
    "Professional and trained virtual assistants",
    "Multilingual support capabilities",
    "Secure and confidential data handling",
    "No overhead costs or office space required",
    "Flexible engagement models"
  ];

  const industries = [
    {
      name: "E-commerce",
      icon: "🛒",
      description: "Customer support, order processing, and inventory management"
    },
    {
      name: "Real Estate",
      icon: "🏠",
      description: "Lead management, appointment scheduling, and client communication"
    },
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Appointment scheduling, patient follow-ups, and administrative support"
    },
    {
      name: "Legal",
      icon: "⚖️",
      description: "Document preparation, client communication, and calendar management"
    },
    {
      name: "Education",
      icon: "🎓",
      description: "Student support, administrative tasks, and communication management"
    },
    {
      name: "Startups",
      icon: "🚀",
      description: "Multi-task support, business administration, and growth support"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" },
    { number: "50+", label: "Trained Assistants" },
    { number: "98%", label: "Satisfaction Rate" }
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
            Virtual <span className="text-yellow-500">Assistance Services</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Professional Remote Support for Your Business Growth
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Scale your business efficiently with our expert virtual assistance services. From administrative tasks to customer support, our trained professionals handle it all while you focus on core business activities.
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
                  Our Virtual Assistance Services
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                  Comprehensive virtual support services to handle all your administrative and operational needs.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vaServices.map((service, index) => (
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
                  Why Choose Our Virtual Assistance
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
                      <div className="text-3xl mb-3">🌟</div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">Professional Support</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Our trained virtual assistants provide professional support with attention to detail and commitment to quality service.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-yellow-600">50+</div>
                          <div className="text-gray-600 text-xs">Trained Assistants</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">98%</div>
                          <div className="text-gray-600 text-xs">Satisfaction Rate</div>
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
              Scale Your Business with Virtual Assistance
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Focus on growing your business while we handle the administrative tasks. Our professional virtual assistants are ready to support your operations 24/7.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              📩 Get Free Consultation
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Contact us to find the perfect virtual assistance solution for your business.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualAssistance;