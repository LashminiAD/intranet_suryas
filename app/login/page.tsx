'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { ProfileSetupModal } from '@/components/profile-setup-modal';

export default function LoginPage() {
  const router = useRouter();
  const { login, guestLogin } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [guestData, setGuestData] = useState({
    name: '',
    designation: '',
    companyName: '',
    roleInCompany: '',
    purposeOfVisit: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }

    login(username, password, role);
    toast.success(`Welcome, ${username}!`);

    // Redirect to homepage for all users after login
    router.push('/homepage');
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestData.name || !guestData.designation || !guestData.companyName) {
      toast.error('Please fill in all required fields');
      return;
    }

    guestLogin(guestData);
    toast.success('Welcome, Guest!');
    setShowGuestModal(false);
    router.push('/guest-dashboard');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg overflow-hidden">
                    <img
                      src="https://surya-s.zohosites.in/Remini20220710111603029-removebg.png"
                      alt="SURYA'S MiB Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">SURYA'S MiB</h1>
                  <p className="text-blue-200">Virtual Intranet Portal</p>
                </div>

              {/* Login Card */}
              <Card className="bg-white/95 backdrop-blur shadow-2xl">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-slate-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-slate-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-800"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Login As</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full border-slate-300">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-6">
                Login
              </Button>
            </form>

            {/* Links */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex justify-between items-center text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  🔑 Forgot Password?
                </a>
                <button
                  onClick={() => router.push('/signup')}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  ✨ New User? Sign Up
                </button>
              </div>
            </div>
          </div>
        </Card>
        </div>
      </div>

      {/* Guest Modal */}
      <Dialog open={showGuestModal} onOpenChange={setShowGuestModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Guest Access Registration</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleGuestSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={guestData.name}
                onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Designation *</label>
              <Input
                type="text"
                placeholder="e.g., Manager, Engineer"
                value={guestData.designation}
                onChange={(e) => setGuestData({ ...guestData, designation: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
              <Input
                type="text"
                placeholder="Enter your company"
                value={guestData.companyName}
                onChange={(e) => setGuestData({ ...guestData, companyName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role in Company</label>
              <Input
                type="text"
                placeholder="e.g., Team Lead"
                value={guestData.roleInCompany}
                onChange={(e) => setGuestData({ ...guestData, roleInCompany: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Purpose of Visit</label>
              <textarea
                placeholder="Describe your purpose"
                value={guestData.purposeOfVisit}
                onChange={(e) => setGuestData({ ...guestData, purposeOfVisit: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowGuestModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Enter as Guest
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Profile Setup Modal */}
      <ProfileSetupModal
        isOpen={showProfileSetup}
        onClose={() => {
          setShowProfileSetup(false);
          router.push('/dashboard');
        }}
      />
    </>
  );
}
