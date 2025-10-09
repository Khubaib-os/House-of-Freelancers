// src/dashboard/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
      }

      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/HofLogin');
      
    } catch (error) {
      console.error('Unexpected logout error:', error);
      localStorage.clear();
      navigate('/HofLogin');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-lg sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        {/* Left Side - Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Center Text - Navbar Style Light */}
        <div className="flex-1 text-center md:text-left md:pl-4">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
            House of Freelancers <span className="text-yellow-600">Admin</span>
          </h1>
        </div>
        
        {/* Right Side - Logout Button Light Theme */}
        <div className="flex items-center">
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-md text-sm font-medium shadow-md hover:bg-red-700 transition-all duration-200 whitespace-nowrap flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;