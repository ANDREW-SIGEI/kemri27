'use client';

import React, { useState } from 'react';
import { Bell, Search, User, MessageSquare, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Toggle mobile-open class on body for sidebar visibility
    document.body.classList.toggle('mobile-open');
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header 
      className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-3 sm:px-6 z-10 shadow-md transition-all duration-300 ease-in-out"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'translateZ(5px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      {/* Mobile menu toggle */}
      <div className="flex items-center">
        <button 
          className="lg:hidden p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-110 mr-2"
          onClick={toggleMobileMenu}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(8px)',
          }}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Search icon for XS screens */}
        <button 
          className="xs:hidden p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-110"
          onClick={toggleSearch}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(8px)',
          }}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Search input - hidden on XS screens unless activated */}
        <div 
          className={`relative transform transition-all duration-300 hover:scale-105 hidden xs:flex ${searchVisible ? 'flex' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg xs:w-40 sm:w-48 md:w-56 lg:w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm"
            style={{ transform: 'translateZ(5px)' }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 h-4 w-4" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
          className="relative p-1 sm:p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-110 hidden md:flex"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(5px)',
          }}
        >
          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </button>
        
        <button 
          className="relative p-1 sm:p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-110"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(5px)',
          }}
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        <div 
          className="flex items-center space-x-2 transform transition-all duration-300 hover:scale-105"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-7 w-7 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ transform: 'translateZ(5px)' }}
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-xs sm:text-sm font-medium gradient-text hidden sm:block">Admin</span>
        </div>
      </div>
    </header>
  );
} 