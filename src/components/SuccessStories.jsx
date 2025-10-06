import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessStories = () => {
  const [showFullStory, setShowFullStory] = useState(false);
  const navigate = useNavigate();

  const successStory = {
    id: 1,
    client: "Global Tech Solutions Inc.",
    industry: "B2B SaaS Technology",
    title: "From Data Chaos to 10,000 Qualified Leads",
    description: "How we transformed a struggling B2B startup's data management and turned their business around with precision and expertise.",
    
    challenge: "A promising SaaS company with great potential was drowning in data chaos. Their CRM was a mess with duplicate entries, outdated contacts, and no proper lead tracking. They were losing potential customers daily and their sales team was frustrated with poor data quality.",
    
    solution: "We stepped in with a clear 3-phase approach: First, we cleaned and organized their existing data. Then, we built a systematic lead generation process. Finally, we implemented ongoing data maintenance to keep everything running smoothly.",
    
    leadership: {
      ceo: {
        name: "Hashir Raza",
        role: "CEO",
        quote: "This project was challenging, but our team's dedication made it possible. Hashir's vision kept us focused on the big picture while ensuring every detail was perfect."
      },
      pm: {
        name: "Hamid Raza", 
        role: "Project Manager",
        quote: "Hamid's daily guidance and problem-solving skills were incredible. He kept the team motivated through tough phases and always found solutions when we hit obstacles."
      }
    },

    approach: [
      {
        phase: "Data Cleanup & Organization",
        tasks: [
          "Audited entire CRM database",
          "Removed duplicates and outdated entries",
          "Standardized data formatting",
          "Created proper categorization system"
        ]
      },
      {
        phase: "Strategic Lead Generation", 
        tasks: [
          "Manual research for quality leads",
          "Built targeted company profiles",
          "Created accurate contact lists",
          "Implemented lead tracking system"
        ]
      },
      {
        phase: "Ongoing Excellence",
        tasks: [
          "Regular data quality checks",
          "Continuous lead research",
          "Performance monitoring",
          "Process optimization"
        ]
      }
    ],

    skillsApplied: [
      "B2B Lead Generation",
      "Data Entry & Cleaning", 
      "CRM Management",
      "Market Research",
      "Excel & Data Processing",
      "Quality Assurance"
    ],

    breakthrough: "The real breakthrough came when we discovered a pattern in their ideal customer profile that everyone had missed. This insight helped us target the perfect companies, leading to a massive increase in qualified leads.",

    results: [
      "10,000+ qualified B2B leads added to CRM",
      "95% data accuracy achieved",
      "Sales team efficiency increased by 3x", 
      "60% faster lead generation process",
      "Complete CRM transformation",
      "Ongoing success maintained"
    ],

    duration: "6 Month Project",
    team: "8 dedicated specialists",
    tools: ["HubSpot CRM", "Excel", "Manual Research", "Data Analytics"],
    image: "/meeting.jpg"
  };

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
            Our <span className="text-yellow-500">Success Story</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real challenges, real solutions. See how we helped transform a business with our data expertise.
          </p>
        </motion.div>

        {/* Main Success Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden"
        >
          {/* Header with Client Info - COMPLETELY REDESIGNED */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
            {/* Main Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left leading-tight">
              From Data Chaos to 10,000 Qualified Leads
            </h1>
            
            {/* Client and Industry Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="text-gray-300 text-sm md:text-base">Global Tech Solutions Inc.</span>
                <span className="text-gray-500 hidden md:block">•</span>
                <span className="text-gray-300 text-sm md:text-base">B2B SaaS Technology</span>
              </div>
              
              {/* Duration Box - Now properly aligned */}
              <div className="flex justify-center md:justify-end">
                <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-center min-w-[160px]">
                  <p className="font-bold text-sm md:text-base">6 Month Project</p>
                  <p className="text-xs md:text-sm">8 dedicated specialists</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the content remains same */}
          <div className="p-6">
            {/* The Challenge */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                The Challenge We Faced
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700">{successStory.challenge}</p>
              </div>
            </div>

            {/* Our Solution */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                How We Solved It
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 mb-4">{successStory.solution}</p>
                
                {/* Skills Applied */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Skills We Used:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {successStory.skillsApplied.map((skill, idx) => (
                      <div key={idx} className="bg-white border border-gray-300 rounded-lg p-2 text-center hover:border-yellow-400 transition-colors duration-200">
                        <span className="text-xs text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Support */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Leadership That Made It Possible
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CEO Card */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      HR
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{successStory.leadership.ceo.name}</p>
                      <p className="text-sm text-gray-600">{successStory.leadership.ceo.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic">"{successStory.leadership.ceo.quote}"</p>
                </div>

                {/* PM Card */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      HR
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{successStory.leadership.pm.name}</p>
                      <p className="text-sm text-gray-600">{successStory.leadership.pm.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic">"{successStory.leadership.pm.quote}"</p>
                </div>
              </div>
            </div>

            {/* Project Approach */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Step-by-Step Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {successStory.approach.map((phase, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-3">{phase.phase}</h4>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start text-sm text-gray-600">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Amazing Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {successStory.results.map((result, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium text-sm">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/blogs')}
                className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300"
              >
                Explore Blogs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/portfolio')}
                className="flex-1 bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
              >
                Explore Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Write <span className="text-yellow-400">Your Success Story</span>?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's work together to transform your business challenges into remarkable success.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Full Story Modal */}
      <AnimatePresence>
        {showFullStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFullStory(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">The Complete Success Story</h2>
                  <button
                    onClick={() => setShowFullStory(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Breakthrough Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">The Turning Point</h3>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <p className="text-gray-700">{successStory.breakthrough}</p>
                  </div>
                </div>

                {/* Tools Used */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Tools We Mastered</h3>
                  <div className="flex flex-wrap gap-2">
                    {successStory.tools.map((tool, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowFullStory(false)}
                  className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300 mt-4"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuccessStories;