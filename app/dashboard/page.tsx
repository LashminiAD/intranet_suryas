'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { EventsCarousel } from '@/components/events-carousel';
import { Card } from '@/components/ui/card';

export default function Page() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchRequests = async () => {
      const response = await fetch('/api/requests?target=all');
      if (!response.ok) return;
      const data = await response.json();
      const userRequests = (data.requests || []).filter(
        (req: any) => req.createdById === user?.id
      );
      setRequests(userRequests);
    };
    fetchRequests();
    const interval = setInterval(fetchRequests, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.fullName || 'User'}!</h1>
          <p className="text-slate-600">Here's your personal dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white p-6 border-l-4 border-blue-500">
            <p className="text-slate-600 text-sm">Total Requests</p>
            <p className="text-3xl font-bold text-slate-900">{requests.length}</p>
          </Card>
          <Card className="bg-white p-6 border-l-4 border-yellow-500">
            <p className="text-slate-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-slate-900">
              {requests.filter((r) => r.status === 'pending').length}
            </p>
          </Card>
          <Card className="bg-white p-6 border-l-4 border-green-500">
            <p className="text-slate-600 text-sm">Approved</p>
            <p className="text-3xl font-bold text-slate-900">
              {requests.filter((r) => r.status === 'approved').length}
            </p>
          </Card>
          <Card className="bg-white p-6 border-l-4 border-red-500">
            <p className="text-slate-600 text-sm">Rejected</p>
            <p className="text-3xl font-bold text-slate-900">
              {requests.filter((r) => r.status === 'rejected').length}
            </p>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">My Requests</h2>
          {requests.length === 0 ? (
            <p className="text-slate-600">No requests submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {requests.map((request) => (
                <div key={request.id} className="flex items-start gap-4 p-3 border-l-4 border-blue-400">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{request.title}</p>
                    <p className="text-sm text-slate-600">
                      {new Date(request.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      request.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Events Carousel */}
        <EventsCarousel />
      </div>
    </MainLayout>
  );
}
