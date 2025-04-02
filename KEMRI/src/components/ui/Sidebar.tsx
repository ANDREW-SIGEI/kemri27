'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, FileText, FileOutput, Home, Settings, Users, Plus, PenSquare } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Incoming', href: '/incoming', icon: FileText },
  { name: 'Outgoing', href: '/outgoing', icon: FileOutput },
  { name: 'Reports', href: '/reports', icon: BarChart2 },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    if (document.body.classList.contains('mobile-open')) {
      document.body.classList.remove('mobile-open');
    }
  };

  return (
    <aside 
      className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-primary-600 to-primary-800 flex flex-col z-30 shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 -translate-x-full" 
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="p-4 sm:p-6 border-b border-primary-700 bg-primary-700/50 backdrop-blur-sm flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">KEMRI DMS</h1>
      </div>
      
      {/* Compose Button - 3D Effect */}
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <Link
          href="/compose"
          onClick={closeMobileMenu}
          className="flex items-center justify-center w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white text-primary-600 font-medium hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(5px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <PenSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Compose New
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-3 sm:py-4">
        <ul className="space-y-1 px-2 sm:px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}
                  className="transform transition-transform duration-200 hover:scale-105"
                  style={{ transformStyle: 'preserve-3d' }}>
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-700 text-white shadow-md'
                      : 'text-primary-100 hover:bg-primary-700/50 hover:text-white'
                  }`}
                  style={{
                    transform: isActive ? 'translateZ(10px)' : 'translateZ(0)',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                  }}
                >
                  <item.icon className={`mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 ${isActive ? 'text-white' : 'text-primary-200'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-3 sm:p-4 border-t border-primary-700 bg-primary-800/50 backdrop-blur-sm">
        <div className="flex items-center transform transition-transform duration-200 hover:scale-105"
             style={{ transformStyle: 'preserve-3d', transform: 'translateZ(5px)' }}>
          <div className="flex-shrink-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white flex items-center justify-center text-primary-600 shadow-lg">
              <span className="text-xs sm:text-sm font-bold">KD</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-xs sm:text-sm font-medium text-white">KEMRI Admin</p>
            <p className="text-xs text-primary-200">admin@kemri.org</p>
          </div>
        </div>
      </div>
    </aside>
  );
} 