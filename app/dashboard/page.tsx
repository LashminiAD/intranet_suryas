'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { EventsCarousel } from '@/components/events-carousel';

export default function Page() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

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
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-slate-600 text-sm">Total Leaves</p>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-slate-600 text-sm">Leaves Remaining</p>
            <p className="text-3xl font-bold text-slate-900">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <p className="text-slate-600 text-sm">Pending TA Claims</p>
            <p className="text-3xl font-bold text-slate-900">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
            <p className="text-slate-600 text-sm">Active Projects</p>
            <p className="text-3xl font-bold text-slate-900">3</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-3 border-l-4 border-blue-400">
              <div className="flex-1">
                <p className="font-semibold text-slate-900">Leave Request Submitted</p>
                <p className="text-sm text-slate-600">Annual Leave - Jan 15-19, 2026</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Pending</span>
            </div>
            <div className="flex items-start gap-4 p-3 border-l-4 border-green-400">
              <div className="flex-1">
                <p className="font-semibold text-slate-900">TA Claim Approved</p>
                <p className="text-sm text-slate-600">₹5,000 - Client Meeting Expenses</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">Approved</span>
            </div>
            <div className="flex items-start gap-4 p-3 border-l-4 border-purple-400">
              <div className="flex-1">
                <p className="font-semibold text-slate-900">Project Deadline</p>
                <p className="text-sm text-slate-600">PCB Design - Next Review: Jan 28, 2026</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">In Progress</span>
            </div>
          </div>
        </div>

        {/* Events Carousel */}
        <EventsCarousel />
      </div>
    </MainLayout>
  );
}
