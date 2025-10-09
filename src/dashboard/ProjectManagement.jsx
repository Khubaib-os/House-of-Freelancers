import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    category: '', 
    results: ['', '', ''],
    image: null 
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        setError('Failed to fetch projects');
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      throw error;
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

  // Add project
  const handleAddProject = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!localStorage.getItem('adminToken')) {
        throw new Error('Please log in to add projects');
      }

      let imageUrl = null;
      if (newProject.image) {
        imageUrl = await uploadImage(newProject.image);
      }

      // Filter out empty results
      const filteredResults = newProject.results.filter(result => result.trim() !== '');

      const { data, error } = await supabase
        .from('projects')
        .insert([{ 
          title: newProject.title, 
          description: newProject.description, 
          category: newProject.category, 
          results: filteredResults,
          image_url: imageUrl 
        }])
        .select();

      if (error) throw error;

      setProjects([data[0], ...projects]);
      setNewProject({ 
        title: '', 
        description: '', 
        category: '', 
        results: ['', '', ''],
        image: null 
      });
      document.getElementById('new-project-image').value = '';
      showMessage('Project added successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit project
  const handleEditProject = (project) => {
    setEditingProject({ 
      ...project, 
      image: null,
      results: project.results || ['', '', '']
    });
    setEditMode(true);
  };

  // Update project
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!localStorage.getItem('adminToken')) {
        throw new Error('Please log in to update projects');
      }

      let imageUrl = editingProject.image_url;
      if (editingProject.image) {
        imageUrl = await uploadImage(editingProject.image);
      }

      // Filter out empty results
      const filteredResults = editingProject.results.filter(result => result.trim() !== '');

      const { data, error } = await supabase
        .from('projects')
        .update({ 
          title: editingProject.title, 
          description: editingProject.description, 
          category: editingProject.category, 
          results: filteredResults,
          image_url: imageUrl 
        })
        .eq('id', editingProject.id)
        .select();

      if (error) throw error;

      setProjects(projects.map(p => p.id === editingProject.id ? data[0] : p));
      setEditMode(false);
      setEditingProject(null);
      document.getElementById('edit-project-image').value = '';
      showMessage('Project updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      if (!localStorage.getItem('adminToken')) {
        throw new Error('Please log in to delete projects');
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));
      showMessage('Project deleted successfully');
    } catch (error) {
      setError('Failed to delete project');
    }
  };

  // Handle result change
  const handleResultChange = (index, value, isEdit = false) => {
    if (isEdit) {
      const updatedResults = [...editingProject.results];
      updatedResults[index] = value;
      setEditingProject({ ...editingProject, results: updatedResults });
    } else {
      const updatedResults = [...newProject.results];
      updatedResults[index] = value;
      setNewProject({ ...newProject, results: updatedResults });
    }
  };

  // Add more result field
  const addResultField = (isEdit = false) => {
    if (isEdit) {
      setEditingProject({ 
        ...editingProject, 
        results: [...editingProject.results, ''] 
      });
    } else {
      setNewProject({ 
        ...newProject, 
        results: [...newProject.results, ''] 
      });
    }
  };

  // Remove result field
  const removeResultField = (index, isEdit = false) => {
    if (isEdit) {
      const updatedResults = editingProject.results.filter((_, i) => i !== index);
      setEditingProject({ ...editingProject, results: updatedResults });
    } else {
      const updatedResults = newProject.results.filter((_, i) => i !== index);
      setNewProject({ ...newProject, results: updatedResults });
    }
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project <span className="text-yellow-600">Management</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your portfolio projects and showcase your exceptional work
          </p>
        </motion.div>

        {/* Messages */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2"
          >
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800">{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2"
          >
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800">{success}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Add/Edit Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editMode ? 'Edit Project' : 'Add New Project'}
              </h2>

              <form onSubmit={editMode ? handleUpdateProject : handleAddProject} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Project title"
                    value={editMode ? editingProject.title : newProject.title}
                    onChange={(e) => editMode 
                      ? setEditingProject({ ...editingProject, title: e.target.value }) 
                      : setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={editMode ? editingProject.category : newProject.category}
                    onChange={(e) => editMode 
                      ? setEditingProject({ ...editingProject, category: e.target.value }) 
                      : setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Data Management">Data Management</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Research & Analysis">Research & Analysis</option>
                    <option value="Business Automation">Business Automation</option>
                    <option value="Virtual Assistance">Virtual Assistance</option>
                    <option value="E-commerce Support">E-commerce Support</option>
                    <option value="AI Solutions">AI Solutions</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Project description"
                    value={editMode ? editingProject.description : newProject.description}
                    onChange={(e) => editMode 
                      ? setEditingProject({ ...editingProject, description: e.target.value }) 
                      : setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows="4"
                    required
                  />
                </div>

                {/* Results Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Key Achievements
                  </label>
                  <div className="space-y-3">
                    {(editMode ? editingProject.results : newProject.results).map((result, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Achievement ${index + 1}`}
                          value={result}
                          onChange={(e) => handleResultChange(index, e.target.value, editMode)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        />
                        {(editMode ? editingProject.results : newProject.results).length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResultField(index, editMode)}
                            className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-200"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addResultField(editMode)}
                      className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-yellow-500 hover:text-yellow-600 transition-all duration-200"
                    >
                      + Add Another Achievement
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image <span className="text-gray-500 font-normal">(PNG/JPG/WebP, max 5MB)</span>
                  </label>
                  <input
                    type="file"
                    id={editMode ? 'edit-project-image' : 'new-project-image'}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(e) => editMode 
                      ? setEditingProject({ ...editingProject, image: e.target.files[0] }) 
                      : setNewProject({ ...newProject, image: e.target.files[0] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                  
                  {editMode && editingProject.image_url && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Current image:</p>
                      <img src={editingProject.image_url} alt="Current" className="w-32 h-24 object-cover rounded-xl shadow-md" />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {editMode ? 'Update Project' : 'Add Project'}
                  </button>
                  
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setEditingProject(null);
                        document.getElementById('edit-project-image').value = '';
                      }}
                      className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

          {/* Projects List & Preview */}
          <div className="space-y-6">
            {/* Projects List */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                  {projects.length} total
                </span>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg">No projects found</p>
                  <p className="text-sm mt-1">Add your first project to get started</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {projects.map((project) => (
                    <motion.div 
                      key={project.id} 
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                      onClick={() => openProjectDetails(project)}
                    >
                      <div className="flex gap-4">
                        {project.image_url && (
                          <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0 shadow-md"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-gray-900 truncate">{project.title}</h3>
                            <div className="flex gap-1 flex-shrink-0 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditProject(project);
                                }}
                                className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition-colors flex items-center justify-center"
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProject(project.id);
                                }}
                                className="w-8 h-8 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition-colors flex items-center justify-center"
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full mt-1">
                            {project.category}
                          </span>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Preview Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">
                Project <span className="text-yellow-400">Preview</span>
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Your projects will appear in the Top Projects section with this beautiful design
              </p>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-yellow-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Responsive Design</span>
                </div>
                <div className="inline-flex items-center gap-2 text-yellow-400 ml-6">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Animated Interactions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative h-64">
                <img 
                  src={selectedProject.image_url || '/meeting.jpg'} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <button
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Results */}
                {selectedProject.results && selectedProject.results.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.results.map((result, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                          <span className="text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeProjectDetails}
                    className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
                  >
                    Start Similar Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManagement;