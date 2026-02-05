'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface CircularEntry {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  details: string;
}

const defaultCirculars: CircularEntry[] = [
  {
    id: 'circ-001',
    title: 'Quarterly Review Meeting',
    date: '2026-02-10',
    time: '10:30 AM',
    category: 'Notice',
    details: 'All departments must submit quarterly performance summaries.',
  },
  {
    id: 'circ-002',
    title: 'Medical Camp',
    date: '2026-02-14',
    time: '09:00 AM',
    category: 'Camp',
    details: 'Free medical camp for employees and families at the main hall.',
  },
];

export default function CircularsPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [circulars, setCirculars] = useState<CircularEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CircularEntry | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    category: 'Notice',
    details: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'admin' && user?.role !== 'founder') {
      router.push('/homepage');
      return;
    }

    const stored = localStorage.getItem('circulars');
    if (stored) {
      setCirculars(JSON.parse(stored));
    } else {
      localStorage.setItem('circulars', JSON.stringify(defaultCirculars));
      setCirculars(defaultCirculars);
    }
  }, [isAuthenticated, router, user]);

  const saveCirculars = (next: CircularEntry[]) => {
    setCirculars(next);
    localStorage.setItem('circulars', JSON.stringify(next));
  };

  const openModal = (entry?: CircularEntry) => {
    if (entry) {
      setEditing(entry);
      setFormData({
        title: entry.title,
        date: entry.date,
        time: entry.time,
        category: entry.category,
        details: entry.details,
      });
    } else {
      setEditing(null);
      setFormData({ title: '', date: '', time: '', category: 'Notice', details: '' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.date) {
      toast.error('Title and date are required');
      return;
    }

    if (editing) {
      const updated = circulars.map((item) =>
        item.id === editing.id ? { ...item, ...formData } : item
      );
      saveCirculars(updated);
      toast.success('Circular updated');
    } else {
      const newCircular: CircularEntry = {
        id: `circ-${Date.now()}`,
        ...formData,
      };
      saveCirculars([newCircular, ...circulars]);
      toast.success('Circular added');
    }

    setShowModal(false);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Circulars / Notice Board</h1>
            <p className="text-slate-600">Admin-only announcements for events and updates</p>
          </div>
          <Button onClick={() => openModal()} className="flex items-center gap-2">
            <Plus size={16} /> Add Circular
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {circulars.map((circular) => (
            <Card key={circular.id} className="bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{circular.title}</h3>
                  <p className="text-sm text-slate-600">{circular.category}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {circular.date} • {circular.time}
                  </p>
                </div>
                <button
                  onClick={() => openModal(circular)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
              </div>
              <p className="text-sm text-slate-700 mt-3">{circular.details}</p>
            </Card>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white w-full max-w-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {editing ? 'Edit Circular' : 'Add Circular'}
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  {['Notice', 'Event', 'Leave', 'Camp', 'Circular'].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
                <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
