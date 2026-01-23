'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth-context';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [previewImage, setPreviewImage] = useState<string>(user?.profilePhoto || '');
  const [phone, setPhone] = useState('');
  const [userRole, setUserRole] = useState(user?.designation?.toLowerCase() || 'intern');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!previewImage) {
        toast.error('Please upload a profile picture');
        setLoading(false);
        return;
      }

      if (!userRole) {
        toast.error('Please select your role');
        setLoading(false);
        return;
      }

      // Update user profile
      updateProfile({
        profilePhoto: previewImage,
        profilePictureUploaded: true,
        designation: userRole.charAt(0).toUpperCase() + userRole.slice(1),
      });

      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing by clicking outside or ESC key
      if (!open) return;
    }}>
      <DialogContent className="max-w-md" onInteractOutside={(e) => {
        e.preventDefault();
      }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            ✨ Complete Your Profile
          </DialogTitle>
        </DialogHeader>

        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800 mb-2">
          <p className="font-semibold">ℹ️ Profile completion required</p>
          <p className="text-blue-700 mt-1">Please complete your profile before accessing the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 rounded-full border-4 border-blue-200 overflow-hidden bg-slate-100 flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-slate-400" />
              )}
            </div>

            <div className="w-full">
              <Label className="block text-sm font-medium text-slate-700 mb-2">
                Upload Profile Picture *
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-slate-500 mt-1">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <Label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number (Optional)
            </Label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>

          {/* Role Selection */}
          <div>
            <Label className="block text-sm font-medium text-slate-700 mb-2">
              Your Role *
            </Label>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="w-full border-slate-300">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500 mt-1">
              Select your role within the organization
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Saving...' : 'Complete Profile'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
