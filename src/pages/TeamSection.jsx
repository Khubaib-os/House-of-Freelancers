import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState({
    leadership: [],
    junior_management: [],
    staff: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members from Supabase
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching team members:', error);
          throw error;
        }

        console.log('Fetched team members:', data);

        // Group team members by category
        const groupedData = {
          leadership: data.filter(member => member.category === 'leadership'),
          junior_management: data.filter(member => member.category === 'junior_management'),
          staff: data.filter(member => member.category === 'staff')
        };

        setTeamMembers(groupedData);
      } catch (error) {
        console.error('Error in fetchTeamMembers:', error);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Team</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Leadership Team */}
      {teamMembers.leadership.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.leadership.map((member, index) => (
              <TeamMemberCard 
                key={member.id} 
                member={member} 
                index={index} 
                isCompact={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Junior Management Team */}
      {teamMembers.junior_management.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Junior Management Team</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {teamMembers.junior_management.map((member, index) => (
              <TeamMemberCard 
                key={member.id} 
                member={member} 
                index={index} 
                isCompact={true}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            These dedicated professionals ensure smooth execution, accuracy, and client satisfaction across all departments.
          </p>
        </div>
      )}

      {/* Staff Members */}
      {teamMembers.staff.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Dedicated Staff</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {teamMembers.staff.map((member, index) => (
              <StaffMemberCard 
                key={member.id} 
                member={member} 
                index={index} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {teamMembers.leadership.length === 0 && 
       teamMembers.junior_management.length === 0 && 
       teamMembers.staff.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Team Members Yet</h3>
            <p className="text-yellow-600">
              Team members will appear here once they are added through the admin panel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member, index, isCompact = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`bg-white rounded-lg shadow-sm border border-gray-200 text-center ${
      isCompact ? 'p-3 sm:p-4' : 'p-4 sm:p-6'
    }`}
  >
    <div className={`mx-auto bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full flex items-center justify-center mb-3 sm:mb-4 overflow-hidden ${
      isCompact ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-16 h-16 sm:w-24 sm:h-24'
    }`}>
      <img
        src={member.image_url || '/meeting.jpg'}
        alt={`${member.name} - ${member.role}`}
        className="w-full h-full object-cover rounded-full"
        loading="lazy"
        onError={(e) => {
          e.target.src = '/meeting.jpg';
        }}
      />
    </div>
    <p className={`font-semibold text-gray-900 mb-1 ${isCompact ? 'text-sm' : 'text-base sm:text-lg'}`}>
      {member.name}
    </p>
    <p className={`text-gray-600 mb-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
      {member.role}
    </p>
    {member.description && !isCompact && (
      <p className="text-xs sm:text-sm text-gray-600 mb-4">{member.description}</p>
    )}
    {member.upwork_profile && (
      <UpworkLink member={member} isCompact={isCompact} />
    )}
  </motion.div>
);

// Staff Member Card Component
const StaffMemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 text-center"
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full flex items-center justify-center mb-3 overflow-hidden">
      <img
        src={member.image_url || '/meeting.jpg'}
        alt={`${member.name} - ${member.role}`}
        className="w-full h-full object-cover rounded-full"
        loading="lazy"
        onError={(e) => {
          e.target.src = '/meeting.jpg';
        }}
      />
    </div>
    <p className="text-sm font-semibold text-gray-900 mb-1">{member.name}</p>
    <p className="text-xs text-gray-600">{member.role}</p>
  </motion.div>
);

// Upwork Link Component
const UpworkLink = ({ member, isCompact }) => (
  <a
    href={member.upwork_profile}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 font-medium ${
      isCompact ? 'text-xs' : 'text-xs sm:text-sm'
    }`}
    aria-label={`Visit ${member.name}'s Upwork profile`}
  >
    {isCompact ? 'Upwork' : 'View Upwork Profile'}
    <svg className={isCompact ? "w-3 h-3" : "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </a>
);

export default TeamSection;