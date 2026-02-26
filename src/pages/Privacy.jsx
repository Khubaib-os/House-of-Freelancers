import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white pt-8 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 relative z-10 max-w-[80%]">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mr-3"></div>
            <span className="text-amber-400 font-medium uppercase tracking-widest text-sm">
              Legal Information
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent ml-3"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Policy</span>
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Your trust matters to us. Learn how House of Freelancers collects, uses,
            and protects your information.
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
            <h2 className="text-2xl font-bold text-amber-400 mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed">
              We may collect personal information such as your name, email address,
              phone number, company details, and project requirements when you
              contact us or use our services.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              We may also collect technical data including IP address, browser type,
              and website usage analytics to improve our platform performance.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">2. How We Use Your Information</h2>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>To deliver and manage our services</li>
              <li>To communicate regarding projects and support</li>
              <li>To improve website performance and user experience</li>
              <li>To maintain internal business records</li>
              <li>To comply with legal requirements</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">3. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement strong security measures including encrypted
              communications, restricted data access, and secure storage systems.
              Client information is accessible only to authorized team members.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">4. Third-Party Tools</h2>
            <p className="text-gray-300 leading-relaxed">
              We may use trusted third-party platforms such as CRM systems,
              automation tools, and accounting software to deliver our services.
              These providers have their own privacy policies governing data usage.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">5. Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              Our website may use cookies to enhance user experience and analyze
              traffic. You can disable cookies through your browser settings.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">6. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              You have the right to request access, correction, or deletion of your
              personal data. To exercise these rights, contact us using the details below.
            </p>
          </div>

          {/* Contact Section */}
          <div className="pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
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

export default Privacy;