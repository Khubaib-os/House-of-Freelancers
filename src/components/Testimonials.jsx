import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      feedback: "Working with this team transformed our data management completely. They delivered 10,000+ qualified leads and streamlined our CRM processes beyond our expectations.",
      initial: "S"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Operations Director, Global Retail Corp", 
      feedback: "The data migration and cleaning project was executed flawlessly. They handled our complex e-commerce data with precision and delivered results ahead of schedule.",
      initial: "M"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Head, HealthCare Plus",
      feedback: "Their market research and lead generation strategies helped us penetrate new markets we never thought possible. The quality of leads was outstanding.",
      initial: "E"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Finance Manager, FinanceSecure Ltd",
      feedback: "The CRM implementation and data management solutions provided were game-changing for our compliance processes. Their team's expertise is remarkable.",
      initial: "D"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "CTO, EduTech Solutions",
      feedback: "Outstanding work in data processing and automation. They helped us scale our platform efficiently while maintaining data integrity.",
      initial: "L"
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Production Head, ManufacturePro",
      feedback: "The data analytics and process optimization they delivered revolutionized our manufacturing operations. Their solutions were practical and efficient.",
      initial: "R"
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="w-[90%] max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 mb-6 shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-bold text-white">CLIENT TESTIMONIALS</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-yellow-500">Clients</span> Say
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real feedback from businesses we've helped transform with our data expertise
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div 
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Marquee */}
          <motion.div
            className="flex space-x-6"
            animate={{ 
              x: [0, -((testimonials.length * 400) + (testimonials.length * 24))] 
            }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60, // Slower animation
                ease: "linear",
              }
            }}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-96 bg-white rounded-xl border border-gray-300 shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Client Info - Top */}
                <div className="flex items-center mb-4">
                  <motion.div
                    className="relative mr-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.initial}
                    </div>
                    <motion.div
                      className="absolute inset-0 border-2 border-yellow-500 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }} // Slower rotation
                    />
                  </motion.div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                {/* Quote Icon */}
                <motion.svg
                  className="text-yellow-500 h-6 w-6 mb-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }} // Slower floating
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </motion.svg>

                {/* Feedback - Smaller Text */}
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  "{testimonial.feedback}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section - Updated Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }} // Slower animation
              >
                1000+
              </motion.div>
              <div className="text-sm text-gray-300">Projects Completed</div>
            </div>
            <div className="p-4">
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }} // Slower animation
              >
                100%
              </motion.div>
              <div className="text-sm text-gray-300">Accuracy Rate</div>
            </div>
            <div className="p-4">
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.6 }} // Slower animation
              >
                100%
              </motion.div>
              <div className="text-sm text-gray-300">Client Satisfaction</div>
            </div>
            <div className="p-4">
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.9 }} // Slower animation
              >
                100%
              </motion.div>
              <div className="text-sm text-gray-300">On-Time Delivery</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;