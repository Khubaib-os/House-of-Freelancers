// components/CustomLink.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomLink = ({ to, children, className, onClick, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // If Ctrl key or middle mouse button, let browser handle new tab
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      // Let browser handle naturally for new tab
      e.preventDefault();
      // Force new tab with full URL
      const fullUrl = window.location.origin + to;
      window.open(fullUrl, '_blank');
      return;
    }
    
    // Prevent default anchor behavior
    e.preventDefault();
    
    // Call additional onClick handler if provided
    if (onClick) {
      onClick(e);
    }
    
    // Navigate using React Router
    navigate(to);
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default CustomLink;