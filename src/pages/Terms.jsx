import { motion } from 'framer-motion';

const Terms = () => {
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
              Legal Agreement
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent ml-3"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms & <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Conditions</span>
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Please read these terms carefully before using our services.
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 space-y-10"
        >

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using House of Freelancers services, you agree to
              comply with and be bound by these Terms & Conditions.
              If you do not agree, please do not use our services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">2. Services Provided</h2>
            <p className="text-gray-300 leading-relaxed">
              We provide professional services including B2B lead generation,
              CRM data management, data processing, research, virtual assistance,
              automation solutions, and related business support services.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">3. Client Responsibilities</h2>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Provide accurate and complete project requirements.</li>
              <li>Ensure legal compliance of provided data.</li>
              <li>Respond to communication in a timely manner.</li>
              <li>Make agreed payments on schedule.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">4. Payment Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              Payments must be made according to the agreed contract terms.
              Projects may require upfront deposits depending on scope.
              Delayed payments may result in project suspension.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">5. Confidentiality</h2>
            <p className="text-gray-300 leading-relaxed">
              All client data and project information will be treated as strictly
              confidential. We do not share, sell, or disclose client data to
              unauthorized parties.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              House of Freelancers shall not be liable for indirect,
              incidental, or consequential damages resulting from the use of our services.
              We aim for accuracy and excellence but cannot guarantee
              outcomes beyond our control.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">7. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              Either party may terminate the agreement with written notice.
              Any completed work up to termination date must be compensated.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms & Conditions at any time.
              Updated versions will be posted on this page.
            </p>
          </div>

          {/* Contact Section */}
          <div className="pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p className="text-gray-300">
              <strong>House of Freelancers</strong><br />
              Khyaban E Ali Housing Society, Bahawalpur<br />
              📞 +92 3021072095<br />
              📧 info@houseoffreelacers.org
            </p>
          </div>

        </motion.div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm mt-12">
          © 2024 House of Freelancers. All Rights Reserved.
        </div>

      </div>
    </div>
  );
};

export default Terms;