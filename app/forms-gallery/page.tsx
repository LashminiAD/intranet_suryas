'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileText, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function FormsGalleryPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const forms = [
    {
      id: 1,
      name: 'Leave Application Form',
      description: 'Request for leaves - Annual, Sick, Personal, Emergency',
      fileSize: '245 KB',
      category: 'HR',
      fileType: 'PDF',
    },
    {
      id: 2,
      name: 'TA & Travel Claim Form',
      description: 'Submit travel allowance and expense claims',
      fileSize: '198 KB',
      category: 'Finance',
      fileType: 'PDF',
    },
    {
      id: 3,
      name: 'Project Proposal Form',
      description: 'Create and submit new project proposals',
      fileSize: '312 KB',
      category: 'Projects',
      fileType: 'PDF',
    },
    {
      id: 4,
      name: 'Certificate Request Form',
      description: 'Request certificates with documentation',
      fileSize: '267 KB',
      category: 'Admin',
      fileType: 'PDF',
    },
    {
      id: 5,
      name: 'Weekly Report Template',
      description: 'Standard template for weekly reports',
      fileSize: '187 KB',
      category: 'Reports',
      fileType: 'PDF',
    },
    {
      id: 6,
      name: 'Employee Information Update',
      description: 'Update personal and professional information',
      fileSize: '156 KB',
      category: 'Admin',
      fileType: 'PDF',
    },
    {
      id: 7,
      name: 'Event Registration Form',
      description: 'Register for company events and workshops',
      fileSize: '167 KB',
      category: 'Events',
      fileType: 'PDF',
    },
    {
      id: 8,
      name: 'Internship Agreement',
      description: 'Legal agreement document for internship programs',
      fileSize: '423 KB',
      category: 'Legal',
      fileType: 'PDF',
    },
    {
      id: 9,
      name: 'Confidentiality Agreement (NDA)',
      description: 'Non-disclosure and confidentiality terms',
      fileSize: '356 KB',
      category: 'Legal',
      fileType: 'PDF',
    },
    {
      id: 10,
      name: 'Training Feedback Form',
      description: 'Provide feedback on training sessions and workshops',
      fileSize: '87 KB',
      category: 'Training',
      fileType: 'PDF',
    },
  ];

  const categories = ['all', 'HR', 'Finance', 'Projects', 'Admin', 'Events', 'Legal', 'Training', 'Reports'];

  const handleDownload = (formName: string) => {
    toast.success(`📥 ${formName} downloaded successfully!`);
  };

  const handleView = (formName: string) => {
    toast.info(`👁️ Opening ${formName}...`);
  };

  const filteredForms = selectedCategory === 'all' 
    ? forms 
    : forms.filter(form => form.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'HR': 'bg-blue-100 text-blue-700 border-blue-300',
      'Finance': 'bg-green-100 text-green-700 border-green-300',
      'Projects': 'bg-purple-100 text-purple-700 border-purple-300',
      'Admin': 'bg-orange-100 text-orange-700 border-orange-300',
      'Events': 'bg-pink-100 text-pink-700 border-pink-300',
      'Legal': 'bg-red-100 text-red-700 border-red-300',
      'Training': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Reports': 'bg-indigo-100 text-indigo-700 border-indigo-300',
    };
    return colors[category] || 'bg-slate-100 text-slate-700 border-slate-300';
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">📋 Forms & Documents Gallery</h1>
          <p className="text-slate-600">Download all required company forms</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {category !== 'all' && ` (${forms.filter(f => f.category === category).length})`}
            </button>
          ))}
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">No forms found in this category</p>
            </div>
          ) : (
            filteredForms.map((form) => (
              <Card
                key={form.id}
                className="bg-white p-6 hover:shadow-lg transition border-l-4 border-blue-500"
              >
                <div className="space-y-4">
                  {/* Form Icon & Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{form.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{form.description}</p>
                    </div>
                  </div>

                  {/* Category Badge & File Info */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                        form.category
                      )}`}
                    >
                      {form.category}
                    </span>
                    <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      {form.fileSize}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => handleView(form.name)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition text-sm"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(form.name)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition text-sm"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Information Card */}
        <Card className="bg-blue-50 border-l-4 border-blue-600 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">📌 Important Notes</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>✓ All forms must be filled completely and accurately</li>
            <li>✓ Forms can be downloaded and printed or filled digitally</li>
            <li>✓ Submitted forms will be reviewed by the respective departments</li>
            <li>✓ Keep a copy for your records</li>
            <li>✓ For form-related queries, contact: admin@suryas.in</li>
          </ul>
        </Card>

        {/* Download Limit Info */}
        <Card className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">⚙️ Technical Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">File Format</p>
              <p>PDF format for easy viewing and printing</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Browser Support</p>
              <p>Works with all modern web browsers</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Security</p>
              <p>All documents are secure and encrypted</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
