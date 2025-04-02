'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Mail,
  SendHorizontal,
  FileBarChart,
  PenTool,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Incoming', href: '/incoming', icon: Mail },
  { name: 'Outgoing', href: '/outgoing', icon: SendHorizontal },
  { name: 'Maintenance', href: '/maintenance', icon: Settings },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'User Management', href: '/user-management', icon: Users },
  { name: 'My Account', href: '/my-account', icon: User },
  { name: 'Compose', href: '/compose', icon: PenTool },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 shadow-2xl transform perspective-1000"
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="mb-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          DMS
        </h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg transform translate-x-2'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
} 