'use client';

import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { documentsApi } from '@/services/api';
import type { DocumentStats } from '@/types/api';
import { BarChart2, FileText, FileOutput, Download, Calendar } from 'lucide-react';

// Sample data for the reports page
const stats = [
  { name: 'Total Documents', value: '1,234', change: '+12%', period: 'This Month' },
  { name: 'Processing Time', value: '8.5 days', change: '-2.3 days', period: 'This Month' },
  { name: 'Approval Rate', value: '78%', change: '+5%', period: 'This Month' },
  { name: 'Completion Rate', value: '92%', change: '+3%', period: 'This Month' },
];

const documentsByCategory = [
  { category: 'Research Proposals', count: 423, percentage: 34 },
  { category: 'Ethics Reviews', count: 256, percentage: 21 },
  { category: 'Progress Reports', count: 198, percentage: 16 },
  { category: 'Grant Applications', count: 167, percentage: 14 },
  { category: 'Clinical Trials', count: 102, percentage: 8 },
  { category: 'Other', count: 88, percentage: 7 },
];

const recentReports = [
  { id: 'REP-001', title: 'Monthly Document Summary', generatedDate: '2023-03-28', type: 'Automated' },
  { id: 'REP-002', title: 'Quarterly Performance Review', generatedDate: '2023-03-15', type: 'Manual' },
  { id: 'REP-003', title: 'Annual Document Statistics', generatedDate: '2023-01-05', type: 'Automated' },
  { id: 'REP-004', title: 'Department Workload Analysis', generatedDate: '2023-02-20', type: 'Manual' },
  { id: 'REP-005', title: 'Processing Time Trends', generatedDate: '2023-03-01', type: 'Automated' },
];

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState<'month' | 'year' | 'all'>('month');
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await documentsApi.getStats(timeframe);
        setStats(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const trendData = [
    {
      id: 'incoming',
      data: stats.monthlyTrends.map((trend) => ({
        x: trend.month,
        y: trend.incoming,
      })),
    },
    {
      id: 'outgoing',
      data: stats.monthlyTrends.map((trend) => ({
        x: trend.month,
        y: trend.outgoing,
      })),
    },
  ];

  const typeData = stats.documentsByType.map((item) => ({
    id: item.type,
    value: item.count,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  }));

  const processingData = stats.documentsByType.map((item) => ({
    type: item.type,
    'Average Days': Math.round(stats.averageProcessingTime),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <select className="input py-2 px-3">
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="btn-primary flex items-center">
            <BarChart2 className="mr-2 h-5 w-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">{stat.name}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <div className="flex items-center mt-2">
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-gray-400 text-sm ml-2">vs previous period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Documents by Category */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Documents by Category</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Count</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Percentage</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {documentsByCategory.map((item) => (
                <tr key={item.category} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{item.category}</td>
                  <td className="py-3 px-4 text-sm">{item.count}</td>
                  <td className="py-3 px-4 text-sm">{item.percentage}%</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-500 h-2.5 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Reports</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700">View All Reports</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Generated Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{report.id}</td>
                  <td className="py-3 px-4 text-sm font-medium">{report.title}</td>
                  <td className="py-3 px-4 text-sm">{report.generatedDate}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.type === 'Automated' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm flex gap-2">
                    <button className="text-primary-500 hover:text-primary-700" title="View Report">
                      <FileText className="h-5 w-5" />
                    </button>
                    <button className="text-primary-500 hover:text-primary-700" title="Download Report">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="text-primary-500 hover:text-primary-700" title="Schedule Report">
                      <Calendar className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 