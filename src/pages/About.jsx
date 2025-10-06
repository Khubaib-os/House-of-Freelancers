import { motion } from 'framer-motion';
import { useState } from 'react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('journey');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleTabKeyDown = (e, tabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  const aboutData = {
    founder: {
      name: 'Hamid Raza',
      intro: 'Hamid Raza founded House of Freelancers in 2019 with a bold vision: to create a professional ecosystem where talented freelancers from around the world collaborate to deliver excellence. Starting with core services like B2B Lead Generation, Data Processing, and Virtual Assistance, Hamid built the company on principles of accuracy, innovation, and reliability.',
      slogan: 'Turning Vision into Digital Reality.',
      vision: 'My vision was never just to build a team — but to build a family of innovators who believe in excellence. Today, House of Freelancers stands as proof that dedication, quality, and innovation can transform ordinary work into extraordinary success.',
      image: '/meeting.jpg',
      upwork: 'https://www.upwork.com/freelancers/~01abc123def456',
    },
    ceo: {
      name: 'Hamid Raza',
      intro: 'As CEO, Hamid Raza continues to lead House of Freelancers into the future — guiding its transformation from a data-focused agency into a next-generation digital powerhouse. His leadership philosophy combines strategic innovation, team empowerment, and client-first thinking.',
      slogan: 'Innovation, Integrity, and Impact — The Core of Our Success.',
      vision: '2025 marks a new chapter for us — where data meets intelligence and creativity meets code. Our mission is to redefine global outsourcing through intelligent, AI-driven, and human-centered digital solutions.',
      image: '/meeting.jpg',
      upwork: 'https://www.upwork.com/freelancers/~01abc123def456',
    },
    company: {
      intro: 'Founded in 2019, House of Freelancers is a global digital service agency delivering cutting-edge solutions in Data, Web, AI, and Automation. We believe in transforming ideas into impact — combining creativity, technology, and strategy to help businesses scale efficiently.',
      slogan: 'Where Dreams Come True',
      journey: 'Our story began with a mission to deliver quality freelancing services and has evolved into a legacy of success. Between 2019 and 2024, we delivered 1000+ projects with 100% client satisfaction across industries — from startups to enterprises. Now in 2025, we’ve expanded into AI and Web Development, offering smarter, scalable, and automation-driven digital solutions.',
      achievements: [
        { number: '1000+', label: 'Projects Delivered' },
        { number: '100%', label: 'Client Satisfaction' },
        { number: '20+', label: 'Countries Served' },
        { number: '6+', label: 'Years Experience' },
      ],
      leadershipTeam: [
        {
          name: 'Ahmed Khan',
          role: 'Chief Operating Officer',
          description: 'Manages daily operations and ensures service delivery excellence.',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~02def456ghi789',
        },
        {
          name: 'Sara Ahmed',
          role: 'Chief Technology Officer',
          description: 'Leads development in Web, AI, and automation technologies.',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~03ghi789jkl012',
        },
        {
          name: 'Omar Farooq',
          role: 'Chief Financial Officer',
          description: 'Oversees company finances, sustainability, and growth.',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~04jkl012mno345',
        },
        {
          name: 'Laila Hassan',
          role: 'Chief Marketing Officer',
          description: 'Handles branding, communication, and digital marketing strategies.',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~05mno345pqr678',
        },
      ],
      juniorManagement: [
        {
          name: 'Zain Malik',
          role: 'Operations Manager',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~06pqr678stu901',
        },
        {
          name: 'Ayesha Khan',
          role: 'Tech Supervisor',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~07stu901vwx234',
        },
        {
          name: 'Bilal Ahmed',
          role: 'Finance Executive',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~08vwx234yza567',
        },
        {
          name: 'Fatima Ali',
          role: 'Marketing Specialist',
          image: '/meeting.jpg',
          upwork: 'https://www.upwork.com/freelancers/~09yza567bcd890',
        },
      ],
      staff: [
        { name: 'Usman Raza', role: 'Senior Data Analyst', image: '/meeting.jpg' },
        { name: 'Hina Malik', role: 'Web Developer', image: '/meeting.jpg' },
        { name: 'Khalid Butt', role: 'AI Specialist', image: '/meeting.jpg' },
        { name: 'Nadia Qureshi', role: 'Content Writer', image: '/meeting.jpg' },
        { name: 'Rizwan Shah', role: 'Quality Assurance Lead', image: '/meeting.jpg' },
        { name: 'Sobia Ahmed', role: 'Project Coordinator', image: '/meeting.jpg' },
        { name: 'Tariq Mehmood', role: 'Business Development Executive', image: '/meeting.jpg' },
        { name: 'Zara Khan', role: 'Virtual Assistant Supervisor', image: '/meeting.jpg' },
      ],
      coreExpertise: [
        {
          category: 'B2B Lead Generation',
          items: [
            'B2B Lead Generation',
            'Data Entry (accurate & detail-oriented)',
            'Web-based Market Research',
            'CRM Data Management & Migration',
            'Excel Data Cleaning & Formatting',
            'Excel Formulas & Macros (SUM, Pivot Tables, Dynamic Sheets etc.)',
            'Data Conversion (PDF → Excel/Word, CSV, etc.)',
            'Product Listing (Shopify, WooCommerce, E-commerce Stores)',
          ],
        },
        {
          category: 'Research & Analysis',
          items: [
            'Company & Contact Research',
            'Email List Building (manual work)',
            'Real Estate Property/County Record Research',
            'Investor/Startups/VC/PE Lists Research',
            'Market & Competitor Analysis',
          ],
        },
        {
          category: 'CRM & Tools Expertise',
          items: [
            'HubSpot CRM',
            'Zoho CRM',
            'GoHighLevel CRM',
            'Salesforce',
            'LinkedIn Sales Navigator',
            'Apollo.io',
            'Hunter.io, RocketReach, Clearbit, Kendo',
            'BuiltWith, Crunchbase',
          ],
        },
        {
          category: 'File & Data Management',
          items: [
            'Data Cleaning & De-duplication',
            'Data Migration between platforms',
            'PDF Forms → Word/Excel Conversion',
            'Advanced Excel Formatting (Auto Wrap, Auto Row Height, Anchors, Totals etc.)',
            'CSV/Excel Import & Export',
          ],
        },
        {
          category: 'Industry Experience',
          items: [
            'Real Estate (Land records, Agents, Builders)',
            'SaaS & IT Services',
            'Retail & E-commerce',
            'Food & Beverage',
            'Security & Manufacturing',
            'Renewable Energy & Sustainability',
          ],
        },
        {
          category: 'Virtual Assistance (VA Skills)',
          items: [
            'Meeting Scheduling & Calendar Management',
            'Email Management & Inbox Handling',
            'Preparing Reports & Summaries (Excel/Word/Google Docs)',
            'Online Research (Companies, Markets, Competitors)',
            'CRM Updates & Data Entry Support',
            'Document Formatting & Template Creation',
            'Basic Client Communication & Follow-ups',
            'Task/Project Tracking in Google Sheets / Excel',
          ],
        },
        {
          category: 'Technical/Other Skills',
          items: [
            'Google Sheets (advanced use with formulas)',
            'Microsoft Word (Forms, Templates)',
            'QuickBooks Data Conversion (basic)',
            'Automation flows (n8n basics)',
            'Data Proofing & Quality Assurance',
          ],
        },
      ],
      newExpertise: [
        {
          title: 'Web Development',
          description: 'Building modern, responsive web applications using cutting-edge technologies.',
          technologies: ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Supabase', 'JavaScript', 'Tailwind CSS'],
        },
        {
          title: 'AI & Automation',
          description: 'Intelligent solutions for modern businesses, including AI chatbots and process automation.',
          technologies: ['AI Chatbots', 'Process Automation', 'Machine Learning', 'Data Intelligence'],
        },
        {
          title: 'App Development',
          description: 'Delivering seamless Android & iOS apps that blend design, usability, and performance.',
          technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        },
      ],
      vision: 'To redefine the digital outsourcing industry by merging human creativity with artificial intelligence and modern technology.',
      mission: 'To empower businesses worldwide with innovative, scalable, and intelligent digital solutions that deliver measurable results.',
      visionMissionIntro: 'At House of Freelancers, our vision and mission guide everything we do. We aim to revolutionize the digital outsourcing landscape by blending human ingenuity with cutting-edge technology, delivering solutions that drive measurable success for businesses globally.',
      values: [
        { title: 'Innovation', description: 'Driving change through technology', icon: '💡', color: 'yellow' },
        { title: 'Excellence', description: 'Delivering perfection in every project', icon: '⭐', color: 'yellow' },
        { title: 'Integrity', description: 'Building long-term trust with clients', icon: '🤝', color: 'gray' },
        { title: 'Creativity', description: 'Turning complex ideas into real results', icon: '🎨', color: 'yellow' },
        { title: 'Growth', description: 'Constantly evolving with new trends', icon: '📈', color: 'gray' },
      ],
      cta: {
        title: 'Let’s Build the Future Together',
        description: 'Ready to transform your business with data, AI, and next-gen web solutions?',
      },
      heroBackground: '/Homebg.png',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          details > summary {
            cursor: pointer;
          }
          details[open] > summary {
            background-color: #fef3c7;
          }
        `}
      </style>

      {/* Hero Section */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutData.company.heroBackground})` }}
      >
        <div className="w-[80%] mx-auto px-4 sm:px-6 text-center bg-black/50 py-12 sm:py-16 rounded-xl">
          <motion.h1
            {...fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            About House of Freelancers
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-white mb-6 italic"
          >
            &quot;{aboutData.company.slogan}&quot;
          </motion.p>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            {aboutData.company.intro}
          </motion.p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-[80%] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-yellow-100 inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-yellow-800 mb-4">
                Founder
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {aboutData.founder.name}
              </h2>
              <blockquote className="text-lg sm:text-xl text-yellow-600 italic border-l-4 border-yellow-500 pl-4 mb-6">
                &quot;{aboutData.founder.slogan}&quot;
              </blockquote>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                {aboutData.founder.intro}
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  &quot;{aboutData.founder.vision}&quot;
                </p>
              </div>
              <a
                href={aboutData.founder.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-4"
                aria-label={`Visit ${aboutData.founder.name}'s Upwork profile`}
              >
                View Upwork Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src={aboutData.founder.image}
                  alt="House of Freelancers team meeting"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="w-[80%] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center lg:order-1 order-2"
            >
              <div className="w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src={aboutData.ceo.image}
                  alt="House of Freelancers team meeting"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:order-2 order-1"
            >
              <div className="bg-gray-100 inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-gray-800 mb-4">
                Chief Executive Officer
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {aboutData.ceo.name}
              </h2>
              <blockquote className="text-lg sm:text-xl text-gray-600 italic border-l-4 border-gray-500 pl-4 mb-6">
                &quot;{aboutData.ceo.slogan}&quot;
              </blockquote>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                {aboutData.ceo.intro}
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  &quot;{aboutData.ceo.vision}&quot;
                </p>
              </div>
              <a
                href={aboutData.ceo.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-4"
                aria-label={`Visit ${aboutData.ceo.name}'s Upwork profile`}
              >
                View Upwork Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Details Tabs */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-[80%] mx-auto px-4 sm:px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Company Story
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Discover our journey, expertise, and the values that drive us forward.
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 no-scrollbar overflow-x-auto">
            {[
              { id: 'journey', label: 'Our Journey' },
              { id: 'expertise', label: 'Expertise' },
              { id: 'team', label: 'Our Team' },
              { id: 'mission', label: 'Mission & Vision' },
              { id: 'values', label: 'Our Values' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                className={`px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-gray-900 shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`View ${tab.label} section`}
                aria-selected={activeTab === tab.id}
                role="tab"
                tabIndex={0}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-xl p-6 sm:p-8"
            role="tabpanel"
          >
            {activeTab === 'journey' && (
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Journey Since 2019</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {aboutData.company.journey}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
                  {aboutData.company.achievements.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="text-lg sm:text-xl font-bold text-yellow-600 mb-1">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'expertise' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Core Expertise (Since 2019)</h3>
                  <div className="space-y-4">
                    {aboutData.company.coreExpertise.map((category, index) => (
                      <motion.details
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
                      >
                        <summary className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                          {category.category}
                        </summary>
                        <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </motion.details>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">New Expertise (2025 Onward)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {aboutData.company.newExpertise.map((expertise, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">{expertise.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{expertise.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {expertise.technologies.map((tech) => (
                            <span key={tech} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Leadership Team</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {aboutData.company.leadershipTeam.map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 text-center"
                      >
                        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                          <img
                            src={member.image}
                            alt="House of Freelancers team meeting"
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                          />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{member.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">{member.description}</p>
                        <a
                          href={member.upwork}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm font-medium"
                          aria-label={`Visit ${member.name}'s Upwork profile`}
                        >
                          Upwork Profile
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Junior Management Team</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {aboutData.company.juniorManagement.map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 text-center"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                          <img
                            src={member.image}
                            alt="House of Freelancers team meeting"
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">{member.name}</p>
                        <p className="text-xs text-gray-600 mb-2">{member.role}</p>
                        <a
                          href={member.upwork}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-xs font-medium"
                          aria-label={`Visit ${member.name}'s Upwork profile`}
                        >
                          Upwork
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    These dedicated professionals ensure smooth execution, accuracy, and client satisfaction across all departments.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Dedicated Staff</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                    {aboutData.company.staff.map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 text-center"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                          <img
                            src={member.image}
                            alt="House of Freelancers team meeting"
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="space-y-8">
                <motion.div
                  {...fadeInUp}
                  className="text-center"
                >
                  <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {aboutData.company.visionMissionIntro}
                  </p>
                </motion.div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">Our Vision</h3>
                  <blockquote className="text-base sm:text-lg md:text-xl italic">
                    &quot;{aboutData.company.vision}&quot;
                  </blockquote>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">Our Mission</h3>
                  <blockquote className="text-base sm:text-lg md:text-xl italic">
                    &quot;{aboutData.company.mission}&quot;
                  </blockquote>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {aboutData.company.values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-white p-6 rounded-lg shadow-sm border text-center ${
                        value.color === 'yellow' ? 'border-l-4 border-l-yellow-500' : 'border-l-4 border-l-gray-500'
                      }`}
                    >
                      <div className="text-3xl mb-3">{value.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="w-[80%] mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            {...fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            {aboutData.company.cta.title}
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-300 mb-8"
          >
            {aboutData.company.cta.description}
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/contact"
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Get started with House of Freelancers"
            >
              Get Started Today
            </a>
            <a
              href="/services"
              className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-yellow-400/10 transition-all duration-300"
              aria-label="View services offered by House of Freelancers"
            >
              View Our Services
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
