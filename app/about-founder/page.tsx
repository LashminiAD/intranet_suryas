'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Card } from '@/components/ui/card';
import { Mail, Linkedin, User } from 'lucide-react';

export default function AboutFounderPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const logoImg = 'https://surya-s.zohosites.in/Remini20220710111603029-removebg.png';
  const founderImg = 'https://surya-s.zohosites.in/OWNER.jpg';

  const teamMembers = [
    {
      name: 'Mr. GOLLA KUMAR BHARATH DEEE.',
      designation: 'Founder',
      email: 'proprietor@suryas.in',
      image: founderImg,
    },
    {
      name: 'Mr. JAYENDRA M',
      designation: 'Admin',
      email: 'administrator@suryas.in',
      qualification: 'B.Com., MBA.',
      image: null,
    },
    {
      name: 'Mr. V. HAREESH DECE.',
      designation: 'Technical Team',
      email: 'technicalteam@suryas.in',
      image: null,
    },
    {
      name: 'Mr. N. Prabhu',
      designation: 'PCB Designer - C',
      qualification: 'B.E.(ECE)',
      email: 'pcb.designers@suryas.in',
      image: null,
    },
    {
      name: 'Mr. V. Santhana Kumar B.E.(ECE).',
      designation: 'Technical Team (i.c)',
      email: 'technicalteam@suryas.in',
      image: null,
    },
    {
      name: 'Mr. Manigandan C DECE.',
      designation: 'Sr. Fr. Asset i.c',
      email: 'admin@suryas.in',
      image: null,
    },
  ];

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-6xl space-y-8">
        {/* Header with Logo and Company Info */}
        <div className="bg-gradient-to-r from-blue-600 to-slate-800 text-white p-12 rounded-lg shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-8">
            <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={logoImg} alt="SURYA'S MiB Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">SURYA'S MiB ENTERPRISES</h1>
              <p className="text-xl text-blue-100 mb-6">
                "Bringing Sunshine to Your World: SURYA'S MiB - Illuminating Lives with Innovation!"
              </p>
              <p className="text-lg font-semibold text-blue-50">Founded by: Golla Kumar Bharath</p>
            </div>
          </div>
        </div>

        {/* Founder Profile Section */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 border-2 border-blue-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <img
                src={founderImg}
                alt="Mr. Golla Kumar Bharath"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-slate-900 text-center">Mr. Golla Kumar Bharath</h3>
              <p className="text-lg font-semibold text-blue-600 text-center mt-2">Founder & Proprietor</p>
              <p className="text-sm text-slate-600 text-center mt-1">SURYA'S MiB Enterprise</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">📚 Educational Background</h4>
                <p className="text-slate-700">B.Tech in Electronics and Communication Engineering (E&CE)</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">🎯 Expertise & Specialization</h4>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>✓ Electronics Systems Design & Development</li>
                  <li>✓ PCB Design & Manufacturing</li>
                  <li>✓ Embedded Systems Architecture</li>
                  <li>✓ Research & Development (R&D)</li>
                  <li>✓ Project Development & Implementation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">📅 Founded</h4>
                <p className="text-slate-700">2022</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Founder's Message */}
        <Card className="bg-blue-600 text-white p-8 border-l-4 border-yellow-400 shadow-lg">
          <div className="max-w-3xl">
            <p className="text-lg italic mb-4">
              "SURYA'S MiB Enterprise was founded with a vision to bridge the gap between academic knowledge and 
              real-world technical skills. Our focus is on innovation, practical exposure, and creating opportunities 
              for students and young professionals to grow through hands-on learning, R&D projects, and industry-oriented training."
            </p>
            <p className="text-right font-semibold">— Mr. Golla Kumar Bharath, Founder</p>
          </div>
        </Card>

        {/* Company Overview */}
        <Card className="bg-white p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Company Overview</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              Our enterprise became operational in 2022, initially focusing on basic construction works. As our
              enterprise grew, we expanded our services to include implementation work and marketing strategies for
              PCBs. We are proud to announce that our company is now registered with UDYAM-MSME, under the Ministry of
              MSME, Government of India.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-200">
              <div>
                <p className="text-sm text-slate-600">Incorporation Date</p>
                <p className="font-semibold text-slate-900">2022</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">MSME Registration</p>
                <p className="font-semibold text-slate-900">Udyam Registered</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Headquarters</p>
                <p className="font-semibold text-slate-900">Hyderabad, India</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Classification</p>
                <p className="font-semibold text-slate-900">Electronics & PCB</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-blue-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <h4 className="font-semibold text-slate-900">General Contact</h4>
            </div>
            <p className="text-sm text-slate-700 space-y-2">
              <div><strong>Website:</strong> <a href="https://surya-s.zohosites.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://surya-s.zohosites.in</a></div>
              <div><strong>Address:</strong> Hyderabad, India</div>
              <div><strong>Proprietor Email:</strong> proprietor@suryas.in</div>
              <div><strong>Phone:</strong> +91 63859 07201</div>
              <div><strong>Phone:</strong> +91 80724 87097</div>
            </p>
          </Card>

          <Card className="bg-slate-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
              <h4 className="font-semibold text-slate-900">Department Contacts</h4>
            </div>
            <p className="text-sm text-slate-700 space-y-1">
              <div><strong>Technical Team:</strong> technicalteam@suryas.in</div>
              <div><strong>PCB Designers:</strong> pcb.designers@suryas.in</div>
              <div><strong>Administrator:</strong> administrator@suryas.in</div>
            </p>
          </Card>
        </div>

        {/* Our Team Section */}
        <Card className="bg-white p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-blue-400">
                      <User size={40} className="text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm font-semibold text-blue-600 mb-1">{member.designation}</p>
                {member.qualification && (
                  <p className="text-xs text-slate-600 mb-2">{member.qualification}</p>
                )}
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </Card>

        {/* Company Information */}
        <Card className="bg-white p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Organization Structure</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Sole Proprietor led organization</li>
                <li>• 4 Core Employees + 2 External Personnel</li>
                <li>• No EPFO/ESIC requirements</li>
                <li>• MSME Udyam Enterprise Classification</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Registration & Compliance</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• MSME Udyam Registered (Govt. of India)</li>
                <li>• Tax Exemption (Income &lt; 3.5 LPA)</li>
                <li>• GST Exemption (Income &lt; 20 Lakhs)</li>
                <li>• Remote & Part-Time Operations</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Social & Legal Links */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">🔗 Connect With Us & Legal Documents</h3>
          <div className="space-y-6">
            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Official Social Links</h4>
              <div className="flex gap-4 flex-wrap">
                <a href="https://in.linkedin.com/company/surya-s-mib" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-white px-4 py-2 rounded-lg hover:shadow-md transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/suryas_mib_enterprises" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium bg-white px-4 py-2 rounded-lg hover:shadow-md transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.331.012 7.052.07 2.696.272.273 2.69.07 7.052.012 8.331 0 8.756 0 12c0 3.244.012 3.668.07 4.948.202 4.358 2.612 6.78 6.979 6.98 1.281.058 1.7.07 4.948.07 3.259 0 3.668-.012 4.948-.07 4.354-.2 6.782-2.617 6.979-6.98.058-1.28.07-1.704.07-4.948 0-3.244-.012-3.668-.07-4.948-.196-4.354-2.617-6.78-6.979-6.98C15.668.012 15.259 0 12 0z"/>
                  </svg>
                  Instagram
                </a>
                <a href="mailto:proprietor@suryas.in" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-white px-4 py-2 rounded-lg hover:shadow-md transition">
                  <Mail size={20} />
                  Email
                </a>
              </div>
            </div>

            {/* Contact Details */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-slate-900 mb-3">📞 Official Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-slate-600">Website</p>
                  <p className="font-semibold text-blue-600"><a href="https://surya-s.zohosites.in" target="_blank" rel="noopener noreferrer" className="hover:underline">https://surya-s.zohosites.in</a></p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-slate-600">Phone Numbers</p>
                  <p className="font-semibold text-slate-900">+91 63859 07201</p>
                  <p className="font-semibold text-slate-900">+91 80724 87097</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Company Registrations & Certifications */}
        <Card className="bg-white p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📋 Company Registrations & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MSME Annexure */}
            <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">📄</div>
                <div>
                  <h4 className="font-bold text-slate-900">MSME Annexure</h4>
                  <p className="text-sm text-slate-600">Ministry of MSME Registration</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">Official MSME certification document for SURYA'S MiB Enterprise</p>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition">
                📥 Download Certificate
              </button>
            </div>

            {/* UDYAM Registration */}
            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">✓</div>
                <div>
                  <h4 className="font-bold text-slate-900">UDYAM Registration</h4>
                  <p className="text-sm text-slate-600">Government of India</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">Unique identification number: UDYAM-TN-24-0039218</p>
              
              {/* UDYAM Certificate Image */}
              <div className="mb-4 border-2 border-green-300 rounded-lg overflow-hidden bg-white p-2">
                <img 
                  src="https://via.placeholder.com/400x300?text=UDYAM+Certificate"
                  alt="UDYAM Registration Certificate" 
                  className="w-full h-auto rounded object-cover"
                />
              </div>
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition">
                📥 Download Certificate
              </button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-600 py-4 border-t border-slate-200">
          <p>
            <strong>SURYA'S MiB ENTERPRISES</strong> - Transforming ideas into high-performance Electronics designs
            for seamless innovation and success.
          </p>
          <p className="mt-2">All Rights Reserved © 2022 | www.suryas.in</p>
        </div>
      </div>
    </MainLayout>
  );
}
