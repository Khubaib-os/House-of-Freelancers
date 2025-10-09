import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching portfolio projects:', error);
          throw error;
        }

        console.log('Fetched portfolio projects:', data);
        setProjects(data || []);
      } catch (error) {
        console.error('Error in fetchProjects:', error);
        setError('Failed to load portfolio projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setActiveCard(null);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white pt-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading portfolio projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white pt-8 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 max-w-md">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Portfolio</h3>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-amber-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white pt-8 overflow-hidden">
      <style>
        {`
          .scrollbar-custom::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-custom::-webkit-scrollbar-track {
            background: #1F2937;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #F59E0B;
            border-radius: 3px;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: #D97706;
          }
          .text-justify {
            text-align: justify;
          }
        `}
      </style>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 relative z-10 max-w-[80%] scroll-smooth overscroll-y-contain">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mr-3"></div>
            <span className="text-amber-400 font-medium uppercase tracking-widest text-sm">Our Work</span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent ml-3"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our 
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"> Portfolio</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover how we transform data into actionable insights and deliver exceptional results for our clients.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-12 max-w-2xl mx-auto">
              <svg className="w-20 h-20 text-amber-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
              <p className="text-gray-300 text-lg mb-6">
                Portfolio projects will appear here once they are added through the admin panel.
              </p>
              <div className="text-amber-400 text-sm">
                <p>Add projects from the Portfolio Management section in the admin dashboard.</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="relative group bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-amber-400/50 transition-all duration-500 overflow-hidden cursor-pointer h-80"
                  onMouseEnter={() => setActiveCard(project.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Project Image - Always Visible */}
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={project.image_url || '/Hof.png'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = '/Hof.png';
                      }}
                    />
                    
                    {/* Category Badge - Always Visible */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                        {project.category || 'General'}
                      </span>
                    </div>

                    {/* Overlay Content - Show on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex flex-col justify-end p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeCard === project.id ? 1 : 0,
                        y: activeCard === project.id ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description?.substring(0, 100)}...
                      </p>
                      
                      {/* Technologies Preview */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 2).map((tech, index) => (
                            <span
                              key={index}
                              className="bg-gray-800/80 text-gray-300 px-2 py-1 rounded text-xs border border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 2 && (
                            <span className="bg-gray-800/80 text-gray-400 px-2 py-1 rounded text-xs">
                              +{project.technologies.length - 2} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* View Details Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal(project)}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>View Project Details</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Expertise Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Our <span className="text-amber-400">Expertise</span>
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  We specialize in transforming complex data into strategic advantages through our comprehensive service offerings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Core Skills */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Core Skills</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• B2B Lead Generation</li>
                    <li>• Data Entry & Processing</li>
                    <li>• CRM Data Management</li>
                    <li>• Excel Data Processing</li>
                    <li>• Data Conversion</li>
                    <li>• Web-based Research</li>
                  </ul>
                </div>

                {/* Research & Analysis */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Research & Analysis</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Company & Contact Research</li>
                    <li>• Market & Competitor Analysis</li>
                    <li>• Real Estate Property Research</li>
                    <li>• Investor Lists Research</li>
                    <li>• Email List Building</li>
                    <li>• Data Quality Assurance</li>
                  </ul>
                </div>

                {/* Tools & Technology */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Tools & Technology</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• HubSpot, Zoho, Salesforce CRM</li>
                    <li>• LinkedIn Sales Navigator</li>
                    <li>• Apollo.io, Hunter.io</li>
                    <li>• Excel & Google Sheets</li>
                    <li>• Shopify & WooCommerce</li>
                    <li>• n8n Automation</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-custom"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                    {selectedProject.category || 'General'}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Project Image */}
              <img
                src={selectedProject.image_url || '/Hof.png'}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
                onError={(e) => {
                  e.target.src = '/Hof.png';
                }}
              />

              {/* Project Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Project Overview</h4>
                <p className="text-gray-300 leading-relaxed text-justify">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Results */}
              {selectedProject.results && (
                <div className="mb-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <h4 className="text-lg font-semibold text-amber-400 mb-2">Key Results</h4>
                  <p className="text-gray-300">{selectedProject.results}</p>
                </div>
              )}

              {/* Technologies Used */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies & Tools Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-lg text-sm border border-amber-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
                >
                  Discuss Similar Project
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;