'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, Trash2, FileDown, PenTool } from 'lucide-react';
import { toast } from 'sonner';
import { EventsCarousel } from '@/components/events-carousel';

export default function AdminDashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [requests, setRequests] = useState<any[]>([]);
  const [founderRequests, setFounderRequests] = useState<any[]>([]);
  const lastFounderReportCount = useRef(0);

  const [guestLogins, setGuestLogins] = useState<any[]>([]);
  const [guestInquiries, setGuestInquiries] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests?target=all');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests || []);
      }

      if (user?.role === 'founder') {
        const founderResponse = await fetch('/api/requests?target=founder');
        if (founderResponse.ok) {
          const founderData = await founderResponse.json();
          setFounderRequests(founderData.requests || []);
          const internReports = (founderData.requests || []).filter(
            (req: any) => req.type === 'report' && (req.createdByDesignation || '').toLowerCase().includes('intern')
          );
          if (internReports.length > lastFounderReportCount.current) {
            toast.success('New intern report submitted');
            lastFounderReportCount.current = internReports.length;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchRequests();
    const interval = setInterval(fetchRequests, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  // Load guest logins from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('guestLogins');
    if (stored) {
      try {
        setGuestLogins(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse guest logins:', e);
      }
    }
  }, []);

  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject') => {
    const response = await fetch('/api/requests/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, action }),
    });

    if (!response.ok) {
      toast.error('Unable to update request');
      return;
    }

    await fetchRequests();
  };

  const handleFounderSign = async (requestId: string) => {
    const response = await fetch('/api/requests/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, action: 'sign' }),
    });

    if (!response.ok) {
      toast.error('Unable to sign request');
      return;
    }

    const data = await response.json();
    toast.success(`Signed and forwarded to ${data.forwardedTo}`);
    await fetchRequests();
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
            h2 { font-size: 14px; margin-top: 20px; }
            .meta { font-size: 12px; color: #475569; margin-bottom: 16px; }
            .section { margin-top: 16px; }
            .line { margin: 6px 0; }
            .footer { margin-top: 32px; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <h1>${request.title}</h1>
          <div class="meta">Submitted by ${request.createdBy} • ${new Date(request.createdAt).toLocaleString('en-IN')}</div>
          <div class="section">
            <h2>Requester Details</h2>
            <div class="line">Name: ${request.createdBy}</div>
            <div class="line">ID: ${request.createdById || '-'}</div>
            <div class="line">Designation: ${request.createdByDesignation || '-'}</div>
            <div class="line">Role: ${request.createdByRole || '-'}</div>
          </div>
          <div class="section">
            <h2>Request Information</h2>
            ${Object.entries(payload)
              .map(([key, value]) => `<div class="line">${key}: ${value ?? '-'}</div>`)
              .join('')}
          </div>
          <div class="footer">Official Letter - Proposal Intranet System</div>
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

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Management Console</h1>
          <p className="text-slate-600">🔐 Full system control and oversight panel</p>
        </div>

        {/* EVENTS & WEBINARS - TOP PRIORITY */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
              📅 Events & Webinars
            </h2>
            <p className="text-slate-600 text-sm">Upcoming company events, webinars, and workshops</p>
          </div>
          <EventsCarousel />
        </div>

        {/* Quick Stats */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Dashboard Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-white p-6 border-l-4 border-yellow-500 hover:shadow-lg transition">
              <p className="text-slate-600 text-sm">Pending Leave Requests</p>
              <p className="text-3xl font-bold text-slate-900">2</p>
              <p className="text-xs text-yellow-600 mt-2">Action required</p>
            </Card>
            <Card className="bg-white p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
              <p className="text-slate-600 text-sm">Pending TA Claims</p>
              <p className="text-3xl font-bold text-slate-900">2</p>
              <p className="text-xs text-orange-600 mt-2">Under review</p>
            </Card>
            <Card className="bg-white p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
              <p className="text-slate-600 text-sm">Active Users</p>
              <p className="text-3xl font-bold text-slate-900">12</p>
              <p className="text-xs text-blue-600 mt-2">Online now</p>
            </Card>
            <Card className="bg-white p-6 border-l-4 border-red-500 hover:shadow-lg transition">
              <p className="text-slate-600 text-sm">Guest Inquiries</p>
              <p className="text-3xl font-bold text-slate-900">{guestInquiries.filter(i => i.status === 'new').length}</p>
              <p className="text-xs text-red-600 mt-2">Unread messages</p>
            </Card>
            <Card className="bg-white p-6 border-l-4 border-green-500 hover:shadow-lg transition">
              <p className="text-slate-600 text-sm">Guest Visitors</p>
              <p className="text-3xl font-bold text-slate-900">{guestLogins.length}</p>
              <p className="text-xs text-green-600 mt-2">Total visits</p>
            </Card>
          </div>
        </div>

        {/* Leave Requests */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Leave Requests - Approval/Rejection Authority</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Employee</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Leave Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Dates</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Reason</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.filter((req) => req.type === 'leave').map((request) => (
                  <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900">{request.createdBy}</td>
                    <td className="px-4 py-3 text-slate-900">{request.payload.leaveType}</td>
                    <td className="px-4 py-3 text-slate-900">
                      {request.payload.fromDate} - {request.payload.toDate}
                    </td>
                    <td className="px-4 py-3 text-slate-900 truncate">{request.payload.reason}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                            onClick={() => handleRequestAction(request.id, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => handleRequestAction(request.id, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => downloadRequestPdf(request)}
                      >
                        <FileDown size={14} className="mr-1" /> PDF
                      </Button>
                      {request.status === 'approved' && <CheckCircle size={18} className="text-green-600" />}
                      {request.status === 'rejected' && <XCircle size={18} className="text-red-600" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Guest Activity Log */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            👥 Guest Activity Log
          </h2>
          {guestLogins.length === 0 ? (
            <p className="text-sm text-slate-600">No guest visits recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Guest Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Company</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Visit Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Visit Time</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {guestLogins.map((guest) => (
                    <tr key={guest.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900 font-medium">{guest.name}</td>
                      <td className="px-4 py-3 text-slate-900">{guest.email || 'N/A'}</td>
                      <td className="px-4 py-3 text-slate-900">{guest.companyName || 'N/A'}</td>
                      <td className="px-4 py-3 text-slate-900">{guest.visitDate}</td>
                      <td className="px-4 py-3 text-slate-900">{guest.visitTime}</td>
                      <td className="px-4 py-3 text-slate-700 max-w-xs truncate">{guest.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* TA Claims */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">TA Claims - Approval/Rejection Authority</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Employee</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Amount (₹)</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Description</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.filter((req) => req.type === 'ta').map((claim) => (
                  <tr key={claim.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900">{claim.createdBy}</td>
                    <td className="px-4 py-3 text-slate-900 font-semibold">{claim.payload.amount}</td>
                    <td className="px-4 py-3 text-slate-900 truncate">{claim.payload.description}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          claim.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : claim.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      {claim.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                            onClick={() => handleRequestAction(claim.id, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => handleRequestAction(claim.id, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => downloadRequestPdf(claim)}
                      >
                        <FileDown size={14} className="mr-1" /> PDF
                      </Button>
                      {claim.status === 'approved' && <CheckCircle size={18} className="text-green-600" />}
                      {claim.status === 'rejected' && <XCircle size={18} className="text-red-600" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Proposal Requests */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Proposal Requests</h2>
          <div className="space-y-3">
            {requests.filter((req) => req.type === 'proposal').map((req) => (
              <div key={req.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{req.payload.projectTitle}</p>
                    <p className="text-xs text-slate-500">Submitted by {req.createdBy}</p>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(req.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => downloadRequestPdf(req)}>
                    <FileDown size={14} className="mr-1" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recruitment Requests */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recruitment Requests</h2>
          <div className="space-y-3">
            {requests.filter((req) => req.type === 'recruitment').map((req) => (
              <div key={req.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{req.payload.role}</p>
                    <p className="text-xs text-slate-500">{req.createdBy} • {req.payload.email || ''}</p>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(req.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-sm text-slate-700 mt-2">{req.payload.message}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => downloadRequestPdf(req)}>
                    <FileDown size={14} className="mr-1" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Report Requests */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Reports</h2>
          <div className="space-y-3">
            {requests.filter((req) => req.type === 'report').map((req) => (
              <div key={req.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{req.payload.reportType} report</p>
                    <p className="text-xs text-slate-500">{req.createdBy}</p>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(req.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-sm text-slate-700 mt-2">{req.payload.reportContent}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => downloadRequestPdf(req)}>
                    <FileDown size={14} className="mr-1" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {user?.role === 'founder' && (
          <Card className="bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Founder Signature Queue</h2>
            <div className="space-y-3">
              {founderRequests.length === 0 && (
                <p className="text-sm text-slate-600">No pending requests for signature.</p>
              )}
              {founderRequests.map((req) => (
                <div key={req.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{req.title}</p>
                      <p className="text-xs text-slate-500">{req.createdBy} • {req.createdByDesignation || ''}</p>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(req.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => downloadRequestPdf(req)}>
                      <FileDown size={14} className="mr-1" /> PDF
                    </Button>
                    {req.type !== 'report' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleFounderSign(req.id)}>
                        <PenTool size={14} className="mr-1" /> Sign & Forward
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Guest Inquiries */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            💬 Guest Inquiries & Messages
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Guest Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Subject</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Message</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Date & Time</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {guestInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900 font-medium">{inquiry.guestName}</td>
                    <td className="px-4 py-3 text-slate-900 font-semibold">{inquiry.subject}</td>
                    <td className="px-4 py-3 text-slate-700 max-w-xs truncate">{inquiry.message}</td>
                    <td className="px-4 py-3 text-slate-900 text-xs">
                      {inquiry.date} <br /> {inquiry.time}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          inquiry.status === 'new'
                            ? 'bg-red-100 text-red-800'
                            : inquiry.status === 'read'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {inquiry.status === 'new' && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                          onClick={() => handleInquiryStatusChange(inquiry.id, 'read')}
                        >
                          Mark Read
                        </Button>
                      )}
                      {inquiry.status !== 'resolved' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-xs"
                          onClick={() => handleInquiryStatusChange(inquiry.id, 'resolved')}
                        >
                          Resolve
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs"
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Events Carousel */}
        <EventsCarousel />
      </div>
    </MainLayout>
  );
}
