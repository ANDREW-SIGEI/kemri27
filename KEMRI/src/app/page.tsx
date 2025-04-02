'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, BarChart2, FileOutput, Users, PenSquare } from 'lucide-react';
import Link from 'next/link';

const statusCards = [
  {
    title: 'All Incoming Docs',
    count: 4,
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    shadowColor: 'rgba(59, 130, 246, 0.5)',
  },
  {
    title: 'Pending Docs',
    count: 3,
    icon: Clock,
    color: 'from-yellow-500 to-yellow-600',
    shadowColor: 'rgba(234, 179, 8, 0.5)',
  },
  {
    title: 'Received Docs',
    count: 1,
    icon: CheckCircle,
    color: 'from-green-500 to-green-600',
    shadowColor: 'rgba(34, 197, 94, 0.5)',
  },
  {
    title: 'Ended Docs',
    count: 0,
    icon: XCircle,
    color: 'from-red-500 to-red-600',
    shadowColor: 'rgba(239, 68, 68, 0.5)',
  },
];

// Sample data for the dashboard
const stats = [
  { name: 'Documents', value: '1,234', change: '+12%', icon: FileText, color: 'bg-blue-500' },
  { name: 'Pending Review', value: '45', change: '-5%', icon: FileOutput, color: 'bg-amber-500' },
  { name: 'Users', value: '64', change: '+3%', icon: Users, color: 'bg-green-500' },
  { name: 'Reports', value: '23', change: '+8%', icon: BarChart2, color: 'bg-purple-500' },
];

const recentDocuments = [
  { id: 'DOC-001', title: 'Research Proposal', sender: 'John Doe', date: '2023-03-28', status: 'Approved' },
  { id: 'DOC-002', title: 'Ethics Review', sender: 'Jane Smith', date: '2023-03-27', status: 'Pending' },
  { id: 'DOC-003', title: 'Progress Report', sender: 'Mark Johnson', date: '2023-03-26', status: 'In Review' },
  { id: 'DOC-004', title: 'Grant Application', sender: 'Sarah Williams', date: '2023-03-25', status: 'Approved' },
  { id: 'DOC-005', title: 'Final Report', sender: 'Robert Brown', date: '2023-03-24', status: 'Rejected' },
];

export default function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Dashboard</h1>
        <div>
          <Link href="/compose">
            <motion.button 
              className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(10px)',
              }}
            >
              <PenSquare className="w-5 h-5 mr-2" />
              New Document
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statusCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              z: 30,
            }}
            className={`p-4 sm:p-6 rounded-xl bg-gradient-to-br ${card.color} text-white transform perspective-1000 cursor-pointer`}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: `0 25px 50px -12px ${card.shadowColor}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">{card.title}</h3>
                <p className="text-xl sm:text-3xl font-bold">{card.count}</p>
              </div>
              <motion.div
                animate={{ rotateZ: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <card.icon className="h-7 w-7 sm:h-10 sm:w-10 opacity-80" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.name} 
            className="card hover:shadow-lg transition-all duration-300 hover-3d p-4 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">{stat.name}</p>
                <p className="text-lg sm:text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <motion.div 
                className={`${stat.color} p-2 sm:p-3 rounded-full shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Documents */}
      <motion.div 
        className="card p-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(5px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-600">Recent Documents</h2>
          <button className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 transition-colors duration-300 hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full px-4 sm:px-6">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">ID</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 hidden sm:table-cell">Sender</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 hidden md:table-cell">Date</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDocuments.map((doc, index) => (
                  <motion.tr 
                    key={doc.id} 
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (index * 0.05) }}
                    whileHover={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.05)',
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{doc.id}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">{doc.title}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden sm:table-cell">{doc.sender}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden md:table-cell">{doc.date}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        doc.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        doc.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <button className="text-primary-500 hover:text-primary-700 transition-colors duration-200 hover:underline">
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 