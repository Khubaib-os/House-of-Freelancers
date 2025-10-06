import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VisionFuture = () => {
  const navigate = useNavigate();

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
            Our <span className="text-yellow-500">Vision</span> & Future
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Building tomorrow's solutions with today's expertise and innovation
          </p>
        </motion.div>

        {/* CEO Message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
                Message from Our CEO
              </h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    HR
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "We started with a simple goal: deliver exceptional data solutions that drive real business growth. Today, we're evolving beyond our core expertise to embrace AI and web development, ensuring we remain at the forefront of technological innovation."
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    "Our journey is defined by continuous improvement and strategic expansion. We're not just keeping pace with technology - we're shaping its future to deliver even greater value to our clients."
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-gray-800">Hashir Raza</p>
                    <p className="text-gray-600 text-sm">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
              <h2 className="text-2xl font-bold text-center md:text-left">
                Our Core Expertise
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Data & Research
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "B2B Lead Generation & Prospecting",
                      "CRM Data Management & Migration", 
                      "Market & Competitor Research",
                      "Excel Automation & Data Processing",
                      "Data Cleaning & Quality Assurance"
                    ].map((skill, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Business Solutions
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Virtual Assistance & Support",
                      "Process Automation & Optimization", 
                      "E-commerce Product Management",
                      "Industry-Specific Solutions",
                      "Workflow Integration & Management"
                    ].map((skill, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Future Vision - AI & Web Development */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
              <h2 className="text-2xl font-bold text-center md:text-left">
                Expanding into AI & Web Development
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Artificial Intelligence</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <ul className="space-y-2">
                      {[
                        "Machine Learning Integration",
                        "AI-Powered Data Analysis",
                        "Automated Process Optimization", 
                        "Predictive Analytics & Insights"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-600 text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Web Development</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <ul className="space-y-2">
                      {[
                        "Full-Stack Web Applications",
                        "Responsive Web Design",
                        "API Development & Integration",
                        "E-commerce Solutions"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-600 text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-gray-700 text-center">
                  We're strategically expanding our capabilities to provide comprehensive digital solutions that combine data expertise with cutting-edge technology.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why We're The Best */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
              <h2 className="text-2xl font-bold text-center md:text-left">
                Why Choose Us
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gray-600 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Proven Track Record</h4>
                      <p className="text-gray-600 text-sm">Years of successful project delivery across multiple industries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gray-600 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Continuous Innovation</h4>
                      <p className="text-gray-600 text-sm">Always evolving with latest technologies and methodologies</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gray-600 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Dedicated Expertise</h4>
                      <p className="text-gray-600 text-sm">Highly skilled team committed to excellence</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gray-600 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Future-Ready Approach</h4>
                      <p className="text-gray-600 text-sm">Preparing businesses for tomorrow's challenges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Build the Future Together?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how our evolving expertise can drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/portfolio')}
                className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
              >
                View Our Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
              >
                Get In Touch
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionFuture;