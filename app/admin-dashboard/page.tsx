'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { EventsCarousel } from '@/components/events-carousel';

export default function AdminDashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: 'John Intern',
      type: 'Annual Leave',
      dates: 'Jan 15-19, 2026',
      reason: 'Family vacation',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Sarah Freelancer',
      type: 'Sick Leave',
      dates: 'Jan 20, 2026',
      reason: 'Medical appointment',
      status: 'pending',
    },
  ]);

  const [taClaims, setTAClaims] = useState([
    { id: 1, name: 'Mike Admin', amount: 5000, description: 'Client meeting expenses', status: 'pending' },
    { id: 2, name: 'Lisa User', amount: 3500, description: 'Travel reimbursement', status: 'pending' },
  ]);

  const [loginHistory, setLoginHistory] = useState([
    { id: 1, user: 'john.intern', userType: 'Intern', date: '2026-01-21', time: '09:30 AM', status: 'active' },
    { id: 2, user: 'guest.user', userType: 'Guest', date: '2026-01-21', time: '10:15 AM', status: 'active' },
    { id: 3, user: 'sarah.freelancer', userType: 'Freelancer', date: '2026-01-21', time: '08:45 AM', status: 'offline' },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLeaveApprove = (id: number) => {
    setLeaveRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'approved' } : req)));
    toast.success('Leave request approved!');
  };

  const handleLeaveReject = (id: number) => {
    setLeaveRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'rejected' } : req)));
    toast.error('Leave request rejected!');
  };

  const handleTAApprove = (id: number) => {
    setTAClaims((prev) => prev.map((claim) => (claim.id === id ? { ...claim, status: 'approved' } : claim)));
    toast.success('TA Claim approved!');
  };

  const handleTAReject = (id: number) => {
    setTAClaims((prev) => prev.map((claim) => (claim.id === id ? { ...claim, status: 'rejected' } : claim)));
    toast.error('TA Claim rejected!');
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
            <Card className="bg-white p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
              <p className="text-slate-600 text-sm">New Registrations</p>
              <p className="text-3xl font-bold text-slate-900">3</p>
              <p className="text-xs text-purple-600 mt-2">This month</p>
            </Card>
            <Card className="bg-white p-6 border-l-4 border-green-500 hover:shadow-lg transition">
              <p className="text-slate-600 text-sm">Ongoing Projects</p>
              <p className="text-3xl font-bold text-slate-900">5</p>
              <p className="text-xs text-green-600 mt-2">In progress</p>
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
                {leaveRequests.map((request) => (
                  <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900">{request.name}</td>
                    <td className="px-4 py-3 text-slate-900">{request.type}</td>
                    <td className="px-4 py-3 text-slate-900">{request.dates}</td>
                    <td className="px-4 py-3 text-slate-900 truncate">{request.reason}</td>
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
                    <td className="px-4 py-3 flex gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                            onClick={() => handleLeaveApprove(request.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => handleLeaveReject(request.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === 'approved' && <CheckCircle size={18} className="text-green-600" />}
                      {request.status === 'rejected' && <XCircle size={18} className="text-red-600" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                {taClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900">{claim.name}</td>
                    <td className="px-4 py-3 text-slate-900 font-semibold">{claim.amount}</td>
                    <td className="px-4 py-3 text-slate-900 truncate">{claim.description}</td>
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
                    <td className="px-4 py-3 flex gap-2">
                      {claim.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                            onClick={() => handleTAApprove(claim.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => handleTAReject(claim.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {claim.status === 'approved' && <CheckCircle size={18} className="text-green-600" />}
                      {claim.status === 'rejected' && <XCircle size={18} className="text-red-600" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Login History */}
        <Card className="bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Login History (Sortable by Date & User Type)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900 cursor-pointer hover:bg-slate-100">
                    Username
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900 cursor-pointer hover:bg-slate-100">
                    User Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900 cursor-pointer hover:bg-slate-100">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Time</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((log) => (
                  <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900 font-medium">{log.user}</td>
                    <td className="px-4 py-3 text-slate-900">{log.userType}</td>
                    <td className="px-4 py-3 text-slate-900">{log.date}</td>
                    <td className="px-4 py-3 text-slate-900">{log.time}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          log.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
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
