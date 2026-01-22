'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, Calendar, TrendingUp, PieChart } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminReports() {
  const [reportType, setReportType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('January 2026');

  const leaveReports = {
    'January 2026': {
      pending: 2,
      approved: 8,
      rejected: 1,
      totalDays: 24,
      byType: {
        casual: 5,
        sick: 3,
        annual: 10,
      },
    },
    'December 2025': {
      pending: 0,
      approved: 12,
      rejected: 2,
      totalDays: 35,
      byType: {
        casual: 8,
        sick: 4,
        annual: 12,
      },
    },
  };

  const taReports = {
    'January 2026': {
      pending: 2,
      approved: 5,
      rejected: 0,
      totalAmount: 18500,
      averageAmount: 2312.5,
    },
    'December 2025': {
      pending: 0,
      approved: 8,
      rejected: 1,
      totalAmount: 31200,
      averageAmount: 3467,
    },
  };

  const projectReports = {
    'January 2026': {
      submitted: 5,
      approved: 2,
      rejected: 1,
      pending: 2,
      totalBudget: 480000,
    },
    'December 2025': {
      submitted: 8,
      approved: 6,
      rejected: 1,
      pending: 1,
      totalBudget: 520000,
    },
  };

  const userActivityLogs = [
    { date: '2026-01-21', time: '09:30 AM', user: 'john.intern', action: 'Login', status: 'Success' },
    { date: '2026-01-21', time: '10:15 AM', action: 'Leave request submitted', user: 'sarah.freelancer', status: 'Submitted' },
    { date: '2026-01-21', time: '11:00 AM', action: 'Project approved', user: 'admin', status: 'Approved' },
    { date: '2026-01-20', time: '02:45 PM', user: 'mike.employee', action: 'TA Claim submitted', status: 'Submitted' },
    { date: '2026-01-20', time: '01:20 PM', action: 'User registration', user: 'lisa.intern', status: 'Pending' },
  ];

  const handleExportReport = (type: string) => {
    toast.success(`📥 ${type} report exported as PDF`);
  };

  const currentLeaveData = leaveReports[selectedMonth as keyof typeof leaveReports];
  const currentTAData = taReports[selectedMonth as keyof typeof taReports];
  const currentProjectData = projectReports[selectedMonth as keyof typeof projectReports];

  return (
    <MainLayout>
      <div className="max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📈 System Reports & Analytics</h1>
          <p className="text-slate-600">Monitor system activity, approvals, and user engagement</p>
        </div>

        {/* Month Selector */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-blue-500" />
            <select
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="January 2026">January 2026</option>
              <option value="December 2025">December 2025</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
              onClick={() => handleExportReport('Monthly')}
            >
              <Download size={18} />
              Export Report
            </Button>
          </div>
        </div>

        {/* Leave Reports */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            📝 Leave Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-yellow-50 p-6 border-l-4 border-yellow-500">
              <p className="text-sm text-slate-600 mb-1">Pending Requests</p>
              <p className="text-3xl font-bold text-yellow-600">{currentLeaveData?.pending}</p>
              <p className="text-xs text-slate-500 mt-2">Awaiting approval</p>
            </Card>
            <Card className="bg-green-50 p-6 border-l-4 border-green-500">
              <p className="text-sm text-slate-600 mb-1">Approved Leaves</p>
              <p className="text-3xl font-bold text-green-600">{currentLeaveData?.approved}</p>
              <p className="text-xs text-slate-500 mt-2">{currentLeaveData?.totalDays} days total</p>
            </Card>
            <Card className="bg-red-50 p-6 border-l-4 border-red-500">
              <p className="text-sm text-slate-600 mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{currentLeaveData?.rejected}</p>
              <p className="text-xs text-slate-500 mt-2">Not approved</p>
            </Card>
            <Card className="bg-purple-50 p-6 border-l-4 border-purple-500">
              <p className="text-sm text-slate-600 mb-1">By Type</p>
              <div className="text-xs mt-3 space-y-1">
                <p className="text-slate-700">Casual: {currentLeaveData?.byType?.casual}</p>
                <p className="text-slate-700">Sick: {currentLeaveData?.byType?.sick}</p>
                <p className="text-slate-700">Annual: {currentLeaveData?.byType?.annual}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* TA Claims Reports */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            💰 TA Claims Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-yellow-50 p-6 border-l-4 border-yellow-500">
              <p className="text-sm text-slate-600 mb-1">Pending Claims</p>
              <p className="text-3xl font-bold text-yellow-600">{currentTAData?.pending}</p>
              <p className="text-xs text-slate-500 mt-2">Under review</p>
            </Card>
            <Card className="bg-green-50 p-6 border-l-4 border-green-500">
              <p className="text-sm text-slate-600 mb-1">Approved Claims</p>
              <p className="text-3xl font-bold text-green-600">{currentTAData?.approved}</p>
              <p className="text-xs text-slate-500 mt-2">₹{currentTAData?.totalAmount.toLocaleString()} total</p>
            </Card>
            <Card className="bg-red-50 p-6 border-l-4 border-red-500">
              <p className="text-sm text-slate-600 mb-1">Rejected Claims</p>
              <p className="text-3xl font-bold text-red-600">{currentTAData?.rejected}</p>
              <p className="text-xs text-slate-500 mt-2">Not approved</p>
            </Card>
            <Card className="bg-blue-50 p-6 border-l-4 border-blue-500">
              <p className="text-sm text-slate-600 mb-1">Average Amount</p>
              <p className="text-3xl font-bold text-blue-600">₹{currentTAData?.averageAmount.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">Per claim</p>
            </Card>
          </div>
        </div>

        {/* Project Reports */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            📂 Project Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50 p-6 border-l-4 border-blue-500">
              <p className="text-sm text-slate-600 mb-1">Total Submitted</p>
              <p className="text-3xl font-bold text-blue-600">{currentProjectData?.submitted}</p>
              <p className="text-xs text-slate-500 mt-2">This month</p>
            </Card>
            <Card className="bg-green-50 p-6 border-l-4 border-green-500">
              <p className="text-sm text-slate-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{currentProjectData?.approved}</p>
              <p className="text-xs text-slate-500 mt-2">Ready to start</p>
            </Card>
            <Card className="bg-yellow-50 p-6 border-l-4 border-yellow-500">
              <p className="text-sm text-slate-600 mb-1">Under Review</p>
              <p className="text-3xl font-bold text-yellow-600">{currentProjectData?.pending}</p>
              <p className="text-xs text-slate-500 mt-2">Pending approval</p>
            </Card>
            <Card className="bg-purple-50 p-6 border-l-4 border-purple-500">
              <p className="text-sm text-slate-600 mb-1">Total Budget</p>
              <p className="text-3xl font-bold text-purple-600">₹{currentProjectData?.totalBudget.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">Allocated</p>
            </Card>
          </div>
        </div>

        {/* User Activity Log */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            📋 Recent System Activity
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date & Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Action</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {userActivityLogs.map((log, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {log.date} {log.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{log.user}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{log.action}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          log.status === 'Success'
                            ? 'bg-green-100 text-green-700'
                            : log.status === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : log.status === 'Submitted'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-600" />
            Monthly Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-slate-600 mb-2">Total Requests</p>
              <p className="text-2xl font-bold text-blue-600">
                {(currentLeaveData?.approved || 0) + (currentTAData?.approved || 0) + (currentProjectData?.approved || 0)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-slate-600 mb-2">Approved This Month</p>
              <p className="text-2xl font-bold text-green-600">
                {(currentLeaveData?.approved || 0) + (currentTAData?.approved || 0) + (currentProjectData?.approved || 0)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-slate-600 mb-2">Approval Rate</p>
              <p className="text-2xl font-bold text-orange-600">92%</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-slate-600 mb-2">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-purple-600">2.3 days</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
