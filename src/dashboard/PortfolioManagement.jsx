import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    category: '',
    technologies: [], 
    results: '',
    image: null 
  });
  const [newTech, setNewTech] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Categories list
  const categories = [
    'Lead Generation',
    'Data Migration',
    'Research & Analysis',
    'CRM Management',
    'Market Research',
    'Data Processing',
    'Business Automation',
    'Virtual Assistance',
    'E-commerce Support',
    'AI Solutions',
    'Web Development'
  ];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        setError('Failed to fetch portfolio projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Upload image
  const uploadImage = async (file) => {
    if (!file) return null;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PNG, JPG, and WebP images are allowed');
    }
    if (file.size > maxSize) {
      throw new Error('Image size must be less than 5MB');
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Handle image upload with preview
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const imageUrl = await uploadImage(file);
      
      if (editMode) {
        setEditingProject(prev => ({ ...prev, image_url: imageUrl }));
      } else {
        setNewProject(prev => ({ ...prev, image: file, image_url: imageUrl }));
      }

      showMessage('Image uploaded successfully');
    } catch (error) {
      setError(error.message);
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

  // Add technology
  const addTechnology = () => {
    if (newTech.trim() === '') return;

    if (editMode) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, newTech.trim()]
      });
    } else {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTech.trim()]
      });
    }
    setNewTech('');
  };

  // Remove technology
  const removeTechnology = (index) => {
    if (editMode) {
      const updatedTech = editingProject.technologies.filter((_, i) => i !== index);
      setEditingProject({ ...editingProject, technologies: updatedTech });
    } else {
      const updatedTech = newProject.technologies.filter((_, i) => i !== index);
      setNewProject({ ...newProject, technologies: updatedTech });
    }
  };

  // Safe value getter
  const getValue = (obj, key, defaultValue = '') => {
    return obj?.[key] || defaultValue;
  };

  // Add project
  const handleAddProject = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = null;
      if (newProject.image) {
        imageUrl = await uploadImage(newProject.image);
      }

      const projectData = { 
        title: newProject.title, 
        description: newProject.description,
        category: newProject.category,
        technologies: newProject.technologies,
        results: newProject.results,
        image_url: imageUrl 
      };

      const { data, error } = await supabase
        .from('portfolio')
        .insert([projectData])
        .select();

      if (error) throw error;

      setProjects([data[0], ...projects]);
      setNewProject({ 
        title: '', 
        description: '', 
        category: '',
        technologies: [], 
        results: '',
        image: null 
      });
      setNewTech('');
      setImagePreview(null);
      document.getElementById('new-portfolio-image').value = '';
      showMessage('Portfolio project added successfully');
    } catch (error) {
      setError(error.message || 'Failed to add portfolio project');
    }
  };

  // Edit project
  const handleEditProject = (project) => {
    setEditingProject({ 
      ...project, 
      image: null,
      technologies: project.technologies || []
    });
    setEditMode(true);
    setNewTech('');
    setImagePreview(project.image_url || null);
  };

  // Update project
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = editingProject.image_url;
      if (editingProject.image) {
        imageUrl = await uploadImage(editingProject.image);
      }

      const projectData = { 
        title: editingProject.title, 
        description: editingProject.description,
        category: editingProject.category,
        technologies: editingProject.technologies,
        results: editingProject.results,
        image_url: imageUrl 
      };

      const { data, error } = await supabase
        .from('portfolio')
        .update(projectData)
        .eq('id', editingProject.id)
        .select();

      if (error) throw error;

      setProjects(projects.map(p => p.id === editingProject.id ? data[0] : p));
      setEditMode(false);
      setEditingProject(null);
      setNewTech('');
      setImagePreview(null);
      document.getElementById('edit-portfolio-image').value = '';
      showMessage('Portfolio project updated successfully');
    } catch (error) {
      setError(error.message || 'Failed to update portfolio project');
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio project?')) return;

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));
      showMessage('Portfolio project deleted successfully');
    } catch (error) {
      setError('Failed to delete portfolio project');
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditMode(false);
    setEditingProject(null);
    setNewTech('');
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Loading portfolio projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Portfolio Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Showcase your exceptional work and successful projects
          </p>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm">!</span>
                </div>
                <p className="text-red-800 flex-1">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-green-800 flex-1">{success}</p>
                <button
                  onClick={() => setSuccess(null)}
                  className="text-green-600 hover:text-green-800"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editMode ? '✏️ Edit Project' : '➕ Add New Project'}
              </h2>

              <form onSubmit={editMode ? handleUpdateProject : handleAddProject} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    placeholder="Project title"
                    value={getValue(editMode ? editingProject : newProject, 'title')}
                    onChange={(e) => editMode 
                      ? setEditingProject(prev => ({ ...prev, title: e.target.value }))
                      : setNewProject(prev => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={getValue(editMode ? editingProject : newProject, 'category')}
                    onChange={(e) => editMode 
                      ? setEditingProject(prev => ({ ...prev, category: e.target.value }))
                      : setNewProject(prev => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    placeholder="Project description and details"
                    value={getValue(editMode ? editingProject : newProject, 'description')}
                    onChange={(e) => editMode 
                      ? setEditingProject(prev => ({ ...prev, description: e.target.value }))
                      : setNewProject(prev => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows="4"
                    required
                  />
                </div>

                {/* Key Results */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Key Results</label>
                  <input
                    type="text"
                    placeholder="e.g., Increased conversion by 35% and reduced time by 60%"
                    value={getValue(editMode ? editingProject : newProject, 'results')}
                    onChange={(e) => editMode 
                      ? setEditingProject(prev => ({ ...prev, results: e.target.value }))
                      : setNewProject(prev => ({ ...prev, results: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Technologies Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technologies & Tools
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a technology/tool"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTechnology();
                          }
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={addTechnology}
                        className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors duration-200 font-semibold"
                      >
                        Add
                      </button>
                    </div>
                    
                    {/* Technologies List */}
                    <div className="flex flex-wrap gap-2">
                      {(editMode ? (editingProject?.technologies || []) : newProject.technologies).map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                          <span className="text-sm font-medium">⚡ {tech}</span>
                          <button
                            type="button"
                            onClick={() => removeTechnology(index)}
                            className="text-blue-600 hover:text-blue-800 transition-colors text-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Image {uploading && '(Uploading...)'}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      id={editMode ? 'edit-portfolio-image' : 'new-portfolio-image'}
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      disabled={uploading}
                    />
                    {(imagePreview || getValue(editMode ? editingProject : newProject, 'image_url')) && (
                      <div className="flex items-center gap-4">
                        <img
                          src={imagePreview || getValue(editMode ? editingProject : newProject, 'image_url')}
                          alt="Project preview"
                          className="w-20 h-16 object-cover rounded-lg border-2 border-yellow-500"
                        />
                        <span className="text-sm text-gray-600">Image preview</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : editMode ? (
                      <>💾 Update Project</>
                    ) : (
                      <>🚀 Create Project</>
                    )}
                  </button>
                  
                  {editMode && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      ❌ Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">📁 Portfolio Projects</h2>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                    {projects.length} total
                  </span>
                </div>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No portfolio projects yet</h3>
                  <p className="text-sm text-gray-500">Create your first project to showcase your work!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                              {project.category}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-gray-900 mb-1 text-lg">{project.title}</h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                          
                          {project.results && (
                            <p className="text-xs text-green-600 font-medium mb-2">🎯 {project.results}</p>
                          )}

                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.technologies.slice(0, 3).map((tech, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                  ⚡ {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 flex-shrink-0 ml-4">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition-colors flex items-center justify-center"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="w-10 h-10 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition-colors flex items-center justify-center"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      
                      {project.image_url && (
                        <div className="mt-3">
                          <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;