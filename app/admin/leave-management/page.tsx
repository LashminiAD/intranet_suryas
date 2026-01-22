'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: 'John Intern',
      userType: 'Intern',
      leaveType: 'Annual Leave',
      dates: 'Jan 15-19, 2026',
      reason: 'Family vacation',
      status: 'pending',
      appliedDate: '2026-01-10',
    },
    {
      id: 2,
      name: 'Sarah Freelancer',
      userType: 'Freelancer',
      leaveType: 'Sick Leave',
      dates: 'Jan 20, 2026',
      reason: 'Medical appointment',
      status: 'pending',
      appliedDate: '2026-01-18',
    },
    {
      id: 3,
      name: 'Mike Employee',
      userType: 'Employee',
      leaveType: 'Casual Leave',
      dates: 'Jan 22-23, 2026',
      reason: 'Personal work',
      status: 'approved',
      appliedDate: '2026-01-20',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  const handleApprove = (id: number) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'approved' } : req))
    );
    toast.success('✅ Leave request approved!');
  };

  const handleReject = (id: number) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'rejected' } : req))
    );
    toast.error('❌ Leave request rejected!');
  };

  const filteredRequests = leaveRequests
    .filter((req) => filterStatus === 'all' || req.status === filterStatus)
    .filter(
      (req) =>
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'approved':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'rejected':
        return 'bg-red-50 border-l-4 border-red-500';
      default:
        return 'bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'approved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📝 Leave Management</h1>
          <p className="text-slate-600">Review and approve/reject employee leave requests</p>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by employee name or reason..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Filter size={20} className="mt-2 text-slate-500" />
            <select
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending Only</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-yellow-50 p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-slate-600">Pending Requests</p>
            <p className="text-2xl font-bold text-yellow-600">
              {leaveRequests.filter((r) => r.status === 'pending').length}
            </p>
          </Card>
          <Card className="bg-green-50 p-4 border-l-4 border-green-500">
            <p className="text-sm text-slate-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {leaveRequests.filter((r) => r.status === 'approved').length}
            </p>
          </Card>
          <Card className="bg-red-50 p-4 border-l-4 border-red-500">
            <p className="text-sm text-slate-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {leaveRequests.filter((r) => r.status === 'rejected').length}
            </p>
          </Card>
          <Card className="bg-blue-50 p-4 border-l-4 border-blue-500">
            <p className="text-sm text-slate-600">Total Requests</p>
            <p className="text-2xl font-bold text-blue-600">{leaveRequests.length}</p>
          </Card>
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-600">No leave requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Employee</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Dates</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Reason</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className={`border-b border-slate-200 hover:bg-slate-50 transition`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{request.name}</p>
                          <p className="text-xs text-slate-500">{request.userType}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {request.leaveType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{request.dates}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{request.reason}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <span className={`text-sm font-semibold ${
                            request.status === 'pending'
                              ? 'text-yellow-600'
                              : request.status === 'approved'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {request.status === 'pending' ? (
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleApprove(request.id)}
                            >
                              ✓ Approve
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => handleReject(request.id)}
                            >
                              ✕ Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
