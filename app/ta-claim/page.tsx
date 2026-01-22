'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FileUp, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function TAClaimPage(): React.ReactNode {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    id: user?.id || '',
    designation: user?.designation || '',
    email: user?.email || '',
    claimType: 'expenses',
    amount: '',
    description: '',
    billFile: null as File | null,
    billFileName: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('pdf') && !file.type.includes('image')) {
        toast.error('Only PDF and image files are allowed');
        return;
      }
      setFormData((prev) => ({ ...prev, billFile: file, billFileName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.description || !formData.billFile) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('TA Claim submitted successfully! Sent to Admin.');
    setFormData({
      name: user?.fullName || '',
      id: user?.id || '',
      designation: user?.designation || '',
      email: user?.email || '',
      claimType: 'expenses',
      amount: '',
      description: '',
      billFile: null,
      billFileName: '',
    });
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form - 3 columns */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">TA & Travel Claim</h1>
          <p className="text-slate-600 mb-6">Submit your travel allowance and expense claims</p>

          <Card className="bg-white p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Info */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-4">Your Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <Input value={formData.name} disabled className="bg-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Employee ID</label>
                  <Input value={formData.id} disabled className="bg-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                  <Input value={formData.designation} disabled className="bg-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <Input value={formData.email} disabled className="bg-slate-100" />
                </div>
              </div>
            </div>

            {/* Claim Details */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-4">Claim Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Claim Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="claimType"
                        value="expenses"
                        checked={formData.claimType === 'expenses'}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Expenses</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="claimType"
                        value="bill"
                        checked={formData.claimType === 'bill'}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Bill NBE</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹) *</label>
                  <Input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    placeholder="Describe your expenses in detail"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bill/Receipt Proof (PDF or Image) *</label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                      <Upload size={18} className="text-blue-600" />
                      <span className="text-sm text-blue-600 font-medium">Click to upload file</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {formData.billFileName && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                      <FileUp size={16} />
                      {formData.billFileName}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <p className="font-semibold mb-1">Submitted to: Admin</p>
                <p>Your claim will be reviewed and processed within 5-7 business days.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1">
                Submit Claim
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
          </Card>
        </div>

        {/* Profile Photo Section */}
        <div className="lg:col-span-1">
          <Card className="bg-white p-6 sticky top-20">
            <h3 className="font-semibold text-slate-900 mb-4">Your Profile</h3>
            <div className="text-center">
              <img
                src={user?.profilePhoto || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-40 h-40 rounded-lg object-cover mx-auto border-4 border-blue-200 mb-4"
              />
              <p className="font-semibold text-slate-900">{user?.fullName || 'Employee Name'}</p>
              <p className="text-sm text-slate-600">{user?.id}</p>
              <p className="text-sm text-slate-600">{user?.designation}</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
