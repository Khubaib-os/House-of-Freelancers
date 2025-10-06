import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Excellence = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: '1000+',
      title: 'Projects Completed',
      description: 'Successfully delivered projects across various domains and technologies'
    },
    {
      number: '100%',
      title: 'Accuracy Rate',
      description: 'Precision and quality in every project we undertake'
    },
    {
      number: '100%',
      title: 'Client Satisfaction',
      description: 'Exceptional service that keeps our clients coming back'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            At House of Freelancers, we take pride in delivering exceptional quality and unmatched service. 
            Our track record speaks for itself with thousands of successful projects and completely satisfied clients.
          </motion.p>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-4xl font-bold text-amber-600 mb-2">{stat.number}</h3>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{stat.title}</h4>
              <p className="text-gray-600 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose Us?
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600">Highly skilled professionals with years of experience in their respective fields</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cutting-Edge Technology</h3>
                <p className="text-gray-600">Using the latest tools and technologies to deliver modern solutions</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Delivery</h3>
                <p className="text-gray-600">We respect deadlines and ensure projects are delivered on time</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock support to address your concerns and queries</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our family of satisfied clients and experience the House of Freelancers difference.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact-us')}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Excellence;