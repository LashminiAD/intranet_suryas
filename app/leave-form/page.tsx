'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUp, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function LeaveFormPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    id: user?.id || '',
    designation: user?.designation || '',
    email: user?.email || '',
    phone: '',
    leaveType: 'annual',
    fromDate: '',
    toDate: '',
    reason: '',
    medicalCertificate: null as File | null,
  });

  const [certificateFileName, setCertificateFileName] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, leaveType: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      setFormData((prev) => ({ ...prev, medicalCertificate: file }));
      setCertificateFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.fromDate || !formData.toDate || !formData.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.leaveType === 'sick' && !formData.medicalCertificate) {
      toast.error('Medical Certificate is required for Sick Leave');
      return;
    }

    toast.success('Leave request submitted successfully!');
    // Reset form
    setFormData({
      name: user?.fullName || '',
      id: user?.id || '',
      designation: user?.designation || '',
      email: user?.email || '',
      phone: '',
      leaveType: 'annual',
      fromDate: '',
      toDate: '',
      reason: '',
      medicalCertificate: null,
    });
    setCertificateFileName('');
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Leave Application Form</h1>
        <p className="text-slate-600 mb-6">Submit your leave request here</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Employee Details Section */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-4">Employee Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
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
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Leave Details Section */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-4">Leave Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type *</label>
                      <Select value={formData.leaveType} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">Annual Leave</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="personal">Personal Leave</SelectItem>
                          <SelectItem value="emergency">Emergency Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">From Date *</label>
                        <Input
                          type="date"
                          name="fromDate"
                          value={formData.fromDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">To Date *</label>
                        <Input
                          type="date"
                          name="toDate"
                          value={formData.toDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Leave *</label>
                      <textarea
                        name="reason"
                        placeholder="Enter your reason for leave"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    </div>

                    {formData.leaveType === 'sick' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Medical Certificate (PDF only) *</label>
                        <div className="flex items-center gap-2">
                          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                            <Upload size={18} className="text-blue-600" />
                            <span className="text-sm text-blue-600 font-medium">Click to upload PDF</span>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {certificateFileName && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                            <FileUp size={16} />
                            {certificateFileName}
                          </div>
                        )}
                      </div>
                    )}

                    {formData.leaveType === 'emergency' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Medical Certificate (PDF only) - Optional for Emergency</label>
                        <div className="flex items-center gap-2">
                          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer hover:bg-amber-50 transition">
                            <Upload size={18} className="text-amber-600" />
                            <span className="text-sm text-amber-600 font-medium">Click to upload PDF</span>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {certificateFileName && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                            <FileUp size={16} />
                            {certificateFileName}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1">
                    Submit Request
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
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

                {/* Leave Balance */}
                <div className="mt-6 bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm">Leave Balance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Leaves</span>
                      <span className="font-semibold text-slate-900">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Leaves Taken</span>
                      <span className="font-semibold text-slate-900">3</span>
                    </div>
                    <div className="h-px bg-slate-200 my-2" />
                    <div className="flex justify-between">
                      <span className="text-slate-600">Remaining</span>
                      <span className="font-semibold text-green-600">9</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
