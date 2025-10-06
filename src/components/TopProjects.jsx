import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TopProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-commerce Data Migration",
      description: "Migrated 50,000+ product listings with 100% accuracy and improved processing speed by 30% for enhanced platform performance.",
      category: "Data Management",
      results: ["50,000+ products migrated", "100% data accuracy", "30% faster processing"]
    },
    {
      id: 2,
      title: "B2B Lead Generation Campaign",
      description: "Generated 500+ qualified B2B leads in 30 days with 25% conversion rate and 40% cost reduction in lead acquisition.",
      category: "Lead Generation",
      results: ["500+ qualified leads", "25% conversion rate", "40% cost reduction"]
    },
    {
      id: 3,
      title: "Real Estate Market Analysis",
      description: "Conducted comprehensive 5-city market analysis with 95% accuracy, identifying 15+ high-value investment opportunities.",
      category: "Research & Analysis",
      results: ["5-city analysis", "95% accuracy", "15+ opportunities identified"]
    },
    {
      id: 4,
      title: "Automated CRM Setup",
      description: "Implemented CRM automation reducing manual work by 80% with custom workflows and real-time performance dashboards.",
      category: "Business Automation",
      results: ["80% manual work reduction", "Custom workflows", "Real-time dashboards"]
    },
    {
      id: 5,
      title: "Virtual Assistant Support",
      description: "Provided virtual assistance achieving 99% email response rate and 40% executive time savings through optimized workflows.",
      category: "Virtual Assistance",
      results: ["99% email response", "40% time savings", "Optimized workflows"]
    },
    {
      id: 6,
      title: "Product Listing Optimization",
      description: "Optimized 10,000+ product listings driving 35% higher click-through rates and improved search rankings.",
      category: "E-commerce Support",
      results: ["10,000+ listings", "35% higher CTR", "Improved rankings"]
    }
  ];

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="w-[80%] max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top <span className="text-yellow-600">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our exceptional work that drives business growth and delivers measurable results
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group cursor-pointer"
              onClick={() => openProjectDetails(project)}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/meeting.jpg" 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Results */}
                  <div className="space-y-2">
                    {project.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs text-gray-500">{result}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-yellow-600 text-sm font-semibold hover:text-yellow-700 transition-colors duration-300 flex items-center">
                      View Details
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your <span className="text-yellow-400">Project</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to create exceptional results for your business
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg"
            >
              Start Your Project Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative h-64">
                <img 
                  src="/meeting.jpg" 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <button
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Results */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Achievements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.results.map((result, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeProjectDetails}
                    className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
                  >
                    Start Similar Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopProjects;