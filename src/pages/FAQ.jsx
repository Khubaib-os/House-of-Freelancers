import { motion } from 'framer-motion';
import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services does House of Freelancers provide?",
      answer:
        "We specialize in B2B lead generation, CRM data management, data entry & processing, market research, Excel automation, virtual assistance, and business process optimization."
    },
    {
      question: "How do you ensure data accuracy?",
      answer:
        "We follow a strict quality assurance process including manual verification, data cleaning techniques, validation tools, and regular audits to maintain high accuracy standards."
    },
    {
      question: "Is my business data secure with you?",
      answer:
        "Yes. We implement secure storage systems, restricted access policies, and confidentiality agreements to ensure your data remains protected at all times."
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Absolutely. We work with clients globally and adapt to different time zones to ensure smooth communication and project delivery."
    },
    {
      question: "What is your project turnaround time?",
      answer:
        "Turnaround time depends on project scope and complexity. However, we prioritize timely delivery and always provide a clear timeline before starting."
    },
    {
      question: "How can I get started?",
      answer:
        "Simply contact us through our website, email, or phone. Share your project requirements, and our team will provide a tailored solution and quote."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white pt-8 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 relative z-10 max-w-[80%]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mr-3"></div>
            <span className="text-amber-400 font-medium uppercase tracking-widest text-sm">
              Help Center
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent ml-3"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Questions</span>
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Find answers to common questions about our services and processes.
          </p>
        </motion.div>

        {/* FAQ Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-10 space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
              >
                <span className="font-medium text-white">
                  {faq.question}
                </span>
                <span className="text-amber-400 text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-6 py-4 bg-gray-900 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Contact Note */}
        <div className="text-center text-gray-400 text-sm mt-12">
          Still have questions? Contact us at info@houseoffreelacers.org
        </div>

      </div>
    </div>
  );
};

export default FAQ;