'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Search, Filter, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function TAClaims() {
  const [taClaims, setTAClaims] = useState([
    {
      id: 1,
      name: 'Mike Admin',
      userType: 'Employee',
      amount: 5000,
      description: 'Client meeting expenses - Travel & meals',
      date: '2026-01-18',
      status: 'pending',
      receipts: 3,
    },
    {
      id: 2,
      name: 'Lisa User',
      userType: 'Intern',
      amount: 3500,
      description: 'Conference attendance and materials',
      date: '2026-01-19',
      status: 'pending',
      receipts: 2,
    },
    {
      id: 3,
      name: 'John Employee',
      userType: 'Employee',
      amount: 2800,
      description: 'Training workshop registration',
      date: '2026-01-15',
      status: 'approved',
      receipts: 1,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedClaim, setSelectedClaim] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleApprove = (id: number) => {
    setTAClaims((prev) =>
      prev.map((claim) => (claim.id === id ? { ...claim, status: 'approved' } : claim))
    );
    toast.success('✅ TA Claim approved!');
  };

  const handleReject = (id: number) => {
    setTAClaims((prev) =>
      prev.map((claim) => (claim.id === id ? { ...claim, status: 'rejected' } : claim))
    );
    toast.error('❌ TA Claim rejected!');
  };

  const filteredClaims = taClaims
    .filter((claim) => filterStatus === 'all' || claim.status === filterStatus)
    .filter(
      (claim) =>
        claim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getTotalAmount = () => {
    return filteredClaims.reduce((sum, claim) => sum + claim.amount, 0);
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
          <h1 className="text-3xl font-bold text-slate-900">💰 TA Claims Management</h1>
          <p className="text-slate-600">Review and approve/reject travel allowance claims</p>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by employee or description..."
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
              <option value="all">All Claims</option>
              <option value="pending">Pending Only</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-yellow-50 p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-slate-600">Pending Claims</p>
            <p className="text-2xl font-bold text-yellow-600">
              {taClaims.filter((r) => r.status === 'pending').length}
            </p>
          </Card>
          <Card className="bg-green-50 p-4 border-l-4 border-green-500">
            <p className="text-sm text-slate-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {taClaims.filter((r) => r.status === 'approved').length}
            </p>
          </Card>
          <Card className="bg-red-50 p-4 border-l-4 border-red-500">
            <p className="text-sm text-slate-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {taClaims.filter((r) => r.status === 'rejected').length}
            </p>
          </Card>
          <Card className="bg-purple-50 p-4 border-l-4 border-purple-500">
            <p className="text-sm text-slate-600">Total Amount</p>
            <p className="text-2xl font-bold text-purple-600">₹{getTotalAmount().toLocaleString()}</p>
          </Card>
          <Card className="bg-blue-50 p-4 border-l-4 border-blue-500">
            <p className="text-sm text-slate-600">Total Claims</p>
            <p className="text-2xl font-bold text-blue-600">{taClaims.length}</p>
          </Card>
        </div>

        {/* TA Claims Cards */}
        <div className="space-y-4">
          {filteredClaims.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-600">No TA claims found</p>
            </Card>
          ) : (
            filteredClaims.map((claim) => (
              <Card
                key={claim.id}
                className={`p-6 border-l-4 ${
                  claim.status === 'pending'
                    ? 'border-yellow-500 bg-yellow-50'
                    : claim.status === 'approved'
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                  {/* Employee Info */}
                  <div>
                    <p className="text-xs text-slate-600 mb-1">EMPLOYEE</p>
                    <p className="text-sm font-semibold text-slate-900">{claim.name}</p>
                    <p className="text-xs text-slate-500">{claim.userType}</p>
                  </div>

                  {/* Amount */}
                  <div>
                    <p className="text-xs text-slate-600 mb-1">AMOUNT</p>
                    <div className="flex items-center gap-1">
                      <DollarSign size={18} className="text-blue-600" />
                      <p className="text-xl font-bold text-slate-900">₹{claim.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <p className="text-xs text-slate-600 mb-1">DESCRIPTION</p>
                    <p className="text-sm text-slate-700">{claim.description}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      📎 {claim.receipts} receipt{claim.receipts !== 1 ? 's' : ''} attached
                    </p>
                  </div>

                  {/* Status & Date */}
                  <div>
                    <p className="text-xs text-slate-600 mb-1">STATUS</p>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(claim.status)}
                      <span
                        className={`text-sm font-semibold ${
                          claim.status === 'pending'
                            ? 'text-yellow-600'
                            : claim.status === 'approved'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{claim.date}</p>
                  </div>
                </div>

                {/* Actions */}
                {claim.status === 'pending' && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <textarea
                          placeholder="Add a review note or comment..."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2 flex-col justify-end">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white w-full"
                          onClick={() => handleApprove(claim.id)}
                        >
                          ✓ Approve
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white w-full"
                          onClick={() => handleReject(claim.id)}
                        >
                          ✕ Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
