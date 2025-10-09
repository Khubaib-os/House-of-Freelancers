import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';

const ContactUs = () => {
  const [activeTab, setActiveTab] = useState('service');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
    budget: '',
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Project details are required';
    
    if (activeTab === 'service' && !formData.service) newErrors.service = 'Service is required';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data for database
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || null,
        message: formData.message.trim(),
        service_type: activeTab,
        submission_type: activeTab === 'service' ? 'service_request' : 'consultation_request',
        status: 'new'
      };

      // Add service-specific fields
      if (activeTab === 'service') {
        submissionData.service_category = formData.service;
        submissionData.budget_range = formData.budget || null;
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to submit form. Please try again.');
      }

      // Set success message based on submission type
      if (activeTab === 'consultation') {
        setSuccessMessage("Thank you for requesting a consultation! We'll email you within 2 hours to schedule your consultation time.");
      } else {
        setSuccessMessage('Thank you for your service request! Our team will reach out within 2 hours.');
      }
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: '',
        budget: '',
        date: '',
        time: ''
      });
      setErrors({});
      
      // Auto-hide success message
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: error.message || 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-[90%] max-w-4xl mx-auto px-4">
        
        {/* Success Message Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowSuccess(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto text-center shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Success!
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {successMessage}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSuccess(false)}
                  className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300"
                >
                  Got it!
                </motion.button>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="bg-yellow-500 h-1 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Build Your 
            <span className="text-yellow-500"> Vision</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your project details or request a free consultation with our experts.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 p-3 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-base mb-2">Our Office</h3>
                  <p className="text-gray-600 text-sm">Khyaban E Ali Housing Society, Bahawalpur</p>
                  <p className="text-gray-500 text-xs mt-1">Open for in-person meetings</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 p-3 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-base mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm">+92 321 1234567</p>
                  <p className="text-gray-500 text-xs mt-1">Mon-Fri: 9AM-6PM</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 p-3 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-base mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm">info@hof.com</p>
                  <p className="text-gray-500 text-xs mt-1">Response within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            {/* Tab Buttons */}
            <div className="flex border-b border-gray-300">
              <button
                onClick={() => setActiveTab('service')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
                  activeTab === 'service'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Service Request
              </button>
              <button
                onClick={() => setActiveTab('consultation')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
                  activeTab === 'consultation'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Free Consultation
              </button>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {activeTab === 'service' ? 'Tell Us About Your Project' : 'Request a Free Consultation'}
                </h2>
                <p className="text-gray-600">
                  {activeTab === 'service' 
                    ? 'Fill out the form to share your project details and requirements.' 
                    : 'Tell us what you need help with and we\'ll email you to schedule your consultation.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {errors.submit}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white`}
                      placeholder="+92 321 1234567"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                      placeholder="Your Company (Optional)"
                    />
                  </div>
                </div>

                {/* Service Specific Fields */}
                {activeTab === 'service' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white`}
                        >
                          <option value="">Select a service</option>
                          <option value="b2b">B2B Lead Generation</option>
                          <option value="data-entry">Data Entry & Processing</option>
                          <option value="market-research">Web-based Market Research</option>
                          <option value="crm">CRM Data Management</option>
                          <option value="excel">Excel Data Processing</option>
                          <option value="data-conversion">Data Conversion</option>
                          <option value="virtual-assistance">Virtual Assistance</option>
                          <option value="product-listing">Product Listing</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                        >
                          <option value="">Select budget range</option>
                          <option value="1k-5k">$1,000 - $5,000</option>
                          <option value="5k-15k">$5,000 - $15,000</option>
                          <option value="15k-50k">$15,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                          <option value="tbd">To be discussed</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {activeTab === 'service' ? 'Project Details *' : 'What would you like to discuss? *'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white`}
                    placeholder={activeTab === 'service' ? 'Describe your project requirements, timeline, and any specific needs...' : 'Tell us about your business and what challenges you\'re facing...'}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Consultation Notice */}
                {activeTab === 'consultation' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-blue-700 text-sm font-medium">We'll email you to schedule</p>
                        <p className="text-blue-600 text-xs mt-1">
                          After you submit this form, we'll contact you within 2 hours to schedule your free 30-minute consultation at a time that works for you.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full bg-yellow-500 text-gray-900 font-semibold py-4 rounded-lg transition-all duration-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-yellow-600'
                  } text-lg`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-gray-900" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      {activeTab === 'service' ? 'Send Service Request' : 'Request Consultation'}
                      <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          <div className="text-center p-6 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">1000+</div>
            <div className="text-gray-600 text-sm">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">100%</div>
            <div className="text-gray-600 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Support Available</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">1000+</div>
            <div className="text-gray-600 text-sm">Projects Completed</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;