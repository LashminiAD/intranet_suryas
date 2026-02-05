'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Search, Filter, FileDown, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function LeaveManagement() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchRequests = async () => {
      const response = await fetch('/api/requests?target=all');
      if (!response.ok) return;
      const data = await response.json();
      const leaveData = (data.requests || []).filter((req: any) => req.type === 'leave');
      setLeaveRequests(leaveData);
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, router]);

  const handleApprove = async (id: string) => {
    const response = await fetch('/api/requests/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: id, action: 'approve' }),
    });

    if (!response.ok) {
      toast.error('Unable to approve request');
      return;
    }

    toast.success('✅ Leave request approved!');
  };

  const handleReject = async (id: string) => {
    const response = await fetch('/api/requests/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: id, action: 'reject' }),
    });

    if (!response.ok) {
      toast.error('❌ Leave request rejected!');
      return;
    }

    toast.error('❌ Leave request rejected!');
  };

  const downloadRequestPdf = (request: any) => {
    const payload = request.payload || {};
    const html = `
      <html>
        <head>
          <title>${request.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #0f172a; }
            h1 { font-size: 20px; margin-bottom: 8px; }
            .meta { font-size: 12px; color: #475569; margin-bottom: 16px; }
            .line { margin: 6px 0; }
          </style>
        </head>
        <body>
          <h1>${request.title}</h1>
          <div class="meta">Submitted by ${request.createdBy} • ${new Date(request.createdAt).toLocaleString('en-IN')}</div>
          <div class="line">Leave Type: ${payload.leaveType}</div>
          <div class="line">Dates: ${payload.fromDate} - ${payload.toDate}</div>
          <div class="line">Reason: ${payload.reason}</div>
          <div class="line">Status: ${request.status}</div>
        </body>
      </html>
    `;

    const pdfWindow = window.open('', '_blank');
    if (!pdfWindow) return;
    pdfWindow.document.write(html);
    pdfWindow.document.close();
    pdfWindow.focus();
    setTimeout(() => pdfWindow.print(), 300);
  };

  const filteredRequests = leaveRequests
    .filter((req) => filterStatus === 'all' || req.status === filterStatus)
    .filter(
      (req) =>
        req.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (req.payload?.reason || '').toLowerCase().includes(searchTerm.toLowerCase())
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
                          <p className="text-sm font-semibold text-slate-900">{request.createdBy}</p>
                          <p className="text-xs text-slate-500">{request.createdByDesignation || 'Employee'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {request.payload?.leaveType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {request.payload?.fromDate} - {request.payload?.toDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{request.payload?.reason}</td>
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
                        <div className="flex flex-wrap gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye size={14} className="mr-1" /> View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadRequestPdf(request)}
                          >
                            <FileDown size={14} className="mr-1" /> Download
                          </Button>
                          {request.status === 'pending' && (
                            <>
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
                            </>
                          )}
                          {request.status !== 'pending' && (
                            <span className="text-xs text-slate-500">Processed</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white w-full max-w-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Leave Request Details</h2>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Employee:</strong> {selectedRequest.createdBy}</p>
                <p><strong>Leave Type:</strong> {selectedRequest.payload?.leaveType}</p>
                <p><strong>Dates:</strong> {selectedRequest.payload?.fromDate} - {selectedRequest.payload?.toDate}</p>
                <p><strong>Reason:</strong> {selectedRequest.payload?.reason}</p>
                <p><strong>Status:</strong> {selectedRequest.status}</p>
                <p><strong>Medical Certificate:</strong> {selectedRequest.payload?.medicalCertificateName || 'None'}</p>
                <p><strong>Medical Proof:</strong> {selectedRequest.payload?.medicalProofName || 'None'}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedRequest(null)} className="flex-1">
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
