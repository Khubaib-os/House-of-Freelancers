import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { motion, AnimatePresence } from 'framer-motion';

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'b2b',
    read_time: '5 min read',
    author_name: '',
    author_role: '',
    author_bio: '',
    author_image: '',
    post_image: '',
    tags: [],
    post_type: 'article',
    is_breaking: false,
    time_ago: '',
    status: 'draft'
  });
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState({ author: null, post: null });

  // Categories list
  const categories = [
    { value: 'b2b', label: 'B2B & Marketing' },
    { value: 'tech', label: 'Technology' },
    { value: 'market', label: 'Market Research' },
    { value: 'business', label: 'Business Strategy' },
    { value: 'ai', label: 'AI & Automation' },
    { value: 'development', label: 'Web Development' }
  ];

  // Post types
  const postTypes = [
    { value: 'article', label: 'Article' },
    { value: 'daily-update', label: 'Daily Update' }
  ];

  // Status options
  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' }
  ];

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Image upload
  const uploadImage = async (file) => {
    if (!file) return null;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(prev => ({ ...prev, [type]: previewUrl }));

      const imageUrl = await uploadImage(file);
      
      if (type === 'author') {
        if (editMode) {
          setEditingPost(prev => ({ ...prev, author_image: imageUrl }));
        } else {
          setNewPost(prev => ({ ...prev, author_image: imageUrl }));
        }
      } else {
        if (editMode) {
          setEditingPost(prev => ({ ...prev, post_image: imageUrl }));
        } else {
          setNewPost(prev => ({ ...prev, post_image: imageUrl }));
        }
      }

      showMessage('Image uploaded successfully');
    } catch (error) {
      setError('Failed to upload image');
    }
  };

  // Show message
  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
    } else {
      setError(message);
    }
    setTimeout(() => {
      if (type === 'success') setSuccess(null);
      else setError(null);
    }, 3000);
  };

  // Add tag
  const addTag = () => {
    if (newTag.trim() && !newPost.tags.includes(newTag.trim())) {
      const updatedTags = [...newPost.tags, newTag.trim()];
      setNewPost(prev => ({ ...prev, tags: updatedTags }));
      setNewTag('');
    }
  };

  // Remove tag
  const removeTag = (index) => {
    const updatedTags = newPost.tags.filter((_, i) => i !== index);
    setNewPost(prev => ({ ...prev, tags: updatedTags }));
  };

  // Add tag in edit mode
  const addTagEdit = () => {
    if (newTag.trim() && !editingPost.tags.includes(newTag.trim())) {
      const updatedTags = [...editingPost.tags, newTag.trim()];
      setEditingPost(prev => ({ ...prev, tags: updatedTags }));
      setNewTag('');
    }
  };

  // Remove tag in edit mode
  const removeTagEdit = (index) => {
    const updatedTags = editingPost.tags.filter((_, i) => i !== index);
    setEditingPost(prev => ({ ...prev, tags: updatedTags }));
  };

  // Add post
  const handleAddPost = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const postData = {
        ...newPost,
        published_at: newPost.status === 'published' ? new Date().toISOString() : null
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => [data, ...prev]);
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        category: 'b2b',
        read_time: '5 min read',
        author_name: '',
        author_role: '',
        author_bio: '',
        author_image: '',
        post_image: '',
        tags: [],
        post_type: 'article',
        is_breaking: false,
        time_ago: '',
        status: 'draft'
      });
      setImagePreview({ author: null, post: null });
      setNewTag('');

      showMessage('Blog post created successfully');
    } catch (error) {
      setError('Failed to create post');
    }
  };

  // Edit post
  const handleEditPost = (post) => {
    setEditingPost({
      ...post,
      tags: post.tags || []
    });
    setEditMode(true);
    setNewTag('');
    
    setImagePreview({
      author: post.author_image || null,
      post: post.post_image || null
    });
  };

  // Update post
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updateData = {
        ...editingPost,
        published_at: editingPost.status === 'published' && !editingPost.published_at 
          ? new Date().toISOString() 
          : editingPost.published_at,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', editingPost.id)
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => prev.map(p => p.id === editingPost.id ? data : p));
      setEditMode(false);
      setEditingPost(null);
      setImagePreview({ author: null, post: null });
      setNewTag('');

      showMessage('Blog post updated successfully');
    } catch (error) {
      setError('Failed to update post');
    }
  };

  // Delete post
  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(prev => prev.filter(p => p.id !== id));
      showMessage('Blog post deleted successfully');
    } catch (error) {
      setError('Failed to delete post');
    }
  };

  // Toggle post status
  const togglePostStatus = async (post) => {
    try {
      const newStatus = post.status === 'published' ? 'draft' : 'published';
      const updateData = {
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : post.published_at
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', post.id)
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => prev.map(p => p.id === post.id ? data : p));
      showMessage(`Post ${newStatus === 'published' ? 'published' : 'moved to draft'}`);
    } catch (error) {
      setError('Failed to update status');
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditMode(false);
    setEditingPost(null);
    setImagePreview({ author: null, post: null });
    setNewTag('');
  };

  // Safe value getter
  const getValue = (obj, key, defaultValue = '') => {
    return obj?.[key] || defaultValue;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts and articles</p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editMode ? 'Edit Post' : 'Add New Post'}
              </h2>

              <form onSubmit={editMode ? handleUpdatePost : handleAddPost} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={getValue(editMode ? editingPost : newPost, 'title')}
                    onChange={(e) => editMode 
                      ? setEditingPost(prev => ({ ...prev, title: e.target.value }))
                      : setNewPost(prev => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Category and Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={getValue(editMode ? editingPost : newPost, 'category', 'b2b')}
                      onChange={(e) => editMode 
                        ? setEditingPost(prev => ({ ...prev, category: e.target.value }))
                        : setNewPost(prev => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                    <select
                      value={getValue(editMode ? editingPost : newPost, 'post_type', 'article')}
                      onChange={(e) => editMode 
                        ? setEditingPost(prev => ({ ...prev, post_type: e.target.value }))
                        : setNewPost(prev => ({ ...prev, post_type: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                      required
                    >
                      {postTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Name *</label>
                    <input
                      type="text"
                      value={getValue(editMode ? editingPost : newPost, 'author_name')}
                      onChange={(e) => editMode 
                        ? setEditingPost(prev => ({ ...prev, author_name: e.target.value }))
                        : setNewPost(prev => ({ ...prev, author_name: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Role *</label>
                    <input
                      type="text"
                      value={getValue(editMode ? editingPost : newPost, 'author_role')}
                      onChange={(e) => editMode 
                        ? setEditingPost(prev => ({ ...prev, author_role: e.target.value }))
                        : setNewPost(prev => ({ ...prev, author_role: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>

                {/* Author Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author Bio</label>
                  <textarea
                    value={getValue(editMode ? editingPost : newPost, 'author_bio')}
                    onChange={(e) => editMode 
                      ? setEditingPost(prev => ({ ...prev, author_bio: e.target.value }))
                      : setNewPost(prev => ({ ...prev, author_bio: e.target.value }))
                    }
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Author Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'author')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    disabled={uploading}
                  />
                  {imagePreview.author && (
                    <img src={imagePreview.author} alt="Preview" className="w-16 h-16 rounded-full mt-2" />
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                  <textarea
                    value={getValue(editMode ? editingPost : newPost, 'excerpt')}
                    onChange={(e) => editMode 
                      ? setEditingPost(prev => ({ ...prev, excerpt: e.target.value }))
                      : setNewPost(prev => ({ ...prev, excerpt: e.target.value }))
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                  <textarea
                    value={getValue(editMode ? editingPost : newPost, 'content')}
                    onChange={(e) => editMode 
                      ? setEditingPost(prev => ({ ...prev, content: e.target.value }))
                      : setNewPost(prev => ({ ...prev, content: e.target.value }))
                    }
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                {/* Post Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'post')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    disabled={uploading}
                  />
                  {imagePreview.post && (
                    <img src={imagePreview.post} alt="Preview" className="w-20 h-16 rounded-lg mt-2" />
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Add tag"
                    />
                    <button
                      type="button"
                      onClick={editMode ? addTagEdit : addTag}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(editMode ? (editingPost?.tags || []) : newPost.tags).map((tag, index) => (
                      <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        <span className="text-sm">#{tag}</span>
                        <button
                          type="button"
                          onClick={() => editMode ? removeTagEdit(index) : removeTag(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status and Breaking */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={getValue(editMode ? editingPost : newPost, 'status', 'draft')}
                      onChange={(e) => editMode 
                        ? setEditingPost(prev => ({ ...prev, status: e.target.value }))
                        : setNewPost(prev => ({ ...prev, status: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={getValue(editMode ? editingPost : newPost, 'is_breaking', false)}
                      onChange={(e) => editMode 
                        ? setEditingPost(prev => ({ ...prev, is_breaking: e.target.checked }))
                        : setNewPost(prev => ({ ...prev, is_breaking: e.target.checked }))
                      }
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Breaking News</label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                  >
                    {editMode ? 'Update Post' : 'Create Post'}
                  </button>
                  {editMode && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Posts List */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {posts.length} total
                </span>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No posts found</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.status}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">{post.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                          <div className="text-xs text-gray-500">
                            By {post.author_name} • {post.read_time}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-4">
                          <button
                            onClick={() => togglePostStatus(post)}
                            className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                            title={post.status === 'published' ? 'Draft' : 'Publish'}
                          >
                            {post.status === 'published' ? '📁' : '📤'}
                          </button>
                          <button
                            onClick={() => handleEditPost(post)}
                            className="w-8 h-8 bg-blue-100 rounded hover:bg-blue-200 flex items-center justify-center"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="w-8 h-8 bg-red-100 rounded hover:bg-red-200 flex items-center justify-center"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;