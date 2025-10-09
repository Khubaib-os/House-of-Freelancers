import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({ 
    name: '', 
    role: '', 
    description: '',
    category: 'leadership',
    upwork_profile: '',
    image: null,
    display_order: 0
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Categories
  const categories = [
    { value: 'leadership', label: 'Leadership Team' },
    { value: 'junior_management', label: 'Junior Management' },
    { value: 'staff', label: 'Staff' }
  ];

  // Check authentication
  useEffect(() => {
    checkAuth();
    fetchTeamMembers();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        navigate('/admin/login');
        return;
      }
      setUser(session.user);
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin/login');
    }
  };

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('category', { ascending: true })
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      setError('Failed to fetch team members');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Secure image upload
  const uploadImage = async (file) => {
    if (!file) return null;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PNG, JPG, and WebP images are allowed');
    }
    if (file.size > maxSize) {
      throw new Error('Image size must be less than 5MB');
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('team-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('team-images')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  // Reset form
  const resetForm = () => {
    setNewMember({ 
      name: '', 
      role: '', 
      description: '',
      category: 'leadership',
      upwork_profile: '',
      image: null,
      display_order: 0
    });
  };

  // Add team member
  const handleAddMember = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = null;
      if (newMember.image) {
        imageUrl = await uploadImage(newMember.image);
      }

      const memberData = { 
        name: newMember.name,
        role: newMember.role,
        description: newMember.description,
        category: newMember.category,
        upwork_profile: newMember.upwork_profile,
        image_url: imageUrl,
        display_order: newMember.display_order || 0,
        is_active: true
      };

      const { data, error } = await supabase
        .from('team_members')
        .insert([memberData])
        .select();

      if (error) throw error;

      setTeamMembers([data[0], ...teamMembers]);
      resetForm();
      setSuccess('Team member added successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Add error:', error);
      setError(error.message || 'Failed to add team member');
    }
  };

  // Edit team member
  const handleEditMember = (member) => {
    setEditingMember({ ...member, image: null });
    setEditMode(true);
  };

  // Update team member
  const handleUpdateMember = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = editingMember.image_url;
      if (editingMember.image) {
        imageUrl = await uploadImage(editingMember.image);
      }

      const memberData = { 
        name: editingMember.name,
        role: editingMember.role,
        description: editingMember.description,
        category: editingMember.category,
        upwork_profile: editingMember.upwork_profile,
        image_url: imageUrl,
        display_order: editingMember.display_order || 0,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('team_members')
        .update(memberData)
        .eq('id', editingMember.id)
        .select();

      if (error) throw error;

      setTeamMembers(teamMembers.map(m => m.id === editingMember.id ? data[0] : m));
      setEditMode(false);
      setEditingMember(null);
      setSuccess('Team member updated successfully');
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update team member');
    }
  };

  // Delete team member
  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTeamMembers(teamMembers.filter(m => m.id !== id));
      setSuccess('Team member deleted successfully');
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('Failed to delete team member');
    }
  };

  // Toggle active status
  const handleToggleActive = async (member) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update({ 
          is_active: !member.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', member.id);

      if (error) throw error;

      setTeamMembers(teamMembers.map(m => 
        m.id === member.id ? { ...m, is_active: !m.is_active } : m
      ));
      setSuccess(`Team member ${!member.is_active ? 'activated' : 'deactivated'} successfully`);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('Failed to update team member status');
    }
  };

  // Handle file change
  const handleFileChange = (e, isEditMode = false) => {
    const file = e.target.files[0];
    if (isEditMode) {
      setEditingMember({ ...editingMember, image: file });
    } else {
      setNewMember({ ...newMember, image: file });
    }
  };

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600">Manage your team members securely</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.email || 'Admin'}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800">{success}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">
                {editMode ? 'Edit Team Member' : 'Add Team Member'}
              </h2>

              <form onSubmit={editMode ? handleUpdateMember : handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={editMode ? editingMember.name : newMember.name}
                    onChange={(e) => editMode 
                      ? setEditingMember({ ...editingMember, name: e.target.value }) 
                      : setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    placeholder="e.g., Chief Operating Officer"
                    value={editMode ? editingMember.role : newMember.role}
                    onChange={(e) => editMode 
                      ? setEditingMember({ ...editingMember, role: e.target.value }) 
                      : setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={editMode ? editingMember.category : newMember.category}
                    onChange={(e) => editMode 
                      ? setEditingMember({ ...editingMember, category: e.target.value }) 
                      : setNewMember({ ...newMember, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Brief description of responsibilities"
                    value={editMode ? editingMember.description : newMember.description}
                    onChange={(e) => editMode 
                      ? setEditingMember({ ...editingMember, description: e.target.value }) 
                      : setNewMember({ ...newMember, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upwork Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://www.upwork.com/freelancers/..."
                    value={editMode ? editingMember.upwork_profile : newMember.upwork_profile}
                    onChange={(e) => editMode 
                      ? setEditingMember({ ...editingMember, upwork_profile: e.target.value }) 
                      : setNewMember({ ...newMember, upwork_profile: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={editMode ? editingMember.display_order : newMember.display_order}
                    onChange={(e) => editMode 
                      ? setEditingMember({ ...editingMember, display_order: parseInt(e.target.value) || 0 }) 
                      : setNewMember({ ...newMember, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image <span className="text-gray-500">(PNG, JPG, WebP - max 5MB)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(e) => handleFileChange(e, editMode)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    {editMode ? 'Update Team Member' : 'Add Team Member'}
                  </button>
                  
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setEditingMember(null);
                      }}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Team List */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Team Members</h2>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {teamMembers.length} members
                </span>
              </div>
              
              {teamMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-lg">No team members found</p>
                  <p className="text-sm mt-1">Add your first team member to get started</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {teamMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className={`border rounded-lg p-4 transition-all duration-200 ${
                        !member.is_active ? 'opacity-50 bg-gray-50' : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            {member.image_url && (
                              <img 
                                src={member.image_url} 
                                alt={member.name}
                                className="w-12 h-12 object-cover rounded-full flex-shrink-0"
                              />
                            )}
                            <div>
                              <h3 className="font-bold text-gray-900">{member.name}</h3>
                              <p className="text-sm text-gray-600">{member.role}</p>
                              {member.description && (
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{member.description}</p>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  member.category === 'leadership' ? 'bg-purple-100 text-purple-800' :
                                  member.category === 'junior_management' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {categories.find(c => c.value === member.category)?.label}
                                </span>
                                {member.upwork_profile && (
                                  <a 
                                    href={member.upwork_profile} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-yellow-600 hover:text-yellow-700"
                                  >
                                    Upwork
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0 ml-2">
                          <button
                            onClick={() => handleToggleActive(member)}
                            className={`w-8 h-8 rounded text-sm transition-colors flex items-center justify-center ${
                              member.is_active 
                                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={member.is_active ? 'Deactivate' : 'Activate'}
                          >
                            {member.is_active ? '✓' : '✗'}
                          </button>
                          <button
                            onClick={() => handleEditMember(member)}
                            className="w-8 h-8 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 transition-colors flex items-center justify-center"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="w-8 h-8 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors flex items-center justify-center"
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

export default TeamManagement;