'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Search, Filter, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectApprovals() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform Redesign',
      submittedBy: 'John Employee',
      userType: 'Employee',
      description: 'Complete redesign of the e-commerce platform with modern UI/UX',
      submittedDate: '2026-01-15',
      status: 'pending',
      files: 2,
      budget: 150000,
    },
    {
      id: 2,
      title: 'Mobile App Development',
      submittedBy: 'Sarah Intern',
      userType: 'Intern',
      description: 'Development of iOS and Android app for company services',
      submittedDate: '2026-01-18',
      status: 'pending',
      files: 3,
      budget: 250000,
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      submittedBy: 'Mike Freelancer',
      userType: 'Freelancer',
      description: 'Real-time analytics dashboard for data visualization',
      submittedDate: '2026-01-10',
      status: 'approved',
      files: 1,
      budget: 80000,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleApprove = (id: number) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, status: 'approved' } : proj))
    );
    toast.success('✅ Project approved!');
  };

  const handleReject = (id: number) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, status: 'rejected' } : proj))
    );
    toast.error('❌ Project rejected!');
  };

  const handleRequestChanges = (id: number) => {
    toast.info('📝 Change request sent to submitter');
  };

  const filteredProjects = projects
    .filter((proj) => filterStatus === 'all' || proj.status === filterStatus)
    .filter(
      (proj) =>
        proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getTotalBudget = () => {
    return filteredProjects.reduce((sum, proj) => sum + proj.budget, 0);
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
          <h1 className="text-3xl font-bold text-slate-900">📂 Project Approvals</h1>
          <p className="text-slate-600">Review and approve/reject project submissions</p>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by project or submitter..."
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
              <option value="all">All Projects</option>
              <option value="pending">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-yellow-50 p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-slate-600">Under Review</p>
            <p className="text-2xl font-bold text-yellow-600">
              {projects.filter((r) => r.status === 'pending').length}
            </p>
          </Card>
          <Card className="bg-green-50 p-4 border-l-4 border-green-500">
            <p className="text-sm text-slate-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {projects.filter((r) => r.status === 'approved').length}
            </p>
          </Card>
          <Card className="bg-red-50 p-4 border-l-4 border-red-500">
            <p className="text-sm text-slate-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {projects.filter((r) => r.status === 'rejected').length}
            </p>
          </Card>
          <Card className="bg-purple-50 p-4 border-l-4 border-purple-500">
            <p className="text-sm text-slate-600">Total Budget</p>
            <p className="text-2xl font-bold text-purple-600">₹{getTotalBudget().toLocaleString()}</p>
          </Card>
          <Card className="bg-blue-50 p-4 border-l-4 border-blue-500">
            <p className="text-sm text-slate-600">Total Projects</p>
            <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
          </Card>
        </div>

        {/* Project Cards */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-600">No projects found</p>
            </Card>
          ) : (
            filteredProjects.map((project) => (
              <Card
                key={project.id}
                className={`p-6 border-l-4 ${
                  project.status === 'pending'
                    ? 'border-yellow-500 bg-yellow-50'
                    : project.status === 'approved'
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                    {/* Project Title & Info */}
                    <div className="md:col-span-2">
                      <p className="text-xs text-slate-600 mb-1">PROJECT TITLE</p>
                      <p className="text-lg font-bold text-slate-900 mb-2">{project.title}</p>
                      <p className="text-xs text-slate-600 mb-1">SUBMITTED BY</p>
                      <p className="text-sm text-slate-700">
                        {project.submittedBy} <span className="text-slate-500">({project.userType})</span>
                      </p>
                    </div>

                    {/* Budget */}
                    <div>
                      <p className="text-xs text-slate-600 mb-1">BUDGET</p>
                      <p className="text-xl font-bold text-slate-900">₹{project.budget.toLocaleString()}</p>
                    </div>

                    {/* Date & Files */}
                    <div>
                      <p className="text-xs text-slate-600 mb-1">SUBMITTED</p>
                      <p className="text-sm text-slate-700 mb-3">{project.submittedDate}</p>
                      <p className="text-xs text-slate-600 mb-1">FILES</p>
                      <div className="flex items-center gap-1">
                        <FileText size={16} className="text-blue-500" />
                        <p className="text-sm text-slate-700">{project.files} attached</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-xs text-slate-600 mb-1">STATUS</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <span
                          className={`text-sm font-semibold ${
                            project.status === 'pending'
                              ? 'text-yellow-600'
                              : project.status === 'approved'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {project.status === 'pending'
                            ? 'Under Review'
                            : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs text-slate-600 mb-2">DESCRIPTION</p>
                    <p className="text-sm text-slate-700">{project.description}</p>
                  </div>

                  {/* Actions */}
                  {project.status === 'pending' && (
                    <div className="border-t border-slate-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <textarea
                            placeholder="Add comments or feedback..."
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleApprove(project.id)}
                          >
                            ✓ Approve
                          </Button>
                          <Button
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => handleRequestChanges(project.id)}
                          >
                            📝 Request Changes
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleReject(project.id)}
                          >
                            ✕ Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
