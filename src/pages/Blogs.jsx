import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogAndNewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const postsPerPage = 6;

  const categories = [
    { id: 'all', label: 'All', count: 3 },
    { id: 'b2b', label: 'B2B', count: 1 },
    { id: 'tech', label: 'Tech', count: 1 },
    { id: 'market', label: 'Market', count: 1 },
  ];

  const searchSuggestions = [
    'B2B strategies',
    'Tech trends',
    'Market updates',
  ];

  const articles = [
    {
      id: 1,
      title: "Effective B2B Marketing Strategies for 2025",
      excerpt: "Explore top strategies to boost B2B marketing success.",
      category: 'b2b',
      readTime: '6 min read',
      date: 'Jan 10, 2025',
      author: {
        name: 'Jane Doe',
        role: 'Marketing Expert',
        bio: 'Jane is a seasoned marketing professional with over 10 years of experience.',
        image: '👩‍💼'
      },
      image: '📈',
      tags: ['B2B', 'Marketing'],
      content: `
        <p>B2B marketing in 2025 requires innovative approaches to stay competitive.</p>
        <h2>Key Strategies</h2>
        <ul>
          <li>Personalized content marketing</li>
          <li>AI-driven lead generation</li>
        </ul>
      `,
      type: 'article'
    },
  ];

  const dailyUpdates = [
    {
      id: 101,
      title: "AI Regulations Update: EU Approves New Framework",
      excerpt: "The European Union has approved comprehensive AI regulations effective from March 2025.",
      category: 'tech',
      readTime: '2 min read',
      date: 'Jan 15, 2025',
      timeAgo: '2 hours ago',
      author: {
        name: 'Tech News Desk',
        role: 'Editorial Team',
        bio: 'Our team provides real-time updates on technology developments.',
        image: '📰'
      },
      image: '⚡',
      tags: ['AI', 'Regulations'],
      content: `
        <p>The new EU AI Act classifies AI systems based on risk levels and mandates compliance for high-risk applications.</p>
        <ul>
          <li>Transparency requirements for AI decisions</li>
          <li>Penalties up to €35 million for non-compliance</li>
        </ul>
        <p>Businesses are advised to audit their AI systems immediately.</p>
      `,
      type: 'daily-update',
      breaking: true
    },
    {
      id: 102,
      title: "Market Surge: Tech Stocks Rise 5% Amid Earnings Season",
      excerpt: "Major tech companies report strong Q4 earnings, driving market optimism.",
      category: 'market',
      readTime: '1 min read',
      date: 'Jan 14, 2025',
      timeAgo: '1 day ago',
      author: {
        name: 'Market Watch',
        role: 'Financial Reporter',
        bio: 'Daily market insights and analysis.',
        image: '📊'
      },
      image: '📈',
      tags: ['Stocks', 'Earnings'],
      content: `
        <p>Tech giants like Apple and Microsoft exceeded earnings expectations, leading to a 5% sector rally.</p>
        <ul>
          <li>Apple: +7% after iPhone sales beat estimates</li>
          <li>Microsoft: Cloud revenue up 25%</li>
        </ul>
        <p>Analysts predict continued growth in Q1 2025.</p>
      `,
      type: 'daily-update'
    },
  ];

  const allContent = [...articles, ...dailyUpdates];

  const filteredPosts = allContent.filter(post => {
    const matchesTab = activeTab === 'all' || post.type === activeTab;
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesCategory && matchesSearch;
  });

  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToListing = () => {
    setSelectedPost(null);
  };

  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTab, searchQuery]);

  if (selectedPost) {
    const isArticle = selectedPost.type === 'article';
    const isDailyUpdate = selectedPost.type === 'daily-update';

    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="w-[80%] max-w-5xl mx-auto px-4">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm text-gray-600"
          >
            <button
              onClick={handleBackToListing}
              className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {isArticle ? 'Articles' : 'Daily Updates'}
            </button>
          </motion.nav>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {isDailyUpdate && selectedPost.breaking && (
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Breaking Update
              </div>
            )}
            <div className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {selectedPost.category.toUpperCase()}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {selectedPost.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center text-base sm:text-lg">
                  {selectedPost.author.image}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{selectedPost.author.name}</p>
                  <p className="text-xs sm:text-sm">{selectedPost.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span>{selectedPost.date}</span>
                {isDailyUpdate && <span>• {selectedPost.timeAgo}</span>}
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>
            <div className="w-full h-40 sm:h-48 md:h-64 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-4xl sm:text-5xl">{selectedPost.image}</span>
            </div>
            {isArticle ? (
              <>
                <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 mb-6">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">About the Author</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{selectedPost.author.bio}</p>
                </div>
              </>
            ) : (
              <>
                <div className="prose prose-sm max-w-none text-gray-700 mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Updated {selectedPost.timeAgo} | Source: {selectedPost.author.role}</p>
                </div>
              </>
            )}
          </motion.article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <div className="w-[80%] max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Insights & Daily Updates
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
            Expert articles and real-time daily updates on business and technology.
          </p>
          <div className="relative max-w-md mx-auto mt-4">
            <input
              type="text"
              placeholder="Search articles and updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 text-sm"
            />
            <svg className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <AnimatePresence>
              {showSearchSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 mb-3"
        >
          {[
            { key: 'all', label: 'All' },
            { key: 'article', label: 'Articles' },
            { key: 'daily-update', label: 'Daily Updates' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`min-w-[80px] px-2 py-1 text-xs sm:text-sm font-medium rounded-lg transition-colors snap-center ${
                activeTab === tab.key
                  ? 'bg-yellow-500 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`min-w-[80px] px-2 py-1 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-yellow-500 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-gray-600 mb-4"
        >
          Showing {currentPosts.length} of {filteredPosts.length} items
          {searchQuery && ` for "${searchQuery}"`}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <div className="relative h-32 sm:h-40 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl sm:text-4xl">{post.image}</span>
                {post.breaking && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Breaking
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {categories.find(cat => cat.id === post.category)?.label}
                </span>
                {post.type === 'daily-update' && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    Update
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>{post.date}</span>
                {post.type === 'daily-update' && <span>{post.timeAgo}</span>}
                <span>{post.readTime}</span>
              </div>
              <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center gap-1">
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </motion.article>
          ))}
          {currentPosts.length === 0 && (
            <div className="col-span-full text-center py-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-600">No Results Found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or category.</p>
            </div>
          )}
        </motion.div>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 text-sm rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-yellow-500 text-gray-900'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogAndNewsPage;