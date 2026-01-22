'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, MapPin, Briefcase } from 'lucide-react';

export default function RecruitmentPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const opportunities = [
    {
      id: 1,
      title: 'PCB Design Intern',
      department: 'Electronics Design',
      location: 'Remote',
      duration: '3-6 months',
      description: 'Work on real PCB design projects with our expert team',
      link: 'https://internshala.com/company/surya-s-mib-1717484546/',
    },
    {
      id: 2,
      title: 'Freelancer - Electronics Engineer',
      department: 'Project Based',
      location: 'Remote',
      duration: 'Project Duration',
      description: 'Join our freelancer network for project-based work',
      link: 'https://internshala.com/company/surya-s-mib-1717484546/',
    },
    {
      id: 3,
      title: 'Solar Solutions Developer',
      department: 'Renewable Energy',
      location: 'Remote',
      duration: '6 months',
      description: 'Help develop sustainable solar solutions for businesses',
      link: 'https://internshala.com/company/surya-s-mib-1717484546/',
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Recruitment & Careers</h1>
        <p className="text-slate-600 mb-8">
          Join SURYA'S MiB ENTERPRISES and be part of our innovation journey
        </p>

        {/* Information Banner */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-6 mb-8">
          <p className="text-blue-900">
            <strong>📢 Internship Opportunities:</strong> Check our latest internship openings on Internshala every 10th of the month. 
            All stipend internships are published on{' '}
            <a
              href="https://internshala.com/company/surya-s-mib-1717484546/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Internshala
            </a>
          </p>
        </Card>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="bg-white p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{opp.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{opp.department}</p>

              <div className="space-y-2 text-sm text-slate-700 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" />
                  {opp.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-green-600" />
                  {opp.duration}
                </div>
              </div>

              <p className="text-sm text-slate-700 mb-6">{opp.description}</p>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                onClick={() => window.open(opp.link, '_blank')}
              >
                <ExternalLink size={16} />
                View on Internshala
              </Button>
            </Card>
          ))}
        </div>

        {/* Why Join */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Join SURYA'S MiB?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">🚀 Growth & Learning</h3>
              <p className="text-slate-700">
                Work on cutting-edge PCB design, solar solutions, and digital transformation projects with industry experts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">🌟 Real-World Impact</h3>
              <p className="text-slate-700">
                Contribute to actual projects that power businesses and drive innovation in electronics and renewable energy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">🎯 Flexible Work</h3>
              <p className="text-slate-700">
                Remote and part-time opportunities designed to fit your schedule. Perfect for students and professionals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">📜 Certification</h3>
              <p className="text-slate-700">
                Earn recognized certificates upon successful completion of your internship or freelance project.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="bg-slate-50 border-2 border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Questions About Careers?</h2>
          <p className="text-slate-700 mb-4">
            Reach out to our team for more information about opportunities and the application process.
          </p>
          <div className="space-y-2">
            <p className="text-slate-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:vi.interns@suryas.in" className="text-blue-600 hover:text-blue-700">
                vi.interns@suryas.in
              </a>
            </p>
            <p className="text-slate-700">
              <strong>WhatsApp:</strong> +91 81242 27370
            </p>
            <p className="text-slate-700">
              <strong>Internshala:</strong>{' '}
              <a
                href="https://internshala.com/company/surya-s-mib-1717484546/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Visit our Internshala page
              </a>
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
