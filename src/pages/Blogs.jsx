import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';

const BlogAndNewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postsPerPage = 6;

  const categories = [
    { id: 'all', label: 'All', count: 0 },
    { id: 'b2b', label: 'B2B', count: 0 },
    { id: 'tech', label: 'Tech', count: 0 },
    { id: 'market', label: 'Market', count: 0 },
  ];

  // Fetch posts from Supabase
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      setPosts(data || []);
      
      // Update category counts
      categories.forEach(cat => {
        if (cat.id === 'all') {
          cat.count = data?.length || 0;
        } else {
          cat.count = data?.filter(post => post.category === cat.id).length || 0;
        }
      });
      
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const searchSuggestions = [
    'B2B strategies',
    'Tech trends',
    'Market updates',
  ];

  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === 'all' || post.post_type === activeTab;
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
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

  // Check if string is a URL
  const isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  // Get display content for image
  const getImageDisplay = (image) => {
    if (!image) return '📝'; // Default emoji if no image
    
    if (isUrl(image)) {
      return (
        <img 
          src={image} 
          alt="Post" 
          className="w-full h-full object-cover rounded-lg"
        />
      );
    } else {
      // If it's an emoji or text
      return <span className="text-4xl">{image}</span>;
    }
  };

  // Get author image display
  const getAuthorImageDisplay = (image) => {
    if (!image) return '👤'; // Default emoji if no image
    
    if (isUrl(image)) {
      return (
        <img 
          src={image} 
          alt="Author" 
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
      );
    } else {
      return <span className="text-base sm:text-lg">{image}</span>;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTab, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchPosts}
            className="mt-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    const isArticle = selectedPost.post_type === 'article';
    const isDailyUpdate = selectedPost.post_type === 'daily-update';

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
            {isDailyUpdate && selectedPost.is_breaking && (
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center overflow-hidden">
                  {getAuthorImageDisplay(selectedPost.author_image)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{selectedPost.author_name}</p>
                  <p className="text-xs sm:text-sm">{selectedPost.author_role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span>{new Date(selectedPost.published_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
                {isDailyUpdate && selectedPost.time_ago && <span>• {selectedPost.time_ago}</span>}
                <span>•</span>
                <span>{selectedPost.read_time}</span>
              </div>
            </div>
            
            {/* Post Image - FIXED */}
            <div className="w-full h-40 sm:h-48 md:h-64 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
              {getImageDisplay(selectedPost.post_image)}
            </div>
            
            {isArticle ? (
              <>
                <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 mb-6">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </div>
                {selectedPost.tags && selectedPost.tags.length > 0 && (
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
                )}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">About the Author</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{selectedPost.author_bio || 'No bio available'}</p>
                </div>
              </>
            ) : (
              <>
                <div className="prose prose-sm max-w-none text-gray-700 mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </div>
                {selectedPost.tags && selectedPost.tags.length > 0 && (
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
                )}
                <div className="mt-4 text-xs text-gray-500">
                  <p>Updated {selectedPost.time_ago || 'recently'} | Source: {selectedPost.author_role}</p>
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
              {/* Post Image - FIXED */}
              <div className="relative h-32 sm:h-40 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                {getImageDisplay(post.post_image)}
                {post.is_breaking && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Breaking
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {categories.find(cat => cat.id === post.category)?.label}
                </span>
                {post.post_type === 'daily-update' && (
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
                <span>{new Date(post.published_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
                {post.post_type === 'daily-update' && post.time_ago && <span>{post.time_ago}</span>}
                <span>{post.read_time}</span>
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